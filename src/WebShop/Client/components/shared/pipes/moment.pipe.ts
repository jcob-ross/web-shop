import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Transforms DateTimeOffset string to user friendly string
 * params:
 *  value: string - DateTimeOffset value - must be valid
 *  type: 'short' | 'long' - Short / long format switch
 */
@Pipe({ name: 'moment', pure: true })
export class MomentPipe implements PipeTransform {
  shortDateFormat: string = 'D/M/YYYY';
  longDateFormat: string = 'D/M/YYYY HH:mm:ss';

  transform(value: string, type: 'short' | 'long' = 'short'): string {
    if (!value) {
      return '-';
    }
    if (!moment(value).isValid) {
      return 'Invalid date/zone';
    }
    switch (type) {
      case 'short':
        return moment(value).format(this.shortDateFormat);
      case 'long':
        return moment(value).format(this.longDateFormat);
      default:
        return moment(value).format(this.shortDateFormat);
    }
  }
}
