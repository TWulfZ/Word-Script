import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Slide, ToastContainer} from 'react-toastify';
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Slide}
      />
    <App />
  </React.StrictMode>,
);
