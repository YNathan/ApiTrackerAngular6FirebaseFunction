import {Injectable, ViewChild} from '@angular/core';
import {ComroadsService} from './comroads.service';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {Event} from './Event';
import {Trip} from './trip';
import {User} from './user';
import {ComroadsFunctionsService} from './comroadsFunctions.service';
import {ComroadsSearch} from './ComroadsSearch';
import {Router} from '@angular/router';
import {ComroadsState} from './ComroadsState';

@Injectable()
export class ComroadsObjects {
  // Graph router values
  numberOfUsers: number;
  numberOfTrips: number;
  numberOfReports: number;

  user: any;
  trip: any;
  event: any;
  // Data-table values
  usersTableDataSource;
  tripsTableDataSource;
  eventsTableDataSource;

  // Data-tables columns values
  usersTableDisplayedColumns = ['users_id', 'last_name', 'first_name', 'email', 'created', 'totalDistance'];
  tripsTableDisplayedColumns = ['trip_id', 'time_start', 'time_end', 'distance', 'hasEvent'];
  eventsTableDisplayedColumns = ['users_id', 'date', 'video_name', 'latitude', 'longitude', 'location','cloud_status'];


  // Paginators values
  showUsersPaginator = false;
  usersIndex = 0;
  usersLength = 0;
  paginatorUsersEvent: PageEvent;
  @ViewChild('userspaginator') userspaginator: MatPaginator;

  showTripsPaginator = false;
  tripsIndex = 0;
  tripsLength = 0;
  paginatorTripsEvent: PageEvent;
  @ViewChild('tripspaginator') tripspaginator: MatPaginator;

  showEventsPaginator = false;
  eventsIndex = 0;
  eventsLength = 0;
  paginatorEventsEvent: PageEvent;
  @ViewChild('eventspaginator') eventspaginator: MatPaginator;

  // Show divs booleans
  showUsersTable = false;
  showTripsTable = false;
  showEventsTable = false;

  showTripMaps = false;
  showTripChart = false;

  showEventMaps = false;
  showEventChart = false;


  //Google maps Variable
  longitude = 35;
  latitude = 34;
  startingPointLongitude;
  startingPointLatitude;
  endingPointLongitude;
  endingPointLatitude;

  zoom;
  GeoJsonToDraw;

  pointClicked = false;
  pointLatitude;
  pointLongitude;


  EventGeoJsonToDraw;
  EventMapLongitude;
  EventMapLatitude;
  EventMapZoom;

  // Chart data variables
  barChartAnalyticData = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Amounts'],
      ['Users', 0],
      ['Trips', 0],
      ['Events', 0],
    ],
    options: {'title': 'Comroads State', 'height': 750}
  };
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

  // Fonctional variabls
  uploadList = [];
  currentUserId: null;
  currentTripId: null;
  currentUserFirstNameAndLastName: string;

  eventGoogleBoundingBoxObject: any;
  currentUser = {
    user_id: -1,
    first_name: null,
    last_name: null,
    email: null
  };
  geoJsonResponse: any;
  accelerationAverageArray: any[];
  accelerationPeekArray: any[];
  speedArray: any[];

  eventIndexes = {
    user_id: -1,
    date: null
  };

  showDashboardBigChart = true;

  constructor(public comroadsService: ComroadsService, public cgf: ComroadsFunctionsService, public cmrSearch: ComroadsSearch, public router: Router, public ct: ComroadsState) {
  }

  comroadsCtor(stateRecieved) {
    // Graph router values
    this.numberOfUsers = stateRecieved.numberOfUsers;
    this.numberOfTrips = stateRecieved.numberOfTrips;
    this.numberOfReports = stateRecieved.numberOfReports;
    // Data-table values
    this.usersTableDataSource = stateRecieved.usersTableDataSource;
    this.tripsTableDataSource = stateRecieved.tripsTableDataSource;
    this.eventsTableDataSource = stateRecieved.eventsTableDataSource;
    // Paginators values
    this.showUsersPaginator = stateRecieved.showUsersPaginator;
    this.usersIndex = stateRecieved.usersIndex;
    this.usersLength = stateRecieved.usersLength;
    this.paginatorUsersEvent = stateRecieved.paginatorUsersEvent;
    this.showTripsPaginator = stateRecieved.showTripsPaginator;
    this.tripsIndex = stateRecieved.tripsIndex;
    this.tripsLength = stateRecieved.tripsLength;
    this.paginatorTripsEvent = stateRecieved.paginatorTripsEvent;
    this.showEventsPaginator = stateRecieved.showEventsPaginator;
    this.eventsIndex = stateRecieved.eventsIndex;
    this.eventsLength = stateRecieved.eventsLength;
    this.paginatorEventsEvent = stateRecieved.paginatorEventsEvent;
    // Show divs booleans
    this.showUsersTable = stateRecieved.showUsersTable;
    this.showTripsTable = stateRecieved.showTripsTable;
    this.showEventsTable = stateRecieved.showEventsTable;
    this.showTripMaps = stateRecieved.showTripMaps;
    this.showTripChart = stateRecieved.showTripChart;
    this.showEventMaps = stateRecieved.showEventMaps;
    this.showEventChart = stateRecieved.showEventChart;
    //Google maps Variable
    this.longitude = stateRecieved.longitude;
    this.latitude = stateRecieved.latitude;
    this.startingPointLongitude = stateRecieved.startingPointLongitude;
    this.startingPointLatitude = stateRecieved.startingPointLatitude;
    this.endingPointLongitude = stateRecieved.endingPointLongitude;
    this.endingPointLatitude = stateRecieved.endingPointLatitude;
    this.zoom = stateRecieved.zoom;
    this.GeoJsonToDraw = stateRecieved.GeoJsonToDraw;
    this.pointClicked = stateRecieved.pointClicked;
    this.pointLatitude = stateRecieved.pointLatitude;
    this.pointLongitude = stateRecieved.pointLongitude;
    this.EventGeoJsonToDraw = stateRecieved.EventGeoJsonToDraw;
    this.EventMapLongitude = stateRecieved.EventMapLongitude;
    this.EventMapLatitude = stateRecieved.EventMapLatitude;
    this.EventMapZoom = stateRecieved.EventMapZoom;
    // Chart data variables
    this.barChartAnalyticData = stateRecieved.barChartAnalyticData;
    this.lineChartAccelerationData = stateRecieved.lineChartAccelerationData;
    // Chart Variables
    this.lineChartSpeedData = stateRecieved.lineChartSpeedData;
    this.eventLineChartAccelerationData = stateRecieved.eventLineChartAccelerationData;
    this.eventLineChartSpeedData = stateRecieved.eventLineChartSpeedData;
    // Functional variables
    this.uploadList = stateRecieved.uploadList;
    this.currentUserId = stateRecieved.currentUserId;
    this.currentTripId = stateRecieved.currentTripId;
    this.currentUserFirstNameAndLastName = stateRecieved.currentUserFirstNameAndLastName;
    this.currentUser = stateRecieved.currentUser;
    this.geoJsonResponse = stateRecieved.geoJsonResponse;
    this.accelerationAverageArray = stateRecieved.accelerationAverageArray;
    this.accelerationPeekArray = stateRecieved.accelerationPeekArray;
    this.speedArray = stateRecieved.speedArray;
    this.showDashboardBigChart = stateRecieved.showDashboardBigChart;
  }

  search(searchRequest) {
    this.comroadsService.search(searchRequest)
      .subscribe(data => {
          switch (data.header.type) {
            case 'USERS':
              this.usersIndex = 1;
              data.body.index;
              this.usersLength = data.body.length;
              this.usersTableDataSource = new MatTableDataSource<User>(data.body.results);
              if (data.body.results.length > 0) {
                this.showUsersTable = true;
              }
              if (data.body.results.length > 1) {
                this.showUsersPaginator = true;
              }
              this.tripsTableDataSource = null;
              this.eventsTableDataSource = null;
              break;
            case 'TRIPS':
              this.tripsLength = data.body.length;
              this.tripsTableDataSource = new MatTableDataSource<Trip>(data.body.results);
              if (data.body.results.length > 0) {
                this.showTripsTable = true;
              }
              if (data.body.results.length > 1) {
                this.showTripsPaginator = true;
              }
              this.eventsTableDataSource = null;
              break;
            case 'EVENTS':
              this.eventsLength = data.body.length;

              this.eventsTableDataSource = new MatTableDataSource<Event>(data.body.results);
              if (data.body.results.length > 0) {
                this.showEventsTable = true;
              }
              if (data.body.results.length > 1) {
                this.showEventsPaginator = true;
              }
              this.uploadList = data.body.results;
              break;
          }
        }
      );
  }


  getUsers(): void {
    this.cmrSearch.eraseSearch();
    this.cmrSearch.searchReq.user.user_id = '*';
    this.cmrSearch.searchReq.startIndex = 0;
    this.cmrSearch.searchReq.endIndex = 5;
    this.search(this.cmrSearch.searchReq);
  }

  loadTripTable(usr): void {
    this.currentUserId = usr.users_id;
    this.cmrSearch.eraseSearch();
    this.showTripsTable = true;
    this.showTripsPaginator = true;
    this.user = usr;
    this.showTripMaps = false;
    this.showTripChart = false;
    this.currentUserFirstNameAndLastName = this.cgf.getDisplayName(usr);

    // Init Display
    this.showEventsTable = false;
    this.showEventsPaginator = false;
    this.showTripsPaginator = false;
    this.showTripsTable = false;

    this.cmrSearch.searchReq.user.user_id = usr.users_id;
    this.cmrSearch.searchReq.event.eventId = null;
    this.cmrSearch.searchReq.trip.tripId = '*';
    this.cmrSearch.searchReq.startIndex = 0;
    this.cmrSearch.searchReq.endIndex = 5;
    this.search(this.cmrSearch.searchReq);
  }

  exploreTripData(trip): void {
    this.showTripMaps = false;
    this.showTripChart = false;
    this.pointClicked = false;
    this.getUploadForATrip(trip);
    // Centering the trip on the maps
    this.longitude = (trip.top_west_longitude + trip.buttom_east_longitude) / 2;
    this.latitude = (trip.top_west_latitude + trip.buttom_east_latitude) / 2;
    this.currentTripId = trip.trip_id;
    this.zoom = this.cgf.getGoogleZoom(trip);

    this.comroadsService.getSamplesArrayOfTrip(trip)
      .subscribe(data => {
          this.user = data.user;

          this.currentUser.first_name = data.user.first_name;
          this.currentUser.last_name = data.user.last_name;
          this.currentUser.user_id = data.user.users_id;
          this.currentUser.email = data.user.email;
          if ((this.currentUser.first_name == '') && (this.currentUser.last_name == '')) {
            this.currentUser.first_name = this.currentUser.email;
          }

          this.geoJsonResponse = data;
          this.accelerationAverageArray = this.cgf.getAccAvgArrayFromSamples(data.samples);
          this.accelerationPeekArray = this.cgf.getAccPeekArrayFromSamples(data.samples);
          this.speedArray = this.cgf.getSpeedArrayFromSamples(data.samples);
          this.GeoJsonToDraw = this.cgf.buildGeoJsonFromSamplesArray(data.samples);
          for (var i in data.samples) {
            data.samples[i].sample.time = new Date(data.samples[i].sample.time);
          }
          // Map Starting Point & End Point Section
          if (data.samples.length > 0) {
            this.startingPointLongitude = data.samples[0].sample.longitude;
            this.startingPointLatitude = data.samples[0].sample.latitude;
            this.endingPointLongitude = data.samples[(data.samples.length - 1)].sample.longitude;
            this.endingPointLatitude = data.samples[(data.samples.length - 1)].sample.latitude;
          }
          // Chart Section
          this.initTripChartsData();
          for (var i in data.samples) {
            this.lineChartAccelerationData.dataTable.push([data.samples[i].sample.time, this.accelerationAverageArray[i], this.accelerationPeekArray[i]]);
            this.lineChartSpeedData.dataTable.push([data.samples[i].sample.time, this.speedArray[i]]);
          }
          this.showTripMaps = true;
          this.showTripChart = true;
        }
      );
  }

  getUploadForATrip(trip) {

    this.trip = trip;
    this.cmrSearch.searchReq.trip.tripId = trip.trip_id;
    this.cmrSearch.searchReq.event.eventId = '*';
    this.cmrSearch.searchReq.startIndex = 0;
    this.cmrSearch.searchReq.endIndex = 10;
    this.search(this.cmrSearch.searchReq);
  }

  selectedUpload: any;
  showEventCharts = false;
  eventClicked = false;
  eventSamples = [];
  eventVideoTempUrl: String;

  eventAccAvgArr = null;
  eventAccPeekArr = null;
  eventSpeedArr = null;

  selectAnUpload(upload) {
    this.event = upload;
    this.showEventCharts = false;
    this.selectedUpload = upload;
    this.EventMapLatitude = upload.latitude;
    this.EventMapLongitude = upload.longitude;
    this.eventClicked = true;

    var eventdate = new Date(upload.date);
    for (var i in this.geoJsonResponse.samples) {
      var theIndex = -1;
      if (this.cgf.dateEquals(eventdate, new Date(this.geoJsonResponse.samples[i].sample.time))) {
        theIndex = parseInt(i);
        break;
      }
      if (this.cgf.dateSmaller(eventdate, new Date(this.geoJsonResponse.samples[i].sample.time))) {
        theIndex = parseInt(i) - 1;
        break;
      }
    }

    this.initEventChartDate();
    for (var smpIdx = (theIndex - 7); smpIdx < (theIndex + 6); smpIdx++) {
      this.eventSamples.push(this.geoJsonResponse.samples[smpIdx]);
    }

    this.EventGeoJsonToDraw = this.cgf.buildGeoJsonFromSamplesArray(this.eventSamples);
    this.eventGoogleBoundingBoxObject = this.cgf.getGeoBoxFromLngLatArray(this.eventSamples);

    this.eventAccAvgArr = this.cgf.getAccAvgArrayFromSamples(this.eventSamples);
    this.eventAccPeekArr = this.cgf.getAccPeekArrayFromSamples(this.eventSamples);
    this.eventSpeedArr = this.cgf.getSpeedArrayFromSamples(this.eventSamples);
    for (var i in this.eventSamples) {
      if (this.eventSamples[i] != null) {
        this.eventLineChartAccelerationData.dataTable.push([this.eventSamples[i].sample.time, this.eventAccAvgArr[i], this.eventAccPeekArr[i]]);
        this.eventLineChartSpeedData.dataTable.push([this.eventSamples[i].sample.time, this.eventSpeedArr[i]]);
      }
    }
    this.comroadsService.getSignedUrlForUpload(upload).subscribe(data => {
        this.eventVideoTempUrl = data.signedUrl;
        this.showEventCharts = true;

        this.ct.isFromInitPress = false;
        this.ct.setState(this);
        this.ct.states.push(this.ct.state);

        this.router.navigate(['/', 'event']);
        this.showEventCharts = true;
      }
    );
  }

  eventRowClicked(event) {
    // Event Page
    this.event = event;

    this.showTripMaps = false;
    this.showTripChart = false;
    this.eventIndexes.user_id = event.users_id;
    this.eventIndexes.date = event.date;
    this.comroadsService.getTripOfEvent(this.eventIndexes)
      .subscribe(data => {
          this.geoJsonResponse = data;
          for (var i in this.geoJsonResponse.timesArray) {
            this.geoJsonResponse.timesArray[i] = new Date(this.geoJsonResponse.timesArray[i]);
          }
          // User Related Section
          if (data.user != null) {
            if (data.user.first_name != null) {
              this.currentUser.first_name = data.user.first_name;
            }
            if (data.user.last_name != null) {
              this.currentUser.last_name = data.user.last_name;
            }
          }
          this.user = data.user;
          this.currentUser.user_id = event.users_id;
          if (data.trip == null) {
            this.comroadsService.getSignedUrlForUpload(event).subscribe(data => {
                this.eventVideoTempUrl = data.signedUrl;
                this.trip = null;

                this.ct.isFromInitPress = false;
                this.ct.setState(this);
                this.ct.states.push(this.ct.state);
                this.router.navigate(['/', 'event']);
              }
            );
          } else {
            // Trip Related Section
            // Centering the trip on the maps
            this.longitude = (data.trip.top_west_longitude + data.trip.buttom_east_longitude) / 2;
            this.latitude = (data.trip.top_west_latitude + data.trip.buttom_east_latitude) / 2;
            this.currentTripId = data.trip.trip_id;
            this.zoom = this.cgf.getGoogleZoom(data.trip);
            this.currentTripId = data.trip.trip_id;
            // Event Page
            this.trip = data.trip;
            this.comroadsService.getSamplesArrayOfTrip(data.trip)
              .subscribe(data => {
                  // Event Page
                  this.user = data.user;

                  this.currentUser.first_name = data.user.first_name;
                  this.currentUser.last_name = data.user.last_name;
                  this.currentUser.user_id = data.user.users_id;
                  this.geoJsonResponse = data;
                  this.accelerationAverageArray = this.cgf.getAccAvgArrayFromSamples(data.samples);
                  this.accelerationPeekArray = this.cgf.getAccPeekArrayFromSamples(data.samples);
                  this.speedArray = this.cgf.getSpeedArrayFromSamples(data.samples);
                  this.GeoJsonToDraw = this.cgf.buildGeoJsonFromSamplesArray(data.samples);
                  for (var i in data.samples) {
                    data.samples[i].sample.time = new Date(data.samples[i].sample.time);
                  }
                  // Map Starting Point & End Point Section
                  if (data.samples.length > 0) {
                    this.startingPointLongitude = data.samples[0].sample.longitude;
                    this.startingPointLatitude = data.samples[0].sample.latitude;
                    this.endingPointLongitude = data.samples[(data.samples.length - 1)].sample.longitude;
                    this.endingPointLatitude = data.samples[(data.samples.length - 1)].sample.latitude;
                  }
                  this.selectAnUpload(event);

                }
              );
          }
        }
      );
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

  // Initial functions
  initTripChartsData() {
    this.lineChartAccelerationData = {
      chartType: 'LineChart',
      dataTable: [['names', 'Average', 'Peak']],
      options: {'title': 'Acceleration'},
    };
    this.lineChartSpeedData = {
      chartType: 'LineChart',
      dataTable: [['a', 'Speed']],
      options: {'title': 'Speed'},
    };
  }

  // Data table pagination functions
  onPaginateUsersChange(evt) {
    this.cmrSearch.eraseSearch();
    this.cmrSearch.searchReq.user.user_id = '*';
    this.cmrSearch.searchReq.startIndex = evt.pageSize * evt.pageIndex;
    this.cmrSearch.searchReq.endIndex = this.cmrSearch.searchReq.startIndex + evt.pageSize;
    this.search(this.cmrSearch.searchReq);
  }

  onPaginateTripsChange(evt) {
    this.cmrSearch.searchReq.event.eventId = null;
    this.cmrSearch.searchReq.trip.tripId = "*";

    if (this.cmrSearch.searchReq.user.user_id != null) {
      var userId = this.cmrSearch.searchReq.user.user_id;
      this.cmrSearch.eraseSearch();
      this.cmrSearch.searchReq.trip.tripId = '*';
      this.cmrSearch.searchReq.user.user_id = userId;
    } else if (this.currentUserId != null) {
      this.cmrSearch.eraseSearch();
      this.cmrSearch.searchReq.trip.tripId = '*';
      this.cmrSearch.searchReq.user.user_id = this.currentUserId;
    }

    this.cmrSearch.searchReq.startIndex = evt.pageSize * evt.pageIndex;
    this.cmrSearch.searchReq.endIndex = this.cmrSearch.searchReq.startIndex + evt.pageSize;
    this.search(this.cmrSearch.searchReq);
  }

  onPaginateEventsChange(evt) {
    this.cmrSearch.searchReq.startIndex = evt.pageSize * evt.pageIndex;
    this.cmrSearch.searchReq.endIndex = this.cmrSearch.searchReq.startIndex + evt.pageSize;
    this.search(this.cmrSearch.searchReq);
  }

  eraseDisplay() {
    // Dashboard big graph
    this.showDashboardBigChart = true;
    // Erese User
    this.showUsersTable = false;
    this.showUsersPaginator = false;

    // Erase Trip
    this.showTripsTable = false;
    this.showTripsPaginator = false;
    this.showTripMaps = false;
    this.showTripChart = false;

    // Erase Event
    this.uploadList = [];
    this.showEventsTable = false;
    this.showEventsPaginator = false;
    this.showEventMaps = false;
    this.showEventChart = false;

  }

  initEventChartDate() {
    this.eventSamples = [];
    this.eventLineChartAccelerationData = {
      chartType: 'LineChart',
      dataTable: [['names', 'Average', 'Peak']],
      options: {'title': 'Acceleration'},
    };
    this.eventLineChartSpeedData = {
      chartType: 'LineChart',
      dataTable: [['a', 'Speed']],
      options: {'title': 'Speed'},
    };
  }

}
