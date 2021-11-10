export interface ShippingInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  country: 'Canada | France | United States';
  city: string;
  province: string;
  email: string;
}

export interface ShippingCountry {
  code: string;
  name: string;
}
