import { Fragment } from "react";

import { isTokenExpired } from "~/common/utils/isTokenExpired";
import { Navigate } from "~/components/react-router-dom/Navigate";

import { useAuthStore } from "~/store/auth";

interface Props {
  children: React.ReactNode;
}
const AuthRoute = ({ children }: Props) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  if (isTokenExpired(accessToken)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthRoute;
