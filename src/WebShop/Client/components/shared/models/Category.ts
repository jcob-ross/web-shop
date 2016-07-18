export class Category {
  id: number;
  name: string;
  urlSegment: string;
  imageUrl: string;
  viewDisplayOrder: number;
  manufacturers: Manufacturer[];
  tags: Tag[];
}

export class Tag {
  id: number;
  name: string;
  urlSegment: string;
  showInMainMenu: boolean;
  parentCategoryId: number;
  productCount: number;
}

export class Manufacturer {
  id: number;
  name: string;
  urlSegment: string;
  showInMainMenu: boolean;
  parentCategoryId: number;
  productCount: number;
}