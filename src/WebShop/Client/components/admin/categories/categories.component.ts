import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'j-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  constructor(private api: ApiService) {
    
  }
  
  ngOnInit() {
    this.sub = this.api.getCategories(/* include manufacturers */true, /* include tags */true)
      .subscribe(res => console.log(res.json()));
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}