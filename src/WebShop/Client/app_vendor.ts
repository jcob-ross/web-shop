import 'ts-helpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/Observable/fromEvent';

import 'jquery';

declare var ENV: any; // webpack DefinePlugin
if ('production' === ENV) {
  // Production

} else {
  // Development
  Error.stackTraceLimit = Infinity;
}
