import {Injectable} from '@angular/core';

@Injectable()
export class ComroadsFunctionsService {

  getAccPeekArrayFromSamples(samplesArray) {
    var peekArray = [];
    for (var i in samplesArray) {
      if (samplesArray[i] != null) {
        peekArray.push(Math.sqrt(Math.pow(samplesArray[i].sample.accelPeakX, 2) + Math.pow(samplesArray[i].sample.accelPeakY, 2) + Math.pow(samplesArray[i].sample.accelPeakZ, 2)));
      }
    }
    return peekArray;
  }

  getAccAvgArrayFromSamples(samplesArray) {
    var avgArray = [];
    for (var i in samplesArray) {
      if (samplesArray[i] != null) {
        avgArray.push(Math.sqrt(Math.pow(samplesArray[i].sample.accelAvgX, 2) + Math.pow(samplesArray[i].sample.accelAvgY, 2) + Math.pow(samplesArray[i].sample.accelAvgZ, 2)));
      }
    }
    return avgArray;
  }

  getSpeedArrayFromSamples(samplesArray) {
    var speedArray = [];
    for (var i in samplesArray) {
      if (samplesArray[i] != null) {
        speedArray.push(samplesArray[i].sample.speed * 3.6);
      }
    }
    return speedArray;
  }

  buildGeoJsonFromSamplesArray(samplesArray) {
    var geoJsonToReturn = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': []
          },
          'properties': {
            'strokeColor': "#130bda"
          }
        }]
    };
    for (var i in samplesArray) {
      if (samplesArray[i] != null) {
        var long = parseFloat(samplesArray[i].sample.longitude);
        var lat = parseFloat(samplesArray[i].sample.latitude);
        geoJsonToReturn.features[0].geometry.coordinates.push([long, lat]);
      }
    }
    return geoJsonToReturn;
  }
  buildOrangeGeoJsonFromSamplesArray(samplesArray) {
    var geoJsonToReturn = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': []
          },
          'properties': {
            'strokeColor': 'orange'
          }
        }]
    };
    for (var i in samplesArray) {
      var long = parseFloat(samplesArray[i].sample.longitude);
      var lat = parseFloat(samplesArray[i].sample.latitude);
      geoJsonToReturn.features[0].geometry.coordinates.push([long, lat]);
    }
    return geoJsonToReturn;
  }

  getGoogleZoom(trip) {
    var zoom;
    var hight = trip.top_west_latitude - trip.buttom_east_latitude;
    var width = trip.buttom_east_longitude - trip.top_west_longitude;
    if ((width * 111) > (hight * 111)) {
      zoom = this.checkGoogleZoom(width * 111);
    } else {
      zoom = this.checkGoogleZoom(hight * 111);
    }
    return zoom;
  }

  ZoomArray = [21.282, 16.355, 10.064, 5.540, 2.909, 1.485, 752, 378, 190, 98, 48, 24, 12, 6, 3, 1.48, 0.74, 0.37, 0.19];

  checkGoogleZoom(number) {
    var zoom;
    for (var i = this.ZoomArray.length; i > 0; i--) {
      if (number < this.ZoomArray[i]) {
        zoom = i;
        break;
      }
    }
    return zoom;
  }

  dateEquals(fisrtDate, secondDate) {
    if ((fisrtDate.getUTCFullYear() == secondDate.getUTCFullYear()) &&
      (fisrtDate.getUTCMonth() == secondDate.getUTCMonth()) &&
      (fisrtDate.getDay() == secondDate.getDay()) &&
      (fisrtDate.getUTCHours() == secondDate.getUTCHours()) &&
      (fisrtDate.getUTCMinutes() == secondDate.getUTCMinutes()) &&
      (fisrtDate.getUTCSeconds() == secondDate.getUTCSeconds())) {
      return true;
    } else {
      return false;
    }
  }

  dateSmaller(firstDate, secondDate) {
    if ((firstDate.getUTCFullYear() < secondDate.getUTCFullYear()) ||
      ((firstDate.getUTCFullYear() == secondDate.getUTCFullYear()) && (firstDate.getUTCMonth() < secondDate.getUTCMonth())) ||
      ((firstDate.getUTCFullYear() == secondDate.getUTCFullYear()) && (firstDate.getUTCMonth() == secondDate.getUTCMonth()) && (firstDate.getDay() < secondDate.getDay())) ||
      ((firstDate.getUTCFullYear() == secondDate.getUTCFullYear()) && (firstDate.getUTCMonth() == secondDate.getUTCMonth()) && (firstDate.getDay() == secondDate.getDay()) && (firstDate.getUTCHours() < secondDate.getUTCHours())) ||
      ((firstDate.getUTCFullYear() == secondDate.getUTCFullYear()) && (firstDate.getUTCMonth() == secondDate.getUTCMonth()) && (firstDate.getDay() == secondDate.getDay()) && (firstDate.getUTCHours() == secondDate.getUTCHours()) && (firstDate.getUTCMinutes() < secondDate.getUTCMinutes())) ||
      ((firstDate.getUTCFullYear() == secondDate.getUTCFullYear()) && (firstDate.getUTCMonth() == secondDate.getUTCMonth()) && (firstDate.getDay() == secondDate.getDay()) && (firstDate.getUTCHours() == secondDate.getUTCHours()) && (firstDate.getUTCMinutes() == secondDate.getUTCMinutes()) && (firstDate.getUTCSeconds() < secondDate.getUTCSeconds()))) {
      return true;
    } else {
      return false;
    }
  }

  getGeoBoxFromLngLatArray(samplesArray) {
    var mTopWestLongitude = 0;
    var mTopWestLatitude = 0;
    var mButtomEastLongitude = 0;
    var mButtomEastLatitude = 0;
    var longitude;
    var latitude;
    for (var i in samplesArray) {
      if (samplesArray[i] != null) {
        var tmpLongitude = samplesArray[i].sample.longitude;
        var tmpLatitude = samplesArray[i].sample.latitude;

        if (mTopWestLatitude == 0 && mTopWestLongitude == 0 && mButtomEastLatitude == 0 && mButtomEastLongitude == 0) {
          mTopWestLatitude = tmpLatitude;
          mTopWestLongitude = tmpLongitude;
          mButtomEastLatitude = mTopWestLatitude;
          mButtomEastLongitude = mTopWestLongitude;
        } else {
          if (tmpLatitude < mButtomEastLatitude) {
            mButtomEastLatitude = tmpLatitude;
          }
          if (tmpLatitude > mTopWestLatitude) {
            mTopWestLatitude = tmpLatitude;
          }
          if (tmpLongitude > mButtomEastLongitude) {
            mButtomEastLongitude = tmpLongitude;
          }
          if (tmpLongitude < mTopWestLongitude) {
            mTopWestLongitude = tmpLongitude;
          }
        }
      }
    }

    longitude = (mTopWestLongitude + mButtomEastLongitude) / 2;
    latitude = (mTopWestLatitude + mButtomEastLatitude) / 2;
    var zoom;
    var hight = mTopWestLatitude - mButtomEastLatitude;
    var width = mButtomEastLongitude - mTopWestLongitude;
    if ((width * 111) > (hight * 111)) {
      zoom = this.checkGoogleZoom(width * 111);
    } else {
      zoom = this.checkGoogleZoom(hight * 111);
    }
    var googleCoordinate = {
      longitude: longitude,
      latitude: latitude,
      zoom: zoom
    };
    return googleCoordinate;
  }

  getDisplayName(usr) {
    var displayedName = '';
    if ((usr.first_name != '') && (usr.last_name != '')) {
      displayedName = ' ' + usr.first_name + ' ' + usr.last_name;
    } else {
      displayedName = usr.email;
    }
    return displayedName;
  }
}
