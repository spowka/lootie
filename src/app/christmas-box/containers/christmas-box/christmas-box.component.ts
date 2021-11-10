import { Component, OnInit } from '@angular/core';

interface CalendarItem {
  id: number,
  images: {
    openedBoxImg: string,
    closeBoxImg: string,
    dayBoxImg: string
  }
}

@Component({
  selector: 'app-christmas-box',
  templateUrl: './christmas-box.component.html',
  styleUrls: ['./christmas-box.component.scss']
})
export class ChristmasBoxComponent implements OnInit {
  public calendarItems: CalendarItem[] = [];
  public dayNow = 0;
  public monthNow: number;
  public calendarToys = {
    2: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-3.png',
      left: '60%'
    },
    4: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-4.png',
      left: '60%'
    },
    6: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-5.png',
      left: '30%'
    },
    8: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-6.png',
      left: '30%'
    },
    9: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-7.png',
      left: '60%'
    },
    11: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-8.png',
      left: '50%'
    },
    13: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-9.png',
      left: '20%'
    },
    15: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-10.png',
      left: '40%'
    },
    18: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-11.png',
      left: '15%'
    },
    20: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-12.png',
      left: '60%'
    },
    22: {
      toyUrl: 'assets/images/christmas-calendar/toys/deco-13.png',
      left: '20%'
    },
  };

  constructor() {
    for(let i = 1; i < 25; i++) {
      this.calendarItems.push({
        id: i,
        images: {
          openedBoxImg: `assets/images/christmas-calendar/new-days/day-${i}-opened.png`,
          closeBoxImg: `assets/images/christmas-calendar/new-days/day-${i}-close.png`,
          dayBoxImg: `assets/images/christmas-calendar/new-days/day-${i}-opening.png`,
        }
      })
    }

    this.monthNow = new Date().getMonth() + 1;
    if (this.monthNow === 12) {
      this.dayNow = new Date().getDate();
    }
  }

  ngOnInit() {
  }

  public getBoxImage(box: any): string {
    if (this.dayNow < box.id) {
      return box.images.closeBoxImg;
    } else if (this.dayNow > box.id) {
      return box.images.openedBoxImg;
    }
    return box.images.dayBoxImg;
  }
}
