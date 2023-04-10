import "@/styles/globals.css";
import { createClient, Provider } from "urql";
import Navigation from "../../commponents/Navigation";
import { ShopProvider } from "../../lib/Context";
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
import { UserProvider } from "@auth0/nextjs-auth0";
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ShopProvider>
        <Provider value={client}>
          <Navigation />
          <Component {...pageProps} />
        </Provider>
      </ShopProvider>
    </UserProvider>
  );
}
