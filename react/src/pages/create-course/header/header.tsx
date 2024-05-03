import { FC, memo } from 'react';
import { Flex } from '@chakra-ui/react';

import { GoBackButton } from '~/components/go-back-button';
import { HeaderProps } from './header-interfaces';
import { useTranslate } from '~/services';

export const Header: FC<HeaderProps> = memo(({ onClick }) => {
  const { __ } = useTranslate();
  return (
    <Flex as="header" p="10px" maxWidth="130px" position="sticky" top={0} left={0}>
      <GoBackButton type="course" onClick={onClick} label={__('Back to courses')}/>
    </Flex>
  );
});
