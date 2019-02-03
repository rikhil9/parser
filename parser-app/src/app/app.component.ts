import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppDataService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'parser-app';
  public dataVisible = [];
  private subscriptions: Subscription;

  constructor(private appService: AppDataService){
    
  }

  public ngOnInit(){
     this.subscriptions = this.appService.getData().subscribe(value=>{
      this.getObjectValue(value);
    });
   
  }


public getObjectValue(obj: Object) {
  let a = Object.values(obj);

  a.forEach((individualValue) => {
    if( typeof individualValue === 'string' || typeof individualValue === 'number' || typeof individualValue === 'boolean'){
      this.dataVisible.push(individualValue);
    } else {
      this.getObjectValue(individualValue); // Recurrsion
    }
  })

}

public ngOnDestroy(){
  this.subscriptions.unsubscribe();
  this.subscriptions = null;
}

}
