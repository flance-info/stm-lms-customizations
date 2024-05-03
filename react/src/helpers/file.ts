export const formatSizeUnits = (bytes: number) => {
  let size;
  if (bytes >= 1073741824) {
    size = (bytes / 1073741824).toFixed(0) + ' GB';
  } else if (bytes >= 1048576) {
    size = (bytes / 1048576).toFixed(0) + ' MB';
  } else if (bytes >= 1024) {
    size = (bytes / 1024).toFixed(0) + ' KB';
  } else if (bytes > 1) {
    size = bytes.toFixed(0) + ' bytes';
  } else if (bytes == 1) {
    size = bytes.toFixed(0) + ' byte';
  } else {
    size = '0 bytes';
  }
  return size;
};

export const parseSizeUnits = (sizeString: string) => {
  if (!sizeString) {
    return 0;
  }
  const regex = /^(\d+)\s*(bytes?|KB|MB|GB)$/i;
  const matches = sizeString.match(regex);

  if (matches) {
    const value = parseInt(matches[1]);
    const unit = matches[2].toLowerCase();

    if (unit === 'byte' || unit === 'bytes') {
      return value;
    } else if (unit === 'kb') {
      return value * 1024;
    } else if (unit === 'mb') {
      return value * 1048576;
    } else if (unit === 'gb') {
      return value * 1073741824;
    }
  }

  return 0;
};
