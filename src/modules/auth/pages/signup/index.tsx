import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
  ActionFunctionArgs,
} from 'react-router-dom';

import { AxiosError } from 'axios';

import { signInPageAction } from '../signin';
import { api } from '../../../shared/utils/API';
import { ROUTES } from '../../../../constants/routes';
import { LoginBanner } from '../../components/LoginBanner';
import { ErrorResponse } from '../../../../types/response';
import { userStore } from '../../../shared/store/userStore';
import { APIEndpoints } from '../../../../constants/endpoints';
import { ReactRouterActionResponse } from '../../../../types/libs';
import { LoginResponse } from '../../../../types/response/auth/login';

export async function signUpPageAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await api.post<LoginResponse>(APIEndpoints.SIGN_UP, {
      name: name,
      email: email,
      password: password,
    });

    if (response.status === 201) {
      userStore.getState().setUser(response.data.user);
      userStore.getState().setTokens(response.data.tokens);
      return redirect(ROUTES.DASHBOARD);
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return { error: axiosError.response?.data.message };
  }

  return null;
}

export function SignUpPage() {
  const navigation = useNavigation();
  const actionData = useActionData() as ReactRouterActionResponse<
    typeof signInPageAction
  >;

  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="mt-0 transition-all duration-200 ease-in-out">
      <section className="min-h-screen">
        <LoginBanner />
        <div className="container">
          <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
            <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
              <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                  <h5>Sign up</h5>
                </div>
                {actionData && actionData.error && (
                  <div className="flex justify-center text-red-500 text-center w-[90%] m-auto">
                    {actionData.error}
                  </div>
                )}
                <div className="flex-auto p-6 pt-0">
                  <Form role="form text-left" method="post">
                    <div className="mb-4">
                      <input
                        name="name"
                        type="text"
                        disabled={isSubmitting}
                        className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        placeholder="Enter your name"
                        aria-label="Name"
                        aria-describedby="name"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        name="email"
                        type="email"
                        disabled={isSubmitting}
                        className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        placeholder="Enter your email"
                        aria-label="Email"
                        aria-describedby="email-addon"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        name="password"
                        type="password"
                        disabled={isSubmitting}
                        className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        placeholder="Enter password"
                        aria-label="Password"
                        autoComplete="new-password"
                        aria-describedby="password-addon"
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="inline-block w-full px-5 py-2.5 mt-6 mb-2 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-xs leading-normal text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25  hover:border-slate-700 hover:bg-emerald-800 bg-black hover:text-white bg-emerald-800"
                      >
                        {isSubmitting && (
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                        Sign up
                      </button>
                    </div>
                    <p className="mt-4 mb-0 leading-normal text-sm">
                      Already have an account?
                      <Link
                        to={ROUTES.SIGN_IN}
                        className="ml-1 font-bold text-slate-700"
                      >
                        Sign In
                      </Link>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
