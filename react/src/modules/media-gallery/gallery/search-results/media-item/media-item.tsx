import { FC } from 'react';

import { EditMedia } from './edit-media';
import { File } from './file';
import { Hover, MediaContainer } from './media-item-styles';
import { Image } from './image';
import { MediaItemProps } from './media-item-interfaces';
import { Toolbar } from './toolbar';
import { useAddFile, useEditing } from './media-item-hooks';

export const MediaItem: FC<MediaItemProps> = ({ media }) => {
  const { title, url, type, date, size, id } = media;
  const addFile = useAddFile(media);
  const { isEdit, onEdit, onCancel } = useEditing();

  const Media = ['image/png', 'image/jpeg'].includes(type)
    ? <Image src={url} title={title}/>
    : <File title={title} type={type}/>;

  return (
    <MediaContainer
      position="relative"
      role={!isEdit ? 'group' : ''}
      _hover={{
        boxShadow: !isEdit ? '0px 10px 30px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      {isEdit
        ? <EditMedia id={id} onCancel={onCancel} title={title}/>
        : <MediaContainer onClick={addFile}>{Media}</MediaContainer>
      }
      <Hover _groupHover={{ opacity: 1, pointerEvents: 'auto' }}>
        <Toolbar date={date} size={size} id={id} onEdit={onEdit}/>
      </Hover>
    </MediaContainer>
  );
};
