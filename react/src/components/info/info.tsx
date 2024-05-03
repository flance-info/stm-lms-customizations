import { FC, ReactNode } from 'react';
import { chakra, Flex, Icon } from '@chakra-ui/react';
import { ReactComponent as InfoIcon } from '~/assets/icons/info.svg';
import { Property } from 'csstype';

const InfoContainer = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    width: '100%',
    fontSize: '12px',
    mt: '4px',
    color: 'secondary',
  },
});

interface InfoProps {
  children: ReactNode;
  fontSize?: Property.FontSize;
  variant?: 'primary' | 'green';
}

export const Info: FC<InfoProps> = (props) => {
  const { children, variant = 'primary', fontSize } = props;

  return (
    <InfoContainer sx={{ fontSize }}>
      <Icon as={InfoIcon} mr={'8px'} color={variant} boxSize={'14px'} />
      <span>{children}</span>
    </InfoContainer>
  );
};
