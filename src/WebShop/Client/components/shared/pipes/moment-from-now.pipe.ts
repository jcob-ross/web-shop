import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

/**
 * Transforms DateTimeOffset to moment's fromNow format 
 */
@Pipe({ name: 'fromNow', pure: true })
export class MomentFromNowPipe implements PipeTransform {
  transform(value: string): string {
    if (!moment(value).isValid) {
      return 'Invalid date/zone';
    }
    return moment(value).fromNow();
  }
}
