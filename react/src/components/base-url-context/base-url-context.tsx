import { FC, createContext, ReactNode, useContext, useState, useLayoutEffect } from 'react';

const BaseUrlContext = createContext<string>('');

export const BaseUrlContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState<string>('');

  useLayoutEffect(() => {
    const parsedData = window.location.pathname.split('/');
    const URLS = ['edit-course', 'edit-lesson', 'edit-quiz', 'edit-assignment', 'edit-google-meet'];
    const STATIC_URL_INDEX = parsedData.findIndex((segment) => URLS.includes(segment));

    if (STATIC_URL_INDEX !== -1) {
      const url = parsedData.slice(0, STATIC_URL_INDEX).join('/').substring(1);
      setBaseUrl(url);
    }
  }, []);

  return (
    <BaseUrlContext.Provider value={baseUrl}>
      {children}
    </BaseUrlContext.Provider>
  );
};

export const useBaseUrl = () => useContext(BaseUrlContext);
