import { FC } from 'react';
import { Box, Button, chakra, Divider, Flex } from '@chakra-ui/react';

import { EAddon, EPlugin } from '~/common/constants';
import { Exams } from '~/models';
import { getCourseBuilderSettings, useHasPluginsOrAddons } from '~/common/hooks';
import { HeaderProps } from './header-interfaces';
import { Link } from '~/components/link';
import { TitleField } from '../title-field';

const Container = chakra(Flex, {
  baseStyle: {
    justifyContent: 'space-between',
    padding: '0px 20px 10px',
    gap: '10px',
    alignItems: 'center',
  },
});

export const Header: FC<HeaderProps> = ({ type, id, placeholder, label, isLoading, isDisabled }) => {
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const commonData = getCourseBuilderSettings();
  const showShortcode = type === Exams.QUIZ && id
    && (hasAddon(EAddon.ONLINE_TESTING) && hasPlugin(EPlugin.LMS_PRO)) && !commonData.data?.options?.is_instructor;

  return (
    <Box>
      <Container>
        <TitleField name="title" prefixType={type} placeholder={placeholder} />
        {showShortcode && <Link link={`[stm_lms_quiz_online id=${id}]`} />}
        <Button
          variant="primary"
          type="submit"
          m="0"
          isLoading={isLoading}
          isDisabled={isDisabled}
        >
          {label}
        </Button>
      </Container>
      <Divider variant="msVariant" />
    </Box>
  );
};
