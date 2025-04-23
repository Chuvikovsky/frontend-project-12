import { StrictMode } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import resources from './locales/index.js';
import store from './store/index.js';
import Sockets from './components/Sockets.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROOLBAR_KEY ?? '',
    environment: 'testenv',
  };

  return (
    <StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <Sockets>
                <App />
              </Sockets>
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </StrictMode>
  );
};

export default init;
