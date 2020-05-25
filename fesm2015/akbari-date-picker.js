import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, forwardRef, EventEmitter, Input, ViewChild, Output, Component, NgModule } from '@angular/core';
import * as moment from 'jalali-moment';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

let AkbariDatePickerService = class AkbariDatePickerService {
    constructor() { }
};
AkbariDatePickerService.ɵprov = ɵɵdefineInjectable({ factory: function AkbariDatePickerService_Factory() { return new AkbariDatePickerService(); }, token: AkbariDatePickerService, providedIn: "root" });
AkbariDatePickerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AkbariDatePickerService);

const noop = () => {
};
const ɵ0 = noop;
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AkbariDatePickerComponent),
    multi: true
};
let AkbariDatePickerComponent = class AkbariDatePickerComponent {
    constructor() {
        this.days = new Array();
        this.weekDay = ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
        this.faWeekDay = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
        this.faMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        this.faYears = [];
        this.date = new Date();
        this.fromYear = 1300;
        this.toYear = 1399;
        this.minDate = "1300/01/01";
        this.maxDate = moment(new Date()).add(1, 'year');
        this.onChangeDate = new EventEmitter();
        ///////////// these are for implemet ngmodel to my component 
        //The internal data model
        this.innerValue = '';
        //Placeholders for the callbacks which are later providesd
        //by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    set_date() {
        this.selectedMonth = moment(this.date).locale('fa').format('MMMM');
        this.selectedMonthNumber = Number(moment(this.date).locale('fa').format('MM'));
        this.selectedYear = Number(moment(this.date).locale('fa').format('YYYYY'));
        setTimeout(() => {
            this.years_s.nativeElement.value = this.selectedYear;
            this.month_s.nativeElement.value = this.selectedMonth.trim();
        }, 10);
    }
    s() {
        alert(this.selectedMonth);
    }
    minMaxDate() {
        this.fromYear = Number(moment(this.minDate).locale('fa').format('YYYY'));
        this.toYear = Number(moment(this.maxDate).locale('fa').format('YYYY'));
        this.minDay = Number(moment(this.minDate).locale('fa').format('DD'));
        this.minMonth = Number(moment(this.minDate).locale('fa').format('MM'));
        //  alert(this.fromYear)
    }
    ngOnInit() {
        this.minMaxDate();
        this.set_date();
        this.getDate();
        this.setYears();
        this.close();
    }
    nextMonth() {
        if (this.selectedYear <= this.toYear) {
            this.date = moment(this.date).add(1, 'month').toDate();
            this.set_date();
            this.getDate();
            if (this.selectedYear > this.toYear) {
                this.prevMonth();
            }
        }
    }
    prevMonth() {
        if (this.selectedYear >= this.fromYear) {
            this.date = moment(this.date).subtract(1, 'month').toDate();
            this.set_date();
            this.getDate();
            if (this.selectedYear < this.fromYear) {
                this.nextMonth();
            }
        }
    }
    setYears() {
        // var year = moment(this.date).locale('fa').format('YYYY');
        var diff = Number(this.toYear) - Number(this.fromYear);
        this.faYears = [];
        var newYear = "";
        for (var i = 0; i < diff + 1; i++) {
            newYear = String(this.fromYear + i);
            this.faYears.push(newYear);
        }
        ;
    }
    generate(add_count) {
        this.days = [];
        let count = 31 + add_count;
        for (let i = 0; i < count; i++) {
            var data = {};
            data.month = (this.faMonths.indexOf(this.selectedMonth) + 1);
            data.year = this.selectedYear;
            if (i < add_count) {
                data.isEmpty = true;
                data.active = false;
                data.day = 0;
            }
            else {
                data.day = (i + 1) - add_count;
                if (data.day < this.minDay && data.month == this.minMonth && data.year == this.fromYear) {
                    data.active = false;
                }
                else {
                    data.active = true;
                }
            }
            this.days.push(data);
        }
        //  console.log(this.days)
    }
    getDate() {
        var month = moment(this.date).locale('fa').format("MM");
        var year = moment(this.date).locale('fa').format("YYYY");
        var firstday = "01";
        var new_date = year + '/' + month + '/' + firstday;
        var day_name = moment(new_date).locale('fa').format('dd');
        var fa_day_number = this.faWeekDay.indexOf(day_name);
        this.generate(fa_day_number);
        // alert(day_name);
    }
    changeMonth(event) {
        this.selectedMonth = event.target.value;
        this.date = this.selectedYear + '/' + (this.faMonths.indexOf(this.selectedMonth) + 1) + '/' + this.getDetail().day;
        this.getDate();
    }
    changeYear(event) {
        this.selectedYear = event.target.value;
        this.date = this.selectedYear + '/' + (this.faMonths.indexOf(this.selectedMonth) + 1) + '/' + this.getDetail().day;
        this.getDate();
    }
    getDetail() {
        var month = moment(this.date).locale('fa').format("MM");
        var year = moment(this.date).locale('fa').format("YYYY");
        var day = moment(this.date).locale('fa').format("DD");
        return { month: month, year: year, day: day };
    }
    selectDay(item) {
        //if(item)
        if (item.active == true) {
            this.selectedDay = item.day;
            this.date = this.formatDate(this.selectedYear, (this.faMonths.indexOf(this.selectedMonth) + 1), this.selectedDay);
            this.selectedDate = this.date;
            this.datepicker_s.nativeElement.style.display = 'none';
            this.onChangeDate.emit(this.date);
        }
    }
    formatDate(year, month, day) {
        return year + '/' + this.addZero(month) + '/' + this.addZero(day);
    }
    addZero(value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    }
    open() {
        this.datepicker_s.nativeElement.style.display = 'block';
        var rect = this.datepickerParent_s.nativeElement.getBoundingClientRect();
        var parentRect = this.datepickerParent_s.nativeElement.offsetParent;
        var left = Math.abs(rect.left);
        var right = Math.abs(parentRect.clientWidth - rect.left);
        //alert(left)
        // alert(right)
        if (right < 300) {
            this.datepicker_s.nativeElement.style.left = 'auto';
            this.datepicker_s.nativeElement.style.right = '50px';
        }
        else {
            this.datepicker_s.nativeElement.style.left = '-10px';
            this.datepicker_s.nativeElement.style.right = 'auto';
        }
    }
    close() {
        window.addEventListener('click', (event) => {
            const input = this.datepickerInput_s.nativeElement;
            const datepicker = this.datepicker_s.nativeElement;
            if (!input.contains(event.target) && !datepicker.contains(event.target)) {
                this.datepicker_s.nativeElement.style.display = 'none';
            }
        });
    }
    //get accessor
    get selectedDate() {
        return this.innerValue;
    }
    ;
    //set accessor including call the onchange callback
    set selectedDate(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }
    //From ControlValueAccessor interface
    writeValue(value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    //From ControlValueAccessor interface
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    //From ControlValueAccessor interface
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
};
__decorate([
    Input()
], AkbariDatePickerComponent.prototype, "date", void 0);
__decorate([
    Input()
], AkbariDatePickerComponent.prototype, "minDate", void 0);
__decorate([
    Input()
], AkbariDatePickerComponent.prototype, "maxDate", void 0);
__decorate([
    ViewChild('years')
], AkbariDatePickerComponent.prototype, "years_s", void 0);
__decorate([
    ViewChild('months')
], AkbariDatePickerComponent.prototype, "month_s", void 0);
__decorate([
    ViewChild('datepicker')
], AkbariDatePickerComponent.prototype, "datepicker_s", void 0);
__decorate([
    ViewChild('datepickerInput')
], AkbariDatePickerComponent.prototype, "datepickerInput_s", void 0);
__decorate([
    ViewChild('datepickerParent')
], AkbariDatePickerComponent.prototype, "datepickerParent_s", void 0);
__decorate([
    Output()
], AkbariDatePickerComponent.prototype, "onChangeDate", void 0);
AkbariDatePickerComponent = __decorate([
    Component({
        selector: 'akbari-date-picker',
        template: "<div class=\"datepicker-parent\" #datepickerParent>\r\n    <input type=\"text\" #datepickerInput [(ngModel)]=\"selectedDate\" (click)=\"open()\" />\r\n    <div class=\"datepicker\" #datepicker>\r\n        <div class=\"top\">\r\n            <div class=\"first\">\r\n                <div class=\"text\" (click)=\"prevMonth()\">\u0645\u0627\u0647 \u0642\u0628\u0644</div>\r\n            </div>\r\n            <div class=\"second\">\r\n\r\n                <select #months [(ngModel)]=\"selectedMonth\" name=\"selectedMonth\" (change)=\"changeMonth($event)\">\r\n\r\n                    <option *ngFor=\"let item of faMonths;let i=index\" [value]=\"item\" [hidden]=\"selectedYear == fromYear && (i+1) < minMonth\"  >{{item}}</option>\r\n\r\n                </select>\r\n\r\n                <select #years [(ngModel)]=\"selectedYear\" name=\"selectedYear\" (change)=\"changeYear($event)\">\r\n\r\n                    <option *ngFor=\"let item of faYears;let i=index\" [value]=\"item\">{{item}}</option>\r\n\r\n                </select>\r\n\r\n            </div>\r\n            <div class=\"third\">\r\n                <div class=\"text\" (click)=\"nextMonth()\">\u0645\u0627\u0647 \u0628\u0639\u062F</div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"days\">\r\n            <div class=\"top-day\">\r\n                <div class=\"t-item\">\u0634</div>\r\n                <div class=\"t-item\">\u06CC</div>\r\n                <div class=\"t-item\">\u062F</div>\r\n                <div class=\"t-item\">\u0633</div>\r\n                <div class=\"t-item\">\u0686</div>\r\n                <div class=\"t-item\">\u067E</div>\r\n                <div class=\"t-item\">\u062C</div>\r\n\r\n            </div>\r\n            <div class=\"items\">\r\n                <div class=\"item {{(item.day < minDay && item.month == minMonth && item.year == fromYear )?'disable':'visible'}}\" \r\n                 (click)=\"selectDay(item)\" *ngFor=\"let item of days\"\r\n                 [style.borderColor]=\"item.isEmpty ? 'white':'rgb(182, 180, 180)'\">{{!item.isEmpty ? item.day : ''}}\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>",
        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        styles: [".datepicker-parent{width:300px;position:relative}.datepicker-parent input{border:0;border-bottom:1px solid #000;height:34px;outline:0;text-align:center}.datepicker{width:300px;min-height:250px;box-shadow:0 0 5px rgba(0,0,0,.4);background-color:#fff;direction:rtl;padding-bottom:10px;display:none;position:absolute;top:40px;left:0;z-index:10000}.datepicker .top{width:100%;height:50px;border-bottom:1px solid #eee;display:flex;flex-wrap:wrap;align-items:center;align-content:center;justify-content:flex-start}.datepicker .top .first{width:20%;height:50px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;font-size:14px}.datepicker .top .first .text{min-width:10px;padding-left:5px;padding-right:5px;height:30px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;transition-duration:.4s;cursor:pointer}.datepicker .top .first .text:hover{background-color:#eee}.datepicker .top .second{width:60%;height:50px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center}.datepicker .top .second select{margin-left:5px}.datepicker .top .third{width:20%;height:50px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;font-size:14px}.datepicker .top .third .text{min-width:10px;padding-left:5px;padding-right:5px;height:30px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;transition-duration:.4s;border-radius:2px;cursor:pointer}.datepicker .top .third .text:hover{background-color:#eee}.datepicker .days{width:100%;min-height:200px;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:flex-start;align-content:flex-start}.datepicker .days .top-day{width:100%;height:30px;display:flex;flex-wrap:wrap;align-items:center;align-content:center;justify-content:flex-start}.datepicker .days .top-day .t-item{width:25px;height:25px;margin-right:16px;border-radius:50%;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center}.datepicker .days .items{width:100%;min-height:180px;display:flex;flex-wrap:wrap;align-items:center;align-content:center;justify-content:flex-start}.datepicker .days .items .item{width:25px;height:25px;border:1px solid #b6b4b4;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;border-radius:50%;margin-top:10px;margin-right:14px;font-size:14px;cursor:pointer}.datepicker .days .items .disable{border:1px solid #eee;color:#eee}"]
    })
], AkbariDatePickerComponent);

let AkbariDatePickerModule = class AkbariDatePickerModule {
};
AkbariDatePickerModule = __decorate([
    NgModule({
        declarations: [AkbariDatePickerComponent],
        imports: [
            CommonModule,
            FormsModule
        ],
        exports: [AkbariDatePickerComponent]
    })
], AkbariDatePickerModule);

/*
 * Public API Surface of akbari-date-picker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AkbariDatePickerComponent, AkbariDatePickerModule, AkbariDatePickerService, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, ɵ0 };
//# sourceMappingURL=akbari-date-picker.js.map
