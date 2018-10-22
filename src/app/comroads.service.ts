
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class ComroadsService {
  //public serveIpAndPortUrl = 'http://10.0.0.4:5000';
 // public serveIpAndPortUrl = 'http://api.comroads.com:5611';
  //public serveIpAndPortUrl = 'http://192.168.252.10:5611';

  public serveIpAndPortUrl = 'https://us-central1-monitorfrontend.cloudfunctions.net/api';

  private postTripReports = this.serveIpAndPortUrl + '/report_of_trip';
  private getDataAnalyricUrl = this.serveIpAndPortUrl + '/all_data';
  private getEventsPointsUrl = this.serveIpAndPortUrl + '/get_events_points';
  private getTripOfEventUrl = this.serveIpAndPortUrl + '/get_trip_of_event';
  private getSignedUrlForEventUrl = this.serveIpAndPortUrl + '/get_signed_url_for_event';
  private getReportingBetweenPeriodUrl = this.serveIpAndPortUrl + '/reporting_between_period';
  private getResultsSearchUrl = this.serveIpAndPortUrl + '/search';
  private getTopDriversUrl = this.serveIpAndPortUrl + '/top_drivers';
  private getLastWeekDataUrl = this.serveIpAndPortUrl + '/last_week_data';
  private getStartSimulatorUrl = this.serveIpAndPortUrl + '/simulate';
  private getStopSimulatorUrl = this.serveIpAndPortUrl + '/stop_simulator';
  private getCurrentTripsReportsUrl = this.serveIpAndPortUrl + '/current_trips';
  private getUsersUrl = this.serveIpAndPortUrl + '/users';


  constructor(private Http: Http) {
  }

  getUsers() {
    return this.Http.get(this.getUsersUrl).pipe(map(function (data) {
      return data.json();
    }));
  }

  currentTripGeoJsons() {
    return this.Http.get(this.getCurrentTripsReportsUrl).pipe(map(function (data) {
      return data.json();
    }));
  }

  startSimulator(params) {
    return this.Http.post(this.getStartSimulatorUrl, params).pipe(map(function (data) {
      return data.json();
    }));
  }

  stopSimulator() {
    return this.Http.get(this.getStopSimulatorUrl).pipe(map(function (data) {
      return data.json();
    }));
  }

  search(req) {
    return this.Http.post(this.getResultsSearchUrl, req).pipe(map(function (data) {
      return data.json();
    }));
  }

  lastWeekData() {
    return this.Http.get(this.getLastWeekDataUrl).pipe(map(function (data) {
      return data.json();
    }));
  }

  getTopDrivers() {
    return this.Http.get(this.getTopDriversUrl).pipe(map(function (data) {
      return data.json();
    }));
  }

  getReportingBetweenPeriods(req) {
    return this.Http.post(this.getReportingBetweenPeriodUrl, req).pipe(map(function (data) {
      return data.json();

    }));
  }

  getEventsPoints() {
    return this.Http.get(this.getEventsPointsUrl).pipe(map(function (data) {
      return data.json();

    }));
  }

  getTripOfEvent(eventIndexes) {
    return this.Http.post(this.getTripOfEventUrl, eventIndexes).pipe(map(function (data) {
      return data.json();

    }));
  }

  getSamplesArrayOfTrip(trip) {
    return this.Http.post(this.postTripReports, trip).pipe(map(function (data) {
      return data.json();
    }));
  }


  getDataAnalytic() {
    return this.Http.get(this.getDataAnalyricUrl).pipe(map(function (data) {
      return data.json();

    }));
  }

  getSignedUrlForUpload(upload) {
    return this.Http.post(this.getSignedUrlForEventUrl, upload).pipe(map(function (data) {
      return data.json();

    }));
  }

}
