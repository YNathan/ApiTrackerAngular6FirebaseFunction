import {Component, OnInit} from '@angular/core';
import {ComroadsFunctionsService} from '../comroadsFunctions.service';
import {ComroadsService} from '../comroads.service';
import {PlatformLocation} from '@angular/common';
import {ComroadsObjects} from '../comroadsObjects.service';
import {ComroadsState} from '../ComroadsState';

@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit {
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
  userToDisplayAsTitle: string;
  tripToDisplayAsTitle: string;
  eventToDisplayAsTitle: string;
  // Little Charts for event
  eventLineChartSpeedData = {
    chartType: 'LineChart',
    dataTable: [['a', 'Speed']],
    options: {'title': 'Speed'},
  };
  eventLineChartAccelerationData = {
    chartType: 'LineChart',
    dataTable: [['names', 'Average', 'Peak']],
    options: {'title': 'Acceleration'},
  };


  constructor(private comroadsService: ComroadsService, private cgf: ComroadsFunctionsService, location: PlatformLocation, public cro: ComroadsObjects, public ct:ComroadsState) {

    location.onPopState(() => {
      this.ct.isBackPressed = true;
    });
    for (var i in this.cro.eventAccAvgArr) {
      if (this.cro.eventSamples[i] != null) {
        this.eventLineChartAccelerationData.dataTable.push([this.cro.eventSamples[i].sample.time, this.cro.eventAccAvgArr[i], this.cro.eventAccPeekArr[i]]);
        this.eventLineChartSpeedData.dataTable.push([this.cro.eventSamples[i].sample.time, this.cro.eventSpeedArr[i]]);
      }
    }

    this.userToDisplayAsTitle = 'User: ' + this.cro.user.users_id + ', Name ' + this.cgf.getDisplayName(this.cro.user) + '.';

    if (this.cro.trip == null) {
      this.tripToDisplayAsTitle = 'No Trip Related Found';
    } else {
      this.tripToDisplayAsTitle = 'Trip: ' + this.cro.trip.trip_id + ', ' + new Date(this.cro.trip.time_start).toLocaleTimeString() + ' to ' + new Date(this.cro.trip.time_end).toLocaleTimeString() + '.';
    }

    if (this.cro.event.location == null) {
      this.eventToDisplayAsTitle = 'The Event Occurred At ' + this.cro.event.date + ' .';
    } else {
      this.eventToDisplayAsTitle = 'The Event Occurred At ' + this.cro.event.date + ' in ' + this.cro.event.location + ' .';
    }


  }

  ngOnInit() {
  }

}
