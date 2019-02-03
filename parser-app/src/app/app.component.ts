import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppDataService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'Parser App';
  public dataVisible = [];
  public dataKey = []; // if interested
  private subscriptions: Subscription;

  constructor(private appService: AppDataService) {

  }
  /**
   * On Init Lifecycle method
   */
  public ngOnInit(): void {
    this.subscriptions = this.appService.getData().subscribe(nestedData => {
      this.getObjectValue(nestedData);
    });

  }

  /**
   * Get the primitive values from the nested object
   */
  public getObjectValue(nestedObject: Object): void {
    //let dataOfInterest = Object.values(nestedObject);
    let dataOfInterest = Object.keys(nestedObject).map(key => {

      this.dataKey.push(key);
      return nestedObject[key];
    });

    dataOfInterest.forEach((individualValue) => {
      if (this.isNumber(individualValue) || this.isBoolean(individualValue) || this.isString(individualValue)) {
        this.dataVisible.push(individualValue);
      } else {
        this.dataKey.pop();
        this.getObjectValue(individualValue); // Recursion
      }
    })

  }
/**
 * Checks if the argument is a number
 * @param value 
 */
  public isNumber(value): boolean {
    return typeof value === 'number';
  }
/**
 * Checks if argument is boolean
 * @param value 
 */
  public isBoolean(value): boolean {
    return typeof value === 'boolean';
  }
  /**
   * Checks if argument is string
   * @param value 
   */
  public isString(value): boolean {
    return typeof value === 'string';
  }
/**
 * Life cycle method on page destroy
 */
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = null;
  }

}
