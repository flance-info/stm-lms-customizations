import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import { getCourseBuilderSettings } from '~/common/hooks';
import { GoBackButton } from '~/components/go-back-button';
import { useTranslate } from '~/services';

export const Header: FC = () => {
  const { data } = getCourseBuilderSettings();
  const { __ } = useTranslate();

  const onClick = () => {
    window.open(data?.urls.dashboard_posts + 'stm-lessons', '_self');
  };

  return (
    <Flex as="header" p="10px" position="sticky" top="0" maxWidth="130px">
      <GoBackButton type="lesson" onClick={onClick} label={__('Back to lessons')}/>
    </Flex>
  );
};
