import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({ name: 'validateImg' })
export class ValidateImgPipe implements PipeTransform {
  transform(defaultUrl: string, url: string): any {
    const isExists = Observable.create(obs => {
      const img = new Image();
      img.onload = () => obs.next(url);
      img.onerror = () => obs.next(defaultUrl);
      img.src = url;
    });
    return isExists;
  }
}
