import { chakra, Flex, IconButton } from '@chakra-ui/react';

export const QuestionThumbnailFlex = chakra(Flex, {
  baseStyle: {
    w: '65px',
    h: '65px',
    bg: 'white',
    borderRadius: 'sm',
    color: 'primary',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    '& svg': {
      transition: 'all 0.25s linear',
    },
    '&:hover svg': {
      opacity: 0.5,
    },
  },
});

export const FileInput = chakra('input', {
  baseStyle: {
    pos: 'absolute',
    display: 'block',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    opacity: 0,
    '&::-webkit-file-upload-button': {
      cursor: 'pointer',
    }
  },
});
export const RemoveButton = chakra(IconButton, {
  baseStyle: {
    position: 'absolute',
    top: '0',
    right: '0',
    zIndex: 1,
    boxSize: '16px',
    borderRadius: '50%',
    m: 0,
    padding: 0,
    transform: 'translate(50%, -50%)',
  },
});
