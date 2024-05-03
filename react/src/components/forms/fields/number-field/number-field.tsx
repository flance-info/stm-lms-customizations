import { FC, useState } from 'react';
import { Box, Icon, Input } from '@chakra-ui/react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { useController } from 'react-hook-form';

import { FieldControl } from '../../field-control';
import { NumberFieldProps } from './number-field-interfaces';

import { ArrowButton, ArrowsContainer } from '~/components/forms/fields/number-field/number-field-styles';
import { ReactComponent as ArrowTriangleIcon } from '~/assets/icons/arrow-triangle.svg';

export const NumberField: FC<NumberFieldProps> = (props) => {
  const {
    label,
    name,
    thousandSeparator = ' ',
    decimalSeparator = '.',
    decimalScale = 2,
    withButtons = false,
    buttonsIncrement = 1,
    allowNegative = false,
    ...restProps
  } = props;
  const { field } = useController({ name });
  const [value, setValue] = useState<number | undefined>(field.value);
  const handleIncrement = (direction: number) => () => {
    const baseValue = value || 0;
    const newValue = baseValue + buttonsIncrement * direction;
    setValue(newValue);
    field.onChange(newValue);
  };

  return (
    <FieldControl label={label} name={name}>
      <Box pos={'relative'}>
        <Input
          onBlur={field.onBlur}
          as={NumericFormat}
          variant='msVariant'
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          decimalScale={decimalScale}
          value={value}
          onValueChange={(values: NumberFormatValues) => {
            setValue(values.floatValue);
            field.onChange(values.floatValue);
          }}
          {...restProps}
        />
        {withButtons && (
          <ArrowsContainer>
            <ArrowButton
              aria-label={'increase'}
              icon={<Icon as={ArrowTriangleIcon} w={'6px'} h={'3.5px'} transform={'rotate(180deg)'}/>}
              onClick={handleIncrement(1)}
            />
            <ArrowButton
              aria-label={'decrease'}
              icon={<Icon as={ArrowTriangleIcon} w={'6px'} h={'3.5px'} />}
              onClick={handleIncrement(-1)}
              disabled={!allowNegative && !value}
            />
          </ArrowsContainer>
        )}
      </Box>
    </FieldControl>
  );
};
