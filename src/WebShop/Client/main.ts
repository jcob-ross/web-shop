import 'ts-helpers';
import './styles/global.scss';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, Type, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ShopMainComponent } from './components';

declare var ENV: any; // webpack DefinePlugin
if ('production' === ENV) {
  disableDebugTools();
  enableProdMode();
} else {
}


bootstrap(<Type>ShopMainComponent, [
  HTTP_PROVIDERS,
]).catch((error: Error) => console.error(`shop-main: ${error}`));
