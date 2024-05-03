import { FC, memo } from 'react';
import { chakra, Flex, Icon, LinkBox, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { getLink } from '~/helpers/string';
import { NavButtonProps } from './nav-button-interfaces';
import { Popup } from './popup';
import { useCourseData } from '~/common/hooks';
import { useGetIcon, useIsActive } from './nav-button-hooks';

import './nav-button.scss';

const NavLink = chakra(LinkBox, {
  baseStyle: {
    maxHeight: '40px',
    minWidth: '250px',
    fontSize: '14px',
    textAlign: 'left',
    padding: '10px',
    color: 'secondaryHover',
  },
});

export const NavButton: FC<NavButtonProps> = memo(({ link }) => {
  const { path, icon, label, isDisabled } = link;

  const { data } = useCourseData();
  const navigate = useNavigate();
  const IconTab = useGetIcon(icon);
  const isActive = useIsActive(path);
  const onClick = () => {
    if (isDisabled) {
      return;
    } else {
      navigate(path);
    }
  };

  return (
    <NavLink
      as="a"
      onClick={onClick}
      bg={isActive ? 'white' : 'transparent'}
      _hover={{
        color: isDisabled ? 'dark70' : 'secondaryHover',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        '& > div > div > svg': {
          color: (!isActive && !isDisabled) ? 'secondaryHover': '',
        },
        '& > div > div > p': {
          color: (!isActive && !isDisabled) ? 'secondaryHover' : '',
        }
      }}
    >
      <Flex justify="space-between" alignItems="center">
        <Flex gap="10px" alignItems="center">
          <Icon
            as={IconTab}
            w="16px"
            h="16px"
            color={isActive ? 'primary' : 'dark70'}
          />
          <Text color={isActive ? 'dark' : 'dark70'}>{label}</Text>
        </Flex>
        {isDisabled && <Popup link={getLink(data.urls.addons, label)} />}
      </Flex>
    </NavLink>
  );
});
