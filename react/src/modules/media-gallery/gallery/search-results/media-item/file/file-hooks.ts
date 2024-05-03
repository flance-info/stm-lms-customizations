import { ReactComponent as ExcelIcon } from '~/assets/icons/excel-icon.svg';
import { ReactComponent as MsWordIcon } from '~/assets/icons/msword-icon.svg';
import { ReactComponent as MusicIcon } from '~/assets/icons/music-icon.svg';
import { ReactComponent as PdfIcon } from '~/assets/icons/pdf-icon.svg';
import { ReactComponent as PowerPointIcon } from '~/assets/icons/powerpoint-icon.svg';
import { ReactComponent as UnknownFIleIcon } from '~/assets/icons/unknown-file-icon.svg';
import { ReactComponent as VideoIcon } from '~/assets/icons/video-icon.svg';
import { ReactComponent as ZipIcon } from '~/assets/icons/zip-icon.svg';

export const useGetIconByFileType = (type: string) => {
  switch (type) {
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return ExcelIcon;
    case 'audio/mpeg':
      return MusicIcon;
    case 'application/pdf':
      return PdfIcon;
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return PowerPointIcon;
    case 'video/mp4':
    case 'video/mpeg':
      return VideoIcon;
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return MsWordIcon;
    case 'application/zip':
      return ZipIcon;
    default:
      return UnknownFIleIcon;
  }
};
