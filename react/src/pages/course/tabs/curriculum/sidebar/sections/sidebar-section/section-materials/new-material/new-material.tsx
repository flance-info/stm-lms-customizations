import { FC } from 'react';
import { Badge, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { MaterialIcon } from '~/components/material-icon';
import { MaterialTitle } from '~/components/material-title';
import { useCurriculumContext } from '../../../../../curriculum-tab-context';
import { useTranslate } from '~/services';

interface NewMaterialProps {
  sectionId: string;
}

export const NewMaterial: FC<NewMaterialProps> = ({ sectionId }) => {
  const { sectionId: sectionIdFromUrl } = useParams<{ lessonId: string, sectionId: string }>();
  const { newMaterial } = useCurriculumContext();
  const { __ } = useTranslate();

  return (
    newMaterial && sectionIdFromUrl === sectionId
      ? (
        <Flex
          background="draftBg"
          alignItems="center"
          justify="space-between"
          border="1px solid"
          borderColor="warning"
          borderRadius="sm"
          pointerEvents="none"
          p="10px 10px 10px 44px"
        >
          <Flex alignItems="center">
            <MaterialIcon lessonType={newMaterial.type} />
            <MaterialTitle
              title={newMaterial.title}
              color={newMaterial.title ? 'dark' : 'dark30'}
              w="160px"
            >
              {newMaterial.title || __('Untitled')}
            </MaterialTitle>
          </Flex>
          <Badge
            variant="solid"
            border="1px solid"
            borderColor="warning"
            borderRadius="sm"
            background="warning"
            color="white"
            fontSize="xxs"
            fontWeight="bold"
            p="2px 5px"
            lineHeight="xs"
          >
            {__('Draft')}
          </Badge>
        </Flex>
      )
      : null
  );
};
