import { Fragment } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./router";

export default function Example() {
  return (
    <Fragment>
      <RouterProvider router={router} />;
      <ToastContainer autoClose={2000} limit={5} />
    </Fragment>
  );
}
