import { FlexProps } from '@chakra-ui/layout/dist/flex';

export interface DimmerProps extends FlexProps {
  removeImageHandler: () => void;
  size: string;
}
