import { NgxZendeskWebwidgetConfig } from 'ngx-zendesk-webwidget';

export class ZendeskConfig extends NgxZendeskWebwidgetConfig {
  lazyLoad = true;
  timeOut = 60000;
  accountUrl = 'lootie.zendesk.com';

  callback(zE) {
    zE.setLocale('en');
    zE('webWidget', 'show');
  }
}

