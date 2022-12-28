import React, { useEffect, useMemo, useState } from 'react';
import { EditPropertyProps, flat } from 'adminjs';
import { FormGroup, FormMessage, Select } from "@adminjs/design-system";
import { CustomPropertyLabel } from "./CustomPropertyLabel";

interface SelectOption {
  value: string;
  label: string;
}

// const options = [
//   { value: "Appointment|list", label: "Appointment | Access to resource" },
//   { value: "Appointment|new", label: "Appointment | Create" },
//   { value: "Appointment|edit", label: "Appointment | Edit" },
//   { value: "Appointment|show", label: "Appointment | See Details" },
//   { value: "Appointment|delete", label: "Appointment | Delete" },
//   { value: "Article|list", label: "Article | Access to resource" },
//   { value: "Article|new", label: "Article | Create" },
//   { value: "Article|edit", label: "Article | Edit" },
//   { value: "Article|show", label: "Article | See Details" },
//   { value: "Article|delete", label: "Article | Delete" },
//   { value: "City|list", label: "City | Access to resource" },
//   { value: "City|new", label: "City | Create" },
//   { value: "City|edit", label: "City | Edit" },
//   { value: "City|show", label: "City | See Details" },
//   { value: "City|delete", label: "City | Delete" },
//   { value: "User|list", label: "User | Access to resource" },
//   { value: "User|new", label: "User | Create" },
//   { value: "User|edit", label: "User | Edit" },
//   { value: "User|show", label: "User | See Details" },
//   { value: "User|delete", label: "User | Delete" },
// ];

const getOptions = (availableValues: SelectOption[], values: string[]): SelectOption[] => {
  if (typeof values !== 'object') return [];

  return availableValues.filter(option => values.includes( option.value ));
};

export const PermissionSelectBox = (props: EditPropertyProps) => {
  const { onChange, property, record } = props;
  const { availableValues } = property;
  const [selectedOptions, setSelectedOptions] = useState([]);

  const savedPermissions = useMemo(
    () => flat.get(record?.params, property.path) as string[] | undefined,
    [record],
  );

  useEffect(() => {
    const usersPermissions = getOptions( availableValues as SelectOption[], savedPermissions );
    setSelectedOptions(usersPermissions);
  }, []);

  const error = record?.errors[property.path];

  const handleChange = (selected) => {
    if (selected) {
      onChange(property.path, selected.map(s => s.value));
      setSelectedOptions(selected);
    } else {
      onChange(property.path, null);
    }
  }

  return (
    <FormGroup error={Boolean(error)}>
      <CustomPropertyLabel property={property} />
      <Select
        options={availableValues}
        value={selectedOptions}
        onChange={handleChange}
        isClearable
        isDisabled={property.isDisabled}
        isSearchable
        isMulti
        closeMenuOnSelect={false}
        {...property.props}
      />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

export default PermissionSelectBox;
