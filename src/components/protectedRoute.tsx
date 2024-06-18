import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
  const router = useRouter();
  const isLoggedIn = () => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/currentUser`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((d) => {
          console.log(d);
          if (d.status == 403) {
            console.log("Not logged in")
            router.push("/login");
          }else{
            console.log("logged in")
          }
        })
        .catch((err) => {
          console.log(err);
          router.push("/login");
          toast.error(err.message);
        });
    }else{
        router.push("/login");
    }
  };
  useEffect(() => {
    console.log("initialized...");
    isLoggedIn();
  }, []);
  return <div>{children}</div>;
}

export default ProtectedRoute;
