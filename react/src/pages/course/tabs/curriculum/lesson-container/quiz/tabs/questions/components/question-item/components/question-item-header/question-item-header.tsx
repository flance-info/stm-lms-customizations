import { FC, useCallback, useEffect } from 'react';
import { Box, chakra, Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { ActionButton, ActionIcon } from './question-item-header-styles';
import { Container } from '../../question-item-styles';
import { EditableField, SelectField } from '~/components/forms/fields';
import { FieldSuffix } from '~/components/forms/field-suffix';
import { ReactComponent as InfoIcon } from '~/assets/icons/info.svg';
import { ReactComponent as ArrowTriangleIcon } from '~/assets/icons/arrow-triangle.svg';
import { QuestionThumbnailField } from './components/question-thumbnail-field';
import { useGetTypeOptions } from './question-item-hooks';
import { useTranslate } from '~/services';
import { EQuestionType, QuizQuestionModel } from '../../../../questions-interfaces';
import { QuestionsCategoriesField } from '../../../questions-categories-field/questions-categories-field';
import { QuestionHint } from './components/question-hint';
import { useGetFieldValue } from '~/common/hooks';

const QuestionItemHeaderContainer = chakra(Container, {
  baseStyle: {
    position: 'relative',
    zIndex: 10,
  },
});

const TitleContainer = chakra(Flex, {
  baseStyle: {
    position: 'relative',
    '& .chakra-form__error-message': {
      position: 'absolute',
        left: 'calc(100% - 120px)',
        top: '50%',
        transform: 'translateY(-50%)',
        whiteSpace: 'nowrap',
        m: 0,
      },
    },
});

interface QuestionItemHeaderProps {
  expanded: boolean;
  onExpandClick: () => void;
  newFieldIndex: number;
  index: number;
}

export const QuestionItemHeader: FC<QuestionItemHeaderProps> = (props) => {
  const { expanded, onExpandClick, newFieldIndex, index } = props;
  const { __ } = useTranslate();
  const { watch, setValue } = useFormContext();
  const question = watch();
  const typeOptions = useGetTypeOptions();
  const value = useGetFieldValue('question');

  const expandClickHandler = useCallback(() => {
    onExpandClick();
  }, [onExpandClick]);

  useEffect(() => {
    if (!question.id) {
      if ([
        EQuestionType.SINGLE_CHOICE,
        EQuestionType.MULTI_CHOICE,
        EQuestionType.IMAGE_MATCH,
      ].includes(question.type)) {
        setValue('view_type', 'list', { shouldDirty: true });
      }

      if (question.type === EQuestionType.TRUE_FALSE) {
        setValue('answers', [{
          text: __('True'),
          isTrue: 1,
        }, {
          text: __('False'),
          isTrue: 0,
        }], { shouldDirty: true });
      }

      if (question.type === EQuestionType.FILL_THE_GAP) {
        setValue('answers', [{
          text: '',
          isTrue: 0,
        }], { shouldDirty: true });
      }
    }
  }, [question.type]);

  return (
    <QuestionItemHeaderContainer borderBottom={expanded ? '1px solid #DBE0E9' : undefined}>
      <QuestionThumbnailField name={'image'} />
      <Flex direction={'column'}>
        <TitleContainer>
          <EditableField
            name={'question'}
            submitOnBlur={true}
            fontSize={'16px'}
            color={'secondaryHover'}
            placeholder={__('Enter your question')}
            inputProps={{
              minHeight: '0',
              maxHeight: '32px',
              padding: '5px',
            }}
            isPreviewClickable
            startWithEditView={!value && newFieldIndex === index}
          />
        </TitleContainer>
        <Flex
          mt={'3px'}
          alignItems={'flex-start'}
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <FieldSuffix
            icon={InfoIcon}
            hint={<QuestionHint />}
          >
            <Box width={'140px'}>
              <SelectField
                name={'type'}
                options={typeOptions}
                placeholder={__('Question type')}
                withBorder={false}
                variant={'with-suffix'}
                size={'sm'}
                menuPortalTarget={document.body}
              />
            </Box>
          </FieldSuffix>
          <Box
            ml={{
              base: 0,
              lg: '10px',
            }}
            mt={{
              base: '10px',
              lg: 0,
            }}
            minWidth={'240px'}
            maxWidth={'600px'}
          >
            <QuestionsCategoriesField
              name={'categories'}
              placeholder={__('Category')}
              withBorder={false}
              size={'sm'}
            />
          </Box>
        </Flex>
      </Flex>
      {(question as QuizQuestionModel).type &&
        <Box pos={'absolute'} top={'50%'} right={'10px'} transform={'translateY(-50%)'}>
          <ActionButton
            aria-label={__('Expand')}
            variant={'opaque'}
            m={0}
            icon={<ActionIcon
              as={ArrowTriangleIcon}
              boxSize={'8px'}
              transform={expanded ? 'rotate(180deg)' : undefined}
            />}
            onClick={expandClickHandler}
          />
        </Box>}
    </QuestionItemHeaderContainer>
  );
};
