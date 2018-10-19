import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ComroadsObjects} from './comroadsObjects.service';
import {ComroadsSearch} from './ComroadsSearch';
import {ComroadsState} from './ComroadsState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Comroads Web Mohnitor';

  constructor(private router: Router, public cro: ComroadsObjects, public cmrSearch: ComroadsSearch, public ct: ComroadsState) {
  }

  goToDashboard() {
    this.ct.isFromInitPress = true;
    this.cro.eraseDisplay();
    this.cmrSearch.searchRes.eventsDataSource = null;
    this.cmrSearch.searchRes.tripsDataSource = null;
    this.cmrSearch.searchRes.usersDataSource = null;
    this.router.navigate(['/dashboard']);

  }
}
