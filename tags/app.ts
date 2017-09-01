import {mount as mnt} from 'riot';
import {tag, Tag} from 'riot-typed';

import {TimerOpts } from  './timer';
import './timer'; //import timer so that timer tag can be mounted
import './logger';
import './error-logger'

type AppOpts = { title: string };

const TAG_NAME = 'app';
@tag(TAG_NAME, `
<h1>{title}</h1>
<p><b>Total timers:</b> {timers.length}</p>
<timer each="{ item in timers }" initial="{item.initial}"></timer>
<logger></logger>
<error-logger></error-logger>
`)
export default class App extends Tag<AppOpts> {
  timers: TimerOpts[];
  title: string;

  private timerId: number;
  constructor() {
    super();

    console.log('in App constructor');
    // this.title = 'Hello RiotJS';

    this.timers = [];

    this.on('mount', () => {
      console.log('app mounted');
      this.title = this.opts.title;
      this.refill();
      this.update();

      this.timerId = setInterval(this.refill, 3000);
    });

    this.on('unmount', ()=>{
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    });

    this.init();
  }

  init(){
    console.log('in init');
  }

  refill() {
    if (this.timers.length === 0) {
      for (let i = 0; i < 10; i++) {
        this.timers.push({
          initial: i * 15
        });
      }
    } else {
      this.timers.pop();
      this.update();
    }
  }

  static mount(opts: AppOpts) {
    mnt(TAG_NAME, opts);
  }
}
