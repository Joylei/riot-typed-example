(function (riot) {
'use strict';

var DEF_KEY = '_TAG_DEF';
function register(name, props, target) {
    var def = riot.util.misc.extend({}, target[DEF_KEY], props);
    target[DEF_KEY] = def;
    riot.tag(name, def.tmpl || '', def.css, def.attrs, function (opts) {
        var this$1 = this;

        var obj = Object.create(target.prototype);
        var init = obj.init;
        if (typeof init !== 'undefined') {
            // recovery original init property when mixin
            obj.init = function () { return this$1.init = typeof init === 'function' ? init.bind(this$1) : init; };
        }
        this.mixin(obj); //copy properties so the next line would not complain
        target.call(this, opts); //call constructor
    });
}
/**
* decorator on class that extends Tag.
* that defines a riot tag with template and the class.
* see riot.tag()
*/
function tag$1(name, tmpl) {
    return function (target) {
        // target is the constructor function
        if (typeof tmpl === 'object') {
            register(name, tmpl, target);
        }
        else {
            register(name, { tmpl: tmpl }, target);
        }
    };
}
/**
   riot tag
  */
var Tag = function Tag () {};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

var timerCount = 0;
var Timer = (function (Tag$$1) {
    function Timer() {
        var this$1 = this;

        Tag$$1.call(this);
        this.id = ++timerCount;
        this.count = 0;
        this.on('mount', function () {
            console.log(((this$1.id) + " timer mounted"), this$1.opts);
            this$1.count = this$1.opts.initial;
            this$1.timerId = setInterval(function () {
                this$1.count++;
                this$1.update();
                console.log(((this$1.id) + " updating"));
            }, 1000);
        });
        this.on('unmount', function () {
            if (this$1.timerId) {
                clearInterval(this$1.timerId);
                this$1.timerId = null;
            }
            console.log(((this$1.id) + " timer unmounted"), this$1.opts);
        });
    }

    if ( Tag$$1 ) Timer.__proto__ = Tag$$1;
    Timer.prototype = Object.create( Tag$$1 && Tag$$1.prototype );
    Timer.prototype.constructor = Timer;

    return Timer;
}(Tag));
Timer = __decorate([
    tag$1('timer', "\n<p>timer {id} - { count }</p>\n"),
    __metadata("design:paramtypes", [])
], Timer);

var Logger = (function (Tag$$1) {
    function Logger() {
        Tag$$1.call(this);
        this.logs = ['line 1', 'line 2'];
    }

    if ( Tag$$1 ) Logger.__proto__ = Tag$$1;
    Logger.prototype = Object.create( Tag$$1 && Tag$$1.prototype );
    Logger.prototype.constructor = Logger;

    return Logger;
}(Tag));
Logger = __decorate([
    tag$1('logger', { tmpl: '<p class="color" each="{ item in logs }">{ item }</p>', css: '.color{color:gray;}' }),
    __metadata("design:paramtypes", [])
], Logger);

//example of override css
var ErrorLogger = (function (Logger$$1) {
    function ErrorLogger() {
        Logger$$1.call(this);
        this.logs.push('!!!Error!!!');
    }

    if ( Logger$$1 ) ErrorLogger.__proto__ = Logger$$1;
    ErrorLogger.prototype = Object.create( Logger$$1 && Logger$$1.prototype );
    ErrorLogger.prototype.constructor = ErrorLogger;

    return ErrorLogger;
}(Logger));
ErrorLogger = __decorate([
    tag$1('error-logger', { css: 'error-logger .color{color:red;}' }),
    __metadata("design:paramtypes", [])
], ErrorLogger);

var TAG_NAME = 'app';
var App = (function (Tag$$1) {
    function App() {
        var this$1 = this;

        Tag$$1.call(this);
        console.log('in App constructor');
        // this.title = 'Hello RiotJS';
        this.timers = [];
        this.on('mount', function () {
            console.log('app mounted');
            this$1.title = this$1.opts.title;
            this$1.refill();
            this$1.update();
            this$1.timerId = setInterval(this$1.refill, 3000);
        });
        this.on('unmount', function () {
            if (this$1.timerId) {
                clearInterval(this$1.timerId);
                this$1.timerId = null;
            }
        });
        this.init();
    }

    if ( Tag$$1 ) App.__proto__ = Tag$$1;
    App.prototype = Object.create( Tag$$1 && Tag$$1.prototype );
    App.prototype.constructor = App;
    App.prototype.init = function init () {
        console.log('in init');
    };
    App.prototype.refill = function refill () {
        var this$1 = this;

        if (this.timers.length === 0) {
            for (var i = 0; i < 10; i++) {
                this$1.timers.push({
                    initial: i * 15
                });
            }
        }
        else {
            this.timers.pop();
            this.update();
        }
    };
    App.mount = function mount$$1 (opts) {
        riot.mount(TAG_NAME, opts);
    };

    return App;
}(Tag));
App = __decorate([
    tag$1(TAG_NAME, "\n<h1>{title}</h1>\n<p><b>Total timers:</b> {timers.length}</p>\n<timer each=\"{ item in timers }\" initial=\"{item.initial}\"></timer>\n<logger></logger>\n<error-logger></error-logger>\n"),
    __metadata("design:paramtypes", [])
], App);

App.mount({ title: 'Hello riot-typed' });
console.log('==ready==');

}(riot));
//# sourceMappingURL=bundle.js.map
