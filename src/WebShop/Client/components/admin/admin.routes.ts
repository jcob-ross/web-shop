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
import {
  OrdersComponent,
  OrdersOverviewComponent
 } from './orders';
import {
  ProductsComponent,
  EditDetailsComponent,
  ProductSearchComponent,
  EditProductComponent,
  EditTagsComponent
} from './products';

import { Observable } from 'rxjs/Observable';
import { AdminAppState } from './shared';

@Injectable()
export class ProductAvailableGuard implements CanActivate {
  constructor(private appState: AdminAppState, private router: Router) {
  }

  canActivate(): Observable<boolean> | boolean {
    // product with id < 0 is not yet created
    // todo(backlog): redo this
    if (this.appState.productSelected && this.appState.currentProduct.id >= 0) {
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
  { path: 'orders', component: OrdersComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OrdersOverviewComponent }
    ]
  },
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