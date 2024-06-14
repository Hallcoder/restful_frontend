import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
function ResetPassword() {
  const router = useRouter();
  // const params = usePara
  const token = router.query.id;
    const handleSubmit = (values)=>{
        axios
        .put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset-password/${token}`, {newPassword: values.password},{
          headers:{
              "Content-Type":"application/json"
          }
        })
        .then((d) => {
            toast.success("Password Reset!");
            console.log(d);
            router.push("/login");
        }).catch(err => {
          toast.error(err.response.data.message);
          console.log(err)
        });
      }
      const validationSchema = Yup.object({
        password: Yup.string()
          .required("Password is required"),
        cpassword: Yup.string()
          .required("Password is required")
          .test('passwords-match', 'Passwords must match', function(value){
            return this.parent.password === value
          }),
      });
    return ( 
        <div className="flex items-center justify-center min-h-screen flex-col">
        <Toaster />
        <main className="w-6/12 flex-col flex items-center">
          <h2 className="text-2xl font-semibold text-gray-700">Set New Password</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
            }}
          >
            {(formik) => (
              <Form className="w-8/12 mx-auto mt-8">
               <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Field
              name="cpassword"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="cpassword" component="div" className="text-red-600 text-sm mt-1" />
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

export default ResetPassword;