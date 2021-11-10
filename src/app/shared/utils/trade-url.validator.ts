import { AbstractControl } from '@angular/forms';

export function tradeUrlValidator(control: AbstractControl) {

  if (!control) {
    return null;
  }
  
  const value = control.value;
  console.log('...............................', value);
  const result = {'tradeUrl': true};
  const url = value.split('?');

  
  if (url.length !== 2 || url[0] !== 'https://steamcommunity.com/tradeoffer/new/') {
    return result;
  }

  const params = url[1].split('&');

  if (params.length !== 2 || !params[0].startsWith('partner') || !params[1].startsWith('token')) {
    return result;
  }

  return null;
}


