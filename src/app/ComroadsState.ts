import {Injectable} from '@angular/core';
import {ComroadsService} from './comroads.service';

@Injectable()
export class ComroadsState {
  public isFromInitPress = false;
  public isBackPressed = false;
  public states = [];
  public state = {
    // Graph router values
    numberOfUsers: null,
    numberOfTrips: null,
    numberOfReports: null,
    // Data-table values
    usersTableDataSource: null,
    tripsTableDataSource: null,
    eventsTableDataSource: null,
    // Paginators values
    showUsersPaginator: null,
    usersIndex: null,
    usersLength: null,
    paginatorUsersEvent: null,
    showTripsPaginator: null,
    tripsIndex: null,
    tripsLength: null,
    paginatorTripsEvent: null,
    showEventsPaginator: null,
    eventsIndex: null,
    eventsLength: null,
    paginatorEventsEvent: null,
    // Show divs booleans
    showUsersTable: null,
    showTripsTable: null,
    showEventsTable: null,
    showTripMaps: null,
    showTripChart: null,
    showEventMaps: null,
    showEventChart: null,
    //Google maps Variable
    longitude: null,
    latitude: null,
    startingPointLongitude: null,
    startingPointLatitude: null,
    endingPointLongitude: null,
    endingPointLatitude: null,
    zoom: null,
    GeoJsonToDraw: null,
    pointClicked: null,
    pointLatitude: null,
    pointLongitude: null,
    EventGeoJsonToDraw: null,
    EventMapLongitude: null,
    EventMapLatitude: null,
    EventMapZoom: null,
    // Chart data variables
    barChartAnalyticData: null,
    lineChartAccelerationData: null,
    // Chart Variables
    lineChartSpeedData: null,
    eventLineChartAccelerationData: null,
    eventLineChartSpeedData: null,
    // Fonctional variabls
    uploadList: null,
    currentUserId: null,
    currentTripId: null,
    currentUserFirstNameAndLastName: null,
    tripEventJson: null,
    currentUser: null,
    geoJsonResponse: null,
    accelerationAverageArray: null,
    accelerationPeekArray: null,
    speedArray: null,
    showDashboardBigChart: null
  };

  constructor(public comroadsService: ComroadsService) {
  }

  getState(){
    return this.state;
  }
  setState(stateRecieved) {
    // Graph router values
    this.state.numberOfUsers = stateRecieved.numberOfUsers;
    this.state.numberOfTrips = stateRecieved.numberOfTrips;
    this.state.numberOfReports = stateRecieved.numberOfReports;
    // Data-table values
    this.state.usersTableDataSource = stateRecieved.usersTableDataSource;
    this.state.tripsTableDataSource = stateRecieved.tripsTableDataSource;
    this.state.eventsTableDataSource = stateRecieved.eventsTableDataSource;
    // Paginators values
    this.state.showUsersPaginator = stateRecieved.showUsersPaginator;
    this.state.usersIndex = stateRecieved.usersIndex;
    this.state.usersLength = stateRecieved.usersLength;
    this.state.paginatorUsersEvent = stateRecieved.paginatorUsersEvent;
    this.state.showTripsPaginator = stateRecieved.showTripsPaginator;
    this.state.tripsIndex = stateRecieved.tripsIndex;
    this.state.tripsLength = stateRecieved.tripsLength;
    this.state.paginatorTripsEvent = stateRecieved.paginatorTripsEvent;
    this.state.showEventsPaginator = stateRecieved.showEventsPaginator;
    this.state.eventsIndex = stateRecieved.eventsIndex;
    this.state.eventsLength = stateRecieved.eventsLength;
    this.state.paginatorEventsEvent = stateRecieved.paginatorEventsEvent;
    // Show divs booleans
    this.state.showUsersTable = stateRecieved.showUsersTable;
    this.state.showTripsTable = stateRecieved.showTripsTable;
    this.state.showEventsTable = stateRecieved.showEventsTable;
    this.state.showTripMaps = stateRecieved.showTripMaps;
    this.state.showTripChart = stateRecieved.showTripChart;
    this.state.showEventMaps = stateRecieved.showEventMaps;
    this.state.showEventChart = stateRecieved.showEventChart;
    //Google maps Variable
    this.state.longitude = stateRecieved.longitude;
    this.state.latitude = stateRecieved.latitude;
    this.state.startingPointLongitude = stateRecieved.startingPointLongitude;
    this.state.startingPointLatitude = stateRecieved.startingPointLatitude;
    this.state.endingPointLongitude = stateRecieved.endingPointLongitude;
    this.state.endingPointLatitude = stateRecieved.endingPointLatitude;
    this.state.zoom = stateRecieved.zoom;
    this.state.GeoJsonToDraw = stateRecieved.GeoJsonToDraw;
    this.state.pointClicked = stateRecieved.pointClicked;
    this.state.pointLatitude = stateRecieved.pointLatitude;
    this.state.pointLongitude = stateRecieved.pointLongitude;
    this.state.EventGeoJsonToDraw = stateRecieved.EventGeoJsonToDraw;
    this.state.EventMapLongitude = stateRecieved.EventMapLongitude;
    this.state.EventMapLatitude = stateRecieved.EventMapLatitude;
    this.state.EventMapZoom = stateRecieved.EventMapZoom;
    // Chart data variables
    this.state.barChartAnalyticData = stateRecieved.barChartAnalyticData;
    this.state.lineChartAccelerationData = stateRecieved.lineChartAccelerationData;
    // Chart Variables
    this.state.lineChartSpeedData = stateRecieved.lineChartSpeedData;
    this.state.eventLineChartAccelerationData = stateRecieved.eventLineChartAccelerationData;
    this.state.eventLineChartSpeedData = stateRecieved.eventLineChartSpeedData;
    // Functional variables
    this.state.uploadList = stateRecieved.uploadList;
    this.state.currentUserId = stateRecieved.currentUserId;
    this.state.currentTripId = stateRecieved.currentTripId;
    this.state.currentUserFirstNameAndLastName = stateRecieved.currentUserFirstNameAndLastName;
    this.state.tripEventJson = stateRecieved.tripEventJson;
    this.state.currentUser = stateRecieved.currentUser;
    this.state.geoJsonResponse = stateRecieved.geoJsonResponse;
    this.state.accelerationAverageArray = stateRecieved.accelerationAverageArray;
    this.state.accelerationPeekArray = stateRecieved.accelerationPeekArray;
    this.state.speedArray = stateRecieved.speedArray;
    this.state.showDashboardBigChart = stateRecieved.showDashboardBigChart;
  }

}
