import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  Request,
  RequestOptions,
  RequestMethod,
  Response,
  URLSearchParams
} from '@angular/http';

import { Category } from '../models';
import { Observable } from 'rxjs/Observable';

interface IRequestOptions {
  method: RequestMethod;
  body?: any;
  url: string;
  headers?: any;
  search?: any;
}

const BASE_URL: string = 'http://localhost:8080';

@Injectable()
export class ApiService {
  constructor(private http: Http){
  }

  getCategories(includeManufacturers: boolean = false, includeTags: boolean = false)/*: Observable<Category[]>*/ {
    let queryParams = new URLSearchParams();
    queryParams.set('includeManufacturers', JSON.stringify(includeManufacturers));
    queryParams.set('includeTags', JSON.stringify(includeTags));

    return this.jsonRequest({
      method: RequestMethod.Get,
      url: `${BASE_URL}/api/category/list`,
      search: queryParams
    });
  }

  
  getManufacturers(categoryId: number) {
    return this.jsonRequest({
      method: RequestMethod.Get,
      url: `${BASE_URL}/api/manufacturer/list/category/${categoryId}`
    });
  }

  private jsonRequest(options: IRequestOptions) {
    if (options.body && typeof(options.body) !== 'string') {
      options.body = JSON.stringify(options.body);
    }
    options.headers = new Headers({
      'Accept': 'application/json'
    });
    return this.http.request(new Request(options));
  }

  private handleError(error: Response) {
    // todo: api error handling
    console.error(error);
    return error;
  }
}