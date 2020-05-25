(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('jalali-moment'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('akbari-date-picker', ['exports', '@angular/core', 'jalali-moment', '@angular/forms', '@angular/common'], factory) :
    (global = global || self, factory(global['akbari-date-picker'] = {}, global.ng.core, global.moment, global.ng.forms, global.ng.common));
}(this, (function (exports, core, moment, forms, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var AkbariDatePickerService = /** @class */ (function () {
        function AkbariDatePickerService() {
        }
        AkbariDatePickerService.ɵprov = core.ɵɵdefineInjectable({ factory: function AkbariDatePickerService_Factory() { return new AkbariDatePickerService(); }, token: AkbariDatePickerService, providedIn: "root" });
        AkbariDatePickerService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], AkbariDatePickerService);
        return AkbariDatePickerService;
    }());

    var noop = function () {
    };
    var ɵ0 = noop;
    var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return AkbariDatePickerComponent; }),
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
            this.onChangeDate = new core.EventEmitter();
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
            core.Input()
        ], AkbariDatePickerComponent.prototype, "date", void 0);
        __decorate([
            core.Input()
        ], AkbariDatePickerComponent.prototype, "minDate", void 0);
        __decorate([
            core.Input()
        ], AkbariDatePickerComponent.prototype, "maxDate", void 0);
        __decorate([
            core.ViewChild('years')
        ], AkbariDatePickerComponent.prototype, "years_s", void 0);
        __decorate([
            core.ViewChild('months')
        ], AkbariDatePickerComponent.prototype, "month_s", void 0);
        __decorate([
            core.ViewChild('datepicker')
        ], AkbariDatePickerComponent.prototype, "datepicker_s", void 0);
        __decorate([
            core.ViewChild('datepickerInput')
        ], AkbariDatePickerComponent.prototype, "datepickerInput_s", void 0);
        __decorate([
            core.ViewChild('datepickerParent')
        ], AkbariDatePickerComponent.prototype, "datepickerParent_s", void 0);
        __decorate([
            core.Output()
        ], AkbariDatePickerComponent.prototype, "onChangeDate", void 0);
        AkbariDatePickerComponent = __decorate([
            core.Component({
                selector: 'akbari-date-picker',
                template: "<div class=\"datepicker-parent\" #datepickerParent>\r\n    <input type=\"text\" #datepickerInput [(ngModel)]=\"selectedDate\" (click)=\"open()\" />\r\n    <div class=\"datepicker\" #datepicker>\r\n        <div class=\"top\">\r\n            <div class=\"first\">\r\n                <div class=\"text\" (click)=\"prevMonth()\">\u0645\u0627\u0647 \u0642\u0628\u0644</div>\r\n            </div>\r\n            <div class=\"second\">\r\n\r\n                <select #months [(ngModel)]=\"selectedMonth\" name=\"selectedMonth\" (change)=\"changeMonth($event)\">\r\n\r\n                    <option *ngFor=\"let item of faMonths;let i=index\" [value]=\"item\" [hidden]=\"selectedYear == fromYear && (i+1) < minMonth\"  >{{item}}</option>\r\n\r\n                </select>\r\n\r\n                <select #years [(ngModel)]=\"selectedYear\" name=\"selectedYear\" (change)=\"changeYear($event)\">\r\n\r\n                    <option *ngFor=\"let item of faYears;let i=index\" [value]=\"item\">{{item}}</option>\r\n\r\n                </select>\r\n\r\n            </div>\r\n            <div class=\"third\">\r\n                <div class=\"text\" (click)=\"nextMonth()\">\u0645\u0627\u0647 \u0628\u0639\u062F</div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"days\">\r\n            <div class=\"top-day\">\r\n                <div class=\"t-item\">\u0634</div>\r\n                <div class=\"t-item\">\u06CC</div>\r\n                <div class=\"t-item\">\u062F</div>\r\n                <div class=\"t-item\">\u0633</div>\r\n                <div class=\"t-item\">\u0686</div>\r\n                <div class=\"t-item\">\u067E</div>\r\n                <div class=\"t-item\">\u062C</div>\r\n\r\n            </div>\r\n            <div class=\"items\">\r\n                <div class=\"item {{(item.day < minDay && item.month == minMonth && item.year == fromYear )?'disable':'visible'}}\" \r\n                 (click)=\"selectDay(item)\" *ngFor=\"let item of days\"\r\n                 [style.borderColor]=\"item.isEmpty ? 'white':'rgb(182, 180, 180)'\">{{!item.isEmpty ? item.day : ''}}\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>",
                providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                styles: [".datepicker-parent{width:300px;position:relative}.datepicker-parent input{border:0;border-bottom:1px solid #000;height:34px;outline:0;text-align:center}.datepicker{width:300px;min-height:250px;box-shadow:0 0 5px rgba(0,0,0,.4);background-color:#fff;direction:rtl;padding-bottom:10px;display:none;position:absolute;top:40px;left:0;z-index:10000}.datepicker .top{width:100%;height:50px;border-bottom:1px solid #eee;display:flex;flex-wrap:wrap;align-items:center;align-content:center;justify-content:flex-start}.datepicker .top .first{width:20%;height:50px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;font-size:14px}.datepicker .top .first .text{min-width:10px;padding-left:5px;padding-right:5px;height:30px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;transition-duration:.4s;cursor:pointer}.datepicker .top .first .text:hover{background-color:#eee}.datepicker .top .second{width:60%;height:50px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center}.datepicker .top .second select{margin-left:5px}.datepicker .top .third{width:20%;height:50px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;font-size:14px}.datepicker .top .third .text{min-width:10px;padding-left:5px;padding-right:5px;height:30px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;transition-duration:.4s;border-radius:2px;cursor:pointer}.datepicker .top .third .text:hover{background-color:#eee}.datepicker .days{width:100%;min-height:200px;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:flex-start;align-content:flex-start}.datepicker .days .top-day{width:100%;height:30px;display:flex;flex-wrap:wrap;align-items:center;align-content:center;justify-content:flex-start}.datepicker .days .top-day .t-item{width:25px;height:25px;margin-right:16px;border-radius:50%;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center}.datepicker .days .items{width:100%;min-height:180px;display:flex;flex-wrap:wrap;align-items:center;align-content:center;justify-content:flex-start}.datepicker .days .items .item{width:25px;height:25px;border:1px solid #b6b4b4;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;align-content:center;border-radius:50%;margin-top:10px;margin-right:14px;font-size:14px;cursor:pointer}.datepicker .days .items .disable{border:1px solid #eee;color:#eee}"]
            })
        ], AkbariDatePickerComponent);
        return AkbariDatePickerComponent;
    }());

    var AkbariDatePickerModule = /** @class */ (function () {
        function AkbariDatePickerModule() {
        }
        AkbariDatePickerModule = __decorate([
            core.NgModule({
                declarations: [AkbariDatePickerComponent],
                imports: [
                    common.CommonModule,
                    forms.FormsModule
                ],
                exports: [AkbariDatePickerComponent]
            })
        ], AkbariDatePickerModule);
        return AkbariDatePickerModule;
    }());

    exports.AkbariDatePickerComponent = AkbariDatePickerComponent;
    exports.AkbariDatePickerModule = AkbariDatePickerModule;
    exports.AkbariDatePickerService = AkbariDatePickerService;
    exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=akbari-date-picker.umd.js.map
