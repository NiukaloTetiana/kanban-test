import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as UIProvider } from "./components/ui/provider";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

import { persistor, store } from "./redux";

import { App } from "./components";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UIProvider>
          <App />
        </UIProvider>
      </PersistGate>
    </ReduxProvider>
    <ToastContainer theme="dark" style={{ zIndex: 99999 }} autoClose={2000} />
  </BrowserRouter>
);
