import { FC } from 'react';
import { Button } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from 'pages/course/course-page-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useSidebarContext } from '../../sidebar-context';
import { useToast } from '~/components/toast';

export const NewSectionButton: FC = () => {
  const { sections } = useSidebarContext();
  const sectionsLength = sections?.length || 0;

  const { courseId, invalidate } = useCourse();
  const { setNewSectionId } = useSidebarContext();
  if (!courseId) return null;

  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();

  const { mutate, isLoading } = useMutation(
    () => {
      return api.curriculum.sections.create(courseId, {
        title:  '',
        order: sectionsLength + 1,
      });
    },
    {
      onSuccess: (response) => {
        setNewSectionId(response.section.id);
        toast({ message: __('Section successfully added'), type: TOAST_STATUS.SUCCESS });
        invalidate();
      },
      onError: (err: ServerError) => {
        const errorToastOptions = useErrorToastOptions(err, __('Failed to add section'));
        toast(errorToastOptions);
      },
    },
  );

  const createNewSectionHandler = () => {
    mutate();
  };

  return (
    <Button
      leftIcon={<span className="icon-plus-circle" />}
      onClick={createNewSectionHandler}
      variant="outline"
      w="100%"
      m="0px"
      minHeight="50px"
      isLoading={isLoading}
    >
      {__('New section')}
    </Button>
  );
};
