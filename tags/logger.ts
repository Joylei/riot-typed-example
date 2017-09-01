import {tag, Tag} from 'riot-typed';

@tag('logger',{ tmpl: '<p class="color" each="{ item in logs }">{ item }</p>', css: '.color{color:gray;}' })
export default class Logger extends Tag<any>{
    logs: string[];

    constructor(){
        super();

        this.logs = ['line 1', 'line 2'];
    }
}