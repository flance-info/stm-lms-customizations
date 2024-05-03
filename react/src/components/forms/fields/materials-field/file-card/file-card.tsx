import { FC, memo } from 'react';
import { Flex, IconButton } from '@chakra-ui/react';

import { FileCardProps } from './file-card-interfaces';
import { FileName } from './file-name';
import { formatSizeUnits } from '~/helpers/file';
import { getIconByExtension } from './file-card-utils';
import { TOAST_STATUS } from '~/common/constants';
import { useToast } from '~/components/toast';
import { useTranslate } from '~/services';

import { ReactComponent as CloseIcon } from '~/assets/icons/close-icon.svg';

export const FileCard: FC<FileCardProps> = memo(({ name, file, removeFile }) => {
  const { size, label, id, type, url } = file;
  const extension = type.slice(type.lastIndexOf('/') + 1);
  const icon = getIconByExtension(extension, url);
  const { __ } = useTranslate();
  const toast = useToast();

  const removeFileHandler = () => {
    removeFile();
    toast({ message: __('The file has been removed successfully '), type: TOAST_STATUS.SUCCESS });
  };

  return (
    <Flex
      alignItems="center"
      p="10px"
      bg="white"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.07)"
      borderRadius="4px"
      gap="10px"
    >
      {icon}
      <FileName title={label} id={id} name={name} />
      <Flex alignItems="center" gap="10px" w="fit-content">
        <Flex color="dark70" minWidth="fit-content">
          {typeof size === 'string' ? size : formatSizeUnits(size)}
        </Flex>
        <IconButton
          onClick={removeFileHandler}
          bg="border"
          aria-label="delete"
          borderRadius="50%"
          fontSize="10px"
          color="dark50"
          minWidth="18px"
          h="18px"
          m="0"
          _hover={{ background: 'dark30', color: 'dark70' }}
          icon={<CloseIcon />}
        />
      </Flex>
    </Flex>
  );
});
