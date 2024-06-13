import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
function ForgotPassword() {
  return (
    <div className="flex flex-col w-full items-center h-screen justify-center">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
       {formik => ( <Form className="w-full flex flex-col items-center  h-screen justify-center">
          <h1 className="font-semibold text-gray-700 text-xl">
            Reset Password
          </h1>
          <div className="mb-4 w-4/12">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              name="email"
              type="email"
              placeholder="Email Address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>
          <button
                type="submit"
                className="w-2/12 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={formik.isSubmitting}
              >
                Initiate Reset
              </button>
        </Form>)}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
