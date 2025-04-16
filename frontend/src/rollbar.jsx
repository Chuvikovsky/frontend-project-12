import React from "react";
import { Provider, ErrorBoundary } from "@rollbar/react"; // Provider imports 'rollbar'

const rollbarConfig = {
  accessToken:
    "2f2704ebf6cb4eeeb7bbe8cbfbbf6b818c233c36657f734c6306f55c4cc4b315ca87f65cf3d53dff7ce07d9f4b61974c",
  environment: "testenv",
};

function TestError() {
  const a = null;
  return a.hello();
}

// Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser
// ErrorBoundary catches all React errors in the tree below and logs them to Rollbar
export default function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
      </ErrorBoundary>
    </Provider>
  );
}
