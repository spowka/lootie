import { Directive, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

declare var google: any;

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  @Input() control: FormControl;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  private element: HTMLInputElement;
  private autocomplete;

  constructor(private elRef: ElementRef) {
    this.element = this.elRef.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);

    this.element.addEventListener('blur', () => {
      google.maps.event.trigger(autocomplete, 'place_changed');
    });

    google.maps.event.addListener(autocomplete, 'place_changed', (event) => {
      const foundPlace = autocomplete.getPlace();
      if (!foundPlace) {
        return this.selectionChange.emit(null);
      }

      this.selectionChange.emit(this.getFormattedAddress(foundPlace));
    });
  }

  getFormattedAddress(place) {
    const location_obj = {};

    for (const i in place.address_components) {
      if (place.address_components.hasOwnProperty(i)) {
        const item = place.address_components[i];
        if (item['types'].indexOf('locality') > -1) {
          location_obj['city'] = item['long_name'];
        } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
          location_obj['province'] = item['long_name'];
        } else if (item['types'].indexOf('country') > -1) {
          location_obj['country'] = item['short_name'];
        } else if (item['types'].indexOf('postal_code') > -1) {
          location_obj['postalCode'] = item['short_name'];
        }
      }
    }

    return Object.keys(location_obj).length ? location_obj : null;
  }
}
