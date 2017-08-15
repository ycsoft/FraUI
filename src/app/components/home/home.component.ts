import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() keywords = '';
  private ENTER = 13;

  constructor(private  router: Router) { }

  ngOnInit() {
  }
  search_string(words: string) {
    this.router.navigateByUrl('/result/' + this.keywords);
  }
  keypress($event) {
    if ($event.keyCode === this.ENTER) {
      this.search_string(this.keywords);
    }
  }
  search() {
    this.search_string(this.keywords);
  }
}
