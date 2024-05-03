import React from 'react';
import { ChakraProvider, Flex, ToastProvider } from '@chakra-ui/react';

import { ApiContext, apiProvider, I18nProvider } from '~/services';
import '~/components/app-routes/yup-locales';

import { AppRoutes } from '~/components/app-routes';
import { BaseUrlContextProvider } from '~/components/base-url-context';
import { Fonts } from '~/styles/fonts-styles-config';
import { msPluginTheme } from '~/styles/theme';

import '~/assets/icons/style.css';
import './App.css';

function App() {
  return (
    <ChakraProvider theme={msPluginTheme}>
      <ToastProvider>
        <Fonts />
        <ApiContext.Provider value={apiProvider}>
          <I18nProvider>
            <BaseUrlContextProvider>
              <Flex minHeight="100vh" flexDirection="column">
                <AppRoutes />
              </Flex>
            </BaseUrlContextProvider>
          </I18nProvider>
        </ApiContext.Provider>
      </ToastProvider>
    </ChakraProvider>
  );
}

export default App;
