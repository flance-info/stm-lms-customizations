import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { useGetLinks } from './nav-links-hooks';

import './nav-links.scss';

export const NavLinks: FC = () => {
  const LINKS = useGetLinks();

  return (
    <Flex>
      {LINKS.map((link) => {
        const { path, label } = link;
        return (
          <NavLink key={path} to={path} className={({ isActive }) => (isActive ? 'active-link' : 'link')}>
            {label}
          </NavLink>
        );
      })}
    </Flex>
  );
};
