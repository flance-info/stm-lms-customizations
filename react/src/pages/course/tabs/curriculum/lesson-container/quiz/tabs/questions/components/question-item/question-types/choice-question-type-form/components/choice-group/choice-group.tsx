import { FC } from 'react';
import { ChoiceGroupProps } from './choice-group-interfaces';
import { RadioGroup, CheckboxGroup } from '@chakra-ui/react';

export const ChoiceGroup: FC<ChoiceGroupProps> = (props) => {
  const { multiple, children, value, onChange } = props;
  return multiple ? (
    <CheckboxGroup value={value.map((val) => val.toString())} onChange={onChange}>
      {children}
    </CheckboxGroup>
  ) : (
    <RadioGroup value={value[0]?.toString()} onChange={(value) => onChange([value])}>
      {children}
    </RadioGroup>
  );
};
