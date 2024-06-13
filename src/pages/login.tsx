import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
function Login() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const handleSubmit = (values, setSubmitting) => {
    console.log(values);
    axios
      .post("http://localhost:3000/auth/login", values,{
        headers:{
            "Content-Type":"application/json"
        }
      })
      .then((d) => {
          toast.success("Logged In!");
          console.log(d);
      }).catch(err => {
        toast.error(err.response.data.message);
        console.log(err)
      });
    setSubmitting();
  };
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <Toaster />
      <main className="w-6/12 flex-col flex items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Log In</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {(formik) => (
            <Form className="w-8/12 mx-auto mt-8">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
                <Link
                  href="/forgot-password"
                  className="text-blue-600 m-1 text-sm font-semibold cursor-pointer"
                >
                  Forgot Password?
                </Link>
                <div className="flex flex-row text-sm m-1">
                  <p>Don't have an account?</p>{" "}
                  <Link
                    href="/signup"
                    className="cursor-pointer text-blue-600 font-semibold mx-1"
                  >
                    Register
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Loading..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default Login;
