import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export const FieldsPrefixContext = createContext<{ getPrefix: () => string }>(undefined!);

interface WithFieldPrefixProps {
  prefix: string;
  children: ReactNode;
}

export const WithFieldsPrefix: FC<WithFieldPrefixProps> = ({ prefix, ...props }) => {
  const [localPrefix, setLocalPrefix] = useState<string>(prefix);
  useEffect(() => {
    setLocalPrefix(prefix);
  }, [prefix]);

  const value = useMemo(() => ({ getPrefix: () => localPrefix }), [localPrefix]);
  return <FieldsPrefixContext.Provider {...props} value={value} />;
};

export const usePrefix = () => {
  const { getPrefix } = useContext(FieldsPrefixContext);
  const prefix = getPrefix();

  return (fieldName?: string) => (!fieldName ? prefix : `${prefix}.${fieldName}`);
};
