import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ComroadsService} from '../comroads.service';
import {Trip} from '../trip';
import {MatTableDataSource} from '@angular/material';
import {User} from '../user';
import {Event} from '../Event';
import {ComroadsFunctionsService} from '../comroadsFunctions.service';
import {ComroadsSearch} from '../ComroadsSearch';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  search = {
    trip: {
      tripId: null,
      tripFromPicker: null,
      tripToPicker: null
    },
    user: {
      user_id: null,
      userMail: null
    },
    event: {
      eventId: null,
      eventFromPicker: null,
      eventToPicker: null
    },
    startIndex: 0,
    endIndex: 0
  };
  showUserTable = false;
  showTripsTable = false;
  showEventTable = false;

  showNoResaultFound = false;
  constructor(private comroadsService: ComroadsService, private cgf: ComroadsFunctionsService, private router: Router, public cmrSearch: ComroadsSearch) {
  }

  ngOnInit() {
    this.showNoResaultFound = false;
    this.cmrSearch.eraseSearch();
    this.cmrSearch.searchRes.usersDataSource = null;
    this.cmrSearch.searchRes.tripsDataSource = null;
    this.cmrSearch.searchRes.eventsDataSource = null;
    this.cmrSearch.searchRes.usr = null;
    this.cmrSearch.searchRes.baseLength = null;
    this.cmrSearch.searchRes.baseIndex = null;

  }

  find() {
    this.search.startIndex = 0;
    this.search.endIndex = 5;
    this.comroadsService.search(this.cmrSearch.searchReq)
      .subscribe(data => {
        if(data.body.results.length > 0){
          this.showUserTable = false;
          this.showTripsTable = false;
          this.showEventTable = false;
          this.search = data.body.search;
          // In case that the results concern one user we add the usr information to user variable
          if (data.header.user != null) {
            this.cmrSearch.searchRes.usr = data.header.user;
          }
          // If results conaint multiple rows we take the indexes
          if (data.body.length != null) {
            this.cmrSearch.searchRes.baseLength = data.body.length;
            this.cmrSearch.searchRes.baseIndex = data.body.index;
          }

            switch (data.header.type) {
              case 'USERS':
                this.cmrSearch.searchRes.usersDataSource = new MatTableDataSource<User>(data.body.results);
                this.router.navigate(['/', 'users']);
                break;
              case 'TRIPS':
                this.cmrSearch.searchRes.tripsDataSource = new MatTableDataSource<Trip>(data.body.results);
                this.router.navigate(['/', 'dashboard']);
                break;
              case 'EVENTS':
                this.cmrSearch.searchRes.eventsDataSource = new MatTableDataSource<Event>(data.body.results);
                this.router.navigate(['/', 'dashboard']);
                break;
            }
          }else{
            this.showNoResaultFound = true;
          }

        }
      );

  };

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.find();
    }
  }
}
