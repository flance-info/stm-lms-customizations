import { useCallback, useState } from 'react';

export const useFileNameState = (title: string) => {
  const [value, setValue] = useState<string>(title);

  const onChangeHandler = useCallback((value: string) => {
    setValue(value);
  }, []);

  return {
    value,
    onChangeHandler,
  };
};
