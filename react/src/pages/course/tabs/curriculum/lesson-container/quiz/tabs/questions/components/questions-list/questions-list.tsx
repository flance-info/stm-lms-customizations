import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core/dist/types';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useMutation } from 'react-query';

import { getIndexesByFieldId, WithFieldsPrefix } from '~/helpers/form';
import { DragDropItem } from '~/components/drag-drop/DragDropItem';
import { QuestionItem } from '../question-item';
import { ButtonBar } from '../button-bar';
import { generateBankDummy, generateQuestionDummy } from './questions-constants';
import { ETypedQuestions, Question, QuizQuestionModel } from '../../questions-interfaces';
import { CommonFieldProps } from '~/components/forms/common-interfaces';
import { useApi } from '~/services';
import { useGetFieldValue } from '~/common/hooks';

export const QuestionsList: FC<CommonFieldProps> = memo(({ name }) => {
  const api = useApi();
  const { fields, remove, move, insert, append } = useFieldArray<{ questions: Question[] }, 'questions'>({
    name: 'questions',
  });
  const { watch } = useFormContext();
  const quizId = watch('id');
  const [newFieldIndex, setNewFieldIndex] = useState<number>(0);

  const questionIds = (useGetFieldValue('questions') || []).map((question: QuizQuestionModel) => question.id);

  const sensors = useSensors(
    useSensor(PointerSensor),
  );

  const onDragEnd = useCallback((e: DragEndEvent) => {
    const [from, to] = getIndexesByFieldId<string>(fields, [e.active.id as string, e.over?.id as string]);
    move(from, to);
  }, [fields, move]);

  const { mutate: updateQuestions } = useMutation((questionIds: (string | number)[]) => {
    if (!quizId) return Promise.resolve();
    return api.quiz.updateQuestions(quizId, questionIds);
  });

  useEffect(() => {
    updateQuestions(questionIds.filter(Boolean));
  }, [JSON.stringify(questionIds.filter(Boolean))]);

  const onRemoveClick = useCallback((index: number) => async () => {
    remove(index);
  }, [remove]);

  const addQuestionClick = (index: number, isBefore?: boolean) => (type: ETypedQuestions) => {
    const questionDummy = generateQuestionDummy(type);
    if (isBefore) {
      insert(index, questionDummy);
      setNewFieldIndex(index);
    } else {
      append(questionDummy);
      setNewFieldIndex(fields.length);
    }
  };

  const addBankClick = (index: number, isBefore?: boolean) => () => {
    const bankDummy = generateBankDummy();
    if (isBefore) {
      insert(index, bankDummy);
      setNewFieldIndex(index);
    } else {
      append(bankDummy);
      setNewFieldIndex(fields.length);
    }
  };

  return (
    <Flex direction={'column'}>
      <Flex direction={'column'}>
        <DndContext
          id={'questions-list'}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          modifiers={[
            restrictToVerticalAxis,
            restrictToParentElement,
          ]}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((field, index) => (
              <DragDropItem draggableId={field.id} key={`${field.id}-${index}`}>
                <WithFieldsPrefix prefix={`${name}.${index}`} key={`${field.id}-${index}`}>
                  <QuestionItem
                    key={field.id}
                    onRemoveClick={onRemoveClick(index)}
                    onAddQuestionClick={addQuestionClick(index, true)}
                    onAddBankClick={addBankClick(index, true)}
                    quizId={quizId}
                    index={index}
                    newFieldIndex={newFieldIndex}
                  />
                </WithFieldsPrefix>
              </DragDropItem>
            ))}
          </SortableContext>
        </DndContext>
      </Flex>
      <ButtonBar
        onAddQuestionClick={addQuestionClick(fields.length)}
        onAddBankClick={addBankClick(fields.length)}
      />
    </Flex>
  );
});
