import { useQuery } from "urql";
import { useRouter } from "next/router";
import { GET_PRODUCT_QUERY } from "../../../lib/query";
import {
  DetailStyle,
  Quantity,
  Buy,
  ProductInfo,
} from "@/styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useShopContext } from "../../../lib/Context";

export default function ProductDetails() {
  const { qty, increase, decrease, onAdd } = useShopContext();
  const { query } = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading</p>;

  if (error) console.log("Error");

  const { Title, Image, Description, Price } = data.products.data[0].attributes;

  return (
    <DetailStyle>
      <img src={Image.data.attributes.formats.medium.url} alt={Title} />

      <ProductInfo>
        <h3>{Title}</h3>
        <p>{Description}</p>

        <Quantity>
          <span>Quantity</span>
          <button onClick={decrease}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button onClick={increase}>
            <AiFillPlusCircle />{" "}
          </button>
        </Quantity>
        <Buy onClick={() => onAdd(data.products.data[0].attributes, qty)}>
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailStyle>
  );
}
