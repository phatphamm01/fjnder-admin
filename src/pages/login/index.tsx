import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Formik } from "formik";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useLoadingStore } from "~/api-graphql";
import { handleError } from "~/common/utils/handleError";
import { Link } from "~/components/react-router-dom/Link";
import Input from "~/design/Input";
import LoadingIcon from "~/icons/LoadingIcon";
import { LogoIcon } from "~/icons/LogoIcon";
import { PATHS } from "~/router/paths";
import { signIn } from "~/store/auth";

interface IFormData {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const loading =
    useLoadingStore((s) => [s.signInLoading, s.getCurrentUserLoading]).filter(
      (value) => value
    ).length > 0;

  const initialValues: IFormData = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape<{ [K in keyof IFormData]: any }>({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
  });

  const onSubmit = async (values: IFormData) => {
    try {
      const response = await signIn({ input: values });

      if (response) {
        navigate(PATHS.DASHBOARD.SELF);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Fragment>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="mx-auto w-auto">
              <Link to="/user">
                <LogoIcon className="mx-auto text-primary-500" />
              </Link>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-500">
              Sign in to your account
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="  group-hover:text-primary-400 group relative flex gap-2 items-center w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 disabled:cursor-progress disabled:bg-neutral-600 disabled:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 " aria-hidden="true" />
                    </span>
                    {loading && <LoadingIcon height={18} />}
                    Sign in
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};
