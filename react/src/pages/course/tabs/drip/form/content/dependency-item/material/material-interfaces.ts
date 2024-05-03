import { DripItem } from '~/models';

export interface MaterialProps {
  material?: DripItem;
  onRemove: () => void;
  isDragged?: boolean;
}
