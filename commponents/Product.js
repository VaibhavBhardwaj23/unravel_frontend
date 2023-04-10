import { ProductStyle } from "@/styles/ProductStyle";
import Link from "next/link";
export const Product = ({ product }) => {
  const { Title, Price, Image, Slug } = product.attributes;
  return (
    <ProductStyle>
      <Link href={`/products/${Slug}`}>
        <div>
          <img
            src={Image.data.attributes.formats.small.url}
            alt="product_image"
          />
        </div>
        <h2>{Title}</h2>
        <h3>${Price}</h3>
      </Link>
    </ProductStyle>
  );
};
