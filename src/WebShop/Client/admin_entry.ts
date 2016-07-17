import 'ts-helpers';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, Type, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AdminComponent } from './components/admin';

declare var ENV: any; // webpack DefinePlugin
if ('production' === ENV) {
  disableDebugTools();
  enableProdMode();
} else {
}


bootstrap(<Type>AdminComponent, [
  HTTP_PROVIDERS,
]).catch((error: Error) => console.error(`admin-main: ${error}`));
