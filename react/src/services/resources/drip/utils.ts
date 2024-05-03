import { DripContent, DripItem } from '~/models';

export const getPrepareInitialDrip = (drip: DripContent[]) => {
  if (!drip.length) {
    return [{ materials: [] }];
  }

  return drip.map(item => {
    const { parent, childs } = item;
    return { materials: [parent, ...childs] };
  });
};

export const getPreparedDrip = (drip: { materials: DripItem[] }[]) => {
  return drip.map(item => {
    const [parent, ...childs] = item.materials;
    return { parent, childs };
  });
};