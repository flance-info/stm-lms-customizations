import { FC } from 'react';

import {
  CheckboxField,
  DatePickerField,
  NumberField,
  RadioGroupField,
  SelectField,
  TextareaField,
  TextField,
} from '~/components/forms/fields';
import { Option } from '~/models';

interface CustomFieldProps {
  type: string;
  label?: string;
  name: string;
  options?: Option[];
}

export const CustomField: FC<CustomFieldProps> = ({ type, label, name, options }) => {
  switch (type) {
    case 'text':
      return <TextField name={name} label={label}/>;
    case 'number':
      return <NumberField name={name} label={label}/>;
    case 'date':
      return <DatePickerField name={name} label={label}/>;
    case 'textarea':
      return <TextareaField name={name} label={label}/>;
    case 'select':
      return <SelectField name={name} label={label} options={options || []}/>;
    case 'checkbox':
      return <CheckboxField name={name}>{label}</CheckboxField>;
    case 'radio':
      return <RadioGroupField name={name} options={options || []}/>;
    default:
      return <TextField name={name} label={label}/>;
  }
};
