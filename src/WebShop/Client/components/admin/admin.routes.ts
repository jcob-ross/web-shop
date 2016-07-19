import {
  Router,
  RouterConfig,
  provideRouter,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from  '@angular/core';
import { CategoriesComponent } from './categories';
import { ManufacturersComponent } from './manufacruters';
import { TagsComponent } from './tags';
import { OrdersComponent } from './orders';
import {
  ProductsComponent,
  EditDetailsComponent,
  ProductSearchComponent,
  EditProductComponent,
  EditTagsComponent
} from './products';

import { Observable } from 'rxjs/Observable';
import { ProductEditorState } from './products/shared';

@Injectable()
export class ProductAvailableGuard implements CanActivate {
  constructor(private editorState: ProductEditorState, private router: Router) {
  }

  canActivate(): Observable<boolean> | boolean {
    if (this.editorState.hasProduct && !this.editorState.isNewProduct) {
      return true;
    }
    this.router.navigate(['/products/search']);
    return false;
  }

}

export const routes: RouterConfig = <RouterConfig>[
  { path: 'categories', component: CategoriesComponent },
  { path: 'manufacturers', component: ManufacturersComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'orders', component: OrdersComponent },
  {
    path: 'products', component: ProductsComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: ProductSearchComponent },
      { path: 'edit', component: EditProductComponent },
      { path: 'tags', component: EditTagsComponent, canActivate: [ProductAvailableGuard] },
      { path: 'detail', component: EditDetailsComponent, canActivate: [ProductAvailableGuard] }
    ]
  },

  {path: '', redirectTo: 'products/search', pathMatch: 'full'}
];

export const ADMIN_ROUTER_PROVIDERS = [provideRouter(routes)];