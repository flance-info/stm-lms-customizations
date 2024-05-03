import { FC, memo } from 'react';
import { Box } from '@chakra-ui/react';

import { CloseModalButtonProps } from './close-modal-button-interfaces';

export const CloseModalButton: FC<CloseModalButtonProps> = memo(({ onClick, ...restProps }) => {
  return (
    <Box
      className="icon-cancel"
      fontSize="24px"
      position="absolute"
      right="0"
      top="0"
      cursor="pointer"
      onClick={onClick}
      {...restProps}
    >
      <span className="path1" />
      <span className="path2" />
    </Box>
  );
});
