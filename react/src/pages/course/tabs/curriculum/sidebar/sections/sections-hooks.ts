import { useMutation, useQueryClient } from 'react-query';
import { useApi, useTranslate } from '~/services';
import { Section, ServerError } from '~/models';
import { CurriculumResponse } from '~/services/resources/curriculum/curriculum';
import { moveWithOrder } from '~/helpers/array';
import { useCourse } from 'pages/course/course-page-hooks';
import { useErrorToastOptions } from '~/common/hooks';
import { useToast } from '~/components/toast';

export const useUpdateSection = (courseId: string) => {
  const { __ } = useTranslate();
  const api = useApi();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { queryKey } = useCourse();

  return useMutation(
    (section: Section) => {
      return api.curriculum.sections.update(courseId, section);
    },
    {
      onMutate: async (section: Section) => {
        await queryClient.cancelQueries(queryKey);

        const data = queryClient.getQueryData<CurriculumResponse>(queryKey);
        if (!data) return { previousData: {} };

        const { sections } = data;

        const oldIndex = sections.findIndex((sec) => sec.id === section.id);
        const newIndex = section.order - 1;

        queryClient.setQueryData<CurriculumResponse>(queryKey, {
          ...data,
          sections: moveWithOrder(sections, oldIndex, newIndex),
        });

        return { previousData: data };
      },
      onError: (err: ServerError, newTodo, context) => {
        queryClient.setQueryData('todos', context?.previousData);
        const errorToastOptions = useErrorToastOptions(err, __('Failed to remove section'));
        toast(errorToastOptions);
      }
    },
  );
};
