export interface MediaGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFile: (file: MediaGalleryFile) => void;
  fileType?: string;
}

export interface MediaGalleryFile {
  date: string;
  id: number;
  modified: string;
  size: string;
  title: string;
  type: string;
  url: string;
}
