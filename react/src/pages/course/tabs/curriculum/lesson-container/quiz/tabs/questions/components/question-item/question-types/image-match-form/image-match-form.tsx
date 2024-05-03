import { FC, useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Flex } from '@chakra-ui/react';
import { WithFieldsPrefix } from '~/helpers/form/with-prefix-context';
import { useTranslate } from '~/services';
import { QuestionContentHeading } from '../../components/question-content-heading/question-content-heading';
import { AddItemButton } from '../../../add-item-button/add-item-button';
import { ImageMatchAnswer } from './components/image-match-answer';
import { AnswerTypeToggleField } from '../../components/answer-type-toggle-field/answer-type-toggle-field';

import { ReactComponent as ColumnsIcon } from '~/assets/icons/columns.svg';
import { ReactComponent as RowsIcon } from '~/assets/icons/rows.svg';
import { FlexProps } from '@chakra-ui/layout/dist/flex';
import { useCustomRemove } from '~/helpers/react-hook-form';

const GRID_COLUMNS = 3;

export const ImageMatchForm: FC = () => {
  const { __ } = useTranslate();
  const { setValue } = useFormContext();
  const fieldName = 'answers';
  const { fields, append, replace } = useFieldArray({
    name: fieldName,
  });
  const remove = useCustomRemove(replace, fieldName);
  const view_type = useWatch({
    name: 'view_type',
  });

  useEffect(() => {
    if (view_type !== 'list' && view_type !== 'grid') {
      setValue('view_type', 'list', { shouldDirty: true });
    }
  });

  const addNewAnswer = () => {
    append({ question: '', text: '' });
  };

  const containerProps = useMemo<FlexProps>(
    () => ({
      flexWrap: 'wrap',
      w: '100%',
    }),
    [view_type],
  );

  const isFullItems = fields.length % GRID_COLUMNS === 0;

  const addNewProps = useMemo<FlexProps>(
    () => ({
      w: '100%',
      minHeight: '20px',
      ...(view_type === 'grid'
        ? {
            w: `calc(${isFullItems ? 100 : 100 / GRID_COLUMNS}% - 8px)`,
            mx: '4px',
          }
        : {}),
    }),
    [view_type, isFullItems],
  );
  return (
    <Flex direction={'column'}>
      <QuestionContentHeading title={__('Questions & Answers')}>
        <AnswerTypeToggleField
          name={'view_type'}
          buttons={[
            { value: 'list', label: __('List'), icon: RowsIcon },
            { value: 'grid', label: __('Grid'), icon: ColumnsIcon },
          ]}
        />
      </QuestionContentHeading>
      <Flex {...containerProps}>
        {fields.map((field, index) => (
          <WithFieldsPrefix prefix={`${fieldName}.${index}`} key={`${field.id}-${index}`}>
            <ImageMatchAnswer view_type={view_type} removeClickHandler={() => remove(index)} />
          </WithFieldsPrefix>
        ))}
        <AddItemButton onClick={addNewAnswer} {...addNewProps} />
      </Flex>
    </Flex>
  );
};
