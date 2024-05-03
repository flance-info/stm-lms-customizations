export const getMimeType = (extension: string) => {
  switch (extension) {
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'pdf':
      return 'application/pdf';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'ppt':
    case 'pps':
      return 'application/vnd.ms-powerpoint';
    case 'ppsx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.slideshow';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'mp3':
      return 'audio/mpeg';
    case 'wav':
      return 'audio/wav';
    case 'mp4':
      return 'video/mp4';
    case 'avi':
      return 'video/x-msvideo';
    case 'zip':
      return 'application/zip';
    case 'psd':
      return 'image/vnd.adobe.photoshop';
    case 'ogg':
      return 'audio/ogg';
    case 'm4v':
      return 'video/x-m4v';
    case 'mov':
      return 'video/quicktime';
    case 'wmv':
      return 'video/x-ms-wmv';
    case 'mpg':
      return 'video/mpeg';
    default:
      return '';
  }
};
