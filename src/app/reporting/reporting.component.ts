import { Component, OnInit } from '@angular/core';
import { ComroadsService } from '../comroads.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {


  public tableChartData = {
    chartType: 'Table',
    dataTable: [
      ['Users', 'Kilometers', 'Last Login'],
    ],
    formatters: [
      {
        columns: [1, 2],
        type: 'NumberFormat',
        options: {
          negativeColor: '#FF0000', negativeParens: true
        }
      }
    ],
    options: { title: 'Countries', allowHtml: true }
  };
  notCombinedChart = true;
  uploadsCounts = [];
  tripsCounts = [];
  uniqueActiveUsersCounts = [];
  loggedInUsersCounts = [];
  uniqueLoggedInUsersCounts = [];
  failedLoggedInCount = [];
  partitionsList = [];
  reportingFlagsAndDates = {
    daily: false,
    weekly: false,
    monthly: false,
    startTime: '2017-04-22 23:43:04',
    endTime: '2017-04-23 23:43:04'
  };
  todayUsersRegistration = 0;
  barChartUploads = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Events'],
    ],
    options: { 'title': 'Events', 'height': 750 }
  };
  barChartUniiqueActiveUsers = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Unique Active Users'],
    ],
    options: { 'title': 'Unique Active Users', 'height': 750 }
  };
  barChartTrips = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Trips'],
    ],
    options: { 'title': 'Trips', 'height': 750 }
  };

  barChartLoggedInUsers = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Total Logins'],
    ],
    options: { 'title': 'Total Logins', 'height': 750 }
  };
  barChartUniqueLoggedInUsers = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Unique Logged In Users'],
    ],
    options: { 'title': 'Unique Logged In Users', 'height': 750 }
  };
  barChartFailedLoggedIn = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Failed Logged In'],
    ],
    options: { 'title': 'Failed Logged In', 'height': 750 }
  };

  showCharts = false;

  constructor(private comroadsService: ComroadsService) {
  }

  ngOnInit() {
    this.getTodayRegistration();
    this.getTopDrivers();
    this.getMonthlyData();
  }


  initFlags() {
    this.notCombinedChart = true;
    this.barChartUploads = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Task', 'Events'],
      ],
      options: { 'title': 'Events', 'height': 750 }
    };
    this.barChartUniiqueActiveUsers = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Task', 'Unique Active Users'],
      ],
      options: { 'title': 'Unique Active Users', 'height': 750 }
    };
    this.barChartTrips = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Task', 'Trips'],
      ],
      options: { 'title': 'Trips', 'height': 750 }
    };

    this.barChartLoggedInUsers = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Task', 'Total Logins'],
      ],
      options: { 'title': 'Total Logins', 'height': 750 }
    };
    this.barChartUniqueLoggedInUsers = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Task', 'Unique Logged In Users'],
      ],
      options: { 'title': 'Unique Logged In Users', 'height': 750 }
    };
    this.barChartFailedLoggedIn = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Task', 'Failed Logged In'],
      ],
      options: { 'title': 'Failed Logged In', 'height': 750 }
    };
    this.showCharts = false;
    this.reportingFlagsAndDates = {
      daily: false,
      weekly: false,
      monthly: false,
      startTime: '2017-04-22 23:43:04',
      endTime: '2017-04-23 23:43:04'
    };
  }

  getTodayRegistration() {
    this.comroadsService.getUsers().subscribe(data => {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      for(var i in data.users){
        var created = new Date(data.users[i].created);
        if((created.getFullYear() == today.getFullYear())&&(created.getMonth() == today.getMonth())&&(created.getDate() == today.getDate())){
          this.todayUsersRegistration ++;
        }
      }
    });
  }
  getDailyData() {
    this.initFlags();
    this.reportingFlagsAndDates.daily = true;
    configLastMonthDates(this.reportingFlagsAndDates);
    this.comroadsService.getReportingBetweenPeriods(this.reportingFlagsAndDates)
      .subscribe(data => {
        this.uploadsCounts = data.uploadsCounts;
        this.tripsCounts = data.tripsCounts;
        this.uniqueActiveUsersCounts = data.uniqueActiveUsersCounts;
        this.partitionsList = data.partitionsList;
        this.loggedInUsersCounts = data.loggedInUsersCounts;
        this.uniqueLoggedInUsersCounts = data.uniqueLoggedInUsersCounts;
        this.failedLoggedInCount = data.failedLoggedInCount;
        for (var i in this.partitionsList) {
          var dateToInsert = new Date(this.partitionsList[i]);
          var dataUploads = [(dateToInsert.getMonth() + 1) + '/' + dateToInsert.getDate(), this.uploadsCounts[i]];
          var dataTrips = [(dateToInsert.getMonth() + 1) + '/' + dateToInsert.getDate(), this.tripsCounts[i]];
          var dataUniqueActiveUsers = [(dateToInsert.getMonth() + 1) + '/' + dateToInsert.getDate(), this.uniqueActiveUsersCounts[i]];
          var dataLoggedInUsers = [(dateToInsert.getMonth() + 1) + '/' + dateToInsert.getDate(), this.loggedInUsersCounts[i]];
          var dataUniqueLoggedInUsers = [(dateToInsert.getMonth() + 1) + '/' + dateToInsert.getDate(), this.uniqueLoggedInUsersCounts[i]];
          var dataFailedLoggedIn = [(dateToInsert.getMonth() + 1) + '/' + dateToInsert.getDate(), this.failedLoggedInCount[i]];
          this.barChartUploads.dataTable.push(dataUploads);
          this.barChartTrips.dataTable.push(dataTrips);
          this.barChartUniiqueActiveUsers.dataTable.push(dataUniqueActiveUsers);
          this.barChartLoggedInUsers.dataTable.push(dataLoggedInUsers);
          this.barChartUniqueLoggedInUsers.dataTable.push(dataUniqueLoggedInUsers);
          this.barChartFailedLoggedIn.dataTable.push(dataFailedLoggedIn);
          this.showCharts = true;
        }
        this.showCharts = true;
      }
      );
  }

  getWeeklyData() {
    this.initFlags();
    this.reportingFlagsAndDates.weekly = true;
    configCurrentYearDates(this.reportingFlagsAndDates);
    this.comroadsService.getReportingBetweenPeriods(this.reportingFlagsAndDates)
      .subscribe(data => {
        this.uploadsCounts = data.uploadsCounts;
        this.tripsCounts = data.tripsCounts;
        this.uniqueActiveUsersCounts = data.uniqueActiveUsersCounts;
        this.loggedInUsersCounts = data.loggedInUsersCounts;
        this.uniqueLoggedInUsersCounts = data.uniqueLoggedInUsersCounts;
        this.failedLoggedInCount = data.failedLoggedInCount;
        this.partitionsList = data.partitionsList;

        for (var i in this.partitionsList) {
          var dataUploads = [this.partitionsList[i], this.uploadsCounts[i]];
          var dataTrips = [this.partitionsList[i], this.tripsCounts[i]];
          var dataUniqueActiveUsers = [this.partitionsList[i], this.uniqueActiveUsersCounts[i]];
          var dataLoggedInUsers = [this.partitionsList[i], this.loggedInUsersCounts[i]];
          var dataUniqueLoggedInUsers = [this.partitionsList[i], this.uniqueLoggedInUsersCounts[i]];
          var dataFailedLoggedIn = [this.partitionsList[i], this.failedLoggedInCount[i]];

          this.barChartUploads.dataTable.push(dataUploads);
          this.barChartTrips.dataTable.push(dataTrips);
          this.barChartUniiqueActiveUsers.dataTable.push(dataUniqueActiveUsers);
          this.barChartLoggedInUsers.dataTable.push(dataLoggedInUsers);
          this.barChartUniqueLoggedInUsers.dataTable.push(dataUniqueLoggedInUsers);
          this.barChartFailedLoggedIn.dataTable.push(dataFailedLoggedIn);
          this.showCharts = true;
        }
        this.showCharts = true;

      }
      );
  }

  lastWeekInCsv() {
    this.comroadsService.lastWeekData()
      .subscribe(data => {
        var options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          showTitle: false,
          useBom: false,
          noDownload: false,
          headers: ['User ID', 'Login Count', 'Trip Count', 'Trip Duration', 'Event Count', 'Total Distance', 'Last Login', 'Last Trip', 'Last Event']
        };

        for (var i in data.results) {
          if (data.results[i].lastLoginDate == 0) {
            data.results[i].lastLoginDate = '';
          } else {
            var date = sqlDateTime(data.results[i].lastLoginDate);
            data.results[i].lastLoginDate = date;
          }
          if (data.results[i].lastTripDate == 0) {
            data.results[i].lastTripDate = '';
          } else {
            var date = sqlDateTime(data.results[i].lastTripDate);
            data.results[i].lastTripDate = date;
          }
          if (data.results[i].lastEventDate == 0) {
            data.results[i].lastEventDate = '';
          } else {
            var date = sqlDateTime(data.results[i].lastEventDate);
            data.results[i].lastEventDate = date;
          }
          if (data.results[i].tripsDuration != 0) {
            data.results[i].tripsDuration = milisecondToHoursMinutes(data.results[i].tripsDuration);
          }


        }
        new Angular5Csv(data.results, 'Last Week ' + sqlDateTime(new Date()), options);

      }
      );
  }

  getMonthlyData() {
    this.initFlags();
    this.reportingFlagsAndDates.monthly = true;
    configCurrentYearDates(this.reportingFlagsAndDates);
    this.comroadsService.getReportingBetweenPeriods(this.reportingFlagsAndDates)
      .subscribe(data => {
        this.uploadsCounts = data.uploadsCounts;
        this.tripsCounts = data.tripsCounts;
        this.uniqueActiveUsersCounts = data.uniqueActiveUsersCounts;
        this.loggedInUsersCounts = data.loggedInUsersCounts;
        this.uniqueLoggedInUsersCounts = data.uniqueLoggedInUsersCounts;
        this.failedLoggedInCount = data.failedLoggedInCount;
        this.partitionsList = data.partitionsList;

        for (var i in this.partitionsList) {
          var dataUploads = [this.partitionsList[i], this.uploadsCounts[i]];
          var dataTrips = [this.partitionsList[i], this.tripsCounts[i]];
          var dataUniqueActiveUsers = [this.partitionsList[i], this.uniqueActiveUsersCounts[i]];
          var dataLoggedInUsers = [this.partitionsList[i], this.loggedInUsersCounts[i]];
          var dataUniqueLoggedInUsers = [this.partitionsList[i], this.uniqueLoggedInUsersCounts[i]];
          var dataFailedLoggedIn = [this.partitionsList[i], this.failedLoggedInCount[i]];

          this.barChartUploads.dataTable.push(dataUploads);
          this.barChartTrips.dataTable.push(dataTrips);
          this.barChartUniiqueActiveUsers.dataTable.push(dataUniqueActiveUsers);
          this.barChartLoggedInUsers.dataTable.push(dataLoggedInUsers);
          this.barChartUniqueLoggedInUsers.dataTable.push(dataUniqueLoggedInUsers);
          this.barChartFailedLoggedIn.dataTable.push(dataFailedLoggedIn);
          this.showCharts = true;
        }
        this.showCharts = true;

      }
      );
  }

  combineCharts() {
    this.notCombinedChart = false;
    this.showCharts = false;
    this.barChartUploads = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Task', 'Events', 'Unique Active Users', 'Trips', 'Total Logins', 'Unique Logged In Users', 'Failed Logged In'],
      ],
      options: { 'title': 'Comroads General Data', 'height': 750 }
    };

    for (var i in this.partitionsList) {
      var comroadsData = [this.partitionsList[i], this.uploadsCounts[i], this.uniqueActiveUsersCounts[i], this.tripsCounts[i], this.loggedInUsersCounts[i], this.uniqueLoggedInUsersCounts[i], this.failedLoggedInCount[i]];
      this.barChartUploads.dataTable.push(comroadsData);
      this.showCharts = true;
    }
  }

  getTopDrivers() {
    this.comroadsService.getTopDrivers().subscribe(data => {
      for (var i in data.names) {
        this.tableChartData.dataTable.push([data.names[i], data.kilometers[i], new Date(data.lastLoginDate[i])]);
      }

    });
  }
}

var configLastMonthDates = function (reportingFlagsAndDates) {
  var today = new Date();
  today.setDate(today.getDate() + 1);
  today.setHours(2);
  today.setMinutes(0);
  today.setSeconds(0);
  reportingFlagsAndDates.endTime = sqlDateTime(today);

  var lastMonth = today;
  lastMonth.setDate(lastMonth.getDate() - 30);
  reportingFlagsAndDates.startTime = sqlDateTime(lastMonth);
};

var configCurrentYearDates = function (reportingFlagsAndDates) {
  var today = new Date();
  today.setDate(today.getDate() + 1);
  today.setHours(2);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMonth(1);
  today.setDate(0);
  reportingFlagsAndDates.startTime = sqlDateTime(today);

  var lastYear = today;
  lastYear.setFullYear(lastYear.getFullYear() + 1);
  reportingFlagsAndDates.endTime = sqlDateTime(lastYear);
};
var sqlDateTime = function (date) {
  var dt = new Date(date);
  return dt.getFullYear() +
    '-' + (dt.getMonth() + 1) +
    '-' + dt.getDate() +
    ' ' + dt.getHours() +
    ':' + dt.getMinutes() +
    ':' + dt.getSeconds();
};

var configLastWeeksDates = function (reportingFlagsAndDates) {
  var today = new Date();
  today.setDate(today.getDate() + 1);
  today.setHours(2);
  today.setMinutes(0);
  today.setSeconds(0);
  reportingFlagsAndDates.endTime = sqlDateTime(today);

  var lastWeek = today;
  lastWeek.setDate(lastWeek.getDate() - 7);
  reportingFlagsAndDates.startTime = sqlDateTime(lastWeek);
};

var milisecondToHoursMinutes = function (time) {
  var date = new Date(time);
  var hours = date.getHours();
  var minutes = date.getMinutes();

  hours += (date.getDate() - 1) * 24;

  return hours + ":" + minutes;
};
