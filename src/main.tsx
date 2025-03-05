import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as UIProvider } from "./components/ui/provider";

import { store } from "./redux";

import { App } from "./components";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <UIProvider>
        <App />
      </UIProvider>
    </ReduxProvider>
  </BrowserRouter>
);
