import {Component, OnInit, ViewChild} from '@angular/core';
import {ComroadsService} from '../comroads.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material';

import {ComroadsFunctionsService} from '../comroadsFunctions.service';
import {ComroadsSearch} from '../ComroadsSearch';
import {ComroadsObjects} from '../comroadsObjects.service';
import {ComroadsState} from '../ComroadsState';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Global Variables Data
  showTripsTable = false;
  showEventsTable = false;
  showMapsAndCharts = false;


  @ViewChild('tripspaginator') tripspaginator: MatPaginator;
  @ViewChild('eventspaginator') eventspaginator: MatPaginator;

  tripsTableColumn = ['trip_id', 'user_id', 'time_start', 'time_end', 'distance', 'hasEvent'];

  currentTripId = -1;

  // Google Variables
  // Maps Variable
  longitude = 35;
  latitude = 34;
  GeoJsonToDraw;
  EventGeoJsonToDraw;
  EventMapLongitude;
  EventMapLatitude;
  EventMapZoom;
  lineChartAccelerationData = {
    chartType: 'LineChart',
    dataTable: [['names', 'Average', 'Peak']],
    options: {'title': 'Acceleration'},
  };
  // Chart Variables
  lineChartSpeedData = {
    chartType: 'LineChart',
    dataTable: [['a', 'Speed']],
    options: {'title': 'Speed'},
  };

  uploadList = [];

  events = [];
  geoJsonResponse: any;
  currentUser = {
    user_id: -1,
    first_name: null,
    last_name: null,
    email: null
  };
  accelerationPeekArray = [];
  accelerationAverageArray = [];
  speedArray = [];

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


  startingPointLongitude = [];
  startingPointLatitude = [];
  endingPointLongitude = [];
  endingPointLatitude = [];
  pointClicked = false;

  // Select a Point
  pointLatitude = 0;
  pointLongitude = 0;

  constructor(private comroadsService: ComroadsService, private router: Router, private cgf: ComroadsFunctionsService, public cmrSearch: ComroadsSearch, public cro: ComroadsObjects, public ct: ComroadsState, location: PlatformLocation) {

    location.onPopState(() => {
      this.ct.isBackPressed = true;
    });
  }

  ngOnInit() {
    if (this.ct.isFromInitPress) {
      this.ct.isFromInitPress = false;
      this.cro.eraseDisplay();
      this.ct.states = [];
    } else if (this.ct.isBackPressed) {
      this.ct.isBackPressed = false;
      this.cro.showDashboardBigChart = false;
      this.cro.comroadsCtor(this.ct.states[this.ct.states.length - 1]);
    } else if (this.cmrSearch.searchRes.tripsDataSource != null) {
      this.cro.showDashboardBigChart = false;
      this.cro.tripsTableDataSource = this.cmrSearch.searchRes.tripsDataSource;
      this.cro.tripsLength = this.cmrSearch.searchRes.baseLength;
      this.cro.showTripsTable = true;
      if (this.cmrSearch.searchRes.tripsDataSource.data.length == 1) {
        this.cro.showTripsPaginator = false;
        this.cro.exploreTripData(this.cmrSearch.searchRes.tripsDataSource.data[0]);
      }
    } else if (this.cmrSearch.searchRes.eventsDataSource != null) {
      this.cro.showDashboardBigChart = false;
      this.cro.eventsTableDataSource = this.cmrSearch.searchRes.eventsDataSource;
      this.cro.eventsLength = this.cmrSearch.searchRes.baseLength;
      if (this.cmrSearch.searchRes.eventsDataSource.data.length == 1) {
        this.cro.showEventsPaginator = false;
        this.cro.eventRowClicked(this.cmrSearch.searchRes.eventsDataSource.data[0]);
      }
      this.cro.showEventsTable = true;
      this.cro.showEventsPaginator = true;
    } else {
      this.getDataAnalytic();
    }
  }


  getDataAnalytic(): void {
    this.comroadsService.getDataAnalytic()
      .subscribe(data => {
        this.cro.barChartAnalyticData = {
          chartType: 'ColumnChart',
          dataTable: [
            ['Task', 'Amounts'],
            ['Users', data.numberOfUsers],
            ['Trips', data.numberOfTrips],
            ['Events', data.numberOfUploads],
          ],
          options: {'title': 'Comroads State', 'height': 750},
        };
        this.cro.showDashboardBigChart = true;
      });
  }

  EventsMarkersCoordiante: null;

  selectData(evt) {
    this.cro.showTripsTable = false;
    this.cro.showEventsTable = false;
    if (evt.selectedRowFormattedValues['0'] == 'Users') {
      this.router.navigate(['/users']);
    }
    else if (evt.selectedRowFormattedValues['0'] == 'Trips') {
      this.cro.showDashboardBigChart = false;
      this.cro.showTripsTable = true;
      this.showMapsAndCharts = false;
      this.cmrSearch.eraseSearch();
      this.cmrSearch.searchReq.trip.tripId = '*';
      this.cmrSearch.searchReq.startIndex = 0;
      this.cmrSearch.searchReq.endIndex = 5;
      this.cro.search(this.cmrSearch.searchReq);
    }
    else if (evt.selectedRowFormattedValues['0'] == 'Events') {
      this.cro.showDashboardBigChart = false;
      this.cro.showTripsTable = false;
      this.cro.showEventsTable = false;
      this.cro.showEventsTable = true;
      this.cro.showTripMaps = false;
      this.cro.showTripChart = false;
      this.cmrSearch.eraseSearch();
      this.cmrSearch.searchReq.event.eventId = '*';
      this.cmrSearch.searchReq.startIndex = 0;
      this.cmrSearch.searchReq.endIndex = 5;
      this.cro.search(this.cmrSearch.searchReq);

      this.comroadsService.getEventsPoints()
        .subscribe(data => {
            this.EventsMarkersCoordiante = data.markers;
          }
        );
    }
  }


  selectPoint(evt) {
    this.pointClicked = false;
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
