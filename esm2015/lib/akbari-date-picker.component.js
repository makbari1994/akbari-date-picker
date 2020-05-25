import { __decorate } from "tslib";
import { Component, Input, ViewChild, forwardRef, Output, EventEmitter } from '@angular/core';
import * as moment from 'jalali-moment';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
const noop = () => {
};
const ɵ0 = noop;
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
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
export { AkbariDatePickerComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWtiYXJpLWRhdGUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FrYmFyaS1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9ha2JhcmktZGF0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQWlELFVBQVUsRUFBRSxNQUFNLEVBQUMsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBKLE9BQU8sS0FBSyxNQUFNLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7QUFDbEIsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxNQUFNLG1DQUFtQyxHQUFRO0lBQ3RELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFjRixJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQTZCcEM7UUEzQkEsU0FBSSxHQUEyQixJQUFJLEtBQUssRUFBbUIsQ0FBQztRQUM1RCxZQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxjQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRCxhQUFRLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFF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ckMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QiwycEVBQWtEO1FBSWxELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDOztLQUNqRCxDQUFDO0dBQ1cseUJBQXlCLENBeVZyQztTQXpWWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQXBwbGljYXRpb25SZWYsIENoYW5nZURldGVjdG9yUmVmLCBmb3J3YXJkUmVmLCBPdXRwdXQsRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyTW9kZWwgfSBmcm9tICcuL21vZGVsL2RhdGUtcGlja2VyLW1vZGVsJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdqYWxhbGktbW9tZW50JztcblxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBa2JhcmlEYXRlUGlja2VyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cblxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWtiYXJpLWRhdGUtcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FrYmFyaS1kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuL2FrYmFyaS1kYXRlLXBpY2tlci5jb21wb25lbnQuc2NzcycsXG4gIF0sXG4gIHByb3ZpZGVyczogW0NVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBBa2JhcmlEYXRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG5cbiAgZGF5czogQXJyYXk8RGF0ZXBpY2tlck1vZGVsPiA9IG5ldyBBcnJheTxEYXRlcGlja2VyTW9kZWw+KCk7XG4gIHdlZWtEYXkgPSBbJ9uMJywgJ9ivJywgJ9izJywgJ9qGJywgJ9m+JywgJ9isJywgJ9i0J107XG4gIGZhV2Vla0RheSA9IFsn2LQnLCAn24wnLCAn2K8nLCAn2LMnLCAn2oYnLCAn2b4nLCAn2KwnXTtcbiAgZmFNb250aHMgPSBbJ9mB2LHZiNix2K/bjNmGJywgJ9in2LHYr9uM2KjZh9i02KonLCAn2K7Ysdiv2KfYrycsICfYqtuM2LEnLCAn2YXYsdiv2KfYrycsICfYtNmH2LHbjNmI2LEnLCAn2YXZh9ixJywgJ9ii2KjYp9mGJywgJ9ii2LDYsScsICfYr9uMJywgJ9io2YfZhdmGJywgJ9in2LPZgdmG2K8nXTtcbiAgZmFZZWFycyA9IFtdO1xuICBASW5wdXQoKSBkYXRlOiBhbnkgPSBuZXcgRGF0ZSgpO1xuICBmcm9tWWVhcjogbnVtYmVyID0gMTMwMDtcbiAgdG9ZZWFyOiBudW1iZXIgPSAxMzk5O1xuICBASW5wdXQoKSBtaW5EYXRlOiBhbnkgPSBcIjEzMDAvMDEvMDFcIjtcbiAgQElucHV0KCkgbWF4RGF0ZTogYW55ID0gbW9tZW50KG5ldyBEYXRlKCkpLmFkZCgxLCAneWVhcicpO1xuICBAVmlld0NoaWxkKCd5ZWFycycpIHllYXJzX3M6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ21vbnRocycpIG1vbnRoX3M6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2RhdGVwaWNrZXInKSBkYXRlcGlja2VyX3M6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2RhdGVwaWNrZXJJbnB1dCcpIGRhdGVwaWNrZXJJbnB1dF9zOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdkYXRlcGlja2VyUGFyZW50JykgZGF0ZXBpY2tlclBhcmVudF9zOiBFbGVtZW50UmVmO1xuXG4gIFxuICAvLyBzZWxlY3RlZERhdGU6IHN0cmluZztcbiAgc2VsZWN0ZWRNb250aDogc3RyaW5nO1xuICBzZWxlY3RlZE1vbnRoTnVtYmVyOiBudW1iZXI7XG4gIHNlbGVjdGVkWWVhcjogbnVtYmVyO1xuICBzZWxlY3RlZERheTogbnVtYmVyO1xuICBtaW5Nb250aDogbnVtYmVyO1xuICBtaW5EYXk6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgb25DaGFuZ2VEYXRlICA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuXG5cblxuXG4gIH1cblxuICBzZXRfZGF0ZSgpIHtcblxuXG4gICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gbW9tZW50KHRoaXMuZGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdCgnTU1NTScpO1xuICAgIHRoaXMuc2VsZWN0ZWRNb250aE51bWJlciA9IE51bWJlcihtb21lbnQodGhpcy5kYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KCdNTScpKTtcbiAgICB0aGlzLnNlbGVjdGVkWWVhciA9IE51bWJlcihtb21lbnQodGhpcy5kYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KCdZWVlZWScpKTtcblxuXG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMueWVhcnNfcy5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5zZWxlY3RlZFllYXI7XG4gICAgICB0aGlzLm1vbnRoX3MubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuc2VsZWN0ZWRNb250aC50cmltKCk7XG4gICAgfSwgMTApO1xuXG4gIH1cblxuICBzKCkge1xuICAgIGFsZXJ0KHRoaXMuc2VsZWN0ZWRNb250aClcbiAgfVxuXG4gIG1pbk1heERhdGUoKSB7XG4gICAgdGhpcy5mcm9tWWVhciA9IE51bWJlcihtb21lbnQodGhpcy5taW5EYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KCdZWVlZJykpO1xuICAgIHRoaXMudG9ZZWFyID0gTnVtYmVyKG1vbWVudCh0aGlzLm1heERhdGUpLmxvY2FsZSgnZmEnKS5mb3JtYXQoJ1lZWVknKSk7XG4gICAgdGhpcy5taW5EYXkgPSBOdW1iZXIobW9tZW50KHRoaXMubWluRGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdCgnREQnKSk7XG4gICAgdGhpcy5taW5Nb250aCA9IE51bWJlcihtb21lbnQodGhpcy5taW5EYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KCdNTScpKTtcbiAgLy8gIGFsZXJ0KHRoaXMuZnJvbVllYXIpXG5cblxuXG4gIH1cblxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuXG5cbiAgICB0aGlzLm1pbk1heERhdGUoKTtcbiAgICB0aGlzLnNldF9kYXRlKCk7XG4gICAgdGhpcy5nZXREYXRlKCk7XG4gICAgdGhpcy5zZXRZZWFycygpO1xuICAgIHRoaXMuY2xvc2UoKTtcblxuXG5cbiAgfVxuXG5cblxuICBuZXh0TW9udGgoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRZZWFyIDw9IHRoaXMudG9ZZWFyKSB7XG4gICAgICB0aGlzLmRhdGUgPSBtb21lbnQodGhpcy5kYXRlKS5hZGQoMSwgJ21vbnRoJykudG9EYXRlKCk7XG4gICAgICB0aGlzLnNldF9kYXRlKCk7XG4gICAgICB0aGlzLmdldERhdGUoKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkWWVhciA+IHRoaXMudG9ZZWFyKSB7XG4gICAgICAgIHRoaXMucHJldk1vbnRoKCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgfVxuXG4gIHByZXZNb250aCgpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFllYXIgPj0gdGhpcy5mcm9tWWVhcikge1xuICAgICAgdGhpcy5kYXRlID0gbW9tZW50KHRoaXMuZGF0ZSkuc3VidHJhY3QoMSwgJ21vbnRoJykudG9EYXRlKCk7XG4gICAgICB0aGlzLnNldF9kYXRlKCk7XG4gICAgICB0aGlzLmdldERhdGUoKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkWWVhciA8IHRoaXMuZnJvbVllYXIpIHtcbiAgICAgICAgdGhpcy5uZXh0TW9udGgoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2V0WWVhcnMoKSB7XG5cbiAgICAvLyB2YXIgeWVhciA9IG1vbWVudCh0aGlzLmRhdGUpLmxvY2FsZSgnZmEnKS5mb3JtYXQoJ1lZWVknKTtcbiAgICB2YXIgZGlmZiA9IE51bWJlcih0aGlzLnRvWWVhcikgLSBOdW1iZXIodGhpcy5mcm9tWWVhcik7XG5cbiAgICB0aGlzLmZhWWVhcnMgPSBbXTtcblxuICAgIHZhciBuZXdZZWFyID0gXCJcIjtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlmZiArIDE7IGkrKykge1xuXG4gICAgICBuZXdZZWFyID0gU3RyaW5nKHRoaXMuZnJvbVllYXIgKyBpKTtcblxuICAgICAgdGhpcy5mYVllYXJzLnB1c2gobmV3WWVhcik7XG5cbiAgICB9O1xuXG5cbiAgfVxuXG4gIGdlbmVyYXRlKGFkZF9jb3VudCkge1xuXG4gICAgdGhpcy5kYXlzID0gW107XG5cbiAgICBsZXQgY291bnQgPSAzMSArIGFkZF9jb3VudDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXG4gICAgICB2YXIgZGF0YSA9IDxEYXRlcGlja2VyTW9kZWw+e307XG4gICAgICBkYXRhLm1vbnRoID0gKHRoaXMuZmFNb250aHMuaW5kZXhPZih0aGlzLnNlbGVjdGVkTW9udGgpICsgMSlcbiAgICAgIGRhdGEueWVhciA9IHRoaXMuc2VsZWN0ZWRZZWFyO1xuXG4gICAgICBpZiAoaSA8IGFkZF9jb3VudCkge1xuICAgICAgICBkYXRhLmlzRW1wdHkgPSB0cnVlO1xuICAgICAgICBkYXRhLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBkYXRhLmRheSA9IDA7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGF0YS5kYXkgPSAoaSArIDEpIC0gYWRkX2NvdW50O1xuXG4gICAgICAgIGlmIChkYXRhLmRheSA8IHRoaXMubWluRGF5ICYmIGRhdGEubW9udGggPT0gdGhpcy5taW5Nb250aCAmJiBkYXRhLnllYXIgPT0gdGhpcy5mcm9tWWVhcikge1xuICAgICAgICAgIGRhdGEuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGF0YS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuXG5cblxuICAgICAgdGhpcy5kYXlzLnB1c2goZGF0YSk7XG5cbiAgICB9XG4gIC8vICBjb25zb2xlLmxvZyh0aGlzLmRheXMpXG4gIH1cblxuICBnZXREYXRlKCkge1xuXG5cbiAgICB2YXIgbW9udGggPSBtb21lbnQodGhpcy5kYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KFwiTU1cIik7XG4gICAgdmFyIHllYXIgPSBtb21lbnQodGhpcy5kYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KFwiWVlZWVwiKTtcbiAgICB2YXIgZmlyc3RkYXkgPSBcIjAxXCI7XG5cbiAgICB2YXIgbmV3X2RhdGUgPSB5ZWFyICsgJy8nICsgbW9udGggKyAnLycgKyBmaXJzdGRheTtcblxuXG4gICAgdmFyIGRheV9uYW1lID0gbW9tZW50KG5ld19kYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KCdkZCcpO1xuXG4gICAgdmFyIGZhX2RheV9udW1iZXIgPSB0aGlzLmZhV2Vla0RheS5pbmRleE9mKGRheV9uYW1lKTtcblxuICAgIHRoaXMuZ2VuZXJhdGUoZmFfZGF5X251bWJlcik7XG5cbiAgICAvLyBhbGVydChkYXlfbmFtZSk7XG5cblxuXG4gIH1cblxuXG4gIGNoYW5nZU1vbnRoKGV2ZW50KSB7XG4gICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuZGF0ZSA9IHRoaXMuc2VsZWN0ZWRZZWFyICsgJy8nICsgKHRoaXMuZmFNb250aHMuaW5kZXhPZih0aGlzLnNlbGVjdGVkTW9udGgpICsgMSkgKyAnLycgKyB0aGlzLmdldERldGFpbCgpLmRheTtcbiAgICB0aGlzLmdldERhdGUoKTtcbiAgfVxuXG4gIGNoYW5nZVllYXIoZXZlbnQpIHtcbiAgICB0aGlzLnNlbGVjdGVkWWVhciA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLmRhdGUgPSB0aGlzLnNlbGVjdGVkWWVhciArICcvJyArICh0aGlzLmZhTW9udGhzLmluZGV4T2YodGhpcy5zZWxlY3RlZE1vbnRoKSArIDEpICsgJy8nICsgdGhpcy5nZXREZXRhaWwoKS5kYXk7XG4gICAgdGhpcy5nZXREYXRlKCk7XG4gIH1cblxuXG4gIGdldERldGFpbCgpIHtcblxuICAgIHZhciBtb250aCA9IG1vbWVudCh0aGlzLmRhdGUpLmxvY2FsZSgnZmEnKS5mb3JtYXQoXCJNTVwiKTtcbiAgICB2YXIgeWVhciA9IG1vbWVudCh0aGlzLmRhdGUpLmxvY2FsZSgnZmEnKS5mb3JtYXQoXCJZWVlZXCIpO1xuICAgIHZhciBkYXkgPSBtb21lbnQodGhpcy5kYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KFwiRERcIik7XG5cblxuICAgIHJldHVybiB7IG1vbnRoOiBtb250aCwgeWVhcjogeWVhciwgZGF5OiBkYXkgfVxuXG5cblxuICB9XG5cbiAgc2VsZWN0RGF5KGl0ZW06IERhdGVwaWNrZXJNb2RlbCkge1xuICAgIC8vaWYoaXRlbSlcbiAgICBpZiAoaXRlbS5hY3RpdmUgPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZERheSA9IGl0ZW0uZGF5O1xuICAgICAgdGhpcy5kYXRlID0gdGhpcy5mb3JtYXREYXRlKHRoaXMuc2VsZWN0ZWRZZWFyLCAodGhpcy5mYU1vbnRocy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRNb250aCkgKyAxKSwgdGhpcy5zZWxlY3RlZERheSk7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMuZGF0ZTtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlcl9zLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMub25DaGFuZ2VEYXRlLmVtaXQodGhpcy5kYXRlKTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXREYXRlKHllYXIsIG1vbnRoLCBkYXkpIHtcblxuICAgIHJldHVybiB5ZWFyICsgJy8nICsgdGhpcy5hZGRaZXJvKG1vbnRoKSArICcvJyArIHRoaXMuYWRkWmVybyhkYXkpO1xuXG4gIH1cblxuICBhZGRaZXJvKHZhbHVlOiBudW1iZXIpIHtcblxuICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICByZXR1cm4gJzAnICsgdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcblxuICB9XG5cbiAgb3BlbigpIHtcblxuICAgIHRoaXMuZGF0ZXBpY2tlcl9zLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgXG5cbiAgICB2YXIgcmVjdCA9ICB0aGlzLmRhdGVwaWNrZXJQYXJlbnRfcy5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciAgcGFyZW50UmVjdCA9IHRoaXMuZGF0ZXBpY2tlclBhcmVudF9zLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgIHZhciBsZWZ0ID0gTWF0aC5hYnMocmVjdC5sZWZ0KTtcbiAgICB2YXIgcmlnaHQgPSBNYXRoLmFicyhwYXJlbnRSZWN0LmNsaWVudFdpZHRoIC0gcmVjdC5sZWZ0KTtcbiAgICAvL2FsZXJ0KGxlZnQpXG4gICAvLyBhbGVydChyaWdodClcbiAgICBcbiAgICBpZihyaWdodCA8IDMwMCl7XG4gICAgICB0aGlzLmRhdGVwaWNrZXJfcy5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAnYXV0byc7XG4gICAgICB0aGlzLmRhdGVwaWNrZXJfcy5uYXRpdmVFbGVtZW50LnN0eWxlLnJpZ2h0ID0gJzUwcHgnO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgdGhpcy5kYXRlcGlja2VyX3MubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gJy0xMHB4JztcbiAgICAgIHRoaXMuZGF0ZXBpY2tlcl9zLm5hdGl2ZUVsZW1lbnQuc3R5bGUucmlnaHQgPSAnYXV0byc7XG4gICAgfVxuXG5cbiAgfVxuXG4gXG5cblxuICBjbG9zZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcblxuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmRhdGVwaWNrZXJJbnB1dF9zLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSB0aGlzLmRhdGVwaWNrZXJfcy5uYXRpdmVFbGVtZW50O1xuXG4gICAgICBpZiAoIWlucHV0LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgIWRhdGVwaWNrZXIuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICB0aGlzLmRhdGVwaWNrZXJfcy5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG5cblxuICAgIH0pXG4gIH1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4gIC8vLy8vLy8vLy8vLy8gdGhlc2UgYXJlIGZvciBpbXBsZW1ldCBuZ21vZGVsIHRvIG15IGNvbXBvbmVudCBcbiAgLy9UaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuXG4gIC8vUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgLy9ieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICAvL2dldCBhY2Nlc3NvclxuICBnZXQgc2VsZWN0ZWREYXRlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfTtcblxuICAvL3NldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHNlbGVjdGVkRGF0ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vU2V0IHRvdWNoZWQgb24gYmx1clxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgLy9Gcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy9Gcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG5cbiAgLy8vLy8vLy8vLy8vLyB0aGVzZSBhcmUgZm9yIGltcGxlbWV0IG5nbW9kZWwgdG8gbXkgY29tcG9uZW50IFxuXG5cblxuXG59XG4iXX0=