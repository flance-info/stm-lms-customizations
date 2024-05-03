import { FC, memo } from 'react';
import { Box, chakra, Flex, Icon, Text } from '@chakra-ui/react';

import { PrerequisitesCardProps } from './prerequisites-card-interfaces';
import { usePrerequisitesCardHook } from './prerequisites-card-hook';

import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';

const Actions = chakra(Box, {
  baseStyle: {
    transition: 'all 0.25s linear',
    opacity: 0,
    pointerEvents: 'none',
  },
});

const Container = chakra(Flex, {
  baseStyle: {
    marginBottom: '10px',
    padding: '11px 20px',
    borderRadius: '4px',
    background: 'mainBackground',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '20px',
    gap: '10px',
    cursor: 'pointer',
  },
});

export const PrerequisitesCard: FC<PrerequisitesCardProps> = memo(({ name }) => {
  const { courses, removeCourseHandler } = usePrerequisitesCardHook(name);

  return (
    <>
      {courses.map((course) => {
        const { id, title } = course;
        return (
          <Container key={id} role="group">
            <Text fontSize="sm" color="dark70" lineHeight="lg">
              {title}
            </Text>
            <Actions _groupHover={{ pointerEvents: 'auto', opacity: 1 }}>
              <Icon
                as={TrashIcon}
                onClick={() => removeCourseHandler(id)}
                cursor="pointer"
                color="dark50"
                _hover={{ color: 'error' }}
              />
            </Actions>
          </Container>
        );
      })}
    </>
  );
});
