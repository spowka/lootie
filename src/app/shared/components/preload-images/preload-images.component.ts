import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preload-images',
  templateUrl: './preload-images.component.html',
  styleUrls: ['./preload-images.component.scss']
}) 
export class PreloadImagesComponent implements OnInit {
  @Input()
  set images(val: string[]) {
    if (!val) {
      return;
    }

    this._images = val.map(img => `url(${img})`);
  };

  public _images: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
