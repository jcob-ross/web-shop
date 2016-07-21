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

import { Product, ProductDetail, Category, Tag, Manufacturer } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/catch';

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
  constructor(private http: Http) {
  }

  /**
   * Product
   */

  searchProducts(term: string, maxResults: number): any {
    let params = new URLSearchParams();
    params.set('term', `${term}`);
    params.set('count', `${maxResults}`);
    return this.jsonRequest({
      method: RequestMethod.Get,
      url: `${BASE_URL}/api/product/search`,
      search: params
    }).catch(err => this.handleError(err));
  }

  getProduct(id: number): any {
    return this.jsonRequest({
      method: RequestMethod.Get,
      url: `${BASE_URL}/api/product/${id}`
    }).catch(err => this.handleError(err));
  }

  createProduct(product: Product): any {
    product.productNumber = -1; // otherwise bad request ( form used value 'will be assigned'
    return this.jsonRequest({
      method: RequestMethod.Post,
      url: `${BASE_URL}/api/product`,
      body: product
    }).catch(err => this.handleError(err));
  }

  updateProduct(product: Product): any {
    return this.jsonRequest({
      method: RequestMethod.Put,
      url: `${BASE_URL}/api/product/${product.id}`,
      body: product
    }).catch(err => this.handleError(err));
  }

  deleteProduct(id: number): any {
    return this.jsonRequest({
      method: RequestMethod.Delete,
      url: `${BASE_URL}/api/product/${id}`
    }).catch(err => this.handleError(err));
  }

  addTagToProduct(productId: number, tagId: number): any {
    return this.jsonRequest({
      method: RequestMethod.Put,
      url: `${BASE_URL}/api/product/${productId}/add-tag/${tagId}`
    }).catch(err => this.handleError(err));
  }

  removeTagFromProduct(productId: number, tagId: number): any {
    return this.jsonRequest({
      method: RequestMethod.Delete,
      url: `${BASE_URL}/api/product/${productId}/remove-tag/${tagId}`
    }).catch(err => this.handleError(err));
  }

  /**
   * Product detail
   */

  getProductDetail(productId: number): any {
    return this.jsonRequest({
      method: RequestMethod.Get,
      url: `${BASE_URL}/api/product/${productId}/detail`
    }).catch(err => this.handleError(err));
  }

  createProductDetail(productId: number, model: ProductDetail): any {
    return this.jsonRequest({
      method: RequestMethod.Post,
      url: `${BASE_URL}/api/product/${productId}/detail`,
      body: model
    }).catch(err => this.handleError(err));
  }

  updateProductDetail(productId: number, model: ProductDetail): any {
    return this.jsonRequest({
      method: RequestMethod.Put,
      url: `${BASE_URL}/api/product/${productId}/detail`,
      body: model
    }).catch(err => this.handleError(err));
  }

  deleteProductDetail(productId: number): any {
    return this.jsonRequest({
      method: RequestMethod.Delete,
      url: `${BASE_URL}/api/product/${productId}/detail`,
    }).catch(err => this.handleError(err));
  }

  getMarkdownPreview(model: ProductDetail): any {
    return this.jsonRequest({
      method: RequestMethod.Post,
      url: `${BASE_URL}/api/product-detail/preview-markdown`,
      body: model
    }).catch(err => this.handleError(err));
  }

  /**
   *  Category
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
   *  Tags
   */

  getCategoryTags(categoryId: number) {
    return this.jsonRequest({
      method: RequestMethod.Get,
      url: `${BASE_URL}/api/tag/list/category/${categoryId}`
    }).catch(err => this.handleError(err));
  }

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

    return this.http.request(new Request(options)).catch(this.handleError);
  }

  private handleError(error: any): any {
    // let errorObject: IErrorObject = { error: 'Unknown error occurred', status: error.status };
    // let contentTypeHeader = error.headers.get('Content-Type');
    // if (contentTypeHeader && contentTypeHeader.includes('application/json')) {
    //   errorObject = error.json();
    // }
    // console.log(errorObject);
    console.log(error);
    let errorMessage = (error.message) ? error.message : error.status ?
      `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errorMessage);
  }
}

export interface IErrorObject {
  error: string;
  status: number;
}
