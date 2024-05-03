import { FC } from 'react';
import { chakra, Flex, Icon, IconButton } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { CommonFieldProps } from '~/components/forms/common-interfaces';

const ActionButton = chakra(IconButton, {
  baseStyle: {
    p: 0,
    m: 0,
    boxSize: '24px',
    '&:first-of-type': {
      borderRadius: '4px',
    },
    '&:last-of-type': {
      borderRadius: '4px',
    },
  },
});

type AnswerToggleButton = {
  icon: FC;
  label: string;
  value: string;
};

interface AnswerTypeToggleFieldProps extends CommonFieldProps {
  buttons: AnswerToggleButton[];
}

export const AnswerTypeToggleField: FC<AnswerTypeToggleFieldProps> = (props) => {
  const { name, buttons } = props;
  const { field } = useController({ name });
  const { value = buttons[0].value, onChange } = field;

  const buttonClickHandler = (type: string) => () => {
    onChange(type);
  };

  return (
    <Flex>
      {buttons.map(({ icon, value: val, label }) => {
        const disabled = value === val;
        return (
          <ActionButton
            icon={<Icon as={icon} color={disabled ? 'dark50' : ''}/>}
            aria-label={label}
            color="primary"
            bg={disabled ? 'transparent' : 'white'}
            title={label}
            disabled={disabled}
            key={val}
            onClick={buttonClickHandler(val)}
            _disabled={{
              opacity: 1,
            }}
          />
        );
      })}
    </Flex>
  );
};
