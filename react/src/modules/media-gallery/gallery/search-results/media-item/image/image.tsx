import { FC } from 'react';
import { chakra, Image as Img, Text } from '@chakra-ui/react';
import { Hover, MediaContainer } from '../media-item-styles';
import fallbackImage from '~/assets/images/media-not-found.png';

interface ImageProps {
  src: string;
  title: string;
}

const Title = chakra(Text, {
  baseStyle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'white',
    fontWeight: 'medium',
    fontSize: 'xs',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'inline-block',
    maxHeight: '65px',
    padding: '7px 15px 15px',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%)',
  },
});

export const Image: FC<ImageProps> = ({ src, title }) => (
  <MediaContainer position="relative" flexDirection="column">
    <Img src={src} fallbackSrc={fallbackImage} h="100%" objectFit="cover" borderRadius="inherit"/>
    <Hover _groupHover={{ opacity: 1, pointerEvents: 'auto' }}>
      <Title title={title}>
        {title}
      </Title>
    </Hover>
  </MediaContainer>
);
