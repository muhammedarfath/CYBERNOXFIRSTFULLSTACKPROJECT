import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <NextUIProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NextUIProvider>
    </PersistGate>
  </Provider>
);
