import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rmb'
})
export class RmbPipe implements PipeTransform {

    transform(value: number, args?: number): any {
        return '￥' + Number(value).toFixed(isNaN(args) ? 2 : args);
    }
}
