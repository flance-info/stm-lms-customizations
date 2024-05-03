import { Children, FC } from 'react';
import { Button, chakra, Flex, Icon, Text } from '@chakra-ui/react';

import { WarningProps } from './warning-interfaces';

import { ReactComponent as WarningIcon } from '~/assets/icons/warning.svg';

const WarningContainer = chakra(Flex, {
  baseStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 10px 10px 20px',
    border: '1px solid',
    borderColor: 'warningCardBorder',
    background: 'warningCardBg',
    borderRadius: '4px',
  },
});

export const Warning: FC<WarningProps> = (props) => {
  const { text, link, title, onClick, onlyWarning = false, children, ...flexProps } = props;
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <WarningContainer{...flexProps}>
      <Flex gap='10px' alignItems="center">
        <Icon as={WarningIcon} fontSize="18px"/>
        <Text fontSize='sm' fontWeight='medium'>
          {text}
        </Text>
      </Flex>
      {!onlyWarning &&
        <>
          {Children.count(children) > 0 ? children : (
            <Button onClick={handleClick} variant='primary' size='sm' m='0' p='6px 20px'>
              {title}
            </Button>
          )}
        </>
      }
    </WarningContainer>
  );
};
