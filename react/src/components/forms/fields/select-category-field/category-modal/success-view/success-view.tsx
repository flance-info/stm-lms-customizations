import { FC, useEffect } from 'react';
import { Button, chakra, Flex, Image, ModalBody, Text } from '@chakra-ui/react';

import { SuccessViewProps } from './success-view-interfaces';
import { useTranslate } from '~/services';

import categoryImg from '~/assets/images/category.png';

export const Container = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: '20px',
  },
});

export const ImageWrapper = chakra(Flex, {
  baseStyle: {
    width: '120px',
    minHeight: '120px',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(34, 122, 255, 0.1)',
  },
});

export const SuccessView: FC<SuccessViewProps> = ({ onClear, onClose }) => {

  const { __ } = useTranslate();

  useEffect(() => {
    return () => {
      onClear();
      onClose();
    };
  }, []);

  return (
    <ModalBody>
      <Container>
        <ImageWrapper>
          <Image src={categoryImg} objectFit="cover" boxSize="100px"/>
        </ImageWrapper>
        <Text color="dark" fontSize="20px" fontWeight="medium" maxWidth="212px" textAlign="center">
          {__('Category has been successfully added')}
        </Text>
        <Button variant="primary" m="0px" onClick={onClose}>{__('Close')}</Button>
      </Container>
    </ModalBody>
  );
};
