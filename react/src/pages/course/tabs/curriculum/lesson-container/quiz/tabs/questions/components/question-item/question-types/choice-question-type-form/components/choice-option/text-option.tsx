import { FC } from 'react';
import { OptionProps } from './option-interfaces';
import { OptionHeader } from './option-header';
import { OptionContainer } from './option-container';
import { useSortableItem } from '~/components/drag-drop/DragDropItem';

export const TextOption: FC<OptionProps> = (props) => {
  const { index, removeClickHandler, multiple } = props;
  const { attributes, setNodeRef, style } = useSortableItem();

  return (
    <OptionContainer ref={setNodeRef} style={style} {...attributes} role='answer'>
      <OptionHeader index={index} removeClickHandler={removeClickHandler} multiple={multiple} isText />
    </OptionContainer>
  );
};

TextOption.whyDidYouRender = true;
