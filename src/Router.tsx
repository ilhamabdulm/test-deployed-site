import {
  Route,
  redirect,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { useTheme } from 'flowbite-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ROUTES } from './constants/routes';
import { Protected } from './modules/shared/pages/protected';
import { NotFoundPage } from './modules/shared/pages/notfound';
import { SignUpPage, signUpPageAction } from './modules/auth/pages/signup';
import { DashboardPage, dashboardPageLoader } from './modules/dashboard/pages';

import {
  SignInPage,
  signInPageAction,
  signInPageLoader,
} from './modules/auth/pages/signin';

export function Router() {
  const queryClient = new QueryClient();

  const theme = useTheme().theme;
  theme.sidebar.inner = 'p-5 text-gray-50';
  theme.sidebar.item.active = 'text-gray-500 hover:text-black bg-gray-50';
  theme.sidebar.item.icon.base =
    '!text-gray-50 h-5 w-5 group-hover:!text-stone-900 mr-2';
  theme.sidebar.item.icon.active = '!text-stone-900';
  theme.card.children = 'p-2';
  theme.navbar.base = 'ml-3 bg-transparent';

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index loader={() => redirect(`${ROUTES.SIGN_IN}`)} />
        <Route
          path={ROUTES.SIGN_UP}
          element={<SignUpPage />}
          action={signUpPageAction}
        />
        <Route
          path={ROUTES.SIGN_IN}
          element={<SignInPage />}
          action={signInPageAction}
          loader={signInPageLoader}
        />
        <Route
          path={ROUTES.DASHBOARD}
          loader={dashboardPageLoader}
          element={
            <Protected>
              <DashboardPage />
            </Protected>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </>,
    ),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
