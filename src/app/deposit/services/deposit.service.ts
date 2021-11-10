import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { request } from 'http';

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  constructor(private http: HttpClient) {}

  getSteamItems(body) {
    return this.http.post(
      `${environment.apiUrl}/deposit/get-steam-inventory`,
      body
    );
  }

  steam(req) {
    const body = {
      items: req.data,
      coupon: req.coupon,
      d: req.d,
    } as any;

    if (req.box) {
      body.box = req.box;
    }
    return this.http.post(`${environment.apiUrl}/deposit/request-offer`, body);
  }

  coinbase(req) {
    const body = {
      depositAmount: req.data,
      coupon: req.coupon,
      d: req.d,
    } as any;

    if (req.box) {
      body.box = req.box;
    }

    return this.http.post(
      `${environment.apiUrl}/deposit/request-coinbase-deposit`,
      body
    );
  }

  g2a(req) {
    const body = {
      depositValue: req.data,
      coupon: req.coupon,
      paymentOption: req.paymentOption,
      d: req.d,
    } as any;

    if (req.box) {
      body.box = req.box;
    }

    return this.http.post(
      `${environment.apiUrl}/deposit/create-g2a-quote`,
      body
    );
  }

  giftcards(req) {
    const body = {
      code: req.coupon,
      d: req.d,
    } as any;

    if (req.box) {
      body.box = req.box;
    }

    return this.http.post(
      `${environment.apiUrl}/deposit/request-giftcard-deposit`,
      body
    );
  }

  payop(req) {
    const body = {
      depositAmount: req.data,
      coupon: req.coupon,
      d: req.d,
    } as any;

    if (req.box) {
      body.box = req.box;
    }

    return this.http.post(
      `${environment.apiUrl}/deposit/request-payop-deposit`,
      body
    );
  }

  validatePromocode(code: string) {
    return this.http.post(`${environment.apiUrl}/deposit/validate-promocode`, {
      code,
    });
  }
}
