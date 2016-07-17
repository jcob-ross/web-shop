import { RouterConfig, provideRouter } from '@angular/router';

import { CategoriesComponent } from './categories';
import { ManufacturersComponent } from './manufacruters';
import { TagsComponent } from './tags';
import { OrdersComponent } from './orders';
import { ProductsComponent } from './products';


export const routes: RouterConfig = <RouterConfig>[
  {path: 'categories', component: CategoriesComponent},
  {path: 'manufacturers', component: ManufacturersComponent},
  {path: 'tags', component: TagsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'products', component: ProductsComponent},

  {path: '', redirectTo: 'orders', pathMatch: 'full'}
];

export const ADMIN_ROUTER_PROVIDERS = [provideRouter(routes)];