// src/pages/_app.js
import Layout from "@/components/Layout";
import "../app/globals.css";
import { Roboto } from "next/font/google";
import { RecoilRoot } from "recoil";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
function MyApp({ Component, pageProps }) {
    const excludeLayout = Component.excludeLayout || false;

return excludeLayout ? 
(
  <Component {...pageProps} />
) : (
  <main className={roboto.className}>
  <Layout>
    <Component {...pageProps} />
  </Layout>
    </main>
)
}

export default MyApp;
