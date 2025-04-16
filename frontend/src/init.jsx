import React, { StrictMode } from "react";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import App from "./components/App";
import resources from "./locales/index.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";

const init = async () => {
  const rollbarConfig = {
    accessToken:
      "3990eff23c7a47e0afffe9005cb6d298a47a69c6f92f565b92911620505a35e4fe383e8917c6afc0cf699ba51cb34c8c",
    environment: "testenv",
  };

  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StrictMode>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </Provider>
        </StrictMode>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
