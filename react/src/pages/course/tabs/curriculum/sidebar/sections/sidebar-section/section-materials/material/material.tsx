import { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import { DeleteButton } from '~/components/delete-button';
import { DragItem } from '~/components/drag-item';
import { getExamsType } from './material-utils';
import { Hint } from './hint';
import { Loader } from '~/components/loader';
import { MaterialIcon } from '~/components/material-icon';
import { MaterialProps } from './material-interfaces';
import { MaterialTitle } from '~/components/material-title';
import { MaterialContainer, SidebarActions } from './material-styles';
import { SectionChanger } from './section-changer';
import { PostType, ServerError } from '~/models';
import { useApi, useTranslate } from '~/services';
import { useConfirm, useErrorToastOptions } from '~/common/hooks';
import { useCourse } from '../../../../../../../course-page-hooks';
import { useGetIsLockedByAddon } from './material-hooks';
import { useSortableItem } from '~/components/drag-drop/DragDropItem';
import { useToast } from '~/components/toast';

export const Material: FC<MaterialProps> = ({ material, sectionId }) => {
  const { attributes, setNodeRef, style, listeners, active } = useSortableItem(material.id);

  const { lessonId, sectionId: sectionIdFromUrl } = useParams<{ lessonId: string, sectionId: string }>();

  const { courseId, invalidate } = useCourse();
  if (!courseId) return null;

  const { __ } = useTranslate();
  const api = useApi();
  const toast = useToast();
  const { mutate, isLoading } = useMutation(
    api.curriculum.materials.delete,
    {
      onSuccess: () => invalidate(),
      onError: (err: ServerError) => {
        const errorToastOptions = useErrorToastOptions(err, __('Failed to remove section'));
        toast(errorToastOptions);
      },
    },
  );
  const removeMaterial = (id: number) => {
    mutate({ courseId, id });
  };

  const navigate = useNavigate();
  const isLocked = useGetIsLockedByAddon(material.post_type, material.lesson_type);

  const navigateToEditLesson = () => {
    let path = '/';

    if (isLocked) return;

    if ([PostType.STM_GOOGLE_MEETS, PostType.STM_ASSIGNMENTS, PostType.STM_QUIZZES].includes(material.post_type)) {
      const type = getExamsType(material.post_type);
      path = generatePath('./sections/:sectionId/:lessonType/:lessonId', {
        lessonId: material.post_id.toString(),
        sectionId: sectionId.toString(),
        lessonType: type,
      });
    } else {
      path = generatePath('./sections/:sectionId/lessons/:lessonId', {
        sectionId: sectionId.toString(),
        lessonId: material.post_id.toString(),
      });
    }

    navigate(path);
  };

  const onDeleteConfirm = useConfirm(
    () => removeMaterial(material.id),
    __('Are you sure you want to delete this material?')
  );

  const isSelected = lessonId && sectionId
    ? lessonId === material.post_id.toString() && sectionIdFromUrl === sectionId.toString()
    : false;
  const isDisabled = active ? (active.id !== material.id ) : false;
  const zIndex = isDisabled ? 1 : 2;
  const lessonType = material.post_type === PostType.STM_LESSONS ? material.lesson_type : material.post_type;

  return (
    <MaterialContainer
      pointerEvents={isDisabled ? 'none' : 'auto'}
      zIndex={zIndex}
      isSelected={isSelected}
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      <DragItem {...listeners}/>
      <Flex
        onClick={navigateToEditLesson}
        cursor={isLocked ? 'not-allowed' : 'pointer'}
        flex={1}
        p="10px"
        alignItems="center"
      >
        <MaterialIcon lessonType={lessonType} />
        <MaterialTitle title={material.title}>
          {material.title}
        </MaterialTitle>
      </Flex>
      <Flex p="10px">
        {isLoading
          ? <Loader isCenter={false}/>
          : <Flex alignItems="center" gap="7px">
            <SidebarActions
              _groupHover={{ pointerEvents: 'auto', opacity: 1 }}
              display="flex"
              gap="7px"
              alignItems="center"
            >
              <SectionChanger material={material} sectionId={sectionId}/>
              <DeleteButton onClick={onDeleteConfirm}/>
            </SidebarActions>
            {isLocked && <Hint postType={material.post_type} lessonType={material.lesson_type} />}
          </Flex>
        }
      </Flex>
    </MaterialContainer>
  );
};
