export const PRODUCT_QUERY = `
query{
    products
    {
      data
      {
        attributes
        {
          Title
          Description
          Slug
          Price
          Image
          {
            data
            {
              attributes
              {
                formats
              }
            }
          }
        }
      }
    }
  }`;

export const GET_PRODUCT_QUERY = `
  query getProduct($slug:String!)
  {
    products (filters :{Slug:{eq:$slug}})
    {
      data
      {
        attributes
        {
          Title
          Description
          Slug
          Price
          Image
          {
            data
            {
              attributes
              {
                formats
              }
            }
          }
        }
      }
        
    }
  }
  `;
