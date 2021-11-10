import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
  transform(data: any[], statement: string) {
    if (!statement) {
      return data;
    }

    if (Object.prototype.toString.call(data) === '[object Object]') {
      const keys = Object.keys(data);
      return keys.map(k => data[k][statement]);
    }

    return data.map(o => o[statement]);
  }
}
