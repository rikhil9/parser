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

  constructor(private appService: AppDataService){
    
  }

  public ngOnInit(){
     this.subscriptions = this.appService.getData().subscribe(nestedData=>{
      this.getObjectValue(nestedData);
    });
   
  }


public getObjectValue(nestedObject: Object) {
  //let dataOfInterest = Object.values(nestedObject);
  let dataOfInterest = Object.keys(nestedObject).map(key => {
    
    this.dataKey.push(key);
    return nestedObject[key];
  });

  dataOfInterest.forEach((individualValue) => {
    if( this.isNumber(individualValue)|| this.isBoolean(individualValue)||this.isString(individualValue) ){
      this.dataVisible.push(individualValue);
    } else {
      this.dataKey.pop();
      this.getObjectValue(individualValue); // Recursion
    }
  })

}

public isNumber(value){
  return typeof value === 'number';
}

public isBoolean(value){
  return typeof value === 'boolean';
}
public isString(value){
  return typeof value === 'string';
}

public ngOnDestroy(){
  this.subscriptions.unsubscribe();
  this.subscriptions = null;
}

}
