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

import { Category, Tag, Manufacturer } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import 'rxjs/add/Observable/throw';

import { Subject } from 'rxjs/Subject';

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

  /**
   *  Category CRUD
   */

  getCategories(includeManufacturers: boolean = false, includeTags: boolean = false): any {
    let queryParams = new URLSearchParams();
    queryParams.set('includeManufacturers', JSON.stringify(includeManufacturers));
    queryParams.set('includeTags', JSON.stringify(includeTags));

    return this.jsonRequest({
      method: RequestMethod.Get,
      url: `${BASE_URL}/api/category/list`,
      search: queryParams
    });
  }

  createCategory(model: Category): any {
    return this.jsonRequest({
      method: RequestMethod.Post,
      url: `${BASE_URL}/api/category`,
      body: model
    });
  }

  updateCategory(model: Category): any {
    return this.jsonRequest({
      method: RequestMethod.Put,
      url: `${BASE_URL}/api/category/${model.id}`,
      body: model
    });
  }

  deleteCategory(id: number): any {
    return this.jsonRequest({
      method: RequestMethod.Delete,
      url: `${BASE_URL}/api/category/${id}`
    });
  }

  /**
   *  Manufacturer CRUD
   */

  createManufacturer(model: Manufacturer): any {
    return this.jsonRequest({
      method: RequestMethod.Post,
      url: `${BASE_URL}/api/manufacturer`,
      body: model
    });
  }

  updateManufacturer(model: Manufacturer): any {
    return this.jsonRequest({
      method: RequestMethod.Put,
      url: `${BASE_URL}/api/manufacturer/${model.id}`,
      body: model
    });
  }

  deleteManufacturer(id: number): any {
    return this.jsonRequest({
      method: RequestMethod.Delete,
      url: `${BASE_URL}/api/manufacturer/${id}`
    });
  }

  /**
   *  Tag CRUD
   */

  createTag(model: Tag): any {
    return this.jsonRequest({
      method: RequestMethod.Post,
      url: `${BASE_URL}/api/tag`,
      body: model
    });
  }

  updateTag(model: Tag): any {
    return this.jsonRequest({
      method: RequestMethod.Put,
      url: `${BASE_URL}/api/tag/${model.id}`,
      body: model
    });
  }

  deleteTag(id: number): any {
    return this.jsonRequest({
      method: RequestMethod.Delete,
      url: `${BASE_URL}/api/tag/${id}`
    });
  }

  private jsonRequest(options: IRequestOptions): any {
    if (options.body && typeof(options.body) !== 'string') {
      options.body = JSON.stringify(options.body);
    }
    if (options.method === RequestMethod.Get) {
      options.headers = new Headers({
        'Accept': 'application/json'
      });
    } else {
      options.headers = new Headers({
        'Content-Type': 'application/json'
      });
    }

    return this.http.request(new Request(options)).catch(err => this.handleError(err));
  }

  private handleError(error: Response): any {
    let errorObject: IErrorObject = { error: 'Unknown error occurred', status: error.status };
    if (error.headers.has('Content-Type') && error.headers.get('Content-Type').includes('application/json')) {
      errorObject = error.json();
    }
    return Observable.throw(errorObject);
  }
}

export interface IErrorObject {
  error: string;
  status: number;
}