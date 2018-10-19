import { Injectable } from '@angular/core';
import {ComroadsService} from './comroads.service';
import {Event} from './Event';
import {Trip} from './trip';
import {MatTableDataSource} from '@angular/material';
import {User} from './user';

@Injectable()
export class ComroadsSearch {

  constructor(public comroadsService: ComroadsService) {}

  public searchReq = {
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
    endIndex: 5
  };

  public searchRes = {
    usr: null,
    usersDataSource: null,
    tripsDataSource: null,
    eventsDataSource: null,
    baseLength: null,
    baseIndex: null
  };
  public state = [];

  eraseSearch() {
    this.searchReq = {
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
      endIndex: 5
    };
  }

  search(searchRequest,dataTable,length,index,showPagi) {
    var response = {
      usersTableDataSource: null,
      tripsTableDataSource: null,
      eventsTableDataSource: null,
      showUsersPaginator : false,
      showTripsPaginator : false,
      showEventsPaginator : false,
      index: null,
      length: null
    }
    this.comroadsService.search(searchRequest)
      .subscribe(data => {
          switch (data.header.type) {
            case 'USERS':
            response.index = data.body.index;
            response.length = data.body.length;
            response.usersTableDataSource = new MatTableDataSource<User>(data.body.results);
            response.showUsersPaginator = true;
            break;
            case 'TRIPS':
              index = data.body.index;
              length = data.body.length;
              /*for (var i in data.body.results) {
                var time_start = new Date(data.body.results[i].time_start);
                data.body.results[i].time_start = new Date(Date.UTC(time_start.getFullYear(), time_start.getMonth(), time_start.getDate(), time_start.getHours(), time_start.getMinutes(), time_start.getSeconds()));
                var time_end = new Date(data.body.results[i].time_end);
                data.body.results[i].time_start = new Date(Date.UTC(time_end.getFullYear(), time_end.getMonth(), time_end.getDate(), time_end.getHours(), time_end.getMinutes(), time_end.getSeconds()));
              }*/

              dataTable == new MatTableDataSource<Trip>(data.body.results);
              if(data.body.results > 0){
                showPagi =true;
              }
              response.tripsTableDataSource = new MatTableDataSource<Trip>(data.body.results);
              break;
            case 'EVENTS':
              /*for (var i in data.body.results) {
                var date = new Date(data.body.results[i].date);
                data.body.results[i].date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
              }*/
              response.eventsTableDataSource = new MatTableDataSource<Event>(data.body.results);
              response.index = data.body.index;
              response.length = data.body.length;
              break;
          }
          return response;
        }
      );
  }


}
