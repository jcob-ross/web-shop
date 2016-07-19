export class Tag {
  id: number;
  name: string;
  urlSegment: string;
  showInMainMenu: boolean;
  parentCategoryId: number;
  productCount: number;

  /**
   * Client-side, indicates whether tag was added to working product
   * Used in edit-tags.component
   */
  added: boolean = false;
}