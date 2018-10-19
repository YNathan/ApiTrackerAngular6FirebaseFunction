import {User} from '../user';
import {ComroadsService} from '../comroads.service';
import {MatPaginator} from '@angular/material';
import {ChartSelectEvent} from 'ng2-google-charts';
import {
  Component,
  Output,
  OnInit, ViewChild,
  EventEmitter
} from '@angular/core';
import {ComroadsFunctionsService} from '../comroadsFunctions.service';
import {Router} from '@angular/router';
import {ComroadsSearch} from '../ComroadsSearch';
import {ComroadsObjects} from '../comroadsObjects.service';
import {ComroadsState} from '../ComroadsState';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  usrClicked: boolean;
  latitude = 51.678418;
  longitude = 7.809007;
  currentUserFirstNameAndLastName: string;
  currentTripId: number;
  GeoJsonToDraw;
  lineChartAccelerationData = {
    chartType: 'LineChart',
    dataTable: [['names', 'Average', 'Peak']],
    options: {'title': 'Acceleration'},
  };
  lineChartSpeedData = {
    chartType: 'LineChart',
    dataTable: [['a', 'Speed']],
    options: {'title': 'Speed'},
  };
  uploadList = [];
  eventsTableDataSource;
  tripsTableDataSource;

  pointClicked = false;


  @ViewChild('userspaginator') userspaginator: MatPaginator;
  @ViewChild('tripspaginator') tripspaginator: MatPaginator;
  @ViewChild('cchart') cchart;
  accelerationPeekArray = [];
  accelerationAverageArray = [];
  speedArray = [];

  geoJsonResponse: any;

  // Littel Charts for event
  eventLineChartAccelerationData = {
    chartType: 'LineChart',
    dataTable: [['names', 'Average', 'Peak']],
    options: {'title': 'Acceleration'},
  };
  eventLineChartSpeedData = {
    chartType: 'LineChart',
    dataTable: [['a', 'Speed']],
    options: {'title': 'Speed'},
  };

  tripEventJson = {
    user: null,
    trip: null,
    event: null,
    EventGeoJsonToDraw: null,
    eventAccAvgArr: null,
    eventAccPeekArr: null,
    eventSpeedArr: null,
    eventSamples: null,
    eventGoogleBoundingBoxObject: null,
    SignedUrl: null,
  };
  showUserPaginator = true;


  startingPointLongitude = 0;
  startingPointLatitude = 0;
  endingPointLongitude = 0;
  endingPointLatitude = 0;


  // Selecting a Point
  pointLatitude = 0;
  pointLongitude = 0;

  currentUserId: null;

  @Output() public chartSelect: EventEmitter<ChartSelectEvent>;

  constructor(private comroadsService: ComroadsService, private cgf: ComroadsFunctionsService, private router: Router, private cmrSearch: ComroadsSearch, public cro: ComroadsObjects, public ct: ComroadsState, location: PlatformLocation) {

    location.onPopState(() => {
      this.ct.isBackPressed = true;
    });
    this.chartSelect = new EventEmitter();
  }

  ngOnInit() {
    if (this.ct.isBackPressed) {
      this.ct.isBackPressed = false;
      this.cro.comroadsCtor(this.ct.states[this.ct.states.length - 1]);
    } else if (this.cmrSearch.searchRes.usersDataSource != null) {
      this.cro.eraseDisplay();
      this.inputUserFromSearch();
    } else {
      this.cro.eraseDisplay();
      this.cro.getUsers();
      this.usrClicked = false;
    }
  }

  inputUserFromSearch() {
    this.showUserPaginator = false;
    this.cro.usersTableDataSource = this.cmrSearch.searchRes.usersDataSource;
    this.cro.user = this.cmrSearch.searchRes.usersDataSource.data[0];
    this.cro.loadTripTable(this.cmrSearch.searchRes.usersDataSource.data[0]);
    this.cmrSearch.searchRes.usersDataSource = null;
  }

  selectPoint(evt) {
    var sampleIndex = '-1';
    for (var smpIdx in this.geoJsonResponse.samples) {
      var tmpDate = this.geoJsonResponse.samples[smpIdx].sample.time;
      var pointTime = evt.selectedRowValues[0];
      if (tmpDate == pointTime) {
        sampleIndex = smpIdx;
      }
    }
    this.pointLongitude = this.geoJsonResponse.samples[sampleIndex].sample.longitude;
    this.pointLatitude = this.geoJsonResponse.samples[sampleIndex].sample.latitude;
    this.pointClicked = true;
  }
}

