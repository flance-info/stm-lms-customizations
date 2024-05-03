import { useMemo } from 'react';
import { FlexProps } from '@chakra-ui/layout/dist/flex';

export const useImageAnswerStyles = (direction: 'list' | 'grid') => {
  const containerProps = useMemo<FlexProps>(
    () => ({
      alignItems: 'stretch',
      flexDirection: direction === 'list' ? 'row' : 'column',
      w: '100%',
      ...(direction === 'grid'
        ? {
          w: 'calc(33.333% - 8px)',
          mx: '4px',
        }
        : {}),
    }),
    [direction],
  );

  const columnProps = useMemo<FlexProps>(
    () => ({
      sx: {
        ...(direction === 'grid'
          ? {
            '&:first-of-type': {
              mr: 0,
              mb: '2px',
              borderRadius: '4px 4px 0 0',
              '&::before': {
                content: '""',
                position: 'absolute',
                display: 'block',
                boxSize: '24px',
                bg: 'white',
                borderRadius: '12px',
                borderWidth: '4px',
                borderStyle: 'solid',
                borderColor: 'mainBackground',
                left: '50%',
                top: '100%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                display: 'block',
                boxSize: '24px',
                bg: 'white',
                left: '50%',
                bottom: '-12px',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
              },
            },
            '&:last-of-type': {
              ml: 0,
              mt: '2px',
              borderRadius: '0 0 4px 4px',
            },
          }
          : {}),
      },
    }),
    [direction],
  );

  return {
    containerProps,
    columnProps,
  };
};
