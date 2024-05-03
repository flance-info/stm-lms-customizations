import { FC } from 'react';
import { chakra, Flex, Text } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import { CardProps } from './card-interfaces';
import { DeleteButton } from '~/components/delete-button';
import { Loader } from '~/components/loader';
import { ServerError } from '~/models';
import { TOAST_STATUS } from '~/common/constants';
import { useApi, useTranslate } from '~/services';
import { useCourse } from '../../../../course-page-hooks';
import { useToast } from '~/components/toast';
import { useConfirm, useErrorToastOptions } from '~/common/hooks';

const CardContainer = chakra(Flex, {
  baseStyle: {
    padding: '20px',
    justifyContent: 'space-between',
    background: 'mainBackground',
    alignItems: 'center',
    borderRadius: '4px',
  },
});

export const Card: FC<CardProps> = ({ courseId, url }) => {
  const api = useApi();
  const { __ } = useTranslate();
  const toast = useToast();
  const { invalidate } = useCourse();

  const index = url.lastIndexOf('/');
  const title = url.substring(index + 33);

  const { mutateAsync, isLoading } = useMutation(api.curriculum.scorm.delete, {
    onSuccess: () => {
      toast({ message: __('SCORM successfully deleted'), type: TOAST_STATUS.SUCCESS });
    },
    onError: (error: ServerError) => {
      const errorToastOptions = useErrorToastOptions(error, __('Failed to delete SCORM'));
      toast(errorToastOptions);
    },
  });

  const onDelete = async () => {
    await mutateAsync(courseId);
    await invalidate();
  };

  const onDeleteConfirm = useConfirm(
    () => onDelete(),
    __('Are you sure you want to delete the SCORM ?')
  );

  return (
    <CardContainer>
      <Text>{title}</Text>
      {isLoading
        ? <Loader isCenter={false}/>
        : <DeleteButton onClick={onDeleteConfirm}/>
      }
    </CardContainer>
  );
};
