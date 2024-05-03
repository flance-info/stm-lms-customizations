import { useState } from 'react';

export const useQuestionItemEditable = () => {
  const [isEditing, setIsEditing] = useState(false);

  const enterEditMode = () => {
    setIsEditing(true);
  };

  const exitEditMode = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    enterEditMode,
    exitEditMode,
  };
};
