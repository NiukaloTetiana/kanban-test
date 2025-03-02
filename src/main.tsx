import ReactDOM from "react-dom/client";

import { Provider } from "./components/ui/provider";

import { App } from "./components";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
);
