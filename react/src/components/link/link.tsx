import { FC, memo } from 'react';
import { chakra, Flex, IconButton } from '@chakra-ui/react';

import { LinkProps } from './link-interfaces';
import { Popup } from './popup';
import { useLessonPageType } from '~/common/hooks';

import { ReactComponent as CopyIcon } from '~/assets/icons/copy.svg';

const LinkWrapper = chakra(Flex, {
  baseStyle: {
    minWidth: '230px',
    padding: '6px 10px',
    fontSize: 'sm',
    border: '1px solid',
    borderRadius: '5px 0 0 5px',
    whiteSpace: 'nowrap',
    height: '100%',
    alignItems: 'center',
  },
});

export const Link: FC<LinkProps> = memo(({ link = '' }) => {
  const { isSingleLessonPage } = useLessonPageType();
  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
  };

  return (
    <Flex alignItems="center" h="40px">
      <LinkWrapper
        background={isSingleLessonPage ? 'rgba(255, 255, 255, 0.1)' : 'mainBackground'}
        color={isSingleLessonPage ? 'mainBackground' : 'dark70'}
        borderColor={isSingleLessonPage ? 'rgba(255, 255, 255, 0.1)' : 'mainBackground'}
      >
        {link}
      </LinkWrapper>
      <Popup>
        <IconButton
          onClick={copyLink}
          aria-label="copy"
          icon={<CopyIcon/>}
          border="1px solid"
          borderColor="dark70"
          borderRadius="0 5px 5px 0"
          background="dark70"
          margin="0px"
          width="40px"
          color="white"
          _hover={{ background: 'dark70' }}
        />
      </Popup>
    </Flex>
  );
});
