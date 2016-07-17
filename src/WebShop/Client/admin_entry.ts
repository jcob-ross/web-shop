import 'ts-helpers';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, Type, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AdminComponent } from './components/admin';
import { ADMIN_ROUTER_PROVIDERS } from './components/admin';
import { ApiService } from './components/shared';

declare var ENV: any; // webpack DefinePlugin
if ('production' === ENV) {
  disableDebugTools();
  enableProdMode();
} else {
}

bootstrap(<Type>AdminComponent, [
  disableDeprecatedForms(),
  provideForms(),

  ...ADMIN_ROUTER_PROVIDERS,
  ...HTTP_PROVIDERS,
  ApiService,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch((error: Error) => console.error(`admin-main: ${error}`));
