import { Tag } from './Tag';
import { Manufacturer } from './Manufacturer';
import { Category } from './Category';

export class Product {
  id: number;
  name: string;
  description: string;
  stockCount: number;
  price: number;
  currentPrice: number;
  productNumber: number;
  imageUrl: string;
  newProduct: boolean;
  promoActive: boolean;

  manufacturerId: number;
  parentCategoryId: number;
  tags: Tag[] = [];
}