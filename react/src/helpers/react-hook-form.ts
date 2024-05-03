import { UseFieldArrayReplace, useWatch } from 'react-hook-form';

// I don't know why this is necessary, but it is. Without this wrapper remove works incorrectly
export const useCustomRemove = (replace: UseFieldArrayReplace<any, any>, name: string) => {
  const values = useWatch({ name });
  return (index: number): void => {
    replace([...values.slice(0, index), ...values.slice(index + 1)]);
  };
};
