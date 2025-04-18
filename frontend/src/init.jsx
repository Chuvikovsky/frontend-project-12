import React, { StrictMode } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import resources from './locales/index.js';
import store from './store/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const rollbarConfig = {
    accessToken:
      '2f2704ebf6cb4eeeb7bbe8cbfbbf6b818c233c36657f734c6306f55c4cc4b315ca87f65cf3d53dff7ce07d9f4b61974c',
    environment: 'testenv',
  };

  return (
    <StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </StrictMode>
  );
};

export default init;
