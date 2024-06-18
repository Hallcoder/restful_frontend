import axios from "axios";
import { Form, Formik, ErrorMessage, Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
function Signup() {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });
  const router = useRouter();
  const handleSubmit = (values, setSubmitting) => {
    console.log(values);
    axios
      .post(`${process.env. NEXT_PUBLIC_BACKEND_API_URL}/user/register`, values,{
        headers:{
            "Content-Type":"application/json"
        }
      })
      .then((d) => {
          toast.success("User is registered!");
          router.push("/login");
          console.log(d);
      }).catch(err => {
        toast.error(err.response.data.message);
        console.log(err)
      });
    setSubmitting();
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <main className="w-6/12 flex-col flex items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Sign Up</h2>
        <Formik
          initialValues={{ name:"", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values,setSubmitting);
          }}
        >
          {(formik) => (
            <Form className="w-8/12 mx-auto mt-8">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
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
                  <p>Already have an account?</p>{" "}
                  <Link
                    href="/login"
                    className="cursor-pointer text-blue-600 font-semibold mx-1"
                  >
                    Login
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}
Signup.excludeLayout = true;
export default Signup;
