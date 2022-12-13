import { Fragment } from 'react';
import { useAuthStore } from '~/store/auth';
import { useUserStore } from '~/store/user';
import { isTokenExpired } from '~/common/utils/isTokenExpired';
import { Navigate } from '~/components/react-router-dom/Navigate';

interface Props {
  children: React.ReactNode;
}
const PrivateRoute = ({ children }: Props) => {
  const accessToken = useAuthStore(s => s.accessToken);
  const user = useUserStore(s => s.user);

  if (!isTokenExpired(accessToken)) {
    return <Navigate to='/login' replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default PrivateRoute;
