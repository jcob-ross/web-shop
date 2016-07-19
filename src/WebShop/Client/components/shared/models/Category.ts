import { Tag } from './Tag';
import { Manufacturer } from './Manufacturer';

export class Category {
  id: number;
  name: string;
  urlSegment: string;
  imageUrl: string;
  viewDisplayOrder: number;
  manufacturers: Manufacturer[];
  tags: Tag[];
}