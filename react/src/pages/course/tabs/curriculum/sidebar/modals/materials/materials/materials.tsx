import { FC, Fragment, memo } from 'react';
import { chakra, Checkbox, Divider, Flex, Text, VStack } from '@chakra-ui/react';

import { MaterialProps } from './materials-interfaces';
import { MaterialIcon } from '~/components/material-icon';
import { PostType } from '~/models';

const Material = chakra(Flex, {
  baseStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    cursor: 'pointer',
    '&:hover': { bg: 'mainBackground' },
  },
});

export const Materials: FC<MaterialProps> = memo(({ materials, title, onToggle, onChangeCheckbox, getIsChecked }) => {
  return (
    <Flex flexDirection="column">
      <Text fontSize="xs" color="dark70" m="10px 0 10px 20px" fontWeight="bold">
        {title}
      </Text>
      <VStack bg="white" spacing="0" align="left" borderTop="1px solid" borderColor="border">
        {!materials.length
          ? <Flex p="12px 20px">Not found</Flex>
          : materials.map((material) => {
            const { id, title, post_type, lesson_type } = material;
            const isChecked = getIsChecked(id);
            const lessonType = post_type === PostType.STM_LESSONS ? lesson_type : post_type;

            return (
              <Fragment key={id}>
                <Material
                  bg={isChecked ? 'mainBackground' : 'white'}
                  onClick={() => onToggle(id)}
                >
                  <Flex alignItems="center" gap="10px">
                    <MaterialIcon lessonType={lessonType} />
                    {title}
                  </Flex>
                  <Checkbox isChecked={isChecked} onChange={(event) => onChangeCheckbox(event, id)}/>
                </Material>
                <Divider variant="msVariant" borderColor="border"/>
              </Fragment>
            );
          })
        }
      </VStack>
    </Flex>
  );
});
