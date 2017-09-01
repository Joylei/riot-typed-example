import * as riot from 'riot';
import {tag, Tag} from 'riot-typed';

import Logger from './logger'

//example of override css

@tag('error-logger',{ css: 'error-logger .color{color:red;}' })
export default class ErrorLogger extends Logger{
    constructor(){
        super();

        this.logs.push('!!!Error!!!');
    }
}