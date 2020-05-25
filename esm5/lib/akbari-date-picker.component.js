import { __decorate } from "tslib";
import { Component, Input, ViewChild, forwardRef, Output, EventEmitter } from '@angular/core';
import * as moment from 'jalali-moment';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var noop = function () {
};
var ɵ0 = noop;
export var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return AkbariDatePickerComponent; }),
    multi: true
};
var AkbariDatePickerComponent = /** @class */ (function () {
    function AkbariDatePickerComponent() {
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
    AkbariDatePickerComponent.prototype.set_date = function () {
        var _this = this;
        this.selectedMonth = moment(this.date).locale('fa').format('MMMM');
        this.selectedMonthNumber = Number(moment(this.date).locale('fa').format('MM'));
        this.selectedYear = Number(moment(this.date).locale('fa').format('YYYYY'));
        setTimeout(function () {
            _this.years_s.nativeElement.value = _this.selectedYear;
            _this.month_s.nativeElement.value = _this.selectedMonth.trim();
        }, 10);
    };
    AkbariDatePickerComponent.prototype.s = function () {
        alert(this.selectedMonth);
    };
    AkbariDatePickerComponent.prototype.minMaxDate = function () {
        this.fromYear = Number(moment(this.minDate).locale('fa').format('YYYY'));
        this.toYear = Number(moment(this.maxDate).locale('fa').format('YYYY'));
        this.minDay = Number(moment(this.minDate).locale('fa').format('DD'));
        this.minMonth = Number(moment(this.minDate).locale('fa').format('MM'));
        //  alert(this.fromYear)
    };
    AkbariDatePickerComponent.prototype.ngOnInit = function () {
        this.minMaxDate();
        this.set_date();
        this.getDate();
        this.setYears();
        this.close();
    };
    AkbariDatePickerComponent.prototype.nextMonth = function () {
        if (this.selectedYear <= this.toYear) {
            this.date = moment(this.date).add(1, 'month').toDate();
            this.set_date();
            this.getDate();
            if (this.selectedYear > this.toYear) {
                this.prevMonth();
            }
        }
    };
    AkbariDatePickerComponent.prototype.prevMonth = function () {
        if (this.selectedYear >= this.fromYear) {
            this.date = moment(this.date).subtract(1, 'month').toDate();
            this.set_date();
            this.getDate();
            if (this.selectedYear < this.fromYear) {
                this.nextMonth();
            }
        }
    };
    AkbariDatePickerComponent.prototype.setYears = function () {
        // var year = moment(this.date).locale('fa').format('YYYY');
        var diff = Number(this.toYear) - Number(this.fromYear);
        this.faYears = [];
        var newYear = "";
        for (var i = 0; i < diff + 1; i++) {
            newYear = String(this.fromYear + i);
            this.faYears.push(newYear);
        }
        ;
    };
    AkbariDatePickerComponent.prototype.generate = function (add_count) {
        this.days = [];
        var count = 31 + add_count;
        for (var i = 0; i < count; i++) {
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
    };
    AkbariDatePickerComponent.prototype.getDate = function () {
        var month = moment(this.date).locale('fa').format("MM");
        var year = moment(this.date).locale('fa').format("YYYY");
        var firstday = "01";
        var new_date = year + '/' + month + '/' + firstday;
        var day_name = moment(new_date).locale('fa').format('dd');
        var fa_day_number = this.faWeekDay.indexOf(day_name);
        this.generate(fa_day_number);
        // alert(day_name);
    };
    AkbariDatePickerComponent.prototype.changeMonth = function (event) {
        this.selectedMonth = event.target.value;
        this.date = this.selectedYear + '/' + (this.faMonths.indexOf(this.selectedMonth) + 1) + '/' + this.getDetail().day;
        this.getDate();
    };
    AkbariDatePickerComponent.prototype.changeYear = function (event) {
        this.selectedYear = event.target.value;
        this.date = this.selectedYear + '/' + (this.faMonths.indexOf(this.selectedMonth) + 1) + '/' + this.getDetail().day;
        this.getDate();
    };
    AkbariDatePickerComponent.prototype.getDetail = function () {
        var month = moment(this.date).locale('fa').format("MM");
        var year = moment(this.date).locale('fa').format("YYYY");
        var day = moment(this.date).locale('fa').format("DD");
        return { month: month, year: year, day: day };
    };
    AkbariDatePickerComponent.prototype.selectDay = function (item) {
        //if(item)
        if (item.active == true) {
            this.selectedDay = item.day;
            this.date = this.formatDate(this.selectedYear, (this.faMonths.indexOf(this.selectedMonth) + 1), this.selectedDay);
            this.selectedDate = this.date;
            this.datepicker_s.nativeElement.style.display = 'none';
            this.onChangeDate.emit(this.date);
        }
    };
    AkbariDatePickerComponent.prototype.formatDate = function (year, month, day) {
        return year + '/' + this.addZero(month) + '/' + this.addZero(day);
    };
    AkbariDatePickerComponent.prototype.addZero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };
    AkbariDatePickerComponent.prototype.open = function () {
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
    };
    AkbariDatePickerComponent.prototype.close = function () {
        var _this = this;
        window.addEventListener('click', function (event) {
            var input = _this.datepickerInput_s.nativeElement;
            var datepicker = _this.datepicker_s.nativeElement;
            if (!input.contains(event.target) && !datepicker.contains(event.target)) {
                _this.datepicker_s.nativeElement.style.display = 'none';
            }
        });
    };
    Object.defineProperty(AkbariDatePickerComponent.prototype, "selectedDate", {
        //get accessor
        get: function () {
            return this.innerValue;
        },
        //set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    //Set touched on blur
    AkbariDatePickerComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    //From ControlValueAccessor interface
    AkbariDatePickerComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    //From ControlValueAccessor interface
    AkbariDatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    //From ControlValueAccessor interface
    AkbariDatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
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
    return AkbariDatePickerComponent;
}());
export { AkbariDatePickerComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWtiYXJpLWRhdGUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FrYmFyaS1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9ha2JhcmktZGF0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQWlELFVBQVUsRUFBRSxNQUFNLEVBQUMsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBKLE9BQU8sS0FBSyxNQUFNLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxJQUFNLElBQUksR0FBRztBQUNiLENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsSUFBTSxtQ0FBbUMsR0FBUTtJQUN0RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixDQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQWNGO0lBNkJFO1FBM0JBLFNBQUksR0FBMkIsSUFBSSxLQUFLLEVBQW1CLENBQUM7UUFDNUQsWUFBTyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsY0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsYUFBUSxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFP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d0VBQStCO0lBQzdCO1FBQTlCLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQzt5RUFBZ0M7SUFXcEQ7UUFBVCxNQUFNLEVBQUU7bUVBQW9DO0lBM0JsQyx5QkFBeUI7UUFSckMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QiwycEVBQWtEO1lBSWxELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDOztTQUNqRCxDQUFDO09BQ1cseUJBQXlCLENBeVZyQztJQUFELGdDQUFDO0NBQUEsQUF6VkQsSUF5VkM7U0F6VlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEFwcGxpY2F0aW9uUmVmLCBDaGFuZ2VEZXRlY3RvclJlZiwgZm9yd2FyZFJlZiwgT3V0cHV0LEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlck1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXRlLXBpY2tlci1tb2RlbCc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnamFsYWxpLW1vbWVudCc7XG5cbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWtiYXJpRGF0ZVBpY2tlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FrYmFyaS1kYXRlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9ha2JhcmktZGF0ZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAnLi9ha2JhcmktZGF0ZS1waWNrZXIuY29tcG9uZW50LnNjc3MnLFxuICBdLFxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQWtiYXJpRGF0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuXG4gIGRheXM6IEFycmF5PERhdGVwaWNrZXJNb2RlbD4gPSBuZXcgQXJyYXk8RGF0ZXBpY2tlck1vZGVsPigpO1xuICB3ZWVrRGF5ID0gWyfbjCcsICfYrycsICfYsycsICfahicsICfZvicsICfYrCcsICfYtCddO1xuICBmYVdlZWtEYXkgPSBbJ9i0JywgJ9uMJywgJ9ivJywgJ9izJywgJ9qGJywgJ9m+JywgJ9isJ107XG4gIGZhTW9udGhzID0gWyfZgdix2YjYsdiv24zZhicsICfYp9ix2K/bjNio2YfYtNiqJywgJ9iu2LHYr9in2K8nLCAn2KrbjNixJywgJ9mF2LHYr9in2K8nLCAn2LTZh9ix24zZiNixJywgJ9mF2YfYsScsICfYotio2KfZhicsICfYotiw2LEnLCAn2K/bjCcsICfYqNmH2YXZhicsICfYp9iz2YHZhtivJ107XG4gIGZhWWVhcnMgPSBbXTtcbiAgQElucHV0KCkgZGF0ZTogYW55ID0gbmV3IERhdGUoKTtcbiAgZnJvbVllYXI6IG51bWJlciA9IDEzMDA7XG4gIHRvWWVhcjogbnVtYmVyID0gMTM5OTtcbiAgQElucHV0KCkgbWluRGF0ZTogYW55ID0gXCIxMzAwLzAxLzAxXCI7XG4gIEBJbnB1dCgpIG1heERhdGU6IGFueSA9IG1vbWVudChuZXcgRGF0ZSgpKS5hZGQoMSwgJ3llYXInKTtcbiAgQFZpZXdDaGlsZCgneWVhcnMnKSB5ZWFyc19zOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdtb250aHMnKSBtb250aF9zOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdkYXRlcGlja2VyJykgZGF0ZXBpY2tlcl9zOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdkYXRlcGlja2VySW5wdXQnKSBkYXRlcGlja2VySW5wdXRfczogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnZGF0ZXBpY2tlclBhcmVudCcpIGRhdGVwaWNrZXJQYXJlbnRfczogRWxlbWVudFJlZjtcblxuICBcbiAgLy8gc2VsZWN0ZWREYXRlOiBzdHJpbmc7XG4gIHNlbGVjdGVkTW9udGg6IHN0cmluZztcbiAgc2VsZWN0ZWRNb250aE51bWJlcjogbnVtYmVyO1xuICBzZWxlY3RlZFllYXI6IG51bWJlcjtcbiAgc2VsZWN0ZWREYXk6IG51bWJlcjtcbiAgbWluTW9udGg6IG51bWJlcjtcbiAgbWluRGF5OiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIG9uQ2hhbmdlRGF0ZSAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cblxuXG5cblxuICB9XG5cbiAgc2V0X2RhdGUoKSB7XG5cblxuICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IG1vbWVudCh0aGlzLmRhdGUpLmxvY2FsZSgnZmEnKS5mb3JtYXQoJ01NTU0nKTtcbiAgICB0aGlzLnNlbGVjdGVkTW9udGhOdW1iZXIgPSBOdW1iZXIobW9tZW50KHRoaXMuZGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdCgnTU0nKSk7XG4gICAgdGhpcy5zZWxlY3RlZFllYXIgPSBOdW1iZXIobW9tZW50KHRoaXMuZGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdCgnWVlZWVknKSk7XG5cblxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnllYXJzX3MubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuc2VsZWN0ZWRZZWFyO1xuICAgICAgdGhpcy5tb250aF9zLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnNlbGVjdGVkTW9udGgudHJpbSgpO1xuICAgIH0sIDEwKTtcblxuICB9XG5cbiAgcygpIHtcbiAgICBhbGVydCh0aGlzLnNlbGVjdGVkTW9udGgpXG4gIH1cblxuICBtaW5NYXhEYXRlKCkge1xuICAgIHRoaXMuZnJvbVllYXIgPSBOdW1iZXIobW9tZW50KHRoaXMubWluRGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdCgnWVlZWScpKTtcbiAgICB0aGlzLnRvWWVhciA9IE51bWJlcihtb21lbnQodGhpcy5tYXhEYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KCdZWVlZJykpO1xuICAgIHRoaXMubWluRGF5ID0gTnVtYmVyKG1vbWVudCh0aGlzLm1pbkRhdGUpLmxvY2FsZSgnZmEnKS5mb3JtYXQoJ0REJykpO1xuICAgIHRoaXMubWluTW9udGggPSBOdW1iZXIobW9tZW50KHRoaXMubWluRGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdCgnTU0nKSk7XG4gIC8vICBhbGVydCh0aGlzLmZyb21ZZWFyKVxuXG5cblxuICB9XG5cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuXG4gICAgdGhpcy5taW5NYXhEYXRlKCk7XG4gICAgdGhpcy5zZXRfZGF0ZSgpO1xuICAgIHRoaXMuZ2V0RGF0ZSgpO1xuICAgIHRoaXMuc2V0WWVhcnMoKTtcbiAgICB0aGlzLmNsb3NlKCk7XG5cblxuXG4gIH1cblxuXG5cbiAgbmV4dE1vbnRoKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkWWVhciA8PSB0aGlzLnRvWWVhcikge1xuICAgICAgdGhpcy5kYXRlID0gbW9tZW50KHRoaXMuZGF0ZSkuYWRkKDEsICdtb250aCcpLnRvRGF0ZSgpO1xuICAgICAgdGhpcy5zZXRfZGF0ZSgpO1xuICAgICAgdGhpcy5nZXREYXRlKCk7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFllYXIgPiB0aGlzLnRvWWVhcikge1xuICAgICAgICB0aGlzLnByZXZNb250aCgpO1xuICAgICAgfVxuICAgIH1cblxuXG4gIH1cblxuICBwcmV2TW9udGgoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRZZWFyID49IHRoaXMuZnJvbVllYXIpIHtcbiAgICAgIHRoaXMuZGF0ZSA9IG1vbWVudCh0aGlzLmRhdGUpLnN1YnRyYWN0KDEsICdtb250aCcpLnRvRGF0ZSgpO1xuICAgICAgdGhpcy5zZXRfZGF0ZSgpO1xuICAgICAgdGhpcy5nZXREYXRlKCk7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFllYXIgPCB0aGlzLmZyb21ZZWFyKSB7XG4gICAgICAgIHRoaXMubmV4dE1vbnRoKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNldFllYXJzKCkge1xuXG4gICAgLy8gdmFyIHllYXIgPSBtb21lbnQodGhpcy5kYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KCdZWVlZJyk7XG4gICAgdmFyIGRpZmYgPSBOdW1iZXIodGhpcy50b1llYXIpIC0gTnVtYmVyKHRoaXMuZnJvbVllYXIpO1xuXG4gICAgdGhpcy5mYVllYXJzID0gW107XG5cbiAgICB2YXIgbmV3WWVhciA9IFwiXCI7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpZmYgKyAxOyBpKyspIHtcblxuICAgICAgbmV3WWVhciA9IFN0cmluZyh0aGlzLmZyb21ZZWFyICsgaSk7XG5cbiAgICAgIHRoaXMuZmFZZWFycy5wdXNoKG5ld1llYXIpO1xuXG4gICAgfTtcblxuXG4gIH1cblxuICBnZW5lcmF0ZShhZGRfY291bnQpIHtcblxuICAgIHRoaXMuZGF5cyA9IFtdO1xuXG4gICAgbGV0IGNvdW50ID0gMzEgKyBhZGRfY291bnQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblxuICAgICAgdmFyIGRhdGEgPSA8RGF0ZXBpY2tlck1vZGVsPnt9O1xuICAgICAgZGF0YS5tb250aCA9ICh0aGlzLmZhTW9udGhzLmluZGV4T2YodGhpcy5zZWxlY3RlZE1vbnRoKSArIDEpXG4gICAgICBkYXRhLnllYXIgPSB0aGlzLnNlbGVjdGVkWWVhcjtcblxuICAgICAgaWYgKGkgPCBhZGRfY291bnQpIHtcbiAgICAgICAgZGF0YS5pc0VtcHR5ID0gdHJ1ZTtcbiAgICAgICAgZGF0YS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgZGF0YS5kYXkgPSAwO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRhdGEuZGF5ID0gKGkgKyAxKSAtIGFkZF9jb3VudDtcblxuICAgICAgICBpZiAoZGF0YS5kYXkgPCB0aGlzLm1pbkRheSAmJiBkYXRhLm1vbnRoID09IHRoaXMubWluTW9udGggJiYgZGF0YS55ZWFyID09IHRoaXMuZnJvbVllYXIpIHtcbiAgICAgICAgICBkYXRhLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRhdGEuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cblxuXG5cbiAgICAgIHRoaXMuZGF5cy5wdXNoKGRhdGEpO1xuXG4gICAgfVxuICAvLyAgY29uc29sZS5sb2codGhpcy5kYXlzKVxuICB9XG5cbiAgZ2V0RGF0ZSgpIHtcblxuXG4gICAgdmFyIG1vbnRoID0gbW9tZW50KHRoaXMuZGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdChcIk1NXCIpO1xuICAgIHZhciB5ZWFyID0gbW9tZW50KHRoaXMuZGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdChcIllZWVlcIik7XG4gICAgdmFyIGZpcnN0ZGF5ID0gXCIwMVwiO1xuXG4gICAgdmFyIG5ld19kYXRlID0geWVhciArICcvJyArIG1vbnRoICsgJy8nICsgZmlyc3RkYXk7XG5cblxuICAgIHZhciBkYXlfbmFtZSA9IG1vbWVudChuZXdfZGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdCgnZGQnKTtcblxuICAgIHZhciBmYV9kYXlfbnVtYmVyID0gdGhpcy5mYVdlZWtEYXkuaW5kZXhPZihkYXlfbmFtZSk7XG5cbiAgICB0aGlzLmdlbmVyYXRlKGZhX2RheV9udW1iZXIpO1xuXG4gICAgLy8gYWxlcnQoZGF5X25hbWUpO1xuXG5cblxuICB9XG5cblxuICBjaGFuZ2VNb250aChldmVudCkge1xuICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLmRhdGUgPSB0aGlzLnNlbGVjdGVkWWVhciArICcvJyArICh0aGlzLmZhTW9udGhzLmluZGV4T2YodGhpcy5zZWxlY3RlZE1vbnRoKSArIDEpICsgJy8nICsgdGhpcy5nZXREZXRhaWwoKS5kYXk7XG4gICAgdGhpcy5nZXREYXRlKCk7XG4gIH1cblxuICBjaGFuZ2VZZWFyKGV2ZW50KSB7XG4gICAgdGhpcy5zZWxlY3RlZFllYXIgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5kYXRlID0gdGhpcy5zZWxlY3RlZFllYXIgKyAnLycgKyAodGhpcy5mYU1vbnRocy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRNb250aCkgKyAxKSArICcvJyArIHRoaXMuZ2V0RGV0YWlsKCkuZGF5O1xuICAgIHRoaXMuZ2V0RGF0ZSgpO1xuICB9XG5cblxuICBnZXREZXRhaWwoKSB7XG5cbiAgICB2YXIgbW9udGggPSBtb21lbnQodGhpcy5kYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KFwiTU1cIik7XG4gICAgdmFyIHllYXIgPSBtb21lbnQodGhpcy5kYXRlKS5sb2NhbGUoJ2ZhJykuZm9ybWF0KFwiWVlZWVwiKTtcbiAgICB2YXIgZGF5ID0gbW9tZW50KHRoaXMuZGF0ZSkubG9jYWxlKCdmYScpLmZvcm1hdChcIkREXCIpO1xuXG5cbiAgICByZXR1cm4geyBtb250aDogbW9udGgsIHllYXI6IHllYXIsIGRheTogZGF5IH1cblxuXG5cbiAgfVxuXG4gIHNlbGVjdERheShpdGVtOiBEYXRlcGlja2VyTW9kZWwpIHtcbiAgICAvL2lmKGl0ZW0pXG4gICAgaWYgKGl0ZW0uYWN0aXZlID09IHRydWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXkgPSBpdGVtLmRheTtcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZm9ybWF0RGF0ZSh0aGlzLnNlbGVjdGVkWWVhciwgKHRoaXMuZmFNb250aHMuaW5kZXhPZih0aGlzLnNlbGVjdGVkTW9udGgpICsgMSksIHRoaXMuc2VsZWN0ZWREYXkpO1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB0aGlzLmRhdGU7XG4gICAgICB0aGlzLmRhdGVwaWNrZXJfcy5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLm9uQ2hhbmdlRGF0ZS5lbWl0KHRoaXMuZGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0RGF0ZSh5ZWFyLCBtb250aCwgZGF5KSB7XG5cbiAgICByZXR1cm4geWVhciArICcvJyArIHRoaXMuYWRkWmVybyhtb250aCkgKyAnLycgKyB0aGlzLmFkZFplcm8oZGF5KTtcblxuICB9XG5cbiAgYWRkWmVybyh2YWx1ZTogbnVtYmVyKSB7XG5cbiAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgcmV0dXJuICcwJyArIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG5cbiAgfVxuXG4gIG9wZW4oKSB7XG5cbiAgICB0aGlzLmRhdGVwaWNrZXJfcy5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIFxuXG4gICAgdmFyIHJlY3QgPSAgdGhpcy5kYXRlcGlja2VyUGFyZW50X3MubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB2YXIgIHBhcmVudFJlY3QgPSB0aGlzLmRhdGVwaWNrZXJQYXJlbnRfcy5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICB2YXIgbGVmdCA9IE1hdGguYWJzKHJlY3QubGVmdCk7XG4gICAgdmFyIHJpZ2h0ID0gTWF0aC5hYnMocGFyZW50UmVjdC5jbGllbnRXaWR0aCAtIHJlY3QubGVmdCk7XG4gICAgLy9hbGVydChsZWZ0KVxuICAgLy8gYWxlcnQocmlnaHQpXG4gICAgXG4gICAgaWYocmlnaHQgPCAzMDApe1xuICAgICAgdGhpcy5kYXRlcGlja2VyX3MubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gJ2F1dG8nO1xuICAgICAgdGhpcy5kYXRlcGlja2VyX3MubmF0aXZlRWxlbWVudC5zdHlsZS5yaWdodCA9ICc1MHB4JztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlcl9zLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICctMTBweCc7XG4gICAgICB0aGlzLmRhdGVwaWNrZXJfcy5uYXRpdmVFbGVtZW50LnN0eWxlLnJpZ2h0ID0gJ2F1dG8nO1xuICAgIH1cblxuXG4gIH1cblxuIFxuXG5cbiAgY2xvc2UoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG5cbiAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5kYXRlcGlja2VySW5wdXRfcy5uYXRpdmVFbGVtZW50O1xuXG4gICAgICBjb25zdCBkYXRlcGlja2VyID0gdGhpcy5kYXRlcGlja2VyX3MubmF0aXZlRWxlbWVudDtcblxuICAgICAgaWYgKCFpbnB1dC5jb250YWlucyhldmVudC50YXJnZXQpICYmICFkYXRlcGlja2VyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyX3MubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuXG5cbiAgICB9KVxuICB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICAvLy8vLy8vLy8vLy8vIHRoZXNlIGFyZSBmb3IgaW1wbGVtZXQgbmdtb2RlbCB0byBteSBjb21wb25lbnQgXG4gIC8vVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcblxuICAvL1BsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZXNkXG4gIC8vYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgLy9nZXQgYWNjZXNzb3JcbiAgZ2V0IHNlbGVjdGVkRGF0ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH07XG5cbiAgLy9zZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCBzZWxlY3RlZERhdGUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvL1NldCB0b3VjaGVkIG9uIGJsdXJcbiAgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIC8vRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8vRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvL0Zyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuXG4gIC8vLy8vLy8vLy8vLy8gdGhlc2UgYXJlIGZvciBpbXBsZW1ldCBuZ21vZGVsIHRvIG15IGNvbXBvbmVudCBcblxuXG5cblxufVxuIl19