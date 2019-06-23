import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./../../dashboard.component.scss']
})
export class NotFoundComponent implements OnInit {
  @Input() error: string;

  constructor() { }

  ngOnInit() {
  }

}
