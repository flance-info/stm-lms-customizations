import { FC, memo } from 'react';
import { Button, chakra, Flex } from '@chakra-ui/react';

import { DimmerProps } from './dimmer-interfaces';
import { useConfirm } from '~/common/hooks';
import { useTranslate } from '~/services';

const DimmerContainer = chakra(Flex, {
  baseStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    m: '0px',
    bg: 'rgba(0, 25, 49, 0.5)',
    zIndex: '{10}',
    cursor: 'pointer',
    justify: 'center',
    alignItems: 'center',
    transition: 'all 0.25s linear',
    opacity: 0,
    pointerEvents: 'none',
    '[role=presentation].with-media:hover &': {
      opacity: 1,
      pointerEvents: 'auto'
    }
  }
});

export const Dimmer: FC<DimmerProps> = memo(({ removeImageHandler, ...flexProps }) => {
  const { __ } = useTranslate();
  const onDeleteConfirm = useConfirm(removeImageHandler, __('Are you sure you want to delete this file?'));

  return (
    <DimmerContainer {...flexProps}>
      <Flex flexDirection="column" align="center" w={'100%'}>
        <span className="stmlms-upload-icon" />
        <Button onClick={onDeleteConfirm} bg="dark" color="white">
          {__('Remove')}
        </Button>
      </Flex>
    </DimmerContainer>
  );
});
