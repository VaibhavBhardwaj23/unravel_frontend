import Head from "next/head";
import { useQuery } from "urql";
import { Product } from "../../commponents/Product";
import { PRODUCT_QUERY } from "../../lib/query";
import { Gallery } from "@/styles/Gallery";

export default function Home() {
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading</p>;

  if (error) console.log("Error");

  const products = data.products.data;

  return (
    <>
      <Head>
        <title>Unravel</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Gallery>
          {products.map((product) => {
            return <Product key={product.attributes.slug} product={product} />;
          })}
        </Gallery>
      </main>
    </>
  );
}
