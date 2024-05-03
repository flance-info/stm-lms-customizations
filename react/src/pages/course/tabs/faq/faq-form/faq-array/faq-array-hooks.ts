import { useState } from 'react';

export const useExpanded = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const handleItemClick = (idx: number) => {
    if (expandedItems.includes(idx)) {
      setExpandedItems(expandedItems.filter(item => item !== idx));
    } else {
      setExpandedItems([...expandedItems, idx]);
    }
  };

  return { expandedItems, setExpandedItems, handleItemClick };
};
