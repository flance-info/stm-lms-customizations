import { FC } from 'react';
import { chakra, Flex } from '@chakra-ui/react';

import { AnswerActions } from '../../../../components/answer-actions';
import { DropFileLoaderField } from '~/components/forms/fields';
import { OptionContainer } from './option-container';
import { OptionHeader } from './option-header';
import { OptionProps } from './option-interfaces';
import { usePrefix } from '~/helpers/form/with-prefix-context';
import { useSortableItem } from '~/components/drag-drop/DragDropItem';

const ImageOptionContainer = chakra(OptionContainer, {
  baseStyle: {
    w: 'calc(50% - 10px)',
    flexDirection: 'column',
    alignItems: 'stretch',
    h: 'auto',
    gap: '10px',
  },
});

export const ImageOption: FC<OptionProps> = (props) => {
  const { index, removeClickHandler, multiple } = props;
  const withPrefix = usePrefix();
  const { attributes, setNodeRef, style } = useSortableItem();

  return (
    <ImageOptionContainer ref={setNodeRef} style={style} {...attributes} role='answer'>
      <OptionHeader
        index={index}
        removeClickHandler={removeClickHandler}
        multiple={multiple}
      />
      <Flex flexDirection="column" gap="10px" width={'100%'}>
        <DropFileLoaderField
          type={'image'}
          name={withPrefix('text_image')}
        />
        <Flex justify="flex-end" alignItems="center">
          <AnswerActions removeClickHandler={removeClickHandler} alwaysVisible/>
        </Flex>
      </Flex>
    </ImageOptionContainer>
  );
};
