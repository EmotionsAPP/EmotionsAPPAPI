import React from 'react';
import { PropertyLabelProps } from 'adminjs';
import { Label } from "@adminjs/design-system";

export const CustomPropertyLabel = (props: PropertyLabelProps) => {
  const { property } = props;

  if (property.hideLabel) 
    return null;

  return (
    <Label 
      htmlFor={property.path}
      required={property.isRequired}
    >
      {property.label}
    </Label>
  )
}
