import { FC } from 'react';

import { AnswerActions } from '../../../components/answer-actions';
import { chakra, Flex } from '@chakra-ui/react';
import { DropFileLoaderField } from '~/components/forms/fields';
import { ItemMatchColumn, ItemMatchSubtitle } from '../../../question-item-styles';
import { MatchEditableField } from '../../item-match-form/components/match-editable-field';
import { useImageAnswerStyles } from './image-match-answer-hooks';
import { usePrefix } from '~/helpers/form/with-prefix-context';
import { useTranslate } from '~/services';

interface ImageMatchAnswerProps {
  view_type: 'list' | 'grid';
  removeClickHandler: () => void;
}

const ImagePair = chakra(Flex, {
  baseStyle: {
    position: 'relative',
    alignItems: 'stretch',
    mb: '8px',
  },
});

const ImageMatchActions = chakra(Flex, {
  baseStyle: {
    w: '100%',
    mt: '10px',
    gap: '10px',
    alignItems: 'center',
    zIndex: 10,
    minHeight: '30px',
  },
});

export const ImageMatchAnswer: FC<ImageMatchAnswerProps> = (props) => {
  const { removeClickHandler, view_type = 'list' } = props;
  const { __ } = useTranslate();
  const withPrefix = usePrefix();
  const { containerProps, columnProps } = useImageAnswerStyles(view_type);
  const name = withPrefix('question');

  return (
    <ImagePair {...containerProps} role={'answer'}>
      <ItemMatchColumn {...columnProps}>
        <ItemMatchSubtitle>{__('Question')}</ItemMatchSubtitle>
        <DropFileLoaderField
          name={withPrefix('question_image')}
          type={'image'}
        />
        <ImageMatchActions>
          <MatchEditableField
            isPreviewClickable={true}
            submitOnBlur={true}
            name={name}
            placeholder={__('Enter your question')}
          />
        </ImageMatchActions>
      </ItemMatchColumn>
      <ItemMatchColumn {...columnProps}>
        <ItemMatchSubtitle>{__('Answer')}</ItemMatchSubtitle>
        <DropFileLoaderField
          type={'image'}
          name={withPrefix('text_image')}
        />
        <ImageMatchActions>
          <MatchEditableField
            isPreviewClickable={true}
            submitOnBlur={true}
            defaultValue={''}
            name={withPrefix('text')}
            placeholder={__('Enter your answer')}
          />
          <AnswerActions removeClickHandler={removeClickHandler} alwaysVisible />
        </ImageMatchActions>
      </ItemMatchColumn>
    </ImagePair>
  );
};
