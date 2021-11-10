import { ProductModel } from '../../models/product.model';

export const generateProducts = (n: number) => {
  const result = [];
  for (let i = 0; i < n; i ++) {
    result.push({
      _id: i + 1,
      name: 'Product',
      image: 'https://skinworld-prod.s3.amazonaws.com/images/case-images/OFFCL_Offwhite_1.png',
      price: Math.random() * 10 + 10
    });
  }

  return result;
};
