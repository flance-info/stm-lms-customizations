import { Icon, Image } from '@chakra-ui/react';

import { ReactComponent as ExcelIcon } from '~/assets/icons/excel-icon.svg';
import { ReactComponent as MsWordIcon } from '~/assets/icons/msword-icon.svg';
import { ReactComponent as MusicIcon } from '~/assets/icons/music-icon.svg';
import { ReactComponent as PdfIcon } from '~/assets/icons/pdf-icon.svg';
import { ReactComponent as PowerPointIcon } from '~/assets/icons/powerpoint-icon.svg';
import { ReactComponent as UnknownFIleIcon } from '~/assets/icons/unknown-file-icon.svg';
import { ReactComponent as VideoIcon } from '~/assets/icons/video-icon.svg';
import { ReactComponent as ZipIcon } from '~/assets/icons/zip-icon.svg';

export const getIconByExtension = (extension: string, url: string) => {
  switch (extension) {
    case 'xls':
    case 'xlsx':
      return <Icon as={ExcelIcon} fontSize="30px"/>;
    case 'jpg':
    case 'jpeg':
    case 'png':
      return <Image src={url} boxSize="30px" objectFit="cover" borderRadius="4px"/>;
    case 'mp3':
      return <Icon as={MusicIcon} fontSize="30px"/>;
    case 'pdf':
      return <Icon as={PdfIcon} fontSize="30px"/>;
    case 'ppt':
    case 'pptx':
      return <Icon as={PowerPointIcon} fontSize="30px"/>;
    case 'mp4':
    case 'mov':
      return <Icon as={VideoIcon} fontSize="30px"/>;
    case 'doc':
    case 'docx':
      return <Icon as={MsWordIcon} fontSize="30px"/>;
    case 'zip':
      return <Icon as={ZipIcon} fontSize="30px"/>;
    default:
      return <Icon as={UnknownFIleIcon} fontSize="30px"/>;
  }
};
