import { Navigate } from 'react-router-dom';

import type { ProtectedPageArgs } from './type';
import { userStore } from '../../store/userStore';
import { ROUTES } from '../../../../constants/routes';

export function Protected(args: ProtectedPageArgs) {
  const isSignedIn = Boolean(userStore.getState().tokens?.access.token);
  const { children } = args;

  if (!isSignedIn) {
    userStore.persist.clearStorage();
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return children;
}
