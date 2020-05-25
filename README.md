# AkbariDatePicker

this is a fantastic persion datepicker and jalali datepicker  for angular 9 .

## Demo 

![demo](https://akbar-baba.ir/datepicker.jpg)

## install 

Run `npm i akbari-date-picker`

 
## add Library  to app.module.ts

```
import { AkbariDatePickerModule } from 'akbari-date-picker';/// add this line 
import { FormsModule } from '@angular/forms';/// add this line 

```

and import 

```
imports: [
    BrowserModule,
    FormsModule,/// add this line 
    AkbariDatePickerModule,  /// and  add this line 
    AppRoutingModule,
  ],
```


## full example of  add to app.module.ts

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';/// add this line 
import { AkbariDatePickerModule } from 'akbari-date-picker'; ///add this line 


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,/// add this line 
    AkbariDatePickerModule,  /// and  add this line 
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```


### how to use => you can use angular ngModel to get datepicker value.
```
<akbari-date-picker  [(ngModel)]="date" ></akbari-date-picker>

```



## Inputs 

#### minDate =>  type ="string or Date" 

you can pass type string or date format;

example 

```
<akbari-date-picker [minDate]="'1300/9/8'" ></akbari-date-picker>

or 

<akbari-date-picker minDate="1300/9/8"  ></akbari-date-picker>

or
var date = new Date()

<akbari-date-picker [minDate]="date"  ></akbari-date-picker>


```


#### maxDate =>  type ="string or Date" 

you can pass type string or date format;

example 

```
<akbari-date-picker [maxDate]="'1300/9/8'" ></akbari-date-picker>

or 

<akbari-date-picker maxDate="1300/9/8"  ></akbari-date-picker>

or
var date = new Date()

<akbari-date-picker [maxDate]="date"  ></akbari-date-picker>


```


#### date =>  type ="string or Date"  => default date

you can pass type string or date format;

example 

```
<akbari-date-picker [date]="'1300/9/8'" ></akbari-date-picker>

or 

<akbari-date-picker date="1300/9/8"  ></akbari-date-picker>

or
var date = new Date()

<akbari-date-picker [date]="date"  ></akbari-date-picker>


```

## Output

#### onChangeDate => when user select date this output emit.

in html 

```
<akbari-date-picker (onChangeDate)="onChangeDate($event)" ></akbari-date-picker>

```
in .ts 

```
onChangeDate(event){
    alert(event)
 }
```



## finall

  hope to enjoy it . 
  
