import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import * as $ from 'jquery';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromRouter from 'src/app/@store/router';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  public isMobile$: Observable<boolean>;

  currentUrl$: Observable<string>;

  public searchControl: FormControl;
  public search: string;

  public scrollTop = 0;

  public supportItems = [
    {
      title: 'SUPPORT.WHAT_IS_LOOTIE',
      descriptions: [
        {
          text: 'SUPPORT.ABOUT_LOOTIE_1',
          type: 'text'
        },
        {
          text: `Supreme`,
          href: 'https://www.supremenewyork.com/',
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.AND', type: 'text' },
        {
          text: 'Nike',
          href: 'https://www.nike.com/',
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_LOOTIE_2', type: 'text' }
      ],
      color: '#4fc1e3'
    },
    {
      title: 'SUPPORT.HOW_MAKE_DEPOSIT',
      descriptions: [
        { text: 'SUPPORT.ABOUT_MAKE_DEPOSIT_1', type: 'text' },
        {
          text: 'G2A Pay',
          href: 'https://pay.g2a.com/',
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_MAKE_DEPOSIT_2', type: 'text' },
        {
          text: 'Steam',
          href: 'https://store.steampowered.com/',
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_MAKE_DEPOSIT_3', type: 'text' }
      ],
      color: '#1abe66'
    },
    {
      title: 'SUPPORT.WEBSITE_FAIR',
      descriptions: [
        { text: 'SUPPORT.ABOUT_FAIR_1', type: 'text' },
        {
          text: 'SUPPORT.FAIR_VERIFIER',
          href: 'https://repl.it/@Lootie/provably-fair-verify',
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_FAIR_2', type: 'text' },
        { text: 'SUPPORT.ABOUT_FAIR_3', type: 'text' },
        {
          text: 'https://lootie.com/provably-fair',
          href: 'https://lootie.com/provably-fair',
          type: 'link',
          class: 'url-link'
        }
      ],
      color: '#f34747'
    },
    {
      title: 'SUPPORT.VIEW_WON_PRIZES',
      descriptions: [
        {
          text: 'SUPPORT.ABOUT_WON_PRIZES',
          type: 'text'
        }
      ],
      color: '#9d63d2'
    },
    {
      title: 'SUPPORT.WITHDRAW_PRIZES',
      descriptions: [
        { text: 'SUPPORT.ABOUT_WITHDRAW_PRIZES_1', type: 'text' },
        {
          text: 'SUPPORT.WITHDRAWAL_PAGE',
          href: '/withdraw',
          isLink: true,
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_WITHDRAW_PRIZES_2', type: 'text' }
      ],
      color: '#fcd834'
    },
    {
      title: 'SUPPORT.CREATE_OWN_BOX',
      descriptions: [
        { text: 'SUPPORT.ABOUT_CREATE_OWN_BOX_1', type: 'text' },
        {
          text: 'SUPPORT.CUSTOM_MYSTERY',
          href: '/mysterybox/create',
          isLink: true,
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_CREATE_OWN_BOX_2', type: 'text' }
      ],
      color: '#4fc1e3'
    },
    {
      title: 'SUPPORT.REWARDS_OR_GIVEAWAYS',
      descriptions: [
        { text: 'SUPPORT.ABOUT_REWARDS_OR_GIVEAWAYS_1', type: 'text' },
        {
          text: 'SUPPORT.REWARDS_TAB',
          href: '/rewards',
          isLink: true,
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_REWARDS_OR_GIVEAWAYS_2', type: 'text' },
        {
          text: 'SUPPORT.DAILY_CASE',
          href: '/mysterybox/daily',
          isLink: true,
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_REWARDS_OR_GIVEAWAYS_3', type: 'text' }
      ],
      color: '#1abe66'
    },
    {
      title: 'SUPPORT.GET_REWARDED',
      descriptions: [
        { text: 'SUPPORT.ABOUT_GET_REWARDES_1', type: 'text' },
        {
          text: 'SUPPORT.AFFILIATE_PROGRAM',
          href: '/affiliates',
          isLink: true,
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_GET_REWARDES_2', type: 'text' }
      ],
      color: '#f34747'
    },
    {
      title: 'SUPPORT.OPEN_MYSTERY_BOX',
      descriptions: [
        {
          text: 'SUPPORT.ABOUT_OPEN_MYSTERY_BOX',
          type: 'text'
        }
      ],
      color: '#fcd834'
    },
    {
      title: 'SUPPORT.LIMITATION_OPENED_MYSTERY_BOX',
      descriptions: [
        {
          text: 'SUPPORT.ABOUT_LIMITATION_OPENED_MYSTERY_BOX',
          type: 'text'
        }
      ],
      color: '#4fc1e3'
    },
    {
      title: 'SUPPORT.SEE_ODDS_AND_INFORMATION_SPECIFIC_ITEM',
      descriptions: [
        {
          text: 'SUPPORT.ABOUT_SEE_ODDS_AND_INFORMATION_SPECIFIC_ITEM',
          type: 'text'
        }
      ],
      color: '#f34747'
    },
    {
      title: 'SUPPORT.CHANGE_ITEM',
      descriptions: [
        { text: 'SUPPORT.ABOUT_CHANGE_ITEM_1', type: 'text' },
        {
          text: 'SUPPORT.UPGRADE',
          href: '/upgrade',
          isLink: true,
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_CHANGE_ITEM_2', type: 'text' }
      ],
      color: '#9d63d2'
    },
    {
      title: 'SUPPORT.UPGRADING_ITEMS_WORK',
      descriptions: [
        { text: 'SUPPORT.ABOUT_UPGRADING_ITEMS_WORK_1', type: 'text' },
        {
          text: 'SUPPORT.UPGRADE',
          href: '/upgrade',
          isLink: true,
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_UPGRADING_ITEMS_WORK_2', type: 'text' },
        { text: 'SUPPORT.ABOUT_UPGRADING_ITEMS_WORK_3', type: 'text' }
      ],
      color: '#1abe66'
    },
    {
      title: 'SUPPORT.SHIPPING_PROCESS',
      descriptions: [
        {
          text: 'SUPPORT.ABOUT_SHIPPING_PROCESS',
          type: 'text'
        }
      ],
      color: '#fcd834'
    },
    {
      title: 'SUPPORT.TRACK_DELIVERIES',
      descriptions: [
        { text: 'SUPPORT.ABOUT_TRACK_DELIVERIES_1', type: 'text' },
        {
          text: 'SUPPORT.ACCOUNT',
          href: '/account',
          isLink: true,
          type: 'link',
          class: 'link'
        },
        { text: 'SUPPORT.ABOUT_TRACK_DELIVERIES_2', type: 'text' }
      ],
      color: '#f34747'
    },
    {
      title: 'SUPPORT.REFUND_RETURN',
      descriptions: [
        {
          text: 'SUPPORT.ABOUT_REFUND_RETURN',
          type: 'text'
        }
      ],
      color: '#9d63d2'
    },
    {
      title: 'SUPPORT.WEBSITE_CLOTHES',
      descriptions: [
        { text: 'SUPPORT.ABOUT_WEBSITE_CLOTHES_1', type: 'text' },
        {
          text: 'StockX',
          href: 'https://stockx.com/',
          type: 'link',
          class: 'url-link'
        },
        { text: 'SUPPORT.ABOUT_WEBSITE_CLOTHES_2', type: 'text' }
      ],
      color: '#4fc1e3'
    },
    {
      title: 'SUPPORT.GET_ITEM',
      descriptions: [
        { text: 'SUPPORT.GET_ITEM_INFO_1', type: 'text' },
        {
          text: 'support@lootie.com',
          href: 'mailto:support@lootie.com',
          type: 'link',
          class: 'url-link'
        },
        { text: 'SUPPORT.GET_ITEM_INFO_2', type: 'text' },
        {
          text: 'Twitter',
          href: 'https://twitter.com/LootieCom',
          type: 'link'
        },
        {
          text: '(@LootieCom)',
          type: 'text',
          class: 'url-link'
        },
        { text: 'SUPPORT.TOO', type: 'text' }
      ],
      color: '#f34747'
    }
  ];

  constructor(
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService,
    private store: Store<fromRoot.State>,
    private titleService: Title
  ) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle('Frequently Asked Questions');
  }

  ngOnInit() {}

  goBack() {
    this.store.dispatch(new fromRouter.Back());
  }

  sendTicket(): void {
    this._ngxZendeskWebwidgetService.zE('webWidget', 'open');
  }
}
