import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react';

import { MediaGalleryFile } from './media-gallery-interfaces';

interface IMediaGalleryContext {
  onAddFile: (file: MediaGalleryFile) => void;
  onClose: () => void;
  files: MediaGalleryFile[];
  setFiles: Dispatch<SetStateAction<MediaGalleryFile[]>>;
}

const MediaGalleryContext = createContext<IMediaGalleryContext>(null!);

interface MediaGalleryContextProviderProps {
  children: ReactNode;
  onAddFile: (file: MediaGalleryFile) => void;
  onClose: () => void;
}

export const MediaGalleryContextProvider: FC<MediaGalleryContextProviderProps> = props => {
  const { children, onAddFile, onClose } = props;

  const [files, setFiles] = useState<MediaGalleryFile[]>([]);

  return (
    <MediaGalleryContext.Provider value={{ files, setFiles, onAddFile, onClose }}>
      {children}
    </MediaGalleryContext.Provider>
  );
};

export const useMediaGalleryContext = () => useContext(MediaGalleryContext);
