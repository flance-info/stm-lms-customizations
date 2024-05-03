import { ChangeEvent, FC, KeyboardEvent, useCallback, useState } from 'react';
import { Box, Flex, Input } from '@chakra-ui/react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core/dist/types';

import { useTranslate } from '~/services';
import { getIndexesByFieldId, WithFieldsPrefix } from '~/helpers/form';
import { DragDropItem } from '~/components/drag-drop/DragDropItem';
import { EQuestionType, SingleChoiceAnswer } from '../../../../questions-interfaces';
import { ChoiceGroup } from './components/choice-group';
import { QuestionContentHeading } from '../../components/question-content-heading/question-content-heading';

import { AnswerTypeToggleField } from '../../components/answer-type-toggle-field/answer-type-toggle-field';
import { ImageOption } from './components/choice-option/image-option';
import { TextOption } from './components/choice-option/text-option';
import { AddItemButton } from '../../../add-item-button/add-item-button';
import { QuestionItemFormProps } from '../../question-item-interfaces';
import { EnterButton } from '../../question-item-styles';

import { ReactComponent as ImageIcon } from '~/assets/icons/image.svg';
import { ReactComponent as ListIcon } from '~/assets/icons/list.svg';
import { ChoiceContext } from './choice-question-context';
import { useCustomRemove } from '~/helpers/react-hook-form';

export const ChoiceQuestionTypeForm: FC<QuestionItemFormProps> = (props) => {
  const { type } = props;
  const { __ } = useTranslate();
  const multiple = type === EQuestionType.MULTI_CHOICE;
  const fieldName = 'answers';
  const { fields, append, move, replace } = useFieldArray({
    name: fieldName,
  });
  const remove = useCustomRemove(replace, fieldName);
  const [newAnswer, setNewAnswer] = useState<string>('');
  const answers = useWatch({ name: fieldName }) as SingleChoiceAnswer[];
  const viewType = useWatch({ name: 'view_type' });
  const correctIndices = answers
    .map((answer, index) => (answer.isTrue ? index : -1))
    .filter((correctIndex) => correctIndex >= 0);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(e.currentTarget.value);
  };

  const addNewAnswer = () => {
    if (newAnswer === '' && viewType === 'list') return;

    const answerObject = {
      text: newAnswer,
      isTrue: answers.length === 0,
      question_image: null,
      text_image: null,
    };

    append(answerObject);

    setNewAnswer('');
  };

  const inputPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      addNewAnswer();
    }
  };

  const enterClickHandler = () => {
    addNewAnswer();
  };

  const radioChangeHandler = useCallback(
    (newValue: Array<string | number>) => {
      replace(
        answers.map((answer, index) => ({
          ...answer,
          isTrue: newValue.includes(index.toString()),
        })),
      );
    },
    [answers],
  );

  const sensors = useSensors(useSensor(PointerSensor));
  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      const [from, to] = getIndexesByFieldId<string>(fields, [e.active.id as string, e.over?.id as string]);
      move(from, to);
    },
    [fields],
  );

  const OptionByType = viewType === 'image' ? ImageOption : TextOption;
  const isEvenItems = fields.length % 2 === 0;

  const removeHandler = (index: number) => remove(index);

  return (
    <ChoiceContext.Provider value={{ isGrid: viewType === 'image' }}>
      <Flex direction={'column'}>
        <QuestionContentHeading title={__('Answers')}>
          <AnswerTypeToggleField
            name={'view_type'}
            buttons={[
              { value: 'list', label: __('Text'), icon: ListIcon },
              { value: 'image', label: __('Image'), icon: ImageIcon },
            ]}
          />
        </QuestionContentHeading>
        <ChoiceGroup multiple={multiple} value={correctIndices} onChange={radioChangeHandler}>
          <Flex
            flexDirection={viewType === 'image' ? 'row' : 'column'}
            flexWrap={viewType === 'image' ? 'wrap' : 'nowrap'}
            mr={'-10px'}
          >
            <DndContext
              id={'choice-question-type-forms'}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext items={fields}>
                {fields.map((field, index) => (
                  <DragDropItem draggableId={field.id} key={field.id}>
                    <WithFieldsPrefix prefix={`answers.${index}`}>
                      <OptionByType
                        index={index}
                        removeClickHandler={() => removeHandler(index)}
                        multiple={multiple}
                        key={field.id}
                      />
                    </WithFieldsPrefix>
                  </DragDropItem>
                ))}
              </SortableContext>
            </DndContext>
            {viewType === 'image' && <AddItemButton
              onClick={addNewAnswer}
              w={`calc(${isEvenItems ? 100 : 50}% - 10px)`}
              height={isEvenItems ? '60px' : undefined}
            />}
          </Flex>
        </ChoiceGroup>
        {viewType !== 'image' && (
          <Box pos={'relative'} w={'100%'} mt={'10px'}>
            <Input
              variant="msVariant"
              value={newAnswer}
              onChange={inputChangeHandler}
              onKeyPress={inputPressHandler}
              placeholder={__('Add new answer')}
              pr="52px"
            />
            <EnterButton
              disabled={newAnswer === ''}
              onClick={enterClickHandler}
            >
              {__('Add')}
            </EnterButton>
          </Box>
        )}
      </Flex>
    </ChoiceContext.Provider>
  );
};

ChoiceQuestionTypeForm.whyDidYouRender = true;
