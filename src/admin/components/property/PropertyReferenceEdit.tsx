import React, { useEffect, useMemo, useState } from "react";
import { ApiClient, EditPropertyProps, flat, RecordJSON, SelectRecord } from "adminjs";
import { FormGroup, FormMessage, Label, SelectAsync } from "@adminjs/design-system";

type CombinedProps = EditPropertyProps;
type SelectRecordEnhanced = SelectRecord & {
  record: RecordJSON;
};

function PropertyReferenceEdit(props: CombinedProps) {
  const { onChange, property, record } = props;
  const { reference: resourceId, custom: filterProperties } = property;
  
  const params = new URLSearchParams();
  // Fill the params to load options with the filter properties
  Object.entries(filterProperties).forEach(pair => params.append(`filters.${pair[0]}`, pair[1]));

  if (!resourceId) {
    throw new Error(`Cannot reference resource in property '${property.path}'`);
  }

  const handleChange = (selected: SelectRecordEnhanced): void => {
    if (selected) {
      onChange(property.path, selected.value, selected.record)
    } else {
      onChange(property.path, null)
    }
  }

  const loadOptions = async (inputValue: string): Promise<SelectRecordEnhanced[]> => {
    const api = new ApiClient();

    const response = await api.resourceAction({
      resourceId, 
      actionName: 'search',
      query: inputValue,
      params
    });

    const optionRecords = response.data.records;

    return optionRecords.map((optionRecord: RecordJSON) => ({
      value: optionRecord.id,
      label: optionRecord.title,
      record: optionRecord
    }));
  }
  const error = record?.errors[property.path]

  const selectedId = useMemo(
    () => flat.get(record?.params, property.path) as string | undefined,
    [record],
  )
  const [loadedRecord, setLoadedRecord] = useState<RecordJSON | undefined>();
  const [loadingRecord, setLoadingRecord] = useState(0);

  useEffect(() => {
    if (selectedId) {
      setLoadingRecord((c) => c + 1)
      const api = new ApiClient()
      api.recordAction({
        actionName: 'show',
        resourceId,
        recordId: selectedId,
      }).then(({ data }: any) => {
        setLoadedRecord(data.record)
      }).finally(() => {
        setLoadingRecord((c) => c - 1)
      })
    }
  }, [selectedId, resourceId])

  const selectedValue = loadedRecord;
  const selectedOption = (selectedId && selectedValue) ? {
    value: selectedValue.id,
    label: selectedValue.title,
  } : {
    value: '',
    label: '',
  }

  return (
    <FormGroup error={Boolean(error)}>
      {property.hideLabel || (
        <Label 
          htmlFor={property.path}
          required={property.isRequired}
        >
          {property.label}
        </Label>
      )}
      <SelectAsync
        cacheOptions
        value={selectedOption}
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        isClearable
        isDisabled={property.isDisabled}
        isLoading={!!loadingRecord}
        {...property.props}
      />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

export default PropertyReferenceEdit;
