import {Component, OnInit, OnDestroy} from '@angular/core';
import {ComroadsService} from '../comroads.service';
import {} from '@types/googlemaps';
import Feature = google.maps.Data.Feature;
import {ComroadsFunctionsService} from '../comroadsFunctions.service';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit, OnDestroy {

  blue_line_count: number;
  orange_line_count: number;

  zoom = 13;
  latitude = 31.767493;
  longitude = 35.198666;
  carsLngLat = [];
  interval: any;
  simulatorStarted = false;
  blueLineGeoJson: any;
  orangeLineGeoJson: any;


  constructor(private comroadsService: ComroadsService, private cgf: ComroadsFunctionsService) {
  }

  ngOnInit() {
    this.getSimulatorsCars();
    this.blue_line_count = 0;
    this.orange_line_count = 0;
    this.interval = setInterval(() => {
      this.getSimulatorsCars();
    }, 10000);


    this.blueLineGeoJson = this.cgf.buildGeoJsonFromSamplesArray(this.blueLine.samples);

    this.orangeLineGeoJson = this.cgf.buildOrangeGeoJsonFromSamplesArray(this.orangeLine.samples);

  }

  startSimulator() {
    var simulatorParams = {
      blue_line_count: this.blue_line_count,
      orange_line_count: this.orange_line_count
    };
    this.comroadsService.startSimulator(simulatorParams)
      .subscribe(data => {
          this.simulatorStarted = true;
        }
      );
  }


  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  stopSimulator() {
    this.comroadsService.stopSimulator()
      .subscribe(data => {
          this.simulatorStarted = false;
        }
      );
  }


  carNumbers;

  getSimulatorsCars() {
    this.carNumbers = this.blue_line_count;
    this.comroadsService.currentTripGeoJsons().subscribe(data => {
        this.carsLngLat = [];
        for (var i in data.vehicules) {
          if (data.vehicules[i].samples.length > 0) {
            var carLocation = {
              carNumber: '' + data.vehicules[i].user.users_id + '',
              longitude: parseFloat(data.vehicules[i].samples[(data.vehicules[i].samples.length - 1)].sample.longitude),
              latitude: parseFloat(data.vehicules[i].samples[(data.vehicules[i].samples.length - 1)].sample.latitude)
            };
            this.carsLngLat.push(carLocation);
          }
          if (data.vehicules[i].samples.length == 0) {
            var carLocation = {
              carNumber: '' + data.vehicules[i].user.users_id + '',
              longitude: 35.198666,
              latitude: 31.767493
            };
            this.carsLngLat.push(carLocation);
          }
        }

      }
    );
  }


  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.startSimulator();
    }
  }

  getColor(feat: Feature) {
    return {strokeColor: feat.getProperty('strokeColor')};
  }

  blueLine = {
    'code': 200,
    'user': {
      'users_id': 53,
      'first_name': 'oneplus5',
      'last_name': '',
      'email': 'comroads@gmail.com',
      'password': '12345',
      'created': '2018-03-12T13:30:34.000Z',
      'modified': '2018-03-12T13:30:34.000Z'
    },
    'samples': [
      {
        'reportNumber': 195,
        'sampleNumber': 1,
        'sample': {
          'speed': 3.450000047683716,
          'longitude': 35.19866943359375,
          'latitude': 31.76756477355957,
          'accelAvgX': 0.9420584440231323,
          'accelAvgY': 8.985079765319824,
          'accelAvgZ': 3.005868673324585,
          'accelPeakX': 1.805419921875,
          'accelPeakY': 9.676010131835938,
          'accelPeakZ': 0.7353057861328125,
          'time': '2018-05-14T09:56:42.000Z'
        }
      },

      {
        'reportNumber': 134,
        'sampleNumber': 1,
        'sample': {
          'speed': 9.5600004196167,
          'longitude': 35.19740295410156,
          'latitude': 31.76805877685547,
          'accelAvgX': 1.9298566579818726,
          'accelAvgY': 9.266817092895508,
          'accelAvgZ': 1.524911880493164,
          'accelPeakX': 2.231292724609375,
          'accelPeakY': 9.79937744140625,
          'accelPeakZ': 2.5337066650390625,
          'time': '2018-05-14T09:08:49.000Z'
        }
      },
      {
        'reportNumber': 134,
        'sampleNumber': 2,
        'sample': {
          'speed': 9.430000305175781,
          'longitude': 35.197181701660156,
          'latitude': 31.76841926574707,
          'accelAvgX': 0.6291173696517944,
          'accelAvgY': 9.40388011932373,
          'accelAvgZ': 1.2569293975830078,
          'accelPeakX': 0.355377197265625,
          'accelPeakY': 10.43328857421875,
          'accelPeakZ': 1.384552001953125,
          'time': '2018-05-14T09:08:54.000Z'
        }
      },
      {
        'reportNumber': 134,
        'sampleNumber': 3,
        'sample': {
          'speed': 7.420000076293945,
          'longitude': 35.19706726074219,
          'latitude': 31.768779754638672,
          'accelAvgX': 0.7313562035560608,
          'accelAvgY': 9.528754234313965,
          'accelAvgZ': 1.7430074214935303,
          'accelPeakX': 0.462158203125,
          'accelPeakY': 10.261627197265625,
          'accelPeakZ': 2.9334869384765625,
          'time': '2018-05-14T09:08:59.000Z'
        }
      },
      {
        'reportNumber': 134,
        'sampleNumber': 4,
        'sample': {
          'speed': 9.369999885559082,
          'longitude': 35.197021484375,
          'latitude': 31.769145965576172,
          'accelAvgX': 0.2371482253074646,
          'accelAvgY': 9.524571418762207,
          'accelAvgZ': 0.872314453125,
          'accelPeakX': 1.0805816650390625,
          'accelPeakY': 9.682891845703125,
          'accelPeakZ': 3.350250244140625,
          'time': '2018-05-14T09:09:04.000Z'
        }
      },
      {
        'reportNumber': 134,
        'sampleNumber': 5,
        'sample': {
          'speed': 5.170000076293945,
          'longitude': 35.1970329284668,
          'latitude': 31.769500732421875,
          'accelAvgX': 0.4657481908798218,
          'accelAvgY': 9.269454956054688,
          'accelAvgZ': 1.9920953512191772,
          'accelPeakX': 1.2460784912109375,
          'accelPeakY': 10.010177612304688,
          'accelPeakZ': 3.5009765625,
          'time': '2018-05-14T09:09:09.000Z'
        }
      },
      {
        'reportNumber': 134,
        'sampleNumber': 6,
        'sample': {
          'speed': 2.890000104904175,
          'longitude': 35.19707489013672,
          'latitude': 31.769685745239258,
          'accelAvgX': 0.7061276435852051,
          'accelAvgY': 9.097893714904785,
          'accelAvgZ': 2.621535301208496,
          'accelPeakX': 1.481842041015625,
          'accelPeakY': 9.023712158203125,
          'accelPeakZ': 3.396575927734375,
          'time': '2018-05-14T09:09:14.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 0,
        'sample': {
          'speed': 1.8600000143051147,
          'longitude': 35.19712448120117,
          'latitude': 31.7697811126709,
          'accelAvgX': 0.820959746837616,
          'accelAvgY': 9.112959861755371,
          'accelAvgZ': 2.470867156982422,
          'accelPeakX': 0.4178009033203125,
          'accelPeakY': 9.786376953125,
          'accelPeakZ': 0.2203216552734375,
          'time': '2018-05-14T09:09:19.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 1,
        'sample': {
          'speed': 5.960000038146973,
          'longitude': 35.19709777832031,
          'latitude': 31.7699031829834,
          'accelAvgX': -0.1796237826347351,
          'accelAvgY': 9.3143949508667,
          'accelAvgZ': 1.9395664930343628,
          'accelPeakX': -1.4658966064453125,
          'accelPeakY': 9.72802734375,
          'accelPeakZ': 1.4333343505859375,
          'time': '2018-05-14T09:09:24.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 2,
        'sample': {
          'speed': 10.350000381469727,
          'longitude': 35.19682312011719,
          'latitude': 31.770225524902344,
          'accelAvgX': 0.6900085210800171,
          'accelAvgY': 9.556204795837402,
          'accelAvgZ': 0.7393959760665894,
          'accelPeakX': 1.2487640380859375,
          'accelPeakY': 10.16790771484375,
          'accelPeakZ': 3.94952392578125,
          'time': '2018-05-14T09:09:29.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 3,
        'sample': {
          'speed': 7.760000228881836,
          'longitude': 35.19662857055664,
          'latitude': 31.770606994628906,
          'accelAvgX': 1.3489127159118652,
          'accelAvgY': 8.988367080688477,
          'accelAvgZ': 2.862977981567383,
          'accelPeakX': 1.2581024169921875,
          'accelPeakY': 9.401641845703125,
          'accelPeakZ': 3.1452484130859375,
          'time': '2018-05-14T09:09:34.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 4,
        'sample': {
          'speed': 9.680000305175781,
          'longitude': 35.19651412963867,
          'latitude': 31.77095603942871,
          'accelAvgX': 0.6237081289291382,
          'accelAvgY': 9.153532981872559,
          'accelAvgZ': 2.2400567531585693,
          'accelPeakX': 1.703369140625,
          'accelPeakY': 10.236312866210938,
          'accelPeakZ': 4.0558319091796875,
          'time': '2018-05-14T09:09:39.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 5,
        'sample': {
          'speed': 6.510000228881836,
          'longitude': 35.19632339477539,
          'latitude': 31.77122688293457,
          'accelAvgX': -2.061432123184204,
          'accelAvgY': 9.086671829223633,
          'accelAvgZ': 3.8306469917297363,
          'accelPeakX': -2.9064788818359375,
          'accelPeakY': 9.155746459960938,
          'accelPeakZ': 4.4919281005859375,
          'time': '2018-05-14T09:09:44.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 6,
        'sample': {
          'speed': 10.289999961853027,
          'longitude': 35.19601058959961,
          'latitude': 31.770984649658203,
          'accelAvgX': -0.8321323990821838,
          'accelAvgY': 9.187685012817383,
          'accelAvgZ': 3.0836093425750732,
          'accelPeakX': -0.5077362060546875,
          'accelPeakY': 9.69677734375,
          'accelPeakZ': 3.4289093017578125,
          'time': '2018-05-14T09:09:49.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 7,
        'sample': {
          'speed': 8.579999923706055,
          'longitude': 35.19594192504883,
          'latitude': 31.770584106445312,
          'accelAvgX': 1.2198532819747925,
          'accelAvgY': 8.950411796569824,
          'accelAvgZ': 2.989252805709839,
          'accelPeakX': -0.4449462890625,
          'accelPeakY': 9.16748046875,
          'accelPeakZ': 3.9423370361328125,
          'time': '2018-05-14T09:09:54.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 8,
        'sample': {
          'speed': 6.78000020980835,
          'longitude': 35.1959114074707,
          'latitude': 31.770254135131836,
          'accelAvgX': 0.8942182064056396,
          'accelAvgY': 9.008118629455566,
          'accelAvgZ': 2.8366611003875732,
          'accelPeakX': 1.361236572265625,
          'accelPeakY': 9.0281982421875,
          'accelPeakZ': 3.4985198974609375,
          'time': '2018-05-14T09:09:59.000Z'
        }
      },
      {
        'reportNumber': 135,
        'sampleNumber': 9,
        'sample': {
          'speed': 6.690000057220459,
          'longitude': 35.19587326049805,
          'latitude': 31.769973754882812,
          'accelAvgX': 0.24444878101348877,
          'accelAvgY': 9.180259704589844,
          'accelAvgZ': 2.262059211730957,
          'accelPeakX': 1.4162445068359375,
          'accelPeakY': 8.676910400390625,
          'accelPeakZ': 4.6022491455078125,
          'time': '2018-05-14T09:10:04.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 0,
        'sample': {
          'speed': 8.25,
          'longitude': 35.195823669433594,
          'latitude': 31.769590377807617,
          'accelAvgX': 1.8212757110595703,
          'accelAvgY': 8.973638534545898,
          'accelAvgZ': 2.5643248558044434,
          'accelPeakX': 1.939971923828125,
          'accelPeakY': 9.249847412109375,
          'accelPeakZ': 3.143157958984375,
          'time': '2018-05-14T09:10:09.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 1,
        'sample': {
          'speed': 10.800000190734863,
          'longitude': 35.19580841064453,
          'latitude': 31.769207000732422,
          'accelAvgX': 0.49734896421432495,
          'accelAvgY': 9.391825675964355,
          'accelAvgZ': 1.2047725915908813,
          'accelPeakX': -1.9986114501953125,
          'accelPeakY': 9.556594848632812,
          'accelPeakZ': 3.015899658203125,
          'time': '2018-05-14T09:10:14.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 2,
        'sample': {
          'speed': 12.600000381469727,
          'longitude': 35.19579315185547,
          'latitude': 31.768640518188477,
          'accelAvgX': 1.0673140287399292,
          'accelAvgY': 8.999177932739258,
          'accelAvgZ': 2.6653666496276855,
          'accelPeakX': 1.1021270751953125,
          'accelPeakY': 9.460464477539062,
          'accelPeakZ': 2.98065185546875,
          'time': '2018-05-14T09:10:19.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 3,
        'sample': {
          'speed': 12.25,
          'longitude': 35.19581604003906,
          'latitude': 31.768089294433594,
          'accelAvgX': 0.35885757207870483,
          'accelAvgY': 9.06651496887207,
          'accelAvgZ': 2.9882419109344482,
          'accelPeakX': 0.8343963623046875,
          'accelPeakY': 9.44970703125,
          'accelPeakZ': 2.6707763671875,
          'time': '2018-05-14T09:10:24.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 4,
        'sample': {
          'speed': 11.800000190734863,
          'longitude': 35.196067810058594,
          'latitude': 31.767595291137695,
          'accelAvgX': 0.6577706336975098,
          'accelAvgY': 9.021873474121094,
          'accelAvgZ': 2.8545050621032715,
          'accelPeakX': 0.7586822509765625,
          'accelPeakY': 9.627532958984375,
          'accelPeakZ': 2.8820037841796875,
          'time': '2018-05-14T09:10:29.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 5,
        'sample': {
          'speed': 13.1899995803833,
          'longitude': 35.19647216796875,
          'latitude': 31.767181396484375,
          'accelAvgX': 1.0212730169296265,
          'accelAvgY': 9.2452974319458,
          'accelAvgZ': 1.8449989557266235,
          'accelPeakX': 1.661529541015625,
          'accelPeakY': 9.292221069335938,
          'accelPeakZ': 2.539337158203125,
          'time': '2018-05-14T09:10:34.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 6,
        'sample': {
          'speed': 10.970000267028809,
          'longitude': 35.196929931640625,
          'latitude': 31.766786575317383,
          'accelAvgX': 1.1859601736068726,
          'accelAvgY': 8.975210189819336,
          'accelAvgZ': 3.2044131755828857,
          'accelPeakX': 1.494232177734375,
          'accelPeakY': 9.364639282226562,
          'accelPeakZ': 2.6927490234375,
          'time': '2018-05-14T09:10:39.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 7,
        'sample': {
          'speed': 7.619999885559082,
          'longitude': 35.19718933105469,
          'latitude': 31.766464233398438,
          'accelAvgX': 3.3516111373901367,
          'accelAvgY': 9.079021453857422,
          'accelAvgZ': 1.5872563123703003,
          'accelPeakX': 3.8727569580078125,
          'accelPeakY': 9.180831909179688,
          'accelPeakZ': 2.2503662109375,
          'time': '2018-05-14T09:10:44.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 8,
        'sample': {
          'speed': 7.75,
          'longitude': 35.19691848754883,
          'latitude': 31.766298294067383,
          'accelAvgX': 2.3423893451690674,
          'accelAvgY': 9.41439437866211,
          'accelAvgZ': 0.07253628969192505,
          'accelPeakX': 3.8374481201171875,
          'accelPeakY': 10.085235595703125,
          'accelPeakZ': 0.8869781494140625,
          'time': '2018-05-14T09:10:49.000Z'
        }
      },
      {
        'reportNumber': 136,
        'sampleNumber': 9,
        'sample': {
          'speed': 10.079999923706055,
          'longitude': 35.196388244628906,
          'latitude': 31.766422271728516,
          'accelAvgX': 0.7711098194122314,
          'accelAvgY': 9.214605331420898,
          'accelAvgZ': 2.573881149291992,
          'accelPeakX': 0.115234375,
          'accelPeakY': 9.812423706054688,
          'accelPeakZ': 2.037811279296875,
          'time': '2018-05-14T09:10:54.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 0,
        'sample': {
          'speed': 4.090000152587891,
          'longitude': 35.19607925415039,
          'latitude': 31.766508102416992,
          'accelAvgX': 0.8940620422363281,
          'accelAvgY': 9.035787582397461,
          'accelAvgZ': 2.65108585357666,
          'accelPeakX': 1.0170135498046875,
          'accelPeakY': 9.140121459960938,
          'accelPeakZ': 2.8278350830078125,
          'time': '2018-05-14T09:11:00.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 1,
        'sample': {
          'speed': 0.46000000834465027,
          'longitude': 35.196014404296875,
          'latitude': 31.76652717590332,
          'accelAvgX': 0.5603787302970886,
          'accelAvgY': 9.316902160644531,
          'accelAvgZ': 1.6231889724731445,
          'accelPeakX': 0.2974395751953125,
          'accelPeakY': 9.491363525390625,
          'accelPeakZ': 0.92547607421875,
          'time': '2018-05-14T09:11:05.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 2,
        'sample': {
          'speed': 0,
          'longitude': 35.196022033691406,
          'latitude': 31.766521453857422,
          'accelAvgX': 0.39804813265800476,
          'accelAvgY': 9.436835289001465,
          'accelAvgZ': 1.1964850425720215,
          'accelPeakX': 0.40008544921875,
          'accelPeakY': 9.448318481445312,
          'accelPeakZ': 1.192779541015625,
          'time': '2018-05-14T09:11:10.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 3,
        'sample': {
          'speed': 0,
          'longitude': 35.196022033691406,
          'latitude': 31.766521453857422,
          'accelAvgX': 0.4201853275299072,
          'accelAvgY': 9.416837692260742,
          'accelAvgZ': 1.2723486423492432,
          'accelPeakX': 0.3329315185546875,
          'accelPeakY': 9.505844116210938,
          'accelPeakZ': 1.025360107421875,
          'time': '2018-05-14T09:11:15.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 4,
        'sample': {
          'speed': 6.599999904632568,
          'longitude': 35.19588851928711,
          'latitude': 31.76656150817871,
          'accelAvgX': -0.3380700349807739,
          'accelAvgY': 9.900945663452148,
          'accelAvgZ': -0.676605761051178,
          'accelPeakX': -0.4638671875,
          'accelPeakY': 10.057998657226562,
          'accelPeakZ': -0.9532012939453125,
          'time': '2018-05-14T09:11:20.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 5,
        'sample': {
          'speed': 10.680000305175781,
          'longitude': 35.195457458496094,
          'latitude': 31.766674041748047,
          'accelAvgX': 0.10134238004684448,
          'accelAvgY': 9.642671585083008,
          'accelAvgZ': 0.6129874587059021,
          'accelPeakX': -0.006927490234375,
          'accelPeakY': 9.899154663085938,
          'accelPeakZ': -0.4254608154296875,
          'time': '2018-05-14T09:11:25.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 6,
        'sample': {
          'speed': 14.270000457763672,
          'longitude': 35.194828033447266,
          'latitude': 31.766841888427734,
          'accelAvgX': 0.306247353553772,
          'accelAvgY': 9.153883934020996,
          'accelAvgZ': 1.7570911645889282,
          'accelPeakX': -0.418731689453125,
          'accelPeakY': 9.893829345703125,
          'accelPeakZ': 0.1364593505859375,
          'time': '2018-05-14T09:11:30.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 7,
        'sample': {
          'speed': 9.420000076293945,
          'longitude': 35.1942253112793,
          'latitude': 31.76696014404297,
          'accelAvgX': 1.0023775100708008,
          'accelAvgY': 9.074845314025879,
          'accelAvgZ': 2.508629322052002,
          'accelPeakX': 1.088958740234375,
          'accelPeakY': 9.28863525390625,
          'accelPeakZ': 2.536468505859375,
          'time': '2018-05-14T09:11:35.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 8,
        'sample': {
          'speed': 6.789999961853027,
          'longitude': 35.1938362121582,
          'latitude': 31.767053604125977,
          'accelAvgX': 0.1715478152036667,
          'accelAvgY': 9.382139205932617,
          'accelAvgZ': 1.7100193500518799,
          'accelPeakX': -0.400299072265625,
          'accelPeakY': 9.694625854492188,
          'accelPeakZ': 1.7264404296875,
          'time': '2018-05-14T09:11:40.000Z'
        }
      },
      {
        'reportNumber': 137,
        'sampleNumber': 9,
        'sample': {
          'speed': 10.300000190734863,
          'longitude': 35.193416595458984,
          'latitude': 31.766965866088867,
          'accelAvgX': -1.4124075174331665,
          'accelAvgY': 9.530546188354492,
          'accelAvgZ': 1.7830971479415894,
          'accelPeakX': -2.195709228515625,
          'accelPeakY': 9.83306884765625,
          'accelPeakZ': 2.4237518310546875,
          'time': '2018-05-14T09:11:45.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 0,
        'sample': {
          'speed': 15.5,
          'longitude': 35.193023681640625,
          'latitude': 31.766477584838867,
          'accelAvgX': 0.17227932810783386,
          'accelAvgY': 9.08404541015625,
          'accelAvgZ': 2.1911911964416504,
          'accelPeakX': 0.7492828369140625,
          'accelPeakY': 9.766326904296875,
          'accelPeakZ': 0.5123443603515625,
          'time': '2018-05-14T09:11:50.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 1,
        'sample': {
          'speed': 17.950000762939453,
          'longitude': 35.1927490234375,
          'latitude': 31.765785217285156,
          'accelAvgX': -0.548467755317688,
          'accelAvgY': 9.633779525756836,
          'accelAvgZ': 1.7772526741027832,
          'accelPeakX': -0.774688720703125,
          'accelPeakY': 9.988754272460938,
          'accelPeakZ': 1.6690521240234375,
          'time': '2018-05-14T09:11:55.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 2,
        'sample': {
          'speed': 18.790000915527344,
          'longitude': 35.19272994995117,
          'latitude': 31.76490592956543,
          'accelAvgX': 0.9523358345031738,
          'accelAvgY': 9.107732772827148,
          'accelAvgZ': 2.564225673675537,
          'accelPeakX': -0.202056884765625,
          'accelPeakY': 10.2076416015625,
          'accelPeakZ': 1.7196807861328125,
          'time': '2018-05-14T09:12:00.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 3,
        'sample': {
          'speed': 17.219999313354492,
          'longitude': 35.19282150268555,
          'latitude': 31.764122009277344,
          'accelAvgX': 0.4591964781284332,
          'accelAvgY': 9.335933685302734,
          'accelAvgZ': 1.5915848016738892,
          'accelPeakX': 0.5774993896484375,
          'accelPeakY': 9.631423950195312,
          'accelPeakZ': 1.7431488037109375,
          'time': '2018-05-14T09:12:05.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 4,
        'sample': {
          'speed': 20.110000610351562,
          'longitude': 35.19302749633789,
          'latitude': 31.7632999420166,
          'accelAvgX': 0.35934704542160034,
          'accelAvgY': 9.19495964050293,
          'accelAvgZ': 2.157914400100708,
          'accelPeakX': 0.494903564453125,
          'accelPeakY': 9.802597045898438,
          'accelPeakZ': 1.5291595458984375,
          'time': '2018-05-14T09:12:10.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 5,
        'sample': {
          'speed': 17.559999465942383,
          'longitude': 35.19334411621094,
          'latitude': 31.76249885559082,
          'accelAvgX': 0.8835748434066772,
          'accelAvgY': 9.019246101379395,
          'accelAvgZ': 2.585538148880005,
          'accelPeakX': 0.516143798828125,
          'accelPeakY': 9.317779541015625,
          'accelPeakZ': 2.7494354248046875,
          'time': '2018-05-14T09:12:15.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 6,
        'sample': {
          'speed': 18.420000076293945,
          'longitude': 35.19361114501953,
          'latitude': 31.761756896972656,
          'accelAvgX': 0.7062724828720093,
          'accelAvgY': 9.356598854064941,
          'accelAvgZ': 1.385941982269287,
          'accelPeakX': 0.630828857421875,
          'accelPeakY': 9.309341430664062,
          'accelPeakZ': 2.669219970703125,
          'time': '2018-05-14T09:12:20.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 7,
        'sample': {
          'speed': 17.940000534057617,
          'longitude': 35.19374465942383,
          'latitude': 31.760927200317383,
          'accelAvgX': 1.022927165031433,
          'accelAvgY': 9.118968963623047,
          'accelAvgZ': 2.177255153656006,
          'accelPeakX': 1.3838043212890625,
          'accelPeakY': 9.246734619140625,
          'accelPeakZ': 2.4549407958984375,
          'time': '2018-05-14T09:12:25.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 8,
        'sample': {
          'speed': 18.920000076293945,
          'longitude': 35.19365692138672,
          'latitude': 31.760086059570312,
          'accelAvgX': 0.7186676263809204,
          'accelAvgY': 9.188338279724121,
          'accelAvgZ': 1.990143060684204,
          'accelPeakX': 0.9503326416015625,
          'accelPeakY': 9.3096923828125,
          'accelPeakZ': 2.65863037109375,
          'time': '2018-05-14T09:12:30.000Z'
        }
      },
      {
        'reportNumber': 138,
        'sampleNumber': 9,
        'sample': {
          'speed': 20.1299991607666,
          'longitude': 35.19334411621094,
          'latitude': 31.75922203063965,
          'accelAvgX': 1.2446179389953613,
          'accelAvgY': 9.062231063842773,
          'accelAvgZ': 2.5030734539031982,
          'accelPeakX': 0.859832763671875,
          'accelPeakY': 9.5916748046875,
          'accelPeakZ': 1.728607177734375,
          'time': '2018-05-14T09:12:35.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 0,
        'sample': {
          'speed': 22.540000915527344,
          'longitude': 35.19276428222656,
          'latitude': 31.75821876525879,
          'accelAvgX': 0.5520462989807129,
          'accelAvgY': 9.379332542419434,
          'accelAvgZ': 1.6355884075164795,
          'accelPeakX': 0.9577484130859375,
          'accelPeakY': 9.7589111328125,
          'accelPeakZ': 2.47894287109375,
          'time': '2018-05-14T09:12:40.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 1,
        'sample': {
          'speed': 22.299999237060547,
          'longitude': 35.19222640991211,
          'latitude': 31.757299423217773,
          'accelAvgX': 0.9224387407302856,
          'accelAvgY': 9.071813583374023,
          'accelAvgZ': 2.728259801864624,
          'accelPeakX': 0.63531494140625,
          'accelPeakY': 9.533676147460938,
          'accelPeakZ': 1.6267852783203125,
          'time': '2018-05-14T09:12:45.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 2,
        'sample': {
          'speed': 22.920000076293945,
          'longitude': 35.19179916381836,
          'latitude': 31.756349563598633,
          'accelAvgX': 1.0554018020629883,
          'accelAvgY': 9.386231422424316,
          'accelAvgZ': 2.406545400619507,
          'accelPeakX': 1.4443206787109375,
          'accelPeakY': 9.81451416015625,
          'accelPeakZ': 1.965087890625,
          'time': '2018-05-14T09:12:50.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 3,
        'sample': {
          'speed': 20.100000381469727,
          'longitude': 35.1914176940918,
          'latitude': 31.75543785095215,
          'accelAvgX': 1.0674123764038086,
          'accelAvgY': 9.034668922424316,
          'accelAvgZ': 2.5299482345581055,
          'accelPeakX': 1.4871826171875,
          'accelPeakY': 9.338363647460938,
          'accelPeakZ': 2.4708099365234375,
          'time': '2018-05-14T09:12:55.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 4,
        'sample': {
          'speed': 18.649999618530273,
          'longitude': 35.19107437133789,
          'latitude': 31.754634857177734,
          'accelAvgX': 0.9883856773376465,
          'accelAvgY': 9.340685844421387,
          'accelAvgZ': 2.0559940338134766,
          'accelPeakX': 1.169097900390625,
          'accelPeakY': 9.596160888671875,
          'accelPeakZ': 1.8408355712890625,
          'time': '2018-05-14T09:13:00.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 5,
        'sample': {
          'speed': 18.670000076293945,
          'longitude': 35.19057846069336,
          'latitude': 31.75390625,
          'accelAvgX': 0.7404621243476868,
          'accelAvgY': 9.33928394317627,
          'accelAvgZ': 1.7836191654205322,
          'accelPeakX': 0.8126068115234375,
          'accelPeakY': 9.502487182617188,
          'accelPeakZ': 1.663726806640625,
          'time': '2018-05-14T09:13:05.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 6,
        'sample': {
          'speed': 18.790000915527344,
          'longitude': 35.18994140625,
          'latitude': 31.753267288208008,
          'accelAvgX': 0.10865749418735504,
          'accelAvgY': 9.37458324432373,
          'accelAvgZ': 1.687016248703003,
          'accelPeakX': 0.346282958984375,
          'accelPeakY': 9.655364990234375,
          'accelPeakZ': 1.4028778076171875,
          'time': '2018-05-14T09:13:10.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 7,
        'sample': {
          'speed': 17.8799991607666,
          'longitude': 35.189361572265625,
          'latitude': 31.752592086791992,
          'accelAvgX': 0.7790203094482422,
          'accelAvgY': 9.22702407836914,
          'accelAvgZ': 1.971116304397583,
          'accelPeakX': 0.8994598388671875,
          'accelPeakY': 10.282821655273438,
          'accelPeakZ': 3.1266326904296875,
          'time': '2018-05-14T09:13:15.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 8,
        'sample': {
          'speed': 19.579999923706055,
          'longitude': 35.18895721435547,
          'latitude': 31.751794815063477,
          'accelAvgX': 0.5107761025428772,
          'accelAvgY': 9.229987144470215,
          'accelAvgZ': 2.335143804550171,
          'accelPeakX': 0.0539398193359375,
          'accelPeakY': 9.742446899414062,
          'accelPeakZ': 1.1515350341796875,
          'time': '2018-05-14T09:13:20.000Z'
        }
      },
      {
        'reportNumber': 139,
        'sampleNumber': 9,
        'sample': {
          'speed': 19.040000915527344,
          'longitude': 35.18880081176758,
          'latitude': 31.750904083251953,
          'accelAvgX': 0.7200179696083069,
          'accelAvgY': 9.15049934387207,
          'accelAvgZ': 2.6065452098846436,
          'accelPeakX': 0.475860595703125,
          'accelPeakY': 9.673858642578125,
          'accelPeakZ': 1.2898712158203125,
          'time': '2018-05-14T09:13:25.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 0,
        'sample': {
          'speed': 16.90999984741211,
          'longitude': 35.18889617919922,
          'latitude': 31.750104904174805,
          'accelAvgX': 0.6890169382095337,
          'accelAvgY': 9.157408714294434,
          'accelAvgZ': 2.463197708129883,
          'accelPeakX': 0.692840576171875,
          'accelPeakY': 9.703475952148438,
          'accelPeakZ': 2.387542724609375,
          'time': '2018-05-14T09:13:31.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 1,
        'sample': {
          'speed': 17.68000030517578,
          'longitude': 35.189170837402344,
          'latitude': 31.749370574951172,
          'accelAvgX': 0.3906242847442627,
          'accelAvgY': 9.421235084533691,
          'accelAvgZ': 1.8589258193969727,
          'accelPeakX': 0.435394287109375,
          'accelPeakY': 9.648117065429688,
          'accelPeakZ': 1.601409912109375,
          'time': '2018-05-14T09:13:36.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 2,
        'sample': {
          'speed': 19.979999542236328,
          'longitude': 35.18968200683594,
          'latitude': 31.74863052368164,
          'accelAvgX': 0.37246614694595337,
          'accelAvgY': 9.302288055419922,
          'accelAvgZ': 2.104156494140625,
          'accelPeakX': 0.73797607421875,
          'accelPeakY': 9.908309936523438,
          'accelPeakZ': 1.5926055908203125,
          'time': '2018-05-14T09:13:41.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 3,
        'sample': {
          'speed': 18.700000762939453,
          'longitude': 35.19034957885742,
          'latitude': 31.74801254272461,
          'accelAvgX': 0.5126383304595947,
          'accelAvgY': 9.444772720336914,
          'accelAvgZ': 1.2598932981491089,
          'accelPeakX': 0.4371337890625,
          'accelPeakY': 9.530685424804688,
          'accelPeakZ': 2.8557891845703125,
          'time': '2018-05-14T09:13:46.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 4,
        'sample': {
          'speed': 22.389999389648438,
          'longitude': 35.191184997558594,
          'latitude': 31.747419357299805,
          'accelAvgX': 0.42758259177207947,
          'accelAvgY': 9.42212200164795,
          'accelAvgZ': 1.303617000579834,
          'accelPeakX': 0.7756805419921875,
          'accelPeakY': 9.928421020507812,
          'accelPeakZ': 1.24102783203125,
          'time': '2018-05-14T09:13:51.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 5,
        'sample': {
          'speed': 23.709999084472656,
          'longitude': 35.19220733642578,
          'latitude': 31.74681282043457,
          'accelAvgX': 0.44886472821235657,
          'accelAvgY': 9.487473487854004,
          'accelAvgZ': 1.9873508214950562,
          'accelPeakX': 1.1063232421875,
          'accelPeakY': 10.20159912109375,
          'accelPeakZ': 2.6145782470703125,
          'time': '2018-05-14T09:13:56.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 6,
        'sample': {
          'speed': 23.299999237060547,
          'longitude': 35.19324493408203,
          'latitude': 31.746227264404297,
          'accelAvgX': 0.36532002687454224,
          'accelAvgY': 9.468477249145508,
          'accelAvgZ': 1.6261470317840576,
          'accelPeakX': 0.6303558349609375,
          'accelPeakY': 10.524276733398438,
          'accelPeakZ': 2.1639862060546875,
          'time': '2018-05-14T09:14:01.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 7,
        'sample': {
          'speed': 19.719999313354492,
          'longitude': 35.19417953491211,
          'latitude': 31.745681762695312,
          'accelAvgX': 0.016609862446784973,
          'accelAvgY': 9.33702564239502,
          'accelAvgZ': 1.650134563446045,
          'accelPeakX': 1.0910491943359375,
          'accelPeakY': 9.408157348632812,
          'accelPeakZ': 2.510009765625,
          'time': '2018-05-14T09:14:06.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 8,
        'sample': {
          'speed': 19.190000534057617,
          'longitude': 35.19502258300781,
          'latitude': 31.745159149169922,
          'accelAvgX': 0.46774518489837646,
          'accelAvgY': 9.307291984558105,
          'accelAvgZ': 1.392156958580017,
          'accelPeakX': -0.0247039794921875,
          'accelPeakY': 9.613998413085938,
          'accelPeakZ': 1.15380859375,
          'time': '2018-05-14T09:14:11.000Z'
        }
      },
      {
        'reportNumber': 140,
        'sampleNumber': 9,
        'sample': {
          'speed': 21.68000030517578,
          'longitude': 35.19586181640625,
          'latitude': 31.744577407836914,
          'accelAvgX': 0.15006056427955627,
          'accelAvgY': 9.853462219238281,
          'accelAvgZ': 1.5656826496124268,
          'accelPeakX': 0.4847869873046875,
          'accelPeakY': 10.263015747070312,
          'accelPeakZ': 1.951507568359375,
          'time': '2018-05-14T09:14:16.000Z'
        }
      },
      {
        'reportNumber': 141,
        'sampleNumber': 0,
        'sample': {
          'speed': 17.34000015258789,
          'longitude': 35.196659088134766,
          'latitude': 31.744029998779297,
          'accelAvgX': 0.26195088028907776,
          'accelAvgY': 9.214198112487793,
          'accelAvgZ': 2.070216178894043,
          'accelPeakX': 0.680328369140625,
          'accelPeakY': 10.0867919921875,
          'accelPeakZ': 2.01800537109375,
          'time': '2018-05-14T09:14:22.000Z'
        }
      },
      {
        'reportNumber': 141,
        'sampleNumber': 1,
        'sample': {
          'speed': 5.960000038146973,
          'longitude': 35.19715881347656,
          'latitude': 31.743701934814453,
          'accelAvgX': 1.1349444389343262,
          'accelAvgY': 8.83781623840332,
          'accelAvgZ': 3.2290472984313965,
          'accelPeakX': 0.8687591552734375,
          'accelPeakY': 9.117019653320312,
          'accelPeakZ': 3.6578521728515625,
          'time': '2018-05-14T09:14:27.000Z'
        }
      },
      {
        'reportNumber': 141,
        'sampleNumber': 2,
        'sample': {
          'speed': 1.2799999713897705,
          'longitude': 35.19728088378906,
          'latitude': 31.743616104125977,
          'accelAvgX': 0.21794156730175018,
          'accelAvgY': 9.457118034362793,
          'accelAvgZ': 1.1349564790725708,
          'accelPeakX': -0.0701904296875,
          'accelPeakY': 9.680374145507812,
          'accelPeakZ': 0.2723236083984375,
          'time': '2018-05-14T09:14:32.000Z'
        }
      },
      {
        'reportNumber': 141,
        'sampleNumber': 3,
        'sample': {
          'speed': 0,
          'longitude': 35.19732666015625,
          'latitude': 31.743587493896484,
          'accelAvgX': 0.45301395654678345,
          'accelAvgY': 9.379007339477539,
          'accelAvgZ': 1.4549968242645264,
          'accelPeakX': -0.1176605224609375,
          'accelPeakY': 9.769927978515625,
          'accelPeakZ': 0.28399658203125,
          'time': '2018-05-14T09:14:37.000Z'
        }
      },
      {
        'reportNumber': 141,
        'sampleNumber': 4,
        'sample': {
          'speed': 0,
          'longitude': 35.19732666015625,
          'latitude': 31.74358367919922,
          'accelAvgX': 0.4245011508464813,
          'accelAvgY': 9.401762962341309,
          'accelAvgZ': 1.3698577880859375,
          'accelPeakX': 0.429412841796875,
          'accelPeakY': 9.447784423828125,
          'accelPeakZ': 1.350311279296875,
          'time': '2018-05-14T09:14:42.000Z'
        }
      },
      {
        'reportNumber': 141,
        'sampleNumber': 5,
        'sample': {
          'speed': 0,
          'longitude': 35.19732666015625,
          'latitude': 31.743581771850586,
          'accelAvgX': 0.4254133105278015,
          'accelAvgY': 9.400452613830566,
          'accelAvgZ': 1.366891860961914,
          'accelPeakX': 0.4238433837890625,
          'accelPeakY': 9.430419921875,
          'accelPeakZ': 1.353851318359375,
          'time': '2018-05-14T09:14:47.000Z'
        }
      },
      {
        'reportNumber': 141,
        'sampleNumber': 6,
        'sample': {
          'speed': 0,
          'longitude': 35.197330474853516,
          'latitude': 31.743581771850586,
          'accelAvgX': 0.426218181848526,
          'accelAvgY': 9.402894973754883,
          'accelAvgZ': 1.3642058372497559,
          'accelPeakX': 0.406494140625,
          'accelPeakY': 9.42144775390625,
          'accelPeakZ': 1.3636016845703125,
          'time': '2018-05-14T09:14:52.000Z'
        }
      },
      {
        'reportNumber': 142,
        'sampleNumber': 1,
        'sample': {
          'speed': 15.8100004196167,
          'longitude': 35.198089599609375,
          'latitude': 31.744050979614258,
          'accelAvgX': 0.45421701669692993,
          'accelAvgY': 9.468005180358887,
          'accelAvgZ': 1.2600282430648804,
          'accelPeakX': -0.1206512451171875,
          'accelPeakY': 10.240982055664062,
          'accelPeakZ': 0.32745361328125,
          'time': '2018-05-14T09:15:23.000Z'
        }
      },
      {
        'reportNumber': 142,
        'sampleNumber': 2,
        'sample': {
          'speed': 17.440000534057617,
          'longitude': 35.198143005371094,
          'latitude': 31.744792938232422,
          'accelAvgX': 0.9232522249221802,
          'accelAvgY': 9.107362747192383,
          'accelAvgZ': 2.4311084747314453,
          'accelPeakX': 1.093994140625,
          'accelPeakY': 9.40313720703125,
          'accelPeakZ': 2.6389312744140625,
          'time': '2018-05-14T09:15:28.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 0,
        'sample': {
          'speed': 17.020000457763672,
          'longitude': 35.19818115234375,
          'latitude': 31.745567321777344,
          'accelAvgX': 0.8946954011917114,
          'accelAvgY': 9.060321807861328,
          'accelAvgZ': 2.789918899536133,
          'accelPeakX': 0.792022705078125,
          'accelPeakY': 9.648956298828125,
          'accelPeakZ': 2.94024658203125,
          'time': '2018-05-14T09:15:34.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 1,
        'sample': {
          'speed': 16.600000381469727,
          'longitude': 35.19820785522461,
          'latitude': 31.74631690979004,
          'accelAvgX': 0.7291467189788818,
          'accelAvgY': 9.002540588378906,
          'accelAvgZ': 2.6739439964294434,
          'accelPeakX': 0.93255615234375,
          'accelPeakY': 9.436767578125,
          'accelPeakZ': 3.2433013916015625,
          'time': '2018-05-14T09:15:39.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 2,
        'sample': {
          'speed': 16.520000457763672,
          'longitude': 35.1982421875,
          'latitude': 31.747079849243164,
          'accelAvgX': 0.8734135627746582,
          'accelAvgY': 9.19639778137207,
          'accelAvgZ': 2.829972505569458,
          'accelPeakX': 1.011566162109375,
          'accelPeakY': 9.824569702148438,
          'accelPeakZ': 3.01806640625,
          'time': '2018-05-14T09:15:44.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 3,
        'sample': {
          'speed': 8.670000076293945,
          'longitude': 35.198265075683594,
          'latitude': 31.747648239135742,
          'accelAvgX': 1.3172565698623657,
          'accelAvgY': 8.845358848571777,
          'accelAvgZ': 3.7654170989990234,
          'accelPeakX': 1.4628753662109375,
          'accelPeakY': 9.312393188476562,
          'accelPeakZ': 4.3929290771484375,
          'time': '2018-05-14T09:15:49.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 4,
        'sample': {
          'speed': 5.039999961853027,
          'longitude': 35.19829177856445,
          'latitude': 31.747840881347656,
          'accelAvgX': 0.6196438074111938,
          'accelAvgY': 9.681692123413086,
          'accelAvgZ': 0.1446615755558014,
          'accelPeakX': 1.6176605224609375,
          'accelPeakY': 8.52392578125,
          'accelPeakZ': 5.018768310546875,
          'time': '2018-05-14T09:15:54.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 5,
        'sample': {
          'speed': 6.119999885559082,
          'longitude': 35.19826126098633,
          'latitude': 31.748064041137695,
          'accelAvgX': -2.2116737365722656,
          'accelAvgY': 9.139427185058594,
          'accelAvgZ': 2.9594533443450928,
          'accelPeakX': -2.579376220703125,
          'accelPeakY': 9.283355712890625,
          'accelPeakZ': 3.8359832763671875,
          'time': '2018-05-14T09:15:59.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 6,
        'sample': {
          'speed': 9.270000457763672,
          'longitude': 35.19810104370117,
          'latitude': 31.747859954833984,
          'accelAvgX': -0.8822386860847473,
          'accelAvgY': 9.749542236328125,
          'accelAvgZ': 0.8433333039283752,
          'accelPeakX': -3.46649169921875,
          'accelPeakY': 9.274261474609375,
          'accelPeakZ': 3.98388671875,
          'time': '2018-05-14T09:16:04.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 7,
        'sample': {
          'speed': 14.579999923706055,
          'longitude': 35.19812774658203,
          'latitude': 31.74725914001465,
          'accelAvgX': 0.45854154229164124,
          'accelAvgY': 9.71372127532959,
          'accelAvgZ': 1.2139331102371216,
          'accelPeakX': 0.7566986083984375,
          'accelPeakY': 10.273666381835938,
          'accelPeakZ': -0.0974578857421875,
          'time': '2018-05-14T09:16:09.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 8,
        'sample': {
          'speed': 15.979999542236328,
          'longitude': 35.198089599609375,
          'latitude': 31.74652671813965,
          'accelAvgX': 0.8187299370765686,
          'accelAvgY': 9.211140632629395,
          'accelAvgZ': 1.9855598211288452,
          'accelPeakX': 0.5775604248046875,
          'accelPeakY': 10.0220947265625,
          'accelPeakZ': 1.4147186279296875,
          'time': '2018-05-14T09:16:14.000Z'
        }
      },
      {
        'reportNumber': 143,
        'sampleNumber': 9,
        'sample': {
          'speed': 12.600000381469727,
          'longitude': 35.198036193847656,
          'latitude': 31.745868682861328,
          'accelAvgX': 0.3784908950328827,
          'accelAvgY': 9.264978408813477,
          'accelAvgZ': 1.912766695022583,
          'accelPeakX': 0.291748046875,
          'accelPeakY': 9.6409912109375,
          'accelPeakZ': 2.685150146484375,
          'time': '2018-05-14T09:16:19.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 0,
        'sample': {
          'speed': 11.390000343322754,
          'longitude': 35.19800567626953,
          'latitude': 31.74528694152832,
          'accelAvgX': 0.4059533476829529,
          'accelAvgY': 9.238393783569336,
          'accelAvgZ': 2.0775656700134277,
          'accelPeakX': 0.671112060546875,
          'accelPeakY': 9.953140258789062,
          'accelPeakZ': 0.3858184814453125,
          'time': '2018-05-14T09:16:24.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 1,
        'sample': {
          'speed': 14.050000190734863,
          'longitude': 35.19794464111328,
          'latitude': 31.744741439819336,
          'accelAvgX': -0.2553958296775818,
          'accelAvgY': 9.608573913574219,
          'accelAvgZ': 0.43791553378105164,
          'accelPeakX': 0.1086578369140625,
          'accelPeakY': 9.985458374023438,
          'accelPeakZ': 0.523895263671875,
          'time': '2018-05-14T09:16:29.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 2,
        'sample': {
          'speed': 9.460000038146973,
          'longitude': 35.19786834716797,
          'latitude': 31.744184494018555,
          'accelAvgX': 1.8224130868911743,
          'accelAvgY': 9.0067138671875,
          'accelAvgZ': 2.1097333431243896,
          'accelPeakX': 1.082855224609375,
          'accelPeakY': 9.290847778320312,
          'accelPeakZ': 2.6780853271484375,
          'time': '2018-05-14T09:16:34.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 3,
        'sample': {
          'speed': 9.039999961853027,
          'longitude': 35.19756317138672,
          'latitude': 31.74399185180664,
          'accelAvgX': 2.580117702484131,
          'accelAvgY': 9.156494140625,
          'accelAvgZ': 0.25212562084198,
          'accelPeakX': 3.2168731689453125,
          'accelPeakY': 9.296768188476562,
          'accelPeakZ': 1.409454345703125,
          'time': '2018-05-14T09:16:39.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 4,
        'sample': {
          'speed': 16.280000686645508,
          'longitude': 35.196990966796875,
          'latitude': 31.74434471130371,
          'accelAvgX': 0.5686652064323425,
          'accelAvgY': 9.282922744750977,
          'accelAvgZ': 2.153214931488037,
          'accelPeakX': -0.0371551513671875,
          'accelPeakY': 10.169815063476562,
          'accelPeakZ': 1.360321044921875,
          'time': '2018-05-14T09:16:44.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 5,
        'sample': {
          'speed': 18.969999313354492,
          'longitude': 35.19619369506836,
          'latitude': 31.744815826416016,
          'accelAvgX': 1.0602715015411377,
          'accelAvgY': 9.312187194824219,
          'accelAvgZ': 1.577993631362915,
          'accelPeakX': 0.0266571044921875,
          'accelPeakY': 10.485671997070312,
          'accelPeakZ': 0.8811798095703125,
          'time': '2018-05-14T09:16:49.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 6,
        'sample': {
          'speed': 20.489999771118164,
          'longitude': 35.1953010559082,
          'latitude': 31.745346069335938,
          'accelAvgX': 1.08955979347229,
          'accelAvgY': 9.025020599365234,
          'accelAvgZ': 2.480334758758545,
          'accelPeakX': 0.9409942626953125,
          'accelPeakY': 9.631057739257812,
          'accelPeakZ': 1.282501220703125,
          'time': '2018-05-14T09:16:54.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 7,
        'sample': {
          'speed': 20.860000610351562,
          'longitude': 35.194419860839844,
          'latitude': 31.745853424072266,
          'accelAvgX': 0.8220043778419495,
          'accelAvgY': 9.314556121826172,
          'accelAvgZ': 1.548637866973877,
          'accelPeakX': 0.9368743896484375,
          'accelPeakY': 9.429412841796875,
          'accelPeakZ': 2.929290771484375,
          'time': '2018-05-14T09:16:59.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 8,
        'sample': {
          'speed': 21.56999969482422,
          'longitude': 35.19346237182617,
          'latitude': 31.74639892578125,
          'accelAvgX': 1.2453376054763794,
          'accelAvgY': 9.105537414550781,
          'accelAvgZ': 2.5645947456359863,
          'accelPeakX': 1.69140625,
          'accelPeakY': 10.5018310546875,
          'accelPeakZ': 2.9842376708984375,
          'time': '2018-05-14T09:17:04.000Z'
        }
      },
      {
        'reportNumber': 144,
        'sampleNumber': 9,
        'sample': {
          'speed': 20.290000915527344,
          'longitude': 35.19253921508789,
          'latitude': 31.746925354003906,
          'accelAvgX': 1.3517544269561768,
          'accelAvgY': 9.200175285339355,
          'accelAvgZ': 2.438624620437622,
          'accelPeakX': 0.612579345703125,
          'accelPeakY': 10.174789428710938,
          'accelPeakZ': 2.189544677734375,
          'time': '2018-05-14T09:17:09.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 0,
        'sample': {
          'speed': 18.489999771118164,
          'longitude': 35.19172286987305,
          'latitude': 31.7474422454834,
          'accelAvgX': 1.0579549074172974,
          'accelAvgY': 9.380498886108398,
          'accelAvgZ': 2.091468572616577,
          'accelPeakX': 1.1331329345703125,
          'accelPeakY': 9.570602416992188,
          'accelPeakZ': 2.5899810791015625,
          'time': '2018-05-14T09:17:14.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 1,
        'sample': {
          'speed': 15.880000114440918,
          'longitude': 35.191001892089844,
          'latitude': 31.747997283935547,
          'accelAvgX': 1.016480803489685,
          'accelAvgY': 8.378793716430664,
          'accelAvgZ': 3.774883270263672,
          'accelPeakX': 1.3454437255859375,
          'accelPeakY': 9.955947875976562,
          'accelPeakZ': 3.350494384765625,
          'time': '2018-05-14T09:17:19.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 2,
        'sample': {
          'speed': 9.220000267028809,
          'longitude': 35.190486907958984,
          'latitude': 31.748422622680664,
          'accelAvgX': 0.8738654851913452,
          'accelAvgY': 8.87258243560791,
          'accelAvgZ': 3.3340346813201904,
          'accelPeakX': 1.5269775390625,
          'accelPeakY': 8.131088256835938,
          'accelPeakZ': 5.5225677490234375,
          'time': '2018-05-14T09:17:24.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 3,
        'sample': {
          'speed': 4.309999942779541,
          'longitude': 35.19025421142578,
          'latitude': 31.748628616333008,
          'accelAvgX': 0.40496954321861267,
          'accelAvgY': 9.048583030700684,
          'accelAvgZ': 3.2063138484954834,
          'accelPeakX': 1.3994293212890625,
          'accelPeakY': 8.862945556640625,
          'accelPeakZ': 4.2847747802734375,
          'time': '2018-05-14T09:17:29.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 4,
        'sample': {
          'speed': 0.75,
          'longitude': 35.19015121459961,
          'latitude': 31.748703002929688,
          'accelAvgX': 1.0764437913894653,
          'accelAvgY': 8.972810745239258,
          'accelAvgZ': 2.993422746658325,
          'accelPeakX': 1.7243194580078125,
          'accelPeakY': 9.179397583007812,
          'accelPeakZ': 2.8031158447265625,
          'time': '2018-05-14T09:17:34.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 5,
        'sample': {
          'speed': 0,
          'longitude': 35.190147399902344,
          'latitude': 31.748703002929688,
          'accelAvgX': 0.7463483810424805,
          'accelAvgY': 9.212492942810059,
          'accelAvgZ': 2.106274366378784,
          'accelPeakX': 1.064544677734375,
          'accelPeakY': 8.998214721679688,
          'accelPeakZ': 2.9413909912109375,
          'time': '2018-05-14T09:17:39.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 6,
        'sample': {
          'speed': 0,
          'longitude': 35.190147399902344,
          'latitude': 31.74870491027832,
          'accelAvgX': 0.7456081509590149,
          'accelAvgY': 9.216580390930176,
          'accelAvgZ': 2.098310947418213,
          'accelPeakX': 0.748626708984375,
          'accelPeakY': 9.222183227539062,
          'accelPeakZ': 2.0976104736328125,
          'time': '2018-05-14T09:17:44.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 7,
        'sample': {
          'speed': 0.15000000596046448,
          'longitude': 35.19014358520508,
          'latitude': 31.74870491027832,
          'accelAvgX': 0.6798155903816223,
          'accelAvgY': 9.263463973999023,
          'accelAvgZ': 1.926450252532959,
          'accelPeakX': 0.6471710205078125,
          'accelPeakY': 9.317062377929688,
          'accelPeakZ': 1.864715576171875,
          'time': '2018-05-14T09:17:49.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 8,
        'sample': {
          'speed': 8.59000015258789,
          'longitude': 35.18998718261719,
          'latitude': 31.748849868774414,
          'accelAvgX': 0.18242588639259338,
          'accelAvgY': 9.595154762268066,
          'accelAvgZ': 0.8340659141540527,
          'accelPeakX': -0.24371337890625,
          'accelPeakY': 10.268630981445312,
          'accelPeakZ': -1.20770263671875,
          'time': '2018-05-14T09:17:54.000Z'
        }
      },
      {
        'reportNumber': 145,
        'sampleNumber': 9,
        'sample': {
          'speed': 7.510000228881836,
          'longitude': 35.18967056274414,
          'latitude': 31.749095916748047,
          'accelAvgX': -1.6247788667678833,
          'accelAvgY': 9.2545747756958,
          'accelAvgZ': 2.753070592880249,
          'accelPeakX': -1.8851165771484375,
          'accelPeakY': 9.220626831054688,
          'accelPeakZ': 3.7085418701171875,
          'time': '2018-05-14T09:17:59.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 0,
        'sample': {
          'speed': 14.920000076293945,
          'longitude': 35.1890983581543,
          'latitude': 31.748977661132812,
          'accelAvgX': 0.05820334702730179,
          'accelAvgY': 9.636171340942383,
          'accelAvgZ': 0.9182546138763428,
          'accelPeakX': -1.5866851806640625,
          'accelPeakY': 10.234878540039062,
          'accelPeakZ': 0.3343963623046875,
          'time': '2018-05-14T09:18:05.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 1,
        'sample': {
          'speed': 12.989999771118164,
          'longitude': 35.18838119506836,
          'latitude': 31.7487735748291,
          'accelAvgX': 2.062382221221924,
          'accelAvgY': 8.977801322937012,
          'accelAvgZ': 2.1134440898895264,
          'accelPeakX': 1.17083740234375,
          'accelPeakY': 9.768661499023438,
          'accelPeakZ': 2.8866729736328125,
          'time': '2018-05-14T09:18:10.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 2,
        'sample': {
          'speed': 12.399999618530273,
          'longitude': 35.18769836425781,
          'latitude': 31.748756408691406,
          'accelAvgX': 0.8848342895507812,
          'accelAvgY': 9.152853012084961,
          'accelAvgZ': 2.5121703147888184,
          'accelPeakX': 1.2698974609375,
          'accelPeakY': 9.37457275390625,
          'accelPeakZ': 2.901947021484375,
          'time': '2018-05-14T09:18:15.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 3,
        'sample': {
          'speed': 9.899999618530273,
          'longitude': 35.187137603759766,
          'latitude': 31.748750686645508,
          'accelAvgX': 0.630510151386261,
          'accelAvgY': 9.159246444702148,
          'accelAvgZ': 2.4784581661224365,
          'accelPeakX': 1.01953125,
          'accelPeakY': 9.0565185546875,
          'accelPeakZ': 3.35205078125,
          'time': '2018-05-14T09:18:20.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 4,
        'sample': {
          'speed': 6.099999904632568,
          'longitude': 35.18672561645508,
          'latitude': 31.748743057250977,
          'accelAvgX': 0.8258050680160522,
          'accelAvgY': 9.060625076293945,
          'accelAvgZ': 2.8406028747558594,
          'accelPeakX': 1.220458984375,
          'accelPeakY': 9.076202392578125,
          'accelPeakZ': 3.3576202392578125,
          'time': '2018-05-14T09:18:25.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 5,
        'sample': {
          'speed': 1.309999942779541,
          'longitude': 35.18656921386719,
          'latitude': 31.748737335205078,
          'accelAvgX': 0.8474048376083374,
          'accelAvgY': 9.070263862609863,
          'accelAvgZ': 2.658949375152588,
          'accelPeakX': 1.3853607177734375,
          'accelPeakY': 8.734664916992188,
          'accelPeakZ': 4.006683349609375,
          'time': '2018-05-14T09:18:30.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 6,
        'sample': {
          'speed': 2,
          'longitude': 35.186485290527344,
          'latitude': 31.748735427856445,
          'accelAvgX': 0.6581668853759766,
          'accelAvgY': 9.214245796203613,
          'accelAvgZ': 2.143726348876953,
          'accelPeakX': 0.70684814453125,
          'accelPeakY': 9.258041381835938,
          'accelPeakZ': 2.2492828369140625,
          'time': '2018-05-14T09:18:35.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 7,
        'sample': {
          'speed': 2.680000066757202,
          'longitude': 35.18634796142578,
          'latitude': 31.748729705810547,
          'accelAvgX': 0.7959687113761902,
          'accelAvgY': 9.159069061279297,
          'accelAvgZ': 2.3032948970794678,
          'accelPeakX': 0.240631103515625,
          'accelPeakY': 9.618423461914062,
          'accelPeakZ': 0.835205078125,
          'time': '2018-05-14T09:18:40.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 8,
        'sample': {
          'speed': 2.0199999809265137,
          'longitude': 35.18622970581055,
          'latitude': 31.74873161315918,
          'accelAvgX': 0.7096794843673706,
          'accelAvgY': 9.21058177947998,
          'accelAvgZ': 2.1372125148773193,
          'accelPeakX': 0.903106689453125,
          'accelPeakY': 9.293838500976562,
          'accelPeakZ': 2.7557220458984375,
          'time': '2018-05-14T09:18:45.000Z'
        }
      },
      {
        'reportNumber': 146,
        'sampleNumber': 9,
        'sample': {
          'speed': 0.27000001072883606,
          'longitude': 35.18619155883789,
          'latitude': 31.748727798461914,
          'accelAvgX': 0.6824768781661987,
          'accelAvgY': 9.284557342529297,
          'accelAvgZ': 1.829261064529419,
          'accelPeakX': 1.2864837646484375,
          'accelPeakY': 8.853424072265625,
          'accelPeakZ': 3.440216064453125,
          'time': '2018-05-14T09:18:50.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 0,
        'sample': {
          'speed': 4.130000114440918,
          'longitude': 35.18608093261719,
          'latitude': 31.74873161315918,
          'accelAvgX': 0.4808439314365387,
          'accelAvgY': 9.522159576416016,
          'accelAvgZ': 0.7812905311584473,
          'accelPeakX': 0.073394775390625,
          'accelPeakY': 9.714675903320312,
          'accelPeakZ': 0.159149169921875,
          'time': '2018-05-14T09:18:55.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 1,
        'sample': {
          'speed': 7.949999809265137,
          'longitude': 35.185760498046875,
          'latitude': 31.748788833618164,
          'accelAvgX': 0.9652615785598755,
          'accelAvgY': 9.251815795898438,
          'accelAvgZ': 2.051089286804199,
          'accelPeakX': 1.711578369140625,
          'accelPeakY': 9.5950927734375,
          'accelPeakZ': 1.7643890380859375,
          'time': '2018-05-14T09:19:00.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 2,
        'sample': {
          'speed': 8.399999618530273,
          'longitude': 35.18537902832031,
          'latitude': 31.74874496459961,
          'accelAvgX': 1.646960735321045,
          'accelAvgY': 8.919095993041992,
          'accelAvgZ': 1.6813536882400513,
          'accelPeakX': -4.4519500732421875,
          'accelPeakY': 10.743942260742188,
          'accelPeakZ': 0.911712646484375,
          'time': '2018-05-14T09:19:05.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 3,
        'sample': {
          'speed': 13.199999809265137,
          'longitude': 35.18478775024414,
          'latitude': 31.74871253967285,
          'accelAvgX': 0.6753264665603638,
          'accelAvgY': 9.41370677947998,
          'accelAvgZ': 1.0810245275497437,
          'accelPeakX': 4.268341064453125,
          'accelPeakY': 10.479385375976562,
          'accelPeakZ': 0.4322662353515625,
          'time': '2018-05-14T09:19:10.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 4,
        'sample': {
          'speed': 16.309999465942383,
          'longitude': 35.18400192260742,
          'latitude': 31.74864387512207,
          'accelAvgX': -0.4250825047492981,
          'accelAvgY': 9.976236343383789,
          'accelAvgZ': 0.8937958478927612,
          'accelPeakX': -1.629180908203125,
          'accelPeakY': 11.856658935546875,
          'accelPeakZ': 0.7728424072265625,
          'time': '2018-05-14T09:19:15.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 5,
        'sample': {
          'speed': 19.020000457763672,
          'longitude': 35.183128356933594,
          'latitude': 31.748367309570312,
          'accelAvgX': 0.0758485421538353,
          'accelAvgY': 9.069350242614746,
          'accelAvgZ': 2.212229013442993,
          'accelPeakX': -1.7381134033203125,
          'accelPeakY': 11.549591064453125,
          'accelPeakZ': 1.483917236328125,
          'time': '2018-05-14T09:19:20.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 6,
        'sample': {
          'speed': 18.260000228881836,
          'longitude': 35.18234634399414,
          'latitude': 31.747907638549805,
          'accelAvgX': -0.3218562602996826,
          'accelAvgY': 8.809050559997559,
          'accelAvgZ': 2.4073057174682617,
          'accelPeakX': 0.7728118896484375,
          'accelPeakY': 11.147369384765625,
          'accelPeakZ': 1.9178619384765625,
          'time': '2018-05-14T09:19:25.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 7,
        'sample': {
          'speed': 17.209999084472656,
          'longitude': 35.1817512512207,
          'latitude': 31.747299194335938,
          'accelAvgX': 0.35890883207321167,
          'accelAvgY': 8.711946487426758,
          'accelAvgZ': 1.8096798658370972,
          'accelPeakX': 4.5011749267578125,
          'accelPeakY': 11.487350463867188,
          'accelPeakZ': 1.201995849609375,
          'time': '2018-05-14T09:19:30.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 8,
        'sample': {
          'speed': 21.18000030517578,
          'longitude': 35.18123245239258,
          'latitude': 31.7465763092041,
          'accelAvgX': 0.7983280420303345,
          'accelAvgY': 8.886842727661133,
          'accelAvgZ': 2.663533926010132,
          'accelPeakX': -1.4957122802734375,
          'accelPeakY': 11.802780151367188,
          'accelPeakZ': 0.36163330078125,
          'time': '2018-05-14T09:19:35.000Z'
        }
      },
      {
        'reportNumber': 147,
        'sampleNumber': 9,
        'sample': {
          'speed': 18.5,
          'longitude': 35.18061447143555,
          'latitude': 31.745840072631836,
          'accelAvgX': 3.2101433277130127,
          'accelAvgY': 8.966297149658203,
          'accelAvgZ': 1.74612557888031,
          'accelPeakX': 8.342666625976562,
          'accelPeakY': 13.224929809570312,
          'accelPeakZ': -0.082489013671875,
          'time': '2018-05-14T09:19:40.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 0,
        'sample': {
          'speed': 17.309999465942383,
          'longitude': 35.179840087890625,
          'latitude': 31.745389938354492,
          'accelAvgX': 2.076169490814209,
          'accelAvgY': 9.235349655151367,
          'accelAvgZ': 1.5682060718536377,
          'accelPeakX': 7.3478851318359375,
          'accelPeakY': 9.962844848632812,
          'accelPeakZ': 1.8562164306640625,
          'time': '2018-05-14T09:19:45.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 1,
        'sample': {
          'speed': 15.420000076293945,
          'longitude': 35.178951263427734,
          'latitude': 31.745168685913086,
          'accelAvgX': 2.325768232345581,
          'accelAvgY': 9.17442512512207,
          'accelAvgZ': 3.1541483402252197,
          'accelPeakX': 3.878082275390625,
          'accelPeakY': 11.627410888671875,
          'accelPeakZ': 3.268798828125,
          'time': '2018-05-14T09:19:50.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 2,
        'sample': {
          'speed': 14.75,
          'longitude': 35.17829895019531,
          'latitude': 31.745304107666016,
          'accelAvgX': 3.792952060699463,
          'accelAvgY': 9.562837600708008,
          'accelAvgZ': -0.5024375319480896,
          'accelPeakX': 8.098464965820312,
          'accelPeakY': 10.572158813476562,
          'accelPeakZ': -0.1423492431640625,
          'time': '2018-05-14T09:19:55.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 3,
        'sample': {
          'speed': 12.140000343322754,
          'longitude': 35.178245544433594,
          'latitude': 31.745908737182617,
          'accelAvgX': 1.0934953689575195,
          'accelAvgY': 9.070000648498535,
          'accelAvgZ': 2.2563774585723877,
          'accelPeakX': 9.361404418945312,
          'accelPeakY': 12.4737548828125,
          'accelPeakZ': -1.337066650390625,
          'time': '2018-05-14T09:20:00.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 4,
        'sample': {
          'speed': 3.880000114440918,
          'longitude': 35.17831039428711,
          'latitude': 31.746295928955078,
          'accelAvgX': 2.067622661590576,
          'accelAvgY': 8.687211036682129,
          'accelAvgZ': 3.7963662147521973,
          'accelPeakX': 0.401702880859375,
          'accelPeakY': 11.790817260742188,
          'accelPeakZ': 1.9214630126953125,
          'time': '2018-05-14T09:20:05.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 5,
        'sample': {
          'speed': 5.110000133514404,
          'longitude': 35.17825698852539,
          'latitude': 31.746402740478516,
          'accelAvgX': -0.4811033010482788,
          'accelAvgY': 10.252344131469727,
          'accelAvgZ': -0.7639554142951965,
          'accelPeakX': -0.1687164306640625,
          'accelPeakY': 11.031845092773438,
          'accelPeakZ': -1.09942626953125,
          'time': '2018-05-14T09:20:10.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 6,
        'sample': {
          'speed': 10.350000381469727,
          'longitude': 35.178016662597656,
          'latitude': 31.746679306030273,
          'accelAvgX': 2.1804587841033936,
          'accelAvgY': 9.261987686157227,
          'accelAvgZ': -0.3542864918708801,
          'accelPeakX': 4.312042236328125,
          'accelPeakY': 11.24493408203125,
          'accelPeakZ': -0.7025909423828125,
          'time': '2018-05-14T09:20:15.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 7,
        'sample': {
          'speed': 11.270000457763672,
          'longitude': 35.177955627441406,
          'latitude': 31.74717140197754,
          'accelAvgX': 0.8556532859802246,
          'accelAvgY': 9.128900527954102,
          'accelAvgZ': 1.8573411703109741,
          'accelPeakX': 1.1468963623046875,
          'accelPeakY': 12.358245849609375,
          'accelPeakZ': -0.3931427001953125,
          'time': '2018-05-14T09:20:20.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 8,
        'sample': {
          'speed': 9.25,
          'longitude': 35.178001403808594,
          'latitude': 31.747617721557617,
          'accelAvgX': 0.5169830918312073,
          'accelAvgY': 9.208924293518066,
          'accelAvgZ': 1.3509750366210938,
          'accelPeakX': -2.83526611328125,
          'accelPeakY': 10.946258544921875,
          'accelPeakZ': 1.7772064208984375,
          'time': '2018-05-14T09:20:25.000Z'
        }
      },
      {
        'reportNumber': 148,
        'sampleNumber': 9,
        'sample': {
          'speed': 12.640000343322754,
          'longitude': 35.17811965942383,
          'latitude': 31.74807357788086,
          'accelAvgX': -0.5075528025627136,
          'accelAvgY': 9.26716423034668,
          'accelAvgZ': 0.4702257215976715,
          'accelPeakX': -8.637008666992188,
          'accelPeakY': 10.927703857421875,
          'accelPeakZ': 0.301177978515625,
          'time': '2018-05-14T09:20:30.000Z'
        }
      },
      {
        'reportNumber': 149,
        'sampleNumber': 0,
        'sample': {
          'speed': 14.109999656677246,
          'longitude': 35.17824172973633,
          'latitude': 31.748682022094727,
          'accelAvgX': 0.3230586647987366,
          'accelAvgY': 9.525619506835938,
          'accelAvgZ': 1.3621968030929565,
          'accelPeakX': -7.7056732177734375,
          'accelPeakY': 10.863052368164062,
          'accelPeakZ': 0.8722076416015625,
          'time': '2018-05-14T09:20:38.000Z'
        }
      },
      {
        'reportNumber': 149,
        'sampleNumber': 1,
        'sample': {
          'speed': 15.229999542236328,
          'longitude': 35.17837905883789,
          'latitude': 31.74933433532715,
          'accelAvgX': 0.6357964873313904,
          'accelAvgY': 9.538877487182617,
          'accelAvgZ': 2.560481071472168,
          'accelPeakX': 3.14605712890625,
          'accelPeakY': 11.666305541992188,
          'accelPeakZ': 1.20379638671875,
          'time': '2018-05-14T09:20:43.000Z'
        }
      },
      {
        'reportNumber': 150,
        'sampleNumber': 0,
        'sample': {
          'speed': 11.539999961853027,
          'longitude': 35.178462982177734,
          'latitude': 31.749792098999023,
          'accelAvgX': -0.03881320357322693,
          'accelAvgY': 9.744098663330078,
          'accelAvgZ': 1.306502103805542,
          'accelPeakX': -4.2813568115234375,
          'accelPeakY': 13.5697021484375,
          'accelPeakZ': 1.0978546142578125,
          'time': '2018-05-14T09:21:26.000Z'
        }
      },
      {
        'reportNumber': 150,
        'sampleNumber': 1,
        'sample': {
          'speed': 17.229999542236328,
          'longitude': 35.17298126220703,
          'latitude': 31.750755310058594,
          'accelAvgX': 0.7502428293228149,
          'accelAvgY': 9.614103317260742,
          'accelAvgZ': 0.6816837787628174,
          'accelPeakX': 0.369384765625,
          'accelPeakY': 13.65948486328125,
          'accelPeakZ': 0.0976715087890625,
          'time': '2018-05-14T09:21:31.000Z'
        }
      },
      {
        'reportNumber': 150,
        'sampleNumber': 2,
        'sample': {
          'speed': 16.610000610351562,
          'longitude': 35.1721076965332,
          'latitude': 31.750959396362305,
          'accelAvgX': 0.5490990877151489,
          'accelAvgY': 9.360288619995117,
          'accelAvgZ': 0.5778593420982361,
          'accelPeakX': 2.9335784912109375,
          'accelPeakY': 12.118820190429688,
          'accelPeakZ': 0.7183685302734375,
          'time': '2018-05-14T09:21:36.000Z'
        }
      },
      {
        'reportNumber': 150,
        'sampleNumber': 3,
        'sample': {
          'speed': 17.93000030517578,
          'longitude': 35.171295166015625,
          'latitude': 31.751314163208008,
          'accelAvgX': 0.2605630159378052,
          'accelAvgY': 9.628211975097656,
          'accelAvgZ': 0.8220444917678833,
          'accelPeakX': 4.44671630859375,
          'accelPeakY': 11.010299682617188,
          'accelPeakZ': 1.24090576171875,
          'time': '2018-05-14T09:21:41.000Z'
        }
      },
      {
        'reportNumber': 150,
        'sampleNumber': 4,
        'sample': {
          'speed': 18.790000915527344,
          'longitude': 35.17042922973633,
          'latitude': 31.751726150512695,
          'accelAvgX': -0.004393100738525391,
          'accelAvgY': 9.500051498413086,
          'accelAvgZ': 1.0710680484771729,
          'accelPeakX': -9.619232177734375,
          'accelPeakY': 13.39971923828125,
          'accelPeakZ': -0.500885009765625,
          'time': '2018-05-14T09:21:46.000Z'
        }
      },
      {
        'reportNumber': 150,
        'sampleNumber': 5,
        'sample': {
          'speed': 17.329999923706055,
          'longitude': 35.16956329345703,
          'latitude': 31.75213050842285,
          'accelAvgX': 0.32070600986480713,
          'accelAvgY': 9.560504913330078,
          'accelAvgZ': 1.06559419631958,
          'accelPeakX': 1.178619384765625,
          'accelPeakY': 13.123184204101562,
          'accelPeakZ': -0.2866058349609375,
          'time': '2018-05-14T09:21:51.000Z'
        }
      },
      {
        'reportNumber': 150,
        'sampleNumber': 6,
        'sample': {
          'speed': 17.6299991607666,
          'longitude': 35.168731689453125,
          'latitude': 31.752458572387695,
          'accelAvgX': -1.299142837524414,
          'accelAvgY': 9.618537902832031,
          'accelAvgZ': 1.4996427297592163,
          'accelPeakX': -2.2612457275390625,
          'accelPeakY': 11.56396484375,
          'accelPeakZ': 0.8829803466796875,
          'time': '2018-05-14T09:21:56.000Z'
        }
      },
      {
        'reportNumber': 150,
        'sampleNumber': 7,
        'sample': {
          'speed': 16.549999237060547,
          'longitude': 35.16779327392578,
          'latitude': 31.752532958984375,
          'accelAvgX': 0.034519582986831665,
          'accelAvgY': 9.18593692779541,
          'accelAvgZ': 2.4524874687194824,
          'accelPeakX': -1.52264404296875,
          'accelPeakY': 12.775421142578125,
          'accelPeakZ': 2.39910888671875,
          'time': '2018-05-14T09:22:01.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 0,
        'sample': {
          'speed': 9.270000457763672,
          'longitude': 35.167137145996094,
          'latitude': 31.75242805480957,
          'accelAvgX': 1.2256253957748413,
          'accelAvgY': 9.437108039855957,
          'accelAvgZ': 2.314018726348877,
          'accelPeakX': -10.218978881835938,
          'accelPeakY': 8.284500122070312,
          'accelPeakZ': 0.4891204833984375,
          'time': '2018-05-14T09:22:06.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 1,
        'sample': {
          'speed': 10.0600004196167,
          'longitude': 35.16669845581055,
          'latitude': 31.752302169799805,
          'accelAvgX': 0.5975934267044067,
          'accelAvgY': 9.762025833129883,
          'accelAvgZ': 0.5562806725502014,
          'accelPeakX': -7.8636932373046875,
          'accelPeakY': 11.0067138671875,
          'accelPeakZ': -0.8983154296875,
          'time': '2018-05-14T09:22:11.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 2,
        'sample': {
          'speed': 12.59000015258789,
          'longitude': 35.16606903076172,
          'latitude': 31.752153396606445,
          'accelAvgX': 1.5135940313339233,
          'accelAvgY': 9.52435302734375,
          'accelAvgZ': 0.7923697233200073,
          'accelPeakX': 12.22906494140625,
          'accelPeakY': 9.648605346679688,
          'accelPeakZ': 2.3643798828125,
          'time': '2018-05-14T09:22:16.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 3,
        'sample': {
          'speed': 14.199999809265137,
          'longitude': 35.165374755859375,
          'latitude': 31.75226593017578,
          'accelAvgX': 1.5952762365341187,
          'accelAvgY': 10.141523361206055,
          'accelAvgZ': 0.42326751351356506,
          'accelPeakX': 2.08721923828125,
          'accelPeakY': 16.217681884765625,
          'accelPeakZ': -0.4009246826171875,
          'time': '2018-05-14T09:22:21.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 4,
        'sample': {
          'speed': 17.190000534057617,
          'longitude': 35.1646728515625,
          'latitude': 31.752687454223633,
          'accelAvgX': 1.8276655673980713,
          'accelAvgY': 9.602815628051758,
          'accelAvgZ': 1.3231085538864136,
          'accelPeakX': 2.5115966796875,
          'accelPeakY': 12.24810791015625,
          'accelPeakZ': 0.38616943359375,
          'time': '2018-05-14T09:22:26.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 5,
        'sample': {
          'speed': 17.350000381469727,
          'longitude': 35.16423416137695,
          'latitude': 31.75334358215332,
          'accelAvgX': 1.8119499683380127,
          'accelAvgY': 9.573983192443848,
          'accelAvgZ': 0.22750598192214966,
          'accelPeakX': 7.2024383544921875,
          'accelPeakY': 11.593887329101562,
          'accelPeakZ': 0.35565185546875,
          'time': '2018-05-14T09:22:31.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 6,
        'sample': {
          'speed': 18.56999969482422,
          'longitude': 35.16415023803711,
          'latitude': 31.7541446685791,
          'accelAvgX': -0.18274950981140137,
          'accelAvgY': 9.372180938720703,
          'accelAvgZ': 0.8615303039550781,
          'accelPeakX': 7.0384368896484375,
          'accelPeakY': 14.521392822265625,
          'accelPeakZ': -0.822906494140625,
          'time': '2018-05-14T09:22:36.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 7,
        'sample': {
          'speed': 19.809999465942383,
          'longitude': 35.16419982910156,
          'latitude': 31.755029678344727,
          'accelAvgX': -0.5513814687728882,
          'accelAvgY': 9.387346267700195,
          'accelAvgZ': 2.1980373859405518,
          'accelPeakX': -2.5790863037109375,
          'accelPeakY': 14.265213012695312,
          'accelPeakZ': 1.8747711181640625,
          'time': '2018-05-14T09:22:41.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 8,
        'sample': {
          'speed': 17.309999465942383,
          'longitude': 35.16409683227539,
          'latitude': 31.755874633789062,
          'accelAvgX': -1.3695111274719238,
          'accelAvgY': 9.093059539794922,
          'accelAvgZ': 3.3509974479675293,
          'accelPeakX': -14.578216552734375,
          'accelPeakY': 10.38421630859375,
          'accelPeakZ': 2.8348541259765625,
          'time': '2018-05-14T09:22:46.000Z'
        }
      },
      {
        'reportNumber': 151,
        'sampleNumber': 9,
        'sample': {
          'speed': 15.4399995803833,
          'longitude': 35.16347122192383,
          'latitude': 31.75649642944336,
          'accelAvgX': -1.2704427242279053,
          'accelAvgY': 9.780380249023438,
          'accelAvgZ': 2.2011966705322266,
          'accelPeakX': -8.69805908203125,
          'accelPeakY': 11.505905151367188,
          'accelPeakZ': 2.05853271484375,
          'time': '2018-05-14T09:22:51.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 0,
        'sample': {
          'speed': 15.899999618530273,
          'longitude': 35.162818908691406,
          'latitude': 31.756576538085938,
          'accelAvgX': 1.8509716987609863,
          'accelAvgY': 8.467351913452148,
          'accelAvgZ': 3.9086689949035645,
          'accelPeakX': 3.6003570556640625,
          'accelPeakY': 17.980422973632812,
          'accelPeakZ': 0.542999267578125,
          'time': '2018-05-14T09:22:56.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 1,
        'sample': {
          'speed': 5.199999809265137,
          'longitude': 35.162322998046875,
          'latitude': 31.756574630737305,
          'accelAvgX': 1.7910405397415161,
          'accelAvgY': 9.480155944824219,
          'accelAvgZ': 0.2032114565372467,
          'accelPeakX': 4.965057373046875,
          'accelPeakY': 9.448684692382812,
          'accelPeakZ': 6.853515625,
          'time': '2018-05-14T09:23:01.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 2,
        'sample': {
          'speed': 8.170000076293945,
          'longitude': 35.1619987487793,
          'latitude': 31.756555557250977,
          'accelAvgX': 1.1917657852172852,
          'accelAvgY': 9.587800979614258,
          'accelAvgZ': 0.44023311138153076,
          'accelPeakX': -0.36444091796875,
          'accelPeakY': 11.135391235351562,
          'accelPeakZ': 0.64654541015625,
          'time': '2018-05-14T09:23:06.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 3,
        'sample': {
          'speed': 9.729999542236328,
          'longitude': 35.1616325378418,
          'latitude': 31.756515502929688,
          'accelAvgX': 1.9573255777359009,
          'accelAvgY': 9.37329387664795,
          'accelAvgZ': 1.783988118171692,
          'accelPeakX': 3.14306640625,
          'accelPeakY': 10.447662353515625,
          'accelPeakZ': 1.46356201171875,
          'time': '2018-05-14T09:23:11.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 4,
        'sample': {
          'speed': 9.539999961853027,
          'longitude': 35.161102294921875,
          'latitude': 31.756820678710938,
          'accelAvgX': 0.9604833126068115,
          'accelAvgY': 9.179646492004395,
          'accelAvgZ': 2.8555400371551514,
          'accelPeakX': 2.581634521484375,
          'accelPeakY': 11.595077514648438,
          'accelPeakZ': 1.93463134765625,
          'time': '2018-05-14T09:23:16.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 5,
        'sample': {
          'speed': 3.5,
          'longitude': 35.160858154296875,
          'latitude': 31.757068634033203,
          'accelAvgX': 1.489696741104126,
          'accelAvgY': 8.780059814453125,
          'accelAvgZ': 3.899418592453003,
          'accelPeakX': 3.186767578125,
          'accelPeakY': 11.955413818359375,
          'accelPeakZ': 1.95318603515625,
          'time': '2018-05-14T09:23:21.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 6,
        'sample': {
          'speed': 0.3100000023841858,
          'longitude': 35.16082763671875,
          'latitude': 31.757104873657227,
          'accelAvgX': 0.7595641613006592,
          'accelAvgY': 9.311356544494629,
          'accelAvgZ': 1.6614508628845215,
          'accelPeakX': 1.3438262939453125,
          'accelPeakY': 9.373260498046875,
          'accelPeakZ': 3.434600830078125,
          'time': '2018-05-14T09:23:26.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 7,
        'sample': {
          'speed': 0,
          'longitude': 35.16082763671875,
          'latitude': 31.75710105895996,
          'accelAvgX': 0.7504613995552063,
          'accelAvgY': 9.313413619995117,
          'accelAvgZ': 1.6937289237976074,
          'accelPeakX': 0.77459716796875,
          'accelPeakY': 9.654586791992188,
          'accelPeakZ': 1.82330322265625,
          'time': '2018-05-14T09:23:31.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 8,
        'sample': {
          'speed': 0,
          'longitude': 35.16082763671875,
          'latitude': 31.757102966308594,
          'accelAvgX': 0.7601087093353271,
          'accelAvgY': 9.273927688598633,
          'accelAvgZ': 1.7151243686676025,
          'accelPeakX': 0.782989501953125,
          'accelPeakY': 9.698883056640625,
          'accelPeakZ': 1.8442535400390625,
          'time': '2018-05-14T09:23:36.000Z'
        }
      },
      {
        'reportNumber': 152,
        'sampleNumber': 9,
        'sample': {
          'speed': 0,
          'longitude': 35.16082763671875,
          'latitude': 31.757104873657227,
          'accelAvgX': 0.7554131746292114,
          'accelAvgY': 9.311470985412598,
          'accelAvgZ': 1.7053626775741577,
          'accelPeakX': 0.86798095703125,
          'accelPeakY': 9.752151489257812,
          'accelPeakZ': 1.8310699462890625,
          'time': '2018-05-14T09:23:41.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 0,
        'sample': {
          'speed': 0,
          'longitude': 35.16082763671875,
          'latitude': 31.757104873657227,
          'accelAvgX': 0.7515364289283752,
          'accelAvgY': 9.30266284942627,
          'accelAvgZ': 1.6794195175170898,
          'accelPeakX': 0.8081207275390625,
          'accelPeakY': 9.677322387695312,
          'accelPeakZ': 1.824493408203125,
          'time': '2018-05-14T09:23:46.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 1,
        'sample': {
          'speed': 0,
          'longitude': 35.160823822021484,
          'latitude': 31.757104873657227,
          'accelAvgX': 0.7652601003646851,
          'accelAvgY': 9.3118257522583,
          'accelAvgZ': 1.6767940521240234,
          'accelPeakX': 0.8931121826171875,
          'accelPeakY': 9.698883056640625,
          'accelPeakZ': 1.8837432861328125,
          'time': '2018-05-14T09:23:51.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 2,
        'sample': {
          'speed': 0,
          'longitude': 35.160823822021484,
          'latitude': 31.75710678100586,
          'accelAvgX': 0.798546552658081,
          'accelAvgY': 9.346366882324219,
          'accelAvgZ': 1.710461139678955,
          'accelPeakX': 0.8272857666015625,
          'accelPeakY': 9.676132202148438,
          'accelPeakZ': 1.850830078125,
          'time': '2018-05-14T09:23:56.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 3,
        'sample': {
          'speed': 0,
          'longitude': 35.160823822021484,
          'latitude': 31.757104873657227,
          'accelAvgX': 0.803164005279541,
          'accelAvgY': 9.252238273620605,
          'accelAvgZ': 1.700573444366455,
          'accelPeakX': 0.6931915283203125,
          'accelPeakY': 9.65399169921875,
          'accelPeakZ': 1.8191070556640625,
          'time': '2018-05-14T09:24:01.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 4,
        'sample': {
          'speed': 7.320000171661377,
          'longitude': 35.160728454589844,
          'latitude': 31.757230758666992,
          'accelAvgX': -1.4576473236083984,
          'accelAvgY': 8.988926887512207,
          'accelAvgZ': 3.189122200012207,
          'accelPeakX': -0.328521728515625,
          'accelPeakY': 10.727783203125,
          'accelPeakZ': -0.302764892578125,
          'time': '2018-05-14T09:24:06.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 5,
        'sample': {
          'speed': 11.890000343322754,
          'longitude': 35.16024398803711,
          'latitude': 31.75730323791504,
          'accelAvgX': 1.6660364866256714,
          'accelAvgY': 8.311971664428711,
          'accelAvgZ': 2.0089375972747803,
          'accelPeakX': 5.270904541015625,
          'accelPeakY': 11.442459106445312,
          'accelPeakZ': 1.5060577392578125,
          'time': '2018-05-14T09:24:11.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 6,
        'sample': {
          'speed': 12.600000381469727,
          'longitude': 35.159629821777344,
          'latitude': 31.757503509521484,
          'accelAvgX': 1.9394187927246094,
          'accelAvgY': 9.06637954711914,
          'accelAvgZ': 1.6731513738632202,
          'accelPeakX': 3.0443115234375,
          'accelPeakY': 12.219970703125,
          'accelPeakZ': 1.03680419921875,
          'time': '2018-05-14T09:24:16.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 7,
        'sample': {
          'speed': 14.34000015258789,
          'longitude': 35.15910720825195,
          'latitude': 31.75796127319336,
          'accelAvgX': 1.7032543420791626,
          'accelAvgY': 9.01747989654541,
          'accelAvgZ': 2.9130172729492188,
          'accelPeakX': 9.833663940429688,
          'accelPeakY': 13.060333251953125,
          'accelPeakZ': 3.15386962890625,
          'time': '2018-05-14T09:24:21.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 8,
        'sample': {
          'speed': 13.479999542236328,
          'longitude': 35.158809661865234,
          'latitude': 31.75850486755371,
          'accelAvgX': 1.7355951070785522,
          'accelAvgY': 9.17954158782959,
          'accelAvgZ': 2.1290173530578613,
          'accelPeakX': 1.8992767333984375,
          'accelPeakY': 13.120193481445312,
          'accelPeakZ': 1.9214630126953125,
          'time': '2018-05-14T09:24:26.000Z'
        }
      },
      {
        'reportNumber': 153,
        'sampleNumber': 9,
        'sample': {
          'speed': 14.949999809265137,
          'longitude': 35.1586799621582,
          'latitude': 31.759170532226562,
          'accelAvgX': 1.7036032676696777,
          'accelAvgY': 9.006963729858398,
          'accelAvgZ': 3.058777332305908,
          'accelPeakX': -6.507965087890625,
          'accelPeakY': 12.344467163085938,
          'accelPeakZ': 0.3921661376953125,
          'time': '2018-05-14T09:24:31.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 0,
        'sample': {
          'speed': 12.979999542236328,
          'longitude': 35.15841293334961,
          'latitude': 31.75972557067871,
          'accelAvgX': 0.8225119709968567,
          'accelAvgY': 9.166921615600586,
          'accelAvgZ': 1.8364479541778564,
          'accelPeakX': 7.7967987060546875,
          'accelPeakY': 13.9228515625,
          'accelPeakZ': 3.235870361328125,
          'time': '2018-05-14T09:24:36.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 1,
        'sample': {
          'speed': 13.8100004196167,
          'longitude': 35.15814208984375,
          'latitude': 31.76027488708496,
          'accelAvgX': 2.305455446243286,
          'accelAvgY': 9.719449043273926,
          'accelAvgZ': 1.6525492668151855,
          'accelPeakX': 7.435272216796875,
          'accelPeakY': 11.297607421875,
          'accelPeakZ': 1.9256439208984375,
          'time': '2018-05-14T09:24:41.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 2,
        'sample': {
          'speed': 16.75,
          'longitude': 35.15831756591797,
          'latitude': 31.760944366455078,
          'accelAvgX': 1.4434971809387207,
          'accelAvgY': 9.010246276855469,
          'accelAvgZ': 2.2929115295410156,
          'accelPeakX': 4.6891326904296875,
          'accelPeakY': 13.574493408203125,
          'accelPeakZ': 0.3598480224609375,
          'time': '2018-05-14T09:24:46.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 3,
        'sample': {
          'speed': 16.15999984741211,
          'longitude': 35.15841293334961,
          'latitude': 31.76167106628418,
          'accelAvgX': -0.40042898058891296,
          'accelAvgY': 8.689046859741211,
          'accelAvgZ': 3.1899657249450684,
          'accelPeakX': 7.8961639404296875,
          'accelPeakY': 12.814926147460938,
          'accelPeakZ': 2.7755889892578125,
          'time': '2018-05-14T09:24:51.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 4,
        'sample': {
          'speed': 16.010000228881836,
          'longitude': 35.15796661376953,
          'latitude': 31.762256622314453,
          'accelAvgX': -1.732800006866455,
          'accelAvgY': 9.459783554077148,
          'accelAvgZ': 2.730440378189087,
          'accelPeakX': 2.488250732421875,
          'accelPeakY': 13.736099243164062,
          'accelPeakZ': 3.0826416015625,
          'time': '2018-05-14T09:24:56.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 5,
        'sample': {
          'speed': 17.600000381469727,
          'longitude': 35.1570930480957,
          'latitude': 31.762325286865234,
          'accelAvgX': 0.7458531260490417,
          'accelAvgY': 9.224786758422852,
          'accelAvgZ': 2.682107925415039,
          'accelPeakX': 4.4951934814453125,
          'accelPeakY': 12.48931884765625,
          'accelPeakZ': 2.5254058837890625,
          'time': '2018-05-14T09:25:01.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 6,
        'sample': {
          'speed': 12.760000228881836,
          'longitude': 35.15631103515625,
          'latitude': 31.762351989746094,
          'accelAvgX': 3.2378411293029785,
          'accelAvgY': 9.456364631652832,
          'accelAvgZ': 1.068894863128662,
          'accelPeakX': 6.918121337890625,
          'accelPeakY': 13.463165283203125,
          'accelPeakZ': 0.6615142822265625,
          'time': '2018-05-14T09:25:06.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 7,
        'sample': {
          'speed': 16.450000762939453,
          'longitude': 35.155826568603516,
          'latitude': 31.762868881225586,
          'accelAvgX': 0.45598548650741577,
          'accelAvgY': 8.537586212158203,
          'accelAvgZ': 1.8402843475341797,
          'accelPeakX': -2.01763916015625,
          'accelPeakY': 15.037948608398438,
          'accelPeakZ': 0.7650604248046875,
          'time': '2018-05-14T09:25:11.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 8,
        'sample': {
          'speed': 15.270000457763672,
          'longitude': 35.15533447265625,
          'latitude': 31.763498306274414,
          'accelAvgX': 1.0646846294403076,
          'accelAvgY': 9.340747833251953,
          'accelAvgZ': 2.9203691482543945,
          'accelPeakX': 9.077102661132812,
          'accelPeakY': 13.645111083984375,
          'accelPeakZ': 2.106414794921875,
          'time': '2018-05-14T09:25:16.000Z'
        }
      },
      {
        'reportNumber': 154,
        'sampleNumber': 9,
        'sample': {
          'speed': 14.399999618530273,
          'longitude': 35.15486145019531,
          'latitude': 31.764015197753906,
          'accelAvgX': -0.7446274161338806,
          'accelAvgY': 8.912308692932129,
          'accelAvgZ': 3.3316617012023926,
          'accelPeakX': 6.3776397705078125,
          'accelPeakY': 12.099655151367188,
          'accelPeakZ': 1.6269683837890625,
          'time': '2018-05-14T09:25:21.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 0,
        'sample': {
          'speed': 13.130000114440918,
          'longitude': 35.15416717529297,
          'latitude': 31.764278411865234,
          'accelAvgX': 1.4541987180709839,
          'accelAvgY': 8.738504409790039,
          'accelAvgZ': 2.3095974922180176,
          'accelPeakX': 1.4527587890625,
          'accelPeakY': 17.1298828125,
          'accelPeakZ': 0.7668609619140625,
          'time': '2018-05-14T09:25:26.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 1,
        'sample': {
          'speed': 13.539999961853027,
          'longitude': 35.15349578857422,
          'latitude': 31.764419555664062,
          'accelAvgX': 0.988183856010437,
          'accelAvgY': 8.932117462158203,
          'accelAvgZ': 2.15399432182312,
          'accelPeakX': -4.67041015625,
          'accelPeakY': 14.055130004882812,
          'accelPeakZ': 2.4906768798828125,
          'time': '2018-05-14T09:25:31.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 2,
        'sample': {
          'speed': 10.949999809265137,
          'longitude': 35.15288543701172,
          'latitude': 31.76439666748047,
          'accelAvgX': 0.6350787281990051,
          'accelAvgY': 9.747358322143555,
          'accelAvgZ': 1.4200479984283447,
          'accelPeakX': -0.9600067138671875,
          'accelPeakY': 12.716766357421875,
          'accelPeakZ': 0.939239501953125,
          'time': '2018-05-14T09:25:36.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 3,
        'sample': {
          'speed': 14.579999923706055,
          'longitude': 35.15220642089844,
          'latitude': 31.764347076416016,
          'accelAvgX': -0.06539478898048401,
          'accelAvgY': 9.230814933776855,
          'accelAvgZ': 2.4592275619506836,
          'accelPeakX': -8.81298828125,
          'accelPeakY': 17.277725219726562,
          'accelPeakZ': -0.361419677734375,
          'time': '2018-05-14T09:25:41.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 4,
        'sample': {
          'speed': 11.380000114440918,
          'longitude': 35.15152359008789,
          'latitude': 31.764144897460938,
          'accelAvgX': 0.9598332643508911,
          'accelAvgY': 8.736021041870117,
          'accelAvgZ': 4.168030738830566,
          'accelPeakX': 4.845947265625,
          'accelPeakY': 12.437240600585938,
          'accelPeakZ': 3.2448577880859375,
          'time': '2018-05-14T09:25:46.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 5,
        'sample': {
          'speed': 6.940000057220459,
          'longitude': 35.151161193847656,
          'latitude': 31.763830184936523,
          'accelAvgX': 1.934500813484192,
          'accelAvgY': 8.369182586669922,
          'accelAvgZ': 4.043620586395264,
          'accelPeakX': 8.367218017578125,
          'accelPeakY': 12.454605102539062,
          'accelPeakZ': 2.8252716064453125,
          'time': '2018-05-14T09:25:51.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 6,
        'sample': {
          'speed': 0,
          'longitude': 35.15111541748047,
          'latitude': 31.763765335083008,
          'accelAvgX': 1.0711346864700317,
          'accelAvgY': 9.083906173706055,
          'accelAvgZ': 2.4244847297668457,
          'accelPeakX': 3.193939208984375,
          'accelPeakY': 9.292465209960938,
          'accelPeakZ': 6.7643280029296875,
          'time': '2018-05-14T09:25:56.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 7,
        'sample': {
          'speed': 0,
          'longitude': 35.151100158691406,
          'latitude': 31.763763427734375,
          'accelAvgX': 1.0726548433303833,
          'accelAvgY': 9.05332088470459,
          'accelAvgZ': 2.457179069519043,
          'accelPeakX': 1.1157684326171875,
          'accelPeakY': 9.630645751953125,
          'accelPeakZ': 2.6690521240234375,
          'time': '2018-05-14T09:26:01.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 8,
        'sample': {
          'speed': 0,
          'longitude': 35.151100158691406,
          'latitude': 31.76375961303711,
          'accelAvgX': 1.093956708908081,
          'accelAvgY': 9.080516815185547,
          'accelAvgZ': 2.4471497535705566,
          'accelPeakX': 1.0882415771484375,
          'accelPeakY': 9.543853759765625,
          'accelPeakZ': 2.657073974609375,
          'time': '2018-05-14T09:26:06.000Z'
        }
      },
      {
        'reportNumber': 155,
        'sampleNumber': 9,
        'sample': {
          'speed': 0,
          'longitude': 35.15109634399414,
          'latitude': 31.763757705688477,
          'accelAvgX': 1.1159747838974,
          'accelAvgY': 9.085638999938965,
          'accelAvgZ': 2.502621650695801,
          'accelPeakX': 1.1780242919921875,
          'accelPeakY': 9.452285766601562,
          'accelPeakZ': 2.6624603271484375,
          'time': '2018-05-14T09:26:11.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 0,
        'sample': {
          'speed': 0,
          'longitude': 35.151100158691406,
          'latitude': 31.763757705688477,
          'accelAvgX': 1.0827449560165405,
          'accelAvgY': 9.064604759216309,
          'accelAvgZ': 2.4372363090515137,
          'accelPeakX': 1.0325775146484375,
          'accelPeakY': 9.565399169921875,
          'accelPeakZ': 2.5236053466796875,
          'time': '2018-05-14T09:26:17.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 1,
        'sample': {
          'speed': 0,
          'longitude': 35.151100158691406,
          'latitude': 31.763757705688477,
          'accelAvgX': 0.8655044436454773,
          'accelAvgY': 9.291988372802734,
          'accelAvgZ': 1.7769408226013184,
          'accelPeakX': 0.87396240234375,
          'accelPeakY': 9.670150756835938,
          'accelPeakZ': 2.0124359130859375,
          'time': '2018-05-14T09:26:22.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 2,
        'sample': {
          'speed': 8.479999542236328,
          'longitude': 35.15095138549805,
          'latitude': 31.763565063476562,
          'accelAvgX': 1.1279377937316895,
          'accelAvgY': 9.724691390991211,
          'accelAvgZ': 2.3509891033172607,
          'accelPeakX': 2.8060760498046875,
          'accelPeakY': 12.562942504882812,
          'accelPeakZ': 1.437225341796875,
          'time': '2018-05-14T09:26:27.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 3,
        'sample': {
          'speed': 11.09000015258789,
          'longitude': 35.150753021240234,
          'latitude': 31.763137817382812,
          'accelAvgX': 2.983193874359131,
          'accelAvgY': 8.375104904174805,
          'accelAvgZ': 2.435478448867798,
          'accelPeakX': -12.476119995117188,
          'accelPeakY': 14.385528564453125,
          'accelPeakZ': 2.79833984375,
          'time': '2018-05-14T09:26:32.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 4,
        'sample': {
          'speed': 3.380000114440918,
          'longitude': 35.150428771972656,
          'latitude': 31.76287841796875,
          'accelAvgX': 1.5858523845672607,
          'accelAvgY': 8.387650489807129,
          'accelAvgZ': 4.678619384765625,
          'accelPeakX': 8.02783203125,
          'accelPeakY': 10.726593017578125,
          'accelPeakZ': 3.5058135986328125,
          'time': '2018-05-14T09:26:37.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 5,
        'sample': {
          'speed': 2.7899999618530273,
          'longitude': 35.15034103393555,
          'latitude': 31.76284408569336,
          'accelAvgX': 0.6597433686256409,
          'accelAvgY': 9.440080642700195,
          'accelAvgZ': 1.113816499710083,
          'accelPeakX': 1.1887969970703125,
          'accelPeakY': 9.4403076171875,
          'accelPeakZ': 3.3406219482421875,
          'time': '2018-05-14T09:26:42.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 6,
        'sample': {
          'speed': 11.0600004196167,
          'longitude': 35.149925231933594,
          'latitude': 31.762786865234375,
          'accelAvgX': 0.6000551581382751,
          'accelAvgY': 9.043340682983398,
          'accelAvgZ': 2.150646209716797,
          'accelPeakX': 0.3490447998046875,
          'accelPeakY': 11.584304809570312,
          'accelPeakZ': 0.87579345703125,
          'time': '2018-05-14T09:26:47.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 7,
        'sample': {
          'speed': 11.25,
          'longitude': 35.14929962158203,
          'latitude': 31.762813568115234,
          'accelAvgX': 1.0635133981704712,
          'accelAvgY': 8.837597846984863,
          'accelAvgZ': 3.1443843841552734,
          'accelPeakX': 8.5234375,
          'accelPeakY': 13.982696533203125,
          'accelPeakZ': 1.8514251708984375,
          'time': '2018-05-14T09:26:52.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 8,
        'sample': {
          'speed': 12.520000457763672,
          'longitude': 35.148712158203125,
          'latitude': 31.762971878051758,
          'accelAvgX': 1.5187246799468994,
          'accelAvgY': 8.927247047424316,
          'accelAvgZ': 3.0213756561279297,
          'accelPeakX': -0.187255859375,
          'accelPeakY': 15.77716064453125,
          'accelPeakZ': 0.7913970947265625,
          'time': '2018-05-14T09:26:57.000Z'
        }
      },
      {
        'reportNumber': 156,
        'sampleNumber': 9,
        'sample': {
          'speed': 13.729999542236328,
          'longitude': 35.148094177246094,
          'latitude': 31.76325225830078,
          'accelAvgX': 0.9403691291809082,
          'accelAvgY': 9.229870796203613,
          'accelAvgZ': 2.4044227600097656,
          'accelPeakX': 5.9550628662109375,
          'accelPeakY': 10.308212280273438,
          'accelPeakZ': 3.1454925537109375,
          'time': '2018-05-14T09:27:02.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 0,
        'sample': {
          'speed': 14.399999618530273,
          'longitude': 35.14741134643555,
          'latitude': 31.763566970825195,
          'accelAvgX': 0.13674119114875793,
          'accelAvgY': 8.802641868591309,
          'accelAvgZ': 3.0055179595947266,
          'accelPeakX': -19.526443481445312,
          'accelPeakY': 10.843902587890625,
          'accelPeakZ': 3.33404541015625,
          'time': '2018-05-14T09:27:06.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 1,
        'sample': {
          'speed': 11.359999656677246,
          'longitude': 35.14676284790039,
          'latitude': 31.763769149780273,
          'accelAvgX': 1.3003785610198975,
          'accelAvgY': 8.92432689666748,
          'accelAvgZ': 2.9043021202087402,
          'accelPeakX': -3.94915771484375,
          'accelPeakY': 16.103363037109375,
          'accelPeakZ': 1.948394775390625,
          'time': '2018-05-14T09:27:11.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 2,
        'sample': {
          'speed': 9.359999656677246,
          'longitude': 35.146236419677734,
          'latitude': 31.76390266418457,
          'accelAvgX': 0.20535600185394287,
          'accelAvgY': 9.47453784942627,
          'accelAvgZ': 3.0648865699768066,
          'accelPeakX': 5.646209716796875,
          'accelPeakY': 13.500274658203125,
          'accelPeakZ': 3.5405426025390625,
          'time': '2018-05-14T09:27:16.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 3,
        'sample': {
          'speed': 12.050000190734863,
          'longitude': 35.14569854736328,
          'latitude': 31.76385498046875,
          'accelAvgX': 0.8223254084587097,
          'accelAvgY': 9.289531707763672,
          'accelAvgZ': 2.3997302055358887,
          'accelPeakX': 7.7967987060546875,
          'accelPeakY': 10.84271240234375,
          'accelPeakZ': 2.4876861572265625,
          'time': '2018-05-14T09:27:21.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 4,
        'sample': {
          'speed': 10.619999885559082,
          'longitude': 35.145145416259766,
          'latitude': 31.763736724853516,
          'accelAvgX': 2.9807114601135254,
          'accelAvgY': 10.05835247039795,
          'accelAvgZ': 0.15133927762508392,
          'accelPeakX': 1.0439453125,
          'accelPeakY': 14.669845581054688,
          'accelPeakZ': 3.7931365966796875,
          'time': '2018-05-14T09:27:26.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 5,
        'sample': {
          'speed': 15.289999961853027,
          'longitude': 35.14446258544922,
          'latitude': 31.76396369934082,
          'accelAvgX': 2.269346237182617,
          'accelAvgY': 8.613117218017578,
          'accelAvgZ': 1.6132289171218872,
          'accelPeakX': -2.7269287109375,
          'accelPeakY': 15.088226318359375,
          'accelPeakZ': -0.7259368896484375,
          'time': '2018-05-14T09:27:31.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 6,
        'sample': {
          'speed': 12.289999961853027,
          'longitude': 35.14409255981445,
          'latitude': 31.764450073242188,
          'accelAvgX': 2.823903799057007,
          'accelAvgY': 9.315808296203613,
          'accelAvgZ': 0.7335426807403564,
          'accelPeakX': 6.7331695556640625,
          'accelPeakY': 11.367630004882812,
          'accelPeakZ': 1.7167510986328125,
          'time': '2018-05-14T09:27:36.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 7,
        'sample': {
          'speed': 16.8700008392334,
          'longitude': 35.14446258544922,
          'latitude': 31.76494789123535,
          'accelAvgX': -0.5028491616249084,
          'accelAvgY': 9.355127334594727,
          'accelAvgZ': 0.5753620266914368,
          'accelPeakX': 9.297958374023438,
          'accelPeakY': 12.00628662109375,
          'accelPeakZ': 0.4454345703125,
          'time': '2018-05-14T09:27:41.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 8,
        'sample': {
          'speed': 19.479999542236328,
          'longitude': 35.145164489746094,
          'latitude': 31.76555633544922,
          'accelAvgX': -0.5139559507369995,
          'accelAvgY': 9.631147384643555,
          'accelAvgZ': 1.109063744544983,
          'accelPeakX': 0.5447540283203125,
          'accelPeakY': 11.209625244140625,
          'accelPeakZ': 2.0980377197265625,
          'time': '2018-05-14T09:27:46.000Z'
        }
      },
      {
        'reportNumber': 157,
        'sampleNumber': 9,
        'sample': {
          'speed': 20.530000686645508,
          'longitude': 35.14567184448242,
          'latitude': 31.76638412475586,
          'accelAvgX': -0.5398420691490173,
          'accelAvgY': 9.587132453918457,
          'accelAvgZ': 3.033052444458008,
          'accelPeakX': -1.20001220703125,
          'accelPeakY': 11.69384765625,
          'accelPeakZ': 3.2550201416015625,
          'time': '2018-05-14T09:27:51.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 0,
        'sample': {
          'speed': 22.239999771118164,
          'longitude': 35.145931243896484,
          'latitude': 31.767303466796875,
          'accelAvgX': 1.4483115673065186,
          'accelAvgY': 9.395483016967773,
          'accelAvgZ': 1.4619776010513306,
          'accelPeakX': 1.9705047607421875,
          'accelPeakY': 11.57891845703125,
          'accelPeakZ': 0.9488067626953125,
          'time': '2018-05-14T09:27:57.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 1,
        'sample': {
          'speed': 18.3700008392334,
          'longitude': 35.146156311035156,
          'latitude': 31.76824188232422,
          'accelAvgX': 3.7996127605438232,
          'accelAvgY': 8.942837715148926,
          'accelAvgZ': 0.9600344896316528,
          'accelPeakX': -2.1187896728515625,
          'accelPeakY': 11.700424194335938,
          'accelPeakZ': 2.1596832275390625,
          'time': '2018-05-14T09:28:02.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 2,
        'sample': {
          'speed': 20.479999542236328,
          'longitude': 35.14678192138672,
          'latitude': 31.76893424987793,
          'accelAvgX': 0.9181371927261353,
          'accelAvgY': 9.027193069458008,
          'accelAvgZ': 1.9011297225952148,
          'accelPeakX': 3.3824920654296875,
          'accelPeakY': 13.054351806640625,
          'accelPeakZ': 0.5639495849609375,
          'time': '2018-05-14T09:28:07.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 3,
        'sample': {
          'speed': 20.170000076293945,
          'longitude': 35.14765167236328,
          'latitude': 31.76943588256836,
          'accelAvgX': 2.449561357498169,
          'accelAvgY': 9.371021270751953,
          'accelAvgZ': 1.1217740774154663,
          'accelPeakX': 0.3681793212890625,
          'accelPeakY': 11.517868041992188,
          'accelPeakZ': 0.9009246826171875,
          'time': '2018-05-14T09:28:12.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 4,
        'sample': {
          'speed': 19.309999465942383,
          'longitude': 35.148681640625,
          'latitude': 31.769577026367188,
          'accelAvgX': 1.5945112705230713,
          'accelAvgY': 8.027448654174805,
          'accelAvgZ': 3.7127957344055176,
          'accelPeakX': 4.5957489013671875,
          'accelPeakY': 10.856475830078125,
          'accelPeakZ': 2.5439605712890625,
          'time': '2018-05-14T09:28:17.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 5,
        'sample': {
          'speed': 11.9399995803833,
          'longitude': 35.14940643310547,
          'latitude': 31.769685745239258,
          'accelAvgX': -0.03185300901532173,
          'accelAvgY': 9.529288291931152,
          'accelAvgZ': 2.7075936794281006,
          'accelPeakX': -20.626571655273438,
          'accelPeakY': 21.285018920898438,
          'accelPeakZ': 3.514801025390625,
          'time': '2018-05-14T09:28:22.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 6,
        'sample': {
          'speed': 13.25,
          'longitude': 35.14985275268555,
          'latitude': 31.77008628845215,
          'accelAvgX': 0.5212642550468445,
          'accelAvgY': 8.78073787689209,
          'accelAvgZ': 4.028095245361328,
          'accelPeakX': -16.448684692382812,
          'accelPeakY': 20.5787353515625,
          'accelPeakZ': 4.28094482421875,
          'time': '2018-05-14T09:28:27.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 7,
        'sample': {
          'speed': 9.949999809265137,
          'longitude': 35.150001525878906,
          'latitude': 31.770578384399414,
          'accelAvgX': 1.9527888298034668,
          'accelAvgY': 9.025145530700684,
          'accelAvgZ': 3.372312545776367,
          'accelPeakX': 15.466629028320312,
          'accelPeakY': 15.355178833007812,
          'accelPeakZ': 2.995849609375,
          'time': '2018-05-14T09:28:32.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 8,
        'sample': {
          'speed': 9.800000190734863,
          'longitude': 35.15015411376953,
          'latitude': 31.77094841003418,
          'accelAvgX': 1.655304193496704,
          'accelAvgY': 9.497380256652832,
          'accelAvgZ': -0.007245099171996117,
          'accelPeakX': 18.561126708984375,
          'accelPeakY': 6.08123779296875,
          'accelPeakZ': 5.487030029296875,
          'time': '2018-05-14T09:28:37.000Z'
        }
      },
      {
        'reportNumber': 158,
        'sampleNumber': 9,
        'sample': {
          'speed': 13.4399995803833,
          'longitude': 35.150535583496094,
          'latitude': 31.771408081054688,
          'accelAvgX': 1.4354937076568604,
          'accelAvgY': 8.986270904541016,
          'accelAvgZ': 2.1060094833374023,
          'accelPeakX': 3.265777587890625,
          'accelPeakY': 12.053573608398438,
          'accelPeakZ': 0.6118316650390625,
          'time': '2018-05-14T09:28:42.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 0,
        'sample': {
          'speed': 13.600000381469727,
          'longitude': 35.151145935058594,
          'latitude': 31.7717342376709,
          'accelAvgX': 1.0413286685943604,
          'accelAvgY': 9.334769248962402,
          'accelAvgZ': 1.872553825378418,
          'accelPeakX': 5.005157470703125,
          'accelPeakY': 10.770278930664062,
          'accelPeakZ': 2.20635986328125,
          'time': '2018-05-14T09:28:47.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 1,
        'sample': {
          'speed': 13.5600004196167,
          'longitude': 35.151885986328125,
          'latitude': 31.771766662597656,
          'accelAvgX': 1.7424466609954834,
          'accelAvgY': 8.859771728515625,
          'accelAvgZ': 2.501192569732666,
          'accelPeakX': -1.5262298583984375,
          'accelPeakY': 11.495132446289062,
          'accelPeakZ': 2.00225830078125,
          'time': '2018-05-14T09:28:52.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 2,
        'sample': {
          'speed': 12.6899995803833,
          'longitude': 35.15248107910156,
          'latitude': 31.771512985229492,
          'accelAvgX': 3.034095048904419,
          'accelAvgY': 9.056375503540039,
          'accelAvgZ': 1.8085267543792725,
          'accelPeakX': 6.8265380859375,
          'accelPeakY': 11.9542236328125,
          'accelPeakZ': 2.1722412109375,
          'time': '2018-05-14T09:28:57.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 3,
        'sample': {
          'speed': 15.970000267028809,
          'longitude': 35.15269088745117,
          'latitude': 31.770917892456055,
          'accelAvgX': 1.966823935508728,
          'accelAvgY': 9.075246810913086,
          'accelAvgZ': 2.2446019649505615,
          'accelPeakX': 6.42193603515625,
          'accelPeakY': 10.16455078125,
          'accelPeakZ': 3.093414306640625,
          'time': '2018-05-14T09:29:02.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 4,
        'sample': {
          'speed': 13.130000114440918,
          'longitude': 35.15289306640625,
          'latitude': 31.770292282104492,
          'accelAvgX': -0.24265219271183014,
          'accelAvgY': 9.251424789428711,
          'accelAvgZ': 2.7296924591064453,
          'accelPeakX': 6.2764739990234375,
          'accelPeakY': 9.772506713867188,
          'accelPeakZ': 2.7187347412109375,
          'time': '2018-05-14T09:29:07.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 5,
        'sample': {
          'speed': 13.199999809265137,
          'longitude': 35.15338897705078,
          'latitude': 31.769887924194336,
          'accelAvgX': -0.34473717212677,
          'accelAvgY': 9.45835018157959,
          'accelAvgZ': 2.1777467727661133,
          'accelPeakX': -2.641326904296875,
          'accelPeakY': 11.858444213867188,
          'accelPeakZ': 3.61236572265625,
          'time': '2018-05-14T09:29:12.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 6,
        'sample': {
          'speed': 6.789999961853027,
          'longitude': 35.1539421081543,
          'latitude': 31.76980209350586,
          'accelAvgX': 1.6934471130371094,
          'accelAvgY': 8.698644638061523,
          'accelAvgZ': 4.1346235275268555,
          'accelPeakX': -0.3494720458984375,
          'accelPeakY': 12.91070556640625,
          'accelPeakZ': 1.622772216796875,
          'time': '2018-05-14T09:29:17.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 7,
        'sample': {
          'speed': 3.380000114440918,
          'longitude': 35.15409469604492,
          'latitude': 31.769817352294922,
          'accelAvgX': 0.32149890065193176,
          'accelAvgY': 9.628250122070312,
          'accelAvgZ': 0.3639291524887085,
          'accelPeakX': 2.683380126953125,
          'accelPeakY': 9.485198974609375,
          'accelPeakZ': 4.2372589111328125,
          'time': '2018-05-14T09:29:22.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 8,
        'sample': {
          'speed': 2.759999990463257,
          'longitude': 35.154296875,
          'latitude': 31.769887924194336,
          'accelAvgX': 0.49785348773002625,
          'accelAvgY': 9.548215866088867,
          'accelAvgZ': 0.5380339026451111,
          'accelPeakX': 2.630706787109375,
          'accelPeakY': 9.992767333984375,
          'accelPeakZ': 4.4024505615234375,
          'time': '2018-05-14T09:29:27.000Z'
        }
      },
      {
        'reportNumber': 159,
        'sampleNumber': 9,
        'sample': {
          'speed': 7.880000114440918,
          'longitude': 35.15462112426758,
          'latitude': 31.770021438598633,
          'accelAvgX': -1.997029185295105,
          'accelAvgY': 9.155230522155762,
          'accelAvgZ': 3.0138821601867676,
          'accelPeakX': 1.2031707763671875,
          'accelPeakY': 11.698638916015625,
          'accelPeakZ': 2.98388671875,
          'time': '2018-05-14T09:29:32.000Z'
        }
      },
      {
        'reportNumber': 160,
        'sampleNumber': 0,
        'sample': {
          'speed': 8.449999809265137,
          'longitude': 35.154510498046875,
          'latitude': 31.770326614379883,
          'accelAvgX': -2.537771701812744,
          'accelAvgY': 9.09113883972168,
          'accelAvgZ': 3.5482230186462402,
          'accelPeakX': -5.817840576171875,
          'accelPeakY': 10.14898681640625,
          'accelPeakZ': 3.5962066650390625,
          'time': '2018-05-14T09:29:38.000Z'
        }
      },
      {
        'reportNumber': 160,
        'sampleNumber': 1,
        'sample': {
          'speed': 9.430000305175781,
          'longitude': 35.154083251953125,
          'latitude': 31.770389556884766,
          'accelAvgX': 3.052119493484497,
          'accelAvgY': 9.518235206604004,
          'accelAvgZ': -0.32540521025657654,
          'accelPeakX': 1.421630859375,
          'accelPeakY': 12.76824951171875,
          'accelPeakZ': -0.860015869140625,
          'time': '2018-05-14T09:29:43.000Z'
        }
      },
      {
        'reportNumber': 161,
        'sampleNumber': 1,
        'sample': {
          'speed': 13.9399995803833,
          'longitude': 35.152854919433594,
          'latitude': 31.773656845092773,
          'accelAvgX': -0.5561261177062988,
          'accelAvgY': 9.41504955291748,
          'accelAvgZ': 3.1421077251434326,
          'accelPeakX': 3.5806121826171875,
          'accelPeakY': 10.990554809570312,
          'accelPeakZ': 2.3218841552734375,
          'time': '2018-05-14T09:30:08.000Z'
        }
      },
      {
        'reportNumber': 161,
        'sampleNumber': 2,
        'sample': {
          'speed': 13.050000190734863,
          'longitude': 35.15217208862305,
          'latitude': 31.773826599121094,
          'accelAvgX': 0.4528696537017822,
          'accelAvgY': 9.49749755859375,
          'accelAvgZ': 2.509277820587158,
          'accelPeakX': -2.6952056884765625,
          'accelPeakY': 10.858871459960938,
          'accelPeakZ': 2.64031982421875,
          'time': '2018-05-14T09:30:13.000Z'
        }
      },
      {
        'reportNumber': 161,
        'sampleNumber': 3,
        'sample': {
          'speed': 13.930000305175781,
          'longitude': 35.15148162841797,
          'latitude': 31.77379608154297,
          'accelAvgX': 1.2038209438323975,
          'accelAvgY': 9.193132400512695,
          'accelAvgZ': 2.3941218852996826,
          'accelPeakX': -1.5687255859375,
          'accelPeakY': 12.0841064453125,
          'accelPeakZ': 1.075714111328125,
          'time': '2018-05-14T09:30:18.000Z'
        }
      },
      {
        'reportNumber': 161,
        'sampleNumber': 4,
        'sample': {
          'speed': 11.170000076293945,
          'longitude': 35.15085220336914,
          'latitude': 31.773897171020508,
          'accelAvgX': 3.549861431121826,
          'accelAvgY': 9.328540802001953,
          'accelAvgZ': 1.3802030086517334,
          'accelPeakX': 8.022445678710938,
          'accelPeakY': 9.49237060546875,
          'accelPeakZ': 1.443206787109375,
          'time': '2018-05-14T09:30:23.000Z'
        }
      },
      {
        'reportNumber': 161,
        'sampleNumber': 5,
        'sample': {
          'speed': 10.449999809265137,
          'longitude': 35.15057373046875,
          'latitude': 31.77430534362793,
          'accelAvgX': -1.5215768814086914,
          'accelAvgY': 9.392504692077637,
          'accelAvgZ': 1.9585676193237305,
          'accelPeakX': 4.7615509033203125,
          'accelPeakY': 10.929489135742188,
          'accelPeakZ': 0.8255157470703125,
          'time': '2018-05-14T09:30:28.000Z'
        }
      },
      {
        'reportNumber': 161,
        'sampleNumber': 6,
        'sample': {
          'speed': 10.9399995803833,
          'longitude': 35.150062561035156,
          'latitude': 31.774423599243164,
          'accelAvgX': 0.23213998973369598,
          'accelAvgY': 9.68989372253418,
          'accelAvgZ': 0.547889232635498,
          'accelPeakX': -1.22515869140625,
          'accelPeakY': 10.91033935546875,
          'accelPeakZ': 1.7825927734375,
          'time': '2018-05-14T09:30:33.000Z'
        }
      },
      {
        'reportNumber': 161,
        'sampleNumber': 7,
        'sample': {
          'speed': 12.210000038146973,
          'longitude': 35.14944839477539,
          'latitude': 31.77451515197754,
          'accelAvgX': 0.561414361000061,
          'accelAvgY': 9.426907539367676,
          'accelAvgZ': 0.6805530786514282,
          'accelPeakX': 1.7705841064453125,
          'accelPeakY': 12.603042602539062,
          'accelPeakZ': 0.54180908203125,
          'time': '2018-05-14T09:30:38.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 0,
        'sample': {
          'speed': 12.680000305175781,
          'longitude': 35.148780822753906,
          'latitude': 31.774587631225586,
          'accelAvgX': -0.39581650495529175,
          'accelAvgY': 9.754425048828125,
          'accelAvgZ': 1.463234782218933,
          'accelPeakX': 1.01641845703125,
          'accelPeakY': 11.211410522460938,
          'accelPeakZ': 0.5465850830078125,
          'time': '2018-05-14T09:30:43.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 1,
        'sample': {
          'speed': 11.930000305175781,
          'longitude': 35.14817810058594,
          'latitude': 31.774396896362305,
          'accelAvgX': 0.0464569628238678,
          'accelAvgY': 9.55630874633789,
          'accelAvgZ': 0.973607063293457,
          'accelPeakX': -3.9150543212890625,
          'accelPeakY': 11.899154663085938,
          'accelPeakZ': 1.6341552734375,
          'time': '2018-05-14T09:30:48.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 2,
        'sample': {
          'speed': 12.100000381469727,
          'longitude': 35.14778137207031,
          'latitude': 31.77399253845215,
          'accelAvgX': 0.6310523152351379,
          'accelAvgY': 9.839322090148926,
          'accelAvgZ': 0.641593337059021,
          'accelPeakX': -5.0660552978515625,
          'accelPeakY': 12.370208740234375,
          'accelPeakZ': 0.856048583984375,
          'time': '2018-05-14T09:30:53.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 3,
        'sample': {
          'speed': 12.630000114440918,
          'longitude': 35.147239685058594,
          'latitude': 31.77364158630371,
          'accelAvgX': 0.6555337309837341,
          'accelAvgY': 9.642265319824219,
          'accelAvgZ': 0.6558069586753845,
          'accelPeakX': 4.23004150390625,
          'accelPeakY': 11.386199951171875,
          'accelPeakZ': 0.4573974609375,
          'time': '2018-05-14T09:30:58.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 4,
        'sample': {
          'speed': 15.260000228881836,
          'longitude': 35.14653778076172,
          'latitude': 31.773460388183594,
          'accelAvgX': 1.6194127798080444,
          'accelAvgY': 10.157013893127441,
          'accelAvgZ': 1.1238218545913696,
          'accelPeakX': 6.878021240234375,
          'accelPeakY': 12.257080078125,
          'accelPeakZ': 0.25030517578125,
          'time': '2018-05-14T09:31:03.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 5,
        'sample': {
          'speed': 13.789999961853027,
          'longitude': 35.145774841308594,
          'latitude': 31.773462295532227,
          'accelAvgX': -0.5373185873031616,
          'accelAvgY': 9.206829071044922,
          'accelAvgZ': 1.8469014167785645,
          'accelPeakX': 3.225067138671875,
          'accelPeakY': 12.22357177734375,
          'accelPeakZ': 2.4936676025390625,
          'time': '2018-05-14T09:31:08.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 6,
        'sample': {
          'speed': 11.880000114440918,
          'longitude': 35.14512252807617,
          'latitude': 31.77328872680664,
          'accelAvgX': 0.7501553297042847,
          'accelAvgY': 9.328981399536133,
          'accelAvgZ': 1.2870612144470215,
          'accelPeakX': -7.560821533203125,
          'accelPeakY': 10.929489135742188,
          'accelPeakZ': 2.61279296875,
          'time': '2018-05-14T09:31:13.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 7,
        'sample': {
          'speed': 12.119999885559082,
          'longitude': 35.144710540771484,
          'latitude': 31.77291488647461,
          'accelAvgX': 0.32821720838546753,
          'accelAvgY': 9.491997718811035,
          'accelAvgZ': 0.2920369803905487,
          'accelPeakX': 4.2767181396484375,
          'accelPeakY': 11.6998291015625,
          'accelPeakZ': -0.28839111328125,
          'time': '2018-05-14T09:31:18.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 8,
        'sample': {
          'speed': 13.550000190734863,
          'longitude': 35.144195556640625,
          'latitude': 31.772485733032227,
          'accelAvgX': 0.29141050577163696,
          'accelAvgY': 9.348650932312012,
          'accelAvgZ': 1.181695580482483,
          'accelPeakX': 2.931182861328125,
          'accelPeakY': 11.330535888671875,
          'accelPeakZ': 0.57830810546875,
          'time': '2018-05-14T09:31:23.000Z'
        }
      },
      {
        'reportNumber': 162,
        'sampleNumber': 9,
        'sample': {
          'speed': 12.850000381469727,
          'longitude': 35.143714904785156,
          'latitude': 31.772075653076172,
          'accelAvgX': 0.030427932739257812,
          'accelAvgY': 9.6397705078125,
          'accelAvgZ': 0.8281463384628296,
          'accelPeakX': -2.0888671875,
          'accelPeakY': 11.208419799804688,
          'accelPeakZ': 1.7059783935546875,
          'time': '2018-05-14T09:31:28.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 0,
        'sample': {
          'speed': 13.449999809265137,
          'longitude': 35.143218994140625,
          'latitude': 31.771615982055664,
          'accelAvgX': 0.742723822593689,
          'accelAvgY': 9.388644218444824,
          'accelAvgZ': 1.5558732748031616,
          'accelPeakX': 1.88311767578125,
          'accelPeakY': 11.11505126953125,
          'accelPeakZ': 0.608245849609375,
          'time': '2018-05-14T09:31:33.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 1,
        'sample': {
          'speed': 15.699999809265137,
          'longitude': 35.14265441894531,
          'latitude': 31.771183013916016,
          'accelAvgX': 0.9967339038848877,
          'accelAvgY': 9.048468589782715,
          'accelAvgZ': 0.785265326499939,
          'accelPeakX': 5.55462646484375,
          'accelPeakY': 13.725921630859375,
          'accelPeakZ': 0.9524078369140625,
          'time': '2018-05-14T09:31:38.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 2,
        'sample': {
          'speed': 15.449999809265137,
          'longitude': 35.14188766479492,
          'latitude': 31.7708740234375,
          'accelAvgX': 1.4374465942382812,
          'accelAvgY': 9.428229331970215,
          'accelAvgZ': 0.881881058216095,
          'accelPeakX': 5.2984466552734375,
          'accelPeakY': 11.307785034179688,
          'accelPeakZ': 0.5872955322265625,
          'time': '2018-05-14T09:31:43.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 3,
        'sample': {
          'speed': 17.43000030517578,
          'longitude': 35.14104461669922,
          'latitude': 31.770795822143555,
          'accelAvgX': 1.8298537731170654,
          'accelAvgY': 9.749674797058105,
          'accelAvgZ': 2.2406327724456787,
          'accelPeakX': 4.3270111083984375,
          'accelPeakY': 10.927108764648438,
          'accelPeakZ': 2.344635009765625,
          'time': '2018-05-14T09:31:48.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 4,
        'sample': {
          'speed': 14.140000343322754,
          'longitude': 35.140262603759766,
          'latitude': 31.770967483520508,
          'accelAvgX': 1.7741267681121826,
          'accelAvgY': 9.378020286560059,
          'accelAvgZ': 1.0891766548156738,
          'accelPeakX': 4.82440185546875,
          'accelPeakY': 10.309402465820312,
          'accelPeakZ': 2.142333984375,
          'time': '2018-05-14T09:31:53.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 5,
        'sample': {
          'speed': 16.200000762939453,
          'longitude': 35.139705657958984,
          'latitude': 31.771425247192383,
          'accelAvgX': 1.7380074262619019,
          'accelAvgY': 9.457169532775879,
          'accelAvgZ': 1.2565724849700928,
          'accelPeakX': 4.0031890869140625,
          'accelPeakY': 11.425094604492188,
          'accelPeakZ': 0.1425628662109375,
          'time': '2018-05-14T09:31:58.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 6,
        'sample': {
          'speed': 16.100000381469727,
          'longitude': 35.139442443847656,
          'latitude': 31.772109985351562,
          'accelAvgX': 0.43518999218940735,
          'accelAvgY': 9.191417694091797,
          'accelAvgZ': 0.6704978942871094,
          'accelPeakX': 5.272705078125,
          'accelPeakY': 12.694015502929688,
          'accelPeakZ': 0.25689697265625,
          'time': '2018-05-14T09:32:03.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 7,
        'sample': {
          'speed': 16.34000015258789,
          'longitude': 35.13932800292969,
          'latitude': 31.77284812927246,
          'accelAvgX': 0.5231888294219971,
          'accelAvgY': 9.335811614990234,
          'accelAvgZ': 2.028327703475952,
          'accelPeakX': 0.27362060546875,
          'accelPeakY': 12.5731201171875,
          'accelPeakZ': 0.4310760498046875,
          'time': '2018-05-14T09:32:08.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 8,
        'sample': {
          'speed': 13.989999771118164,
          'longitude': 35.139076232910156,
          'latitude': 31.773475646972656,
          'accelAvgX': 0.7884862422943115,
          'accelAvgY': 8.920409202575684,
          'accelAvgZ': 1.9239438772201538,
          'accelPeakX': -3.2710113525390625,
          'accelPeakY': 13.313522338867188,
          'accelPeakZ': 1.0948638916015625,
          'time': '2018-05-14T09:32:13.000Z'
        }
      },
      {
        'reportNumber': 163,
        'sampleNumber': 9,
        'sample': {
          'speed': 10.119999885559082,
          'longitude': 35.13872528076172,
          'latitude': 31.77393913269043,
          'accelAvgX': 0.7766516804695129,
          'accelAvgY': 9.286324501037598,
          'accelAvgZ': 1.9423775672912598,
          'accelPeakX': -0.4841461181640625,
          'accelPeakY': 12.802963256835938,
          'accelPeakZ': 2.0489501953125,
          'time': '2018-05-14T09:32:18.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 0,
        'sample': {
          'speed': 11.119999885559082,
          'longitude': 35.13840103149414,
          'latitude': 31.77427864074707,
          'accelAvgX': -0.22148627042770386,
          'accelAvgY': 9.660433769226074,
          'accelAvgZ': 0.7924919128417969,
          'accelPeakX': 0.432830810546875,
          'accelPeakY': 12.042205810546875,
          'accelPeakZ': 0.484344482421875,
          'time': '2018-05-14T09:32:23.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 1,
        'sample': {
          'speed': 16.450000762939453,
          'longitude': 35.13774490356445,
          'latitude': 31.774593353271484,
          'accelAvgX': 0.14167430996894836,
          'accelAvgY': 9.201764106750488,
          'accelAvgZ': 0.8312459588050842,
          'accelPeakX': 2.058502197265625,
          'accelPeakY': 12.428268432617188,
          'accelPeakZ': 0.2030181884765625,
          'time': '2018-05-14T09:32:28.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 2,
        'sample': {
          'speed': 17.1299991607666,
          'longitude': 35.13690948486328,
          'latitude': 31.774885177612305,
          'accelAvgX': 1.2582001686096191,
          'accelAvgY': 9.558828353881836,
          'accelAvgZ': 1.4882402420043945,
          'accelPeakX': 9.305145263671875,
          'accelPeakY': 12.108047485351562,
          'accelPeakZ': 2.4368133544921875,
          'time': '2018-05-14T09:32:33.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 3,
        'sample': {
          'speed': 15.40999984741211,
          'longitude': 35.13614273071289,
          'latitude': 31.775218963623047,
          'accelAvgX': 2.4477200508117676,
          'accelAvgY': 9.250516891479492,
          'accelAvgZ': 2.023338556289673,
          'accelPeakX': 3.1981353759765625,
          'accelPeakY': 11.648361206054688,
          'accelPeakZ': 2.143524169921875,
          'time': '2018-05-14T09:32:38.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 4,
        'sample': {
          'speed': 13.979999542236328,
          'longitude': 35.13578414916992,
          'latitude': 31.775726318359375,
          'accelAvgX': 0.10526019334793091,
          'accelAvgY': 9.216826438903809,
          'accelAvgZ': 0.719365119934082,
          'accelPeakX': 7.3227386474609375,
          'accelPeakY': 11.904541015625,
          'accelPeakZ': 0.52862548828125,
          'time': '2018-05-14T09:32:43.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 5,
        'sample': {
          'speed': 12.050000190734863,
          'longitude': 35.1356315612793,
          'latitude': 31.77629280090332,
          'accelAvgX': 0.26673623919487,
          'accelAvgY': 9.488309860229492,
          'accelAvgZ': 1.5152710676193237,
          'accelPeakX': 9.422454833984375,
          'accelPeakY': 14.887710571289062,
          'accelPeakZ': 0.4819488525390625,
          'time': '2018-05-14T09:32:48.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 6,
        'sample': {
          'speed': 12.9399995803833,
          'longitude': 35.1356201171875,
          'latitude': 31.776832580566406,
          'accelAvgX': -0.29932379722595215,
          'accelAvgY': 9.419855117797852,
          'accelAvgZ': 0.8065741658210754,
          'accelPeakX': 4.212677001953125,
          'accelPeakY': 11.353866577148438,
          'accelPeakZ': -0.00048828125,
          'time': '2018-05-14T09:32:53.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 7,
        'sample': {
          'speed': 12.0600004196167,
          'longitude': 35.13569641113281,
          'latitude': 31.77741050720215,
          'accelAvgX': 1.128121018409729,
          'accelAvgY': 9.008752822875977,
          'accelAvgZ': 2.5608272552490234,
          'accelPeakX': 0.8955078125,
          'accelPeakY': 11.464599609375,
          'accelPeakZ': 0.162322998046875,
          'time': '2018-05-14T09:32:58.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 8,
        'sample': {
          'speed': 7.239999771118164,
          'longitude': 35.135704040527344,
          'latitude': 31.777816772460938,
          'accelAvgX': -1.2708805799484253,
          'accelAvgY': 9.860742568969727,
          'accelAvgZ': 1.6111420392990112,
          'accelPeakX': 1.804107666015625,
          'accelPeakY': 11.413726806640625,
          'accelPeakZ': 2.2434844970703125,
          'time': '2018-05-14T09:33:03.000Z'
        }
      },
      {
        'reportNumber': 164,
        'sampleNumber': 9,
        'sample': {
          'speed': 13.109999656677246,
          'longitude': 35.13519287109375,
          'latitude': 31.77796745300293,
          'accelAvgX': -1.0393786430358887,
          'accelAvgY': 9.934338569641113,
          'accelAvgZ': 0.9301694631576538,
          'accelPeakX': 8.57611083984375,
          'accelPeakY': 13.703170776367188,
          'accelPeakZ': 1.688018798828125,
          'time': '2018-05-14T09:33:08.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 0,
        'sample': {
          'speed': 11.119999885559082,
          'longitude': 35.13840103149414,
          'latitude': 31.77427864074707,
          'accelAvgX': -0.22148627042770386,
          'accelAvgY': 9.660433769226074,
          'accelAvgZ': 0.7924919128417969,
          'accelPeakX': 0.432830810546875,
          'accelPeakY': 12.042205810546875,
          'accelPeakZ': 0.484344482421875,
          'time': '2018-05-14T09:32:23.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 1,
        'sample': {
          'speed': 16.450000762939453,
          'longitude': 35.13774490356445,
          'latitude': 31.774593353271484,
          'accelAvgX': 0.14167430996894836,
          'accelAvgY': 9.201764106750488,
          'accelAvgZ': 0.8312459588050842,
          'accelPeakX': 2.058502197265625,
          'accelPeakY': 12.428268432617188,
          'accelPeakZ': 0.2030181884765625,
          'time': '2018-05-14T09:32:28.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 2,
        'sample': {
          'speed': 17.1299991607666,
          'longitude': 35.13690948486328,
          'latitude': 31.774885177612305,
          'accelAvgX': 1.2582001686096191,
          'accelAvgY': 9.558828353881836,
          'accelAvgZ': 1.4882402420043945,
          'accelPeakX': 9.305145263671875,
          'accelPeakY': 12.108047485351562,
          'accelPeakZ': 2.4368133544921875,
          'time': '2018-05-14T09:32:33.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 3,
        'sample': {
          'speed': 15.40999984741211,
          'longitude': 35.13614273071289,
          'latitude': 31.775218963623047,
          'accelAvgX': 2.4477200508117676,
          'accelAvgY': 9.250516891479492,
          'accelAvgZ': 2.023338556289673,
          'accelPeakX': 3.1981353759765625,
          'accelPeakY': 11.648361206054688,
          'accelPeakZ': 2.143524169921875,
          'time': '2018-05-14T09:32:38.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 4,
        'sample': {
          'speed': 13.979999542236328,
          'longitude': 35.13578414916992,
          'latitude': 31.775726318359375,
          'accelAvgX': 0.10526019334793091,
          'accelAvgY': 9.216826438903809,
          'accelAvgZ': 0.719365119934082,
          'accelPeakX': 7.3227386474609375,
          'accelPeakY': 11.904541015625,
          'accelPeakZ': 0.52862548828125,
          'time': '2018-05-14T09:32:43.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 5,
        'sample': {
          'speed': 12.050000190734863,
          'longitude': 35.1356315612793,
          'latitude': 31.77629280090332,
          'accelAvgX': 0.26673623919487,
          'accelAvgY': 9.488309860229492,
          'accelAvgZ': 1.5152710676193237,
          'accelPeakX': 9.422454833984375,
          'accelPeakY': 14.887710571289062,
          'accelPeakZ': 0.4819488525390625,
          'time': '2018-05-14T09:32:48.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 6,
        'sample': {
          'speed': 12.9399995803833,
          'longitude': 35.1356201171875,
          'latitude': 31.776832580566406,
          'accelAvgX': -0.29932379722595215,
          'accelAvgY': 9.419855117797852,
          'accelAvgZ': 0.8065741658210754,
          'accelPeakX': 4.212677001953125,
          'accelPeakY': 11.353866577148438,
          'accelPeakZ': -0.00048828125,
          'time': '2018-05-14T09:32:53.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 7,
        'sample': {
          'speed': 12.0600004196167,
          'longitude': 35.13569641113281,
          'latitude': 31.77741050720215,
          'accelAvgX': 1.128121018409729,
          'accelAvgY': 9.008752822875977,
          'accelAvgZ': 2.5608272552490234,
          'accelPeakX': 0.8955078125,
          'accelPeakY': 11.464599609375,
          'accelPeakZ': 0.162322998046875,
          'time': '2018-05-14T09:32:58.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 8,
        'sample': {
          'speed': 7.239999771118164,
          'longitude': 35.135704040527344,
          'latitude': 31.777816772460938,
          'accelAvgX': -1.2708805799484253,
          'accelAvgY': 9.860742568969727,
          'accelAvgZ': 1.6111420392990112,
          'accelPeakX': 1.804107666015625,
          'accelPeakY': 11.413726806640625,
          'accelPeakZ': 2.2434844970703125,
          'time': '2018-05-14T09:33:03.000Z'
        }
      },
      {
        'reportNumber': 165,
        'sampleNumber': 9,
        'sample': {
          'speed': 13.109999656677246,
          'longitude': 35.13519287109375,
          'latitude': 31.77796745300293,
          'accelAvgX': -1.0393786430358887,
          'accelAvgY': 9.934338569641113,
          'accelAvgZ': 0.9301694631576538,
          'accelPeakX': 8.57611083984375,
          'accelPeakY': 13.703170776367188,
          'accelPeakZ': 1.688018798828125,
          'time': '2018-05-14T09:33:08.000Z'
        }
      },
      {
        'reportNumber': 166,
        'sampleNumber': 0,
        'sample': {
          'speed': 12.239999771118164,
          'longitude': 35.134525299072266,
          'latitude': 31.77779769897461,
          'accelAvgX': 0.7634212970733643,
          'accelAvgY': 9.223848342895508,
          'accelAvgZ': 1.3062236309051514,
          'accelPeakX': -5.8040771484375,
          'accelPeakY': 11.205429077148438,
          'accelPeakZ': 2.8851318359375,
          'time': '2018-05-14T09:33:13.000Z'
        }
      },
      {
        'reportNumber': 167,
        'sampleNumber': 1,
        'sample': {
          'speed': 6.75,
          'longitude': 35.12921142578125,
          'latitude': 31.777379989624023,
          'accelAvgX': 3.146970272064209,
          'accelAvgY': 9.29907512664795,
          'accelAvgZ': 0.17792005836963654,
          'accelPeakX': 6.8840179443359375,
          'accelPeakY': 10.536849975585938,
          'accelPeakZ': 0.019866943359375,
          'time': '2018-05-14T09:34:01.000Z'
        }
      },
      {
        'reportNumber': 167,
        'sampleNumber': 2,
        'sample': {
          'speed': 10.140000343322754,
          'longitude': 35.12962341308594,
          'latitude': 31.77744483947754,
          'accelAvgX': 0.12481182813644409,
          'accelAvgY': 9.699129104614258,
          'accelAvgZ': 0.6316665410995483,
          'accelPeakX': 6.8169708251953125,
          'accelPeakY': 11.063568115234375,
          'accelPeakZ': -1.03179931640625,
          'time': '2018-05-14T09:34:06.000Z'
        }
      },
      {
        'reportNumber': 167,
        'sampleNumber': 3,
        'sample': {
          'speed': 13.859999656677246,
          'longitude': 35.130252838134766,
          'latitude': 31.777341842651367,
          'accelAvgX': -1.2576398849487305,
          'accelAvgY': 9.306215286254883,
          'accelAvgZ': 2.7140398025512695,
          'accelPeakX': -0.0938873291015625,
          'accelPeakY': 11.479568481445312,
          'accelPeakZ': 0.05218505859375,
          'time': '2018-05-14T09:34:11.000Z'
        }
      },
      {
        'reportNumber': 167,
        'sampleNumber': 4,
        'sample': {
          'speed': 17.040000915527344,
          'longitude': 35.1309814453125,
          'latitude': 31.777589797973633,
          'accelAvgX': -0.09048932790756226,
          'accelAvgY': 9.102643013000488,
          'accelAvgZ': 2.324394464492798,
          'accelPeakX': 3.370513916015625,
          'accelPeakY': 11.157546997070312,
          'accelPeakZ': 2.3129119873046875,
          'time': '2018-05-14T09:34:16.000Z'
        }
      },
      {
        'reportNumber': 167,
        'sampleNumber': 5,
        'sample': {
          'speed': 17.469999313354492,
          'longitude': 35.1317138671875,
          'latitude': 31.77806282043457,
          'accelAvgX': -0.21184203028678894,
          'accelAvgY': 9.392488479614258,
          'accelAvgZ': 2.345247507095337,
          'accelPeakX': 2.444549560546875,
          'accelPeakY': 11.104873657226562,
          'accelPeakZ': 1.2804107666015625,
          'time': '2018-05-14T09:34:21.000Z'
        }
      },
      {
        'reportNumber': 167,
        'sampleNumber': 6,
        'sample': {
          'speed': 15.279999732971191,
          'longitude': 35.13223648071289,
          'latitude': 31.77862548828125,
          'accelAvgX': 0.06810561567544937,
          'accelAvgY': 9.342842102050781,
          'accelAvgZ': 1.7683100700378418,
          'accelPeakX': 0.9409942626953125,
          'accelPeakY': 11.288619995117188,
          'accelPeakZ': 2.4242401123046875,
          'time': '2018-05-14T09:34:26.000Z'
        }
      },
      {
        'reportNumber': 167,
        'sampleNumber': 7,
        'sample': {
          'speed': 15.140000343322754,
          'longitude': 35.13249588012695,
          'latitude': 31.779277801513672,
          'accelAvgX': 0.7552483081817627,
          'accelAvgY': 9.65196704864502,
          'accelAvgZ': 1.1888753175735474,
          'accelPeakX': 5.1811370849609375,
          'accelPeakY': 11.01568603515625,
          'accelPeakZ': 0.9320526123046875,
          'time': '2018-05-14T09:34:31.000Z'
        }
      },
      {
        'reportNumber': 167,
        'sampleNumber': 8,
        'sample': {
          'speed': 14.739999771118164,
          'longitude': 35.13264465332031,
          'latitude': 31.779935836791992,
          'accelAvgX': 0.14528295397758484,
          'accelAvgY': 9.727293014526367,
          'accelAvgZ': 1.676195502281189,
          'accelPeakX': 1.930999755859375,
          'accelPeakY': 12.237930297851562,
          'accelPeakZ': 0.468170166015625,
          'time': '2018-05-14T09:34:36.000Z'
        }
      },
      {
        'reportNumber': 168,
        'sampleNumber': 0,
        'sample': {
          'speed': 13.720000267028809,
          'longitude': 35.13253402709961,
          'latitude': 31.780567169189453,
          'accelAvgX': 0.7887644171714783,
          'accelAvgY': 9.0072021484375,
          'accelAvgZ': 2.683910846710205,
          'accelPeakX': -3.0621185302734375,
          'accelPeakY': 10.788833618164062,
          'accelPeakZ': 1.929840087890625,
          'time': '2018-05-14T09:34:43.000Z'
        }
      },
      {
        'reportNumber': 168,
        'sampleNumber': 1,
        'sample': {
          'speed': 13.1899995803833,
          'longitude': 35.132530212402344,
          'latitude': 31.781108856201172,
          'accelAvgX': 1.1346969604492188,
          'accelAvgY': 9.570133209228516,
          'accelAvgZ': 0.21382644772529602,
          'accelPeakX': 2.9365692138671875,
          'accelPeakY': 11.073150634765625,
          'accelPeakZ': 2.6594696044921875,
          'time': '2018-05-14T09:34:48.000Z'
        }
      },
      {
        'reportNumber': 168,
        'sampleNumber': 2,
        'sample': {
          'speed': 15.970000267028809,
          'longitude': 35.1329231262207,
          'latitude': 31.781675338745117,
          'accelAvgX': 0.33700159192085266,
          'accelAvgY': 9.66329574584961,
          'accelAvgZ': 0.5909709930419922,
          'accelPeakX': 2.9120330810546875,
          'accelPeakY': 11.08990478515625,
          'accelPeakZ': 0.3155517578125,
          'time': '2018-05-14T09:34:53.000Z'
        }
      },
      {
        'reportNumber': 168,
        'sampleNumber': 3,
        'sample': {
          'speed': 14.630000114440918,
          'longitude': 35.133453369140625,
          'latitude': 31.78221893310547,
          'accelAvgX': 0.35056138038635254,
          'accelAvgY': 9.334441184997559,
          'accelAvgZ': 1.4693312644958496,
          'accelPeakX': 0.8823394775390625,
          'accelPeakY': 11.215011596679688,
          'accelPeakZ': 1.9705352783203125,
          'time': '2018-05-14T09:34:58.000Z'
        }
      },
      {
        'reportNumber': 168,
        'sampleNumber': 4,
        'sample': {
          'speed': 16.040000915527344,
          'longitude': 35.13396072387695,
          'latitude': 31.78272819519043,
          'accelAvgX': -0.057776063680648804,
          'accelAvgY': 9.570965766906738,
          'accelAvgZ': 1.0487298965454102,
          'accelPeakX': 0.0126495361328125,
          'accelPeakY': 11.112060546875,
          'accelPeakZ': 0.2898101806640625,
          'time': '2018-05-14T09:35:03.000Z'
        }
      },
      {
        'reportNumber': 168,
        'sampleNumber': 5,
        'sample': {
          'speed': 17,
          'longitude': 35.1345329284668,
          'latitude': 31.783288955688477,
          'accelAvgX': 1.2044813632965088,
          'accelAvgY': 9.215951919555664,
          'accelAvgZ': 1.1576741933822632,
          'accelPeakX': 2.928192138671875,
          'accelPeakY': 11.197647094726562,
          'accelPeakZ': 0.525634765625,
          'time': '2018-05-14T09:35:08.000Z'
        }
      },
      {
        'reportNumber': 168,
        'sampleNumber': 6,
        'sample': {
          'speed': 15.350000381469727,
          'longitude': 35.13525390625,
          'latitude': 31.783687591552734,
          'accelAvgX': 1.8678979873657227,
          'accelAvgY': 9.143436431884766,
          'accelAvgZ': 1.754068374633789,
          'accelPeakX': 4.0480804443359375,
          'accelPeakY': 10.926513671875,
          'accelPeakZ': 1.017059326171875,
          'time': '2018-05-14T09:35:13.000Z'
        }
      },
      {
        'reportNumber': 169,
        'sampleNumber': 1,
        'sample': {
          'speed': 13.40999984741211,
          'longitude': 35.139671325683594,
          'latitude': 31.788719177246094,
          'accelAvgX': 0.27512285113334656,
          'accelAvgY': 9.495698928833008,
          'accelAvgZ': 0.9612075090408325,
          'accelPeakX': 0.0533447265625,
          'accelPeakY': 11.908721923828125,
          'accelPeakZ': 1.2762298583984375,
          'time': '2018-05-14T09:36:01.000Z'
        }
      },
      {
        'reportNumber': 169,
        'sampleNumber': 2,
        'sample': {
          'speed': 11.369999885559082,
          'longitude': 35.14005661010742,
          'latitude': 31.78919792175293,
          'accelAvgX': 1.1756486892700195,
          'accelAvgY': 9.475321769714355,
          'accelAvgZ': 1.9481682777404785,
          'accelPeakX': -3.16326904296875,
          'accelPeakY': 15.133712768554688,
          'accelPeakZ': 0.9673614501953125,
          'time': '2018-05-14T09:36:06.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 0,
        'sample': {
          'speed': 7.010000228881836,
          'longitude': 35.14030838012695,
          'latitude': 31.78952980041504,
          'accelAvgX': 0.2449079155921936,
          'accelAvgY': 9.728437423706055,
          'accelAvgZ': 1.0355428457260132,
          'accelPeakX': -1.1641082763671875,
          'accelPeakY': 14.65008544921875,
          'accelPeakZ': 0.4292755126953125,
          'time': '2018-05-14T09:36:11.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 1,
        'sample': {
          'speed': 7.599999904632568,
          'longitude': 35.140625,
          'latitude': 31.789709091186523,
          'accelAvgX': 1.034236192703247,
          'accelAvgY': 9.049473762512207,
          'accelAvgZ': 0.4318147599697113,
          'accelPeakX': -8.468215942382812,
          'accelPeakY': 13.853424072265625,
          'accelPeakZ': -0.1860504150390625,
          'time': '2018-05-14T09:36:16.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 2,
        'sample': {
          'speed': 8.880000114440918,
          'longitude': 35.1410026550293,
          'latitude': 31.789819717407227,
          'accelAvgX': 0.13699793815612793,
          'accelAvgY': 9.82988452911377,
          'accelAvgZ': -0.23466180264949799,
          'accelPeakX': -0.028656005859375,
          'accelPeakY': 15.859756469726562,
          'accelPeakZ': -1.454376220703125,
          'time': '2018-05-14T09:36:21.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 3,
        'sample': {
          'speed': 9.920000076293945,
          'longitude': 35.14154815673828,
          'latitude': 31.78997039794922,
          'accelAvgX': -0.06836962699890137,
          'accelAvgY': 9.777414321899414,
          'accelAvgZ': 2.3420891761779785,
          'accelPeakX': -15.435348510742188,
          'accelPeakY': 11.698028564453125,
          'accelPeakZ': 2.7707977294921875,
          'time': '2018-05-14T09:36:26.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 4,
        'sample': {
          'speed': 9.109999656677246,
          'longitude': 35.1419677734375,
          'latitude': 31.79021453857422,
          'accelAvgX': 0.6234703063964844,
          'accelAvgY': 8.783296585083008,
          'accelAvgZ': 2.2340595722198486,
          'accelPeakX': -8.979385375976562,
          'accelPeakY': 14.29693603515625,
          'accelPeakZ': 2.5678863525390625,
          'time': '2018-05-14T09:36:31.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 5,
        'sample': {
          'speed': 9.239999771118164,
          'longitude': 35.1422119140625,
          'latitude': 31.790523529052734,
          'accelAvgX': 0.426691472530365,
          'accelAvgY': 9.411526679992676,
          'accelAvgZ': 1.2525160312652588,
          'accelPeakX': 4.13067626953125,
          'accelPeakY': 20.171112060546875,
          'accelPeakZ': 0.753082275390625,
          'time': '2018-05-14T09:36:36.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 6,
        'sample': {
          'speed': 9.680000305175781,
          'longitude': 35.142486572265625,
          'latitude': 31.790904998779297,
          'accelAvgX': 0.5136130452156067,
          'accelAvgY': 9.462052345275879,
          'accelAvgZ': 1.4520928859710693,
          'accelPeakX': -2.279815673828125,
          'accelPeakY': 17.41119384765625,
          'accelPeakZ': 0.358642578125,
          'time': '2018-05-14T09:36:41.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 7,
        'sample': {
          'speed': 11.949999809265137,
          'longitude': 35.142818450927734,
          'latitude': 31.79129981994629,
          'accelAvgX': 1.1036765575408936,
          'accelAvgY': 9.674939155578613,
          'accelAvgZ': 1.3969318866729736,
          'accelPeakX': -0.99951171875,
          'accelPeakY': 16.691741943359375,
          'accelPeakZ': -1.281982421875,
          'time': '2018-05-14T09:36:46.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 8,
        'sample': {
          'speed': 10.90999984741211,
          'longitude': 35.143226623535156,
          'latitude': 31.79170036315918,
          'accelAvgX': 0.49105167388916016,
          'accelAvgY': 9.150678634643555,
          'accelAvgZ': 1.9761533737182617,
          'accelPeakX': -3.2674102783203125,
          'accelPeakY': 12.47674560546875,
          'accelPeakZ': 2.165069580078125,
          'time': '2018-05-14T09:36:51.000Z'
        }
      },
      {
        'reportNumber': 170,
        'sampleNumber': 9,
        'sample': {
          'speed': 10.170000076293945,
          'longitude': 35.14360809326172,
          'latitude': 31.792064666748047,
          'accelAvgX': 0.8071737885475159,
          'accelAvgY': 8.993978500366211,
          'accelAvgZ': 2.5662713050842285,
          'accelPeakX': 6.55120849609375,
          'accelPeakY': 11.72137451171875,
          'accelPeakZ': 2.5619049072265625,
          'time': '2018-05-14T09:36:56.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 0,
        'sample': {
          'speed': 9.520000457763672,
          'longitude': 35.14394760131836,
          'latitude': 31.79237937927246,
          'accelAvgX': 1.2981986999511719,
          'accelAvgY': 9.134004592895508,
          'accelAvgZ': 2.2991561889648438,
          'accelPeakX': 4.554443359375,
          'accelPeakY': 12.934646606445312,
          'accelPeakZ': 1.2229461669921875,
          'time': '2018-05-14T09:37:01.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 1,
        'sample': {
          'speed': 1.7899999618530273,
          'longitude': 35.144187927246094,
          'latitude': 31.792579650878906,
          'accelAvgX': 0.7597818374633789,
          'accelAvgY': 9.165157318115234,
          'accelAvgZ': 2.1069536209106445,
          'accelPeakX': 15.418136596679688,
          'accelPeakY': 13.396728515625,
          'accelPeakZ': 3.390899658203125,
          'time': '2018-05-14T09:37:06.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 2,
        'sample': {
          'speed': 4.679999828338623,
          'longitude': 35.144290924072266,
          'latitude': 31.79265022277832,
          'accelAvgX': 1.3624396324157715,
          'accelAvgY': 9.489057540893555,
          'accelAvgZ': 2.118469715118408,
          'accelPeakX': 1.200775146484375,
          'accelPeakY': 13.345245361328125,
          'accelPeakZ': 1.261260986328125,
          'time': '2018-05-14T09:37:11.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 3,
        'sample': {
          'speed': 6.210000038146973,
          'longitude': 35.14453125,
          'latitude': 31.792816162109375,
          'accelAvgX': 0.7304311990737915,
          'accelAvgY': 9.07089614868164,
          'accelAvgZ': 2.596968412399292,
          'accelPeakX': 5.7102508544921875,
          'accelPeakY': 10.401580810546875,
          'accelPeakZ': 1.646728515625,
          'time': '2018-05-14T09:37:16.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 4,
        'sample': {
          'speed': 3.0999999046325684,
          'longitude': 35.14470291137695,
          'latitude': 31.792936325073242,
          'accelAvgX': 0.30301520228385925,
          'accelAvgY': 9.506646156311035,
          'accelAvgZ': 0.7703226208686829,
          'accelPeakX': 1.5215911865234375,
          'accelPeakY': 11.578323364257812,
          'accelPeakZ': 1.8065338134765625,
          'time': '2018-05-14T09:37:21.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 5,
        'sample': {
          'speed': 2.9800000190734863,
          'longitude': 35.144859313964844,
          'latitude': 31.79305076599121,
          'accelAvgX': 0.26857176423072815,
          'accelAvgY': 9.434022903442383,
          'accelAvgZ': 1.2733404636383057,
          'accelPeakX': 0.4747314453125,
          'accelPeakY': 12.011077880859375,
          'accelPeakZ': 3.14190673828125,
          'time': '2018-05-14T09:37:26.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 6,
        'sample': {
          'speed': 5.170000076293945,
          'longitude': 35.14504623413086,
          'latitude': 31.793148040771484,
          'accelAvgX': -0.7902684211730957,
          'accelAvgY': 9.012788772583008,
          'accelAvgZ': 1.9764021635055542,
          'accelPeakX': 6.139404296875,
          'accelPeakY': 13.307540893554688,
          'accelPeakZ': 0.917694091796875,
          'time': '2018-05-14T09:37:31.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 7,
        'sample': {
          'speed': 6.269999980926514,
          'longitude': 35.14527893066406,
          'latitude': 31.79331398010254,
          'accelAvgX': 1.1918864250183105,
          'accelAvgY': 9.424640655517578,
          'accelAvgZ': 0.8933649063110352,
          'accelPeakX': 3.194549560546875,
          'accelPeakY': 18.643020629882812,
          'accelPeakZ': -0.16510009765625,
          'time': '2018-05-14T09:37:36.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 8,
        'sample': {
          'speed': 10.699999809265137,
          'longitude': 35.14564514160156,
          'latitude': 31.7935733795166,
          'accelAvgX': 1.0266122817993164,
          'accelAvgY': 9.278972625732422,
          'accelAvgZ': 1.0187681913375854,
          'accelPeakX': -10.222564697265625,
          'accelPeakY': 11.889572143554688,
          'accelPeakZ': -0.3871612548828125,
          'time': '2018-05-14T09:37:41.000Z'
        }
      },
      {
        'reportNumber': 171,
        'sampleNumber': 9,
        'sample': {
          'speed': 12.220000267028809,
          'longitude': 35.146141052246094,
          'latitude': 31.79387092590332,
          'accelAvgX': 0.2142903059720993,
          'accelAvgY': 9.135993957519531,
          'accelAvgZ': 2.5523717403411865,
          'accelPeakX': 3.243621826171875,
          'accelPeakY': 12.169097900390625,
          'accelPeakZ': 0.319732666015625,
          'time': '2018-05-14T09:37:46.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 0,
        'sample': {
          'speed': 10.140000343322754,
          'longitude': 35.146484375,
          'latitude': 31.79427146911621,
          'accelAvgX': 0.3791131377220154,
          'accelAvgY': 8.728185653686523,
          'accelAvgZ': 3.4614949226379395,
          'accelPeakX': 2.9132232666015625,
          'accelPeakY': 13.971923828125,
          'accelPeakZ': 3.2460479736328125,
          'time': '2018-05-14T09:37:51.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 1,
        'sample': {
          'speed': 4.090000152587891,
          'longitude': 35.1465950012207,
          'latitude': 31.7945556640625,
          'accelAvgX': 1.5874890089035034,
          'accelAvgY': 8.601402282714844,
          'accelAvgZ': 4.183541774749756,
          'accelPeakX': 0.8560028076171875,
          'accelPeakY': 11.283843994140625,
          'accelPeakZ': 3.459136962890625,
          'time': '2018-05-14T09:37:56.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 2,
        'sample': {
          'speed': 0.23000000417232513,
          'longitude': 35.1466064453125,
          'latitude': 31.794614791870117,
          'accelAvgX': 1.2450364828109741,
          'accelAvgY': 9.023426055908203,
          'accelAvgZ': 2.666738986968994,
          'accelPeakX': 1.5838470458984375,
          'accelPeakY': 8.974624633789062,
          'accelPeakZ': 4.1109619140625,
          'time': '2018-05-14T09:38:01.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 3,
        'sample': {
          'speed': 2.380000114440918,
          'longitude': 35.1466064453125,
          'latitude': 31.794639587402344,
          'accelAvgX': 0.5161032676696777,
          'accelAvgY': 9.482013702392578,
          'accelAvgZ': 1.0408775806427002,
          'accelPeakX': 1.0439453125,
          'accelPeakY': 10.229202270507812,
          'accelPeakZ': 0.7279510498046875,
          'time': '2018-05-14T09:38:06.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 4,
        'sample': {
          'speed': 7.289999961853027,
          'longitude': 35.1465950012207,
          'latitude': 31.794919967651367,
          'accelAvgX': 0.29987087845802307,
          'accelAvgY': 8.957110404968262,
          'accelAvgZ': 2.0769338607788086,
          'accelPeakX': -0.3213348388671875,
          'accelPeakY': 10.866653442382812,
          'accelPeakZ': 2.0321807861328125,
          'time': '2018-05-14T09:38:11.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 5,
        'sample': {
          'speed': 8.420000076293945,
          'longitude': 35.146419525146484,
          'latitude': 31.79538917541504,
          'accelAvgX': 1.0060429573059082,
          'accelAvgY': 8.996460914611816,
          'accelAvgZ': 2.9798521995544434,
          'accelPeakX': 0.6782379150390625,
          'accelPeakY': 12.679656982421875,
          'accelPeakZ': 1.5611419677734375,
          'time': '2018-05-14T09:38:16.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 6,
        'sample': {
          'speed': 8.279999732971191,
          'longitude': 35.146339416503906,
          'latitude': 31.79566764831543,
          'accelAvgX': -0.17685940861701965,
          'accelAvgY': 9.398425102233887,
          'accelAvgZ': 2.045311450958252,
          'accelPeakX': -5.88427734375,
          'accelPeakY': 13.66845703125,
          'accelPeakZ': 1.2852020263671875,
          'time': '2018-05-14T09:38:21.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 7,
        'sample': {
          'speed': 11.949999809265137,
          'longitude': 35.146148681640625,
          'latitude': 31.79615592956543,
          'accelAvgX': 0.3354000449180603,
          'accelAvgY': 9.169354438781738,
          'accelAvgZ': 2.2097389698028564,
          'accelPeakX': -0.6918487548828125,
          'accelPeakY': 12.03143310546875,
          'accelPeakZ': 0.8973388671875,
          'time': '2018-05-14T09:38:26.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 8,
        'sample': {
          'speed': 13.039999961853027,
          'longitude': 35.14591979980469,
          'latitude': 31.79669189453125,
          'accelAvgX': 1.2232017517089844,
          'accelAvgY': 9.094934463500977,
          'accelAvgZ': 2.514130115509033,
          'accelPeakX': 1.3563995361328125,
          'accelPeakY': 10.790634155273438,
          'accelPeakZ': 2.197998046875,
          'time': '2018-05-14T09:38:31.000Z'
        }
      },
      {
        'reportNumber': 172,
        'sampleNumber': 9,
        'sample': {
          'speed': 13.050000190734863,
          'longitude': 35.14583206176758,
          'latitude': 31.797391891479492,
          'accelAvgX': 2.2203176021575928,
          'accelAvgY': 9.017343521118164,
          'accelAvgZ': 2.480318546295166,
          'accelPeakX': 3.7260589599609375,
          'accelPeakY': 9.571990966796875,
          'accelPeakZ': 3.2490386962890625,
          'time': '2018-05-14T09:38:36.000Z'
        }
      },
      {
        'reportNumber': 173,
        'sampleNumber': 0,
        'sample': {
          'speed': 9.25,
          'longitude': 35.146060943603516,
          'latitude': 31.7978572845459,
          'accelAvgX': 3.575895309448242,
          'accelAvgY': 8.801919937133789,
          'accelAvgZ': 2.66560697555542,
          'accelPeakX': 6.4081573486328125,
          'accelPeakY': 9.324188232421875,
          'accelPeakZ': 2.796539306640625,
          'time': '2018-05-14T09:38:43.000Z'
        }
      },
      {
        'reportNumber': 173,
        'sampleNumber': 1,
        'sample': {
          'speed': 11.699999809265137,
          'longitude': 35.146461486816406,
          'latitude': 31.797800064086914,
          'accelAvgX': 0.7626909017562866,
          'accelAvgY': 9.277737617492676,
          'accelAvgZ': 0.30633869767189026,
          'accelPeakX': 5.5384674072265625,
          'accelPeakY': 13.332672119140625,
          'accelPeakZ': -1.0138397216796875,
          'time': '2018-05-14T09:38:48.000Z'
        }
      },
      {
        'reportNumber': 173,
        'sampleNumber': 2,
        'sample': {
          'speed': 18.299999237060547,
          'longitude': 35.147132873535156,
          'latitude': 31.79713249206543,
          'accelAvgX': 0.1638660430908203,
          'accelAvgY': 9.053654670715332,
          'accelAvgZ': 2.6834359169006348,
          'accelPeakX': 4.1701812744140625,
          'accelPeakY': 10.818161010742188,
          'accelPeakZ': 1.962158203125,
          'time': '2018-05-14T09:38:53.000Z'
        }
      },
      {
        'reportNumber': 174,
        'sampleNumber': 1,
        'sample': {
          'speed': 29.719999313354492,
          'longitude': 35.15658950805664,
          'latitude': 31.796733856201172,
          'accelAvgX': 1.5118169784545898,
          'accelAvgY': 9.218026161193848,
          'accelAvgZ': 2.420281171798706,
          'accelPeakX': 1.730499267578125,
          'accelPeakY': 11.328720092773438,
          'accelPeakZ': 2.3566131591796875,
          'time': '2018-05-14T09:39:31.000Z'
        }
      },
      {
        'reportNumber': 174,
        'sampleNumber': 2,
        'sample': {
          'speed': 29.979999542236328,
          'longitude': 35.158111572265625,
          'latitude': 31.796384811401367,
          'accelAvgX': 1.951915979385376,
          'accelAvgY': 9.150405883789062,
          'accelAvgZ': 2.3594629764556885,
          'accelPeakX': -1.47296142578125,
          'accelPeakY': 14.04974365234375,
          'accelPeakZ': 1.4102935791015625,
          'time': '2018-05-14T09:39:36.000Z'
        }
      },
      {
        'reportNumber': 174,
        'sampleNumber': 3,
        'sample': {
          'speed': 29.479999542236328,
          'longitude': 35.15953826904297,
          'latitude': 31.795827865600586,
          'accelAvgX': 1.3249664306640625,
          'accelAvgY': 9.225558280944824,
          'accelAvgZ': 2.615576982498169,
          'accelPeakX': 0.850616455078125,
          'accelPeakY': 15.898666381835938,
          'accelPeakZ': 2.8599853515625,
          'time': '2018-05-14T09:39:41.000Z'
        }
      },
      {
        'reportNumber': 174,
        'sampleNumber': 4,
        'sample': {
          'speed': 28.15999984741211,
          'longitude': 35.1608772277832,
          'latitude': 31.79523277282715,
          'accelAvgX': 0.4361346364021301,
          'accelAvgY': 8.934690475463867,
          'accelAvgZ': 2.4495749473571777,
          'accelPeakX': 3.23583984375,
          'accelPeakY': 15.25103759765625,
          'accelPeakZ': -0.2309417724609375,
          'time': '2018-05-14T09:39:46.000Z'
        }
      },
      {
        'reportNumber': 174,
        'sampleNumber': 5,
        'sample': {
          'speed': 27.200000762939453,
          'longitude': 35.16218566894531,
          'latitude': 31.79469871520996,
          'accelAvgX': 0.5198917984962463,
          'accelAvgY': 9.315881729125977,
          'accelAvgZ': 2.7543768882751465,
          'accelPeakX': 0.2706298828125,
          'accelPeakY': 13.128570556640625,
          'accelPeakZ': 1.812530517578125,
          'time': '2018-05-14T09:39:51.000Z'
        }
      },
      {
        'reportNumber': 174,
        'sampleNumber': 6,
        'sample': {
          'speed': 27.540000915527344,
          'longitude': 35.16357421875,
          'latitude': 31.79437255859375,
          'accelAvgX': 0.2511543929576874,
          'accelAvgY': 9.033379554748535,
          'accelAvgZ': 2.9609711170196533,
          'accelPeakX': -7.84332275390625,
          'accelPeakY': 9.67852783203125,
          'accelPeakZ': 2.12615966796875,
          'time': '2018-05-14T09:39:56.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 0,
        'sample': {
          'speed': 27.420000076293945,
          'longitude': 35.165000915527344,
          'latitude': 31.794252395629883,
          'accelAvgX': -0.14770694077014923,
          'accelAvgY': 9.484280586242676,
          'accelAvgZ': 2.369795083999634,
          'accelPeakX': 2.616943359375,
          'accelPeakY': 11.403549194335938,
          'accelPeakZ': 2.7648162841796875,
          'time': '2018-05-14T09:40:01.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 1,
        'sample': {
          'speed': 28.09000015258789,
          'longitude': 35.16645812988281,
          'latitude': 31.794424057006836,
          'accelAvgX': 0.016271330416202545,
          'accelAvgY': 9.562533378601074,
          'accelAvgZ': 2.592189073562622,
          'accelPeakX': -0.9348602294921875,
          'accelPeakY': 12.536605834960938,
          'accelPeakZ': 1.39892578125,
          'time': '2018-05-14T09:40:06.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 2,
        'sample': {
          'speed': 28.450000762939453,
          'longitude': 35.167842864990234,
          'latitude': 31.794923782348633,
          'accelAvgX': 0.33616718649864197,
          'accelAvgY': 9.469579696655273,
          'accelAvgZ': 2.0631961822509766,
          'accelPeakX': 10.93798828125,
          'accelPeakY': 15.6993408203125,
          'accelPeakZ': 0.10784912109375,
          'time': '2018-05-14T09:40:11.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 3,
        'sample': {
          'speed': 28.360000610351562,
          'longitude': 35.16909408569336,
          'latitude': 31.795625686645508,
          'accelAvgX': 0.18799497187137604,
          'accelAvgY': 9.933822631835938,
          'accelAvgZ': 1.6080571413040161,
          'accelPeakX': 2.2350616455078125,
          'accelPeakY': 11.67230224609375,
          'accelPeakZ': 1.50726318359375,
          'time': '2018-05-14T09:40:16.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 4,
        'sample': {
          'speed': 27.959999084472656,
          'longitude': 35.17024230957031,
          'latitude': 31.79647445678711,
          'accelAvgX': -0.04712887853384018,
          'accelAvgY': 9.64609146118164,
          'accelAvgZ': 1.5590975284576416,
          'accelPeakX': 3.791900634765625,
          'accelPeakY': 11.89794921875,
          'accelPeakZ': 3.0066375732421875,
          'time': '2018-05-14T09:40:21.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 5,
        'sample': {
          'speed': 26.579999923706055,
          'longitude': 35.17123031616211,
          'latitude': 31.797372817993164,
          'accelAvgX': 0.8452365398406982,
          'accelAvgY': 8.745034217834473,
          'accelAvgZ': 1.4032654762268066,
          'accelPeakX': -0.6798858642578125,
          'accelPeakY': 13.995269775390625,
          'accelPeakZ': 0.8907623291015625,
          'time': '2018-05-14T09:40:26.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 6,
        'sample': {
          'speed': 26.200000762939453,
          'longitude': 35.172122955322266,
          'latitude': 31.798303604125977,
          'accelAvgX': 0.7595641613006592,
          'accelAvgY': 9.603739738464355,
          'accelAvgZ': 1.2753287553787231,
          'accelPeakX': 6.2238006591796875,
          'accelPeakY': 11.99432373046875,
          'accelPeakZ': 0.4304656982421875,
          'time': '2018-05-14T09:40:31.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 7,
        'sample': {
          'speed': 25.469999313354492,
          'longitude': 35.17298126220703,
          'latitude': 31.799205780029297,
          'accelAvgX': 0.042959064245224,
          'accelAvgY': 9.38912296295166,
          'accelAvgZ': 1.1779537200927734,
          'accelPeakX': 5.286468505859375,
          'accelPeakY': 11.9105224609375,
          'accelPeakZ': 1.665283203125,
          'time': '2018-05-14T09:40:36.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 8,
        'sample': {
          'speed': 25.1200008392334,
          'longitude': 35.17384719848633,
          'latitude': 31.800067901611328,
          'accelAvgX': 2.076880693435669,
          'accelAvgY': 9.198585510253906,
          'accelAvgZ': 0.881558895111084,
          'accelPeakX': 4.8776702880859375,
          'accelPeakY': 13.105224609375,
          'accelPeakZ': 0.00250244140625,
          'time': '2018-05-14T09:40:41.000Z'
        }
      },
      {
        'reportNumber': 175,
        'sampleNumber': 9,
        'sample': {
          'speed': 23.18000030517578,
          'longitude': 35.17490005493164,
          'latitude': 31.800682067871094,
          'accelAvgX': 1.547903299331665,
          'accelAvgY': 9.37159252166748,
          'accelAvgZ': 0.5428409576416016,
          'accelPeakX': 3.7996826171875,
          'accelPeakY': 11.32275390625,
          'accelPeakZ': 1.456390380859375,
          'time': '2018-05-14T09:40:46.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 0,
        'sample': {
          'speed': 24.209999084472656,
          'longitude': 35.17610168457031,
          'latitude': 31.800973892211914,
          'accelAvgX': 1.6323573589324951,
          'accelAvgY': 8.386308670043945,
          'accelAvgZ': 0.493889182806015,
          'accelPeakX': 4.6208953857421875,
          'accelPeakY': 14.157485961914062,
          'accelPeakZ': -0.2722320556640625,
          'time': '2018-05-14T09:40:51.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 1,
        'sample': {
          'speed': 24.389999389648438,
          'longitude': 35.1773796081543,
          'latitude': 31.800949096679688,
          'accelAvgX': 0.6072859764099121,
          'accelAvgY': 9.469945907592773,
          'accelAvgZ': 1.3571994304656982,
          'accelPeakX': 2.237457275390625,
          'accelPeakY': 12.632369995117188,
          'accelPeakZ': 1.5964508056640625,
          'time': '2018-05-14T09:40:56.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 2,
        'sample': {
          'speed': 23.940000534057617,
          'longitude': 35.17864227294922,
          'latitude': 31.800790786743164,
          'accelAvgX': -0.6737359762191772,
          'accelAvgY': 9.184614181518555,
          'accelAvgZ': 3.147674560546875,
          'accelPeakX': -7.907379150390625,
          'accelPeakY': 11.270660400390625,
          'accelPeakZ': 1.549163818359375,
          'time': '2018-05-14T09:41:01.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 3,
        'sample': {
          'speed': 22.479999542236328,
          'longitude': 35.17980194091797,
          'latitude': 31.800920486450195,
          'accelAvgX': -1.4522032737731934,
          'accelAvgY': 9.155916213989258,
          'accelAvgZ': 2.440650463104248,
          'accelPeakX': -2.554534912109375,
          'accelPeakY': 11.182693481445312,
          'accelPeakZ': 2.954559326171875,
          'time': '2018-05-14T09:41:06.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 4,
        'sample': {
          'speed': 23.260000228881836,
          'longitude': 35.18074035644531,
          'latitude': 31.801549911499023,
          'accelAvgX': 1.0096393823623657,
          'accelAvgY': 9.352482795715332,
          'accelAvgZ': 2.457014322280884,
          'accelPeakX': 0.4615631103515625,
          'accelPeakY': 11.91949462890625,
          'accelPeakZ': 2.364990234375,
          'time': '2018-05-14T09:41:11.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 5,
        'sample': {
          'speed': 24.260000228881836,
          'longitude': 35.18179702758789,
          'latitude': 31.802457809448242,
          'accelAvgX': 2.047449827194214,
          'accelAvgY': 8.94843578338623,
          'accelAvgZ': 2.034496307373047,
          'accelPeakX': 2.97308349609375,
          'accelPeakY': 11.364639282226562,
          'accelPeakZ': 2.1255645751953125,
          'time': '2018-05-14T09:41:16.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 6,
        'sample': {
          'speed': 24.3799991607666,
          'longitude': 35.182647705078125,
          'latitude': 31.802959442138672,
          'accelAvgX': 1.4104613065719604,
          'accelAvgY': 8.79944133758545,
          'accelAvgZ': 2.1981539726257324,
          'accelPeakX': 4.4844207763671875,
          'accelPeakY': 12.4923095703125,
          'accelPeakZ': 1.6880340576171875,
          'time': '2018-05-14T09:41:21.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 7,
        'sample': {
          'speed': 24.260000228881836,
          'longitude': 35.18386459350586,
          'latitude': 31.803329467773438,
          'accelAvgX': 2.0796585083007812,
          'accelAvgY': 8.876829147338867,
          'accelAvgZ': 2.245776653289795,
          'accelPeakX': 5.5881500244140625,
          'accelPeakY': 10.700851440429688,
          'accelPeakZ': 2.1788330078125,
          'time': '2018-05-14T09:41:26.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 8,
        'sample': {
          'speed': 23.860000610351562,
          'longitude': 35.18513870239258,
          'latitude': 31.803342819213867,
          'accelAvgX': 1.2848570346832275,
          'accelAvgY': 9.50381851196289,
          'accelAvgZ': 2.477473497390747,
          'accelPeakX': 6.8953857421875,
          'accelPeakY': 12.826904296875,
          'accelPeakZ': 0.67108154296875,
          'time': '2018-05-14T09:41:31.000Z'
        }
      },
      {
        'reportNumber': 176,
        'sampleNumber': 9,
        'sample': {
          'speed': 23.600000381469727,
          'longitude': 35.186336517333984,
          'latitude': 31.80304527282715,
          'accelAvgX': 1.3397939205169678,
          'accelAvgY': 9.783509254455566,
          'accelAvgZ': 1.818460464477539,
          'accelPeakX': 4.5305023193359375,
          'accelPeakY': 10.844497680664062,
          'accelPeakZ': 1.6580963134765625,
          'time': '2018-05-14T09:41:36.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 0,
        'sample': {
          'speed': 22.75,
          'longitude': 35.187442779541016,
          'latitude': 31.802589416503906,
          'accelAvgX': 0.3784565031528473,
          'accelAvgY': 9.629541397094727,
          'accelAvgZ': 1.4749680757522583,
          'accelPeakX': 2.8892822265625,
          'accelPeakY': 12.773025512695312,
          'accelPeakZ': 0.99969482421875,
          'time': '2018-05-14T09:41:41.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 1,
        'sample': {
          'speed': 22.440000534057617,
          'longitude': 35.188533782958984,
          'latitude': 31.80218505859375,
          'accelAvgX': 0.5506876707077026,
          'accelAvgY': 9.35944652557373,
          'accelAvgZ': 2.431792736053467,
          'accelPeakX': 0.25506591796875,
          'accelPeakY': 17.29388427734375,
          'accelPeakZ': 1.6455230712890625,
          'time': '2018-05-14T09:41:46.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 2,
        'sample': {
          'speed': 17.520000457763672,
          'longitude': 35.18965148925781,
          'latitude': 31.801706314086914,
          'accelAvgX': 0.8598426580429077,
          'accelAvgY': 9.506251335144043,
          'accelAvgZ': 2.1072652339935303,
          'accelPeakX': 8.7957763671875,
          'accelPeakY': 18.526901245117188,
          'accelPeakZ': 0.954803466796875,
          'time': '2018-05-14T09:41:51.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 3,
        'sample': {
          'speed': 19.56999969482422,
          'longitude': 35.19052505493164,
          'latitude': 31.80132293701172,
          'accelAvgX': 0.25604188442230225,
          'accelAvgY': 9.837665557861328,
          'accelAvgZ': 0.7106722593307495,
          'accelPeakX': 1.067291259765625,
          'accelPeakY': 13.360214233398438,
          'accelPeakZ': 1.0158538818359375,
          'time': '2018-05-14T09:41:56.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 4,
        'sample': {
          'speed': 19.040000915527344,
          'longitude': 35.191261291503906,
          'latitude': 31.8010196685791,
          'accelAvgX': 0.2945392429828644,
          'accelAvgY': 8.998379707336426,
          'accelAvgZ': 1.0553776025772095,
          'accelPeakX': -10.888763427734375,
          'accelPeakY': 15.446762084960938,
          'accelPeakZ': 1.5928497314453125,
          'time': '2018-05-14T09:42:01.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 5,
        'sample': {
          'speed': 19.030000686645508,
          'longitude': 35.19144058227539,
          'latitude': 31.800945281982422,
          'accelAvgX': 0.6867263317108154,
          'accelAvgY': 9.272424697875977,
          'accelAvgZ': 1.9068676233291626,
          'accelPeakX': 2.0399322509765625,
          'accelPeakY': 12.036819458007812,
          'accelPeakZ': 1.71734619140625,
          'time': '2018-05-14T09:42:06.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 6,
        'sample': {
          'speed': 19.030000686645508,
          'longitude': 35.19144058227539,
          'latitude': 31.800945281982422,
          'accelAvgX': 1.1412603855133057,
          'accelAvgY': 9.262484550476074,
          'accelAvgZ': 1.6285384893417358,
          'accelPeakX': 0.120391845703125,
          'accelPeakY': 12.2325439453125,
          'accelPeakZ': 1.2295379638671875,
          'time': '2018-05-14T09:42:11.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 7,
        'sample': {
          'speed': 19.030000686645508,
          'longitude': 35.19144058227539,
          'latitude': 31.800945281982422,
          'accelAvgX': 1.3703172206878662,
          'accelAvgY': 9.300535202026367,
          'accelAvgZ': 1.7091490030288696,
          'accelPeakX': 2.1590576171875,
          'accelPeakY': 12.936431884765625,
          'accelPeakZ': 0.3454742431640625,
          'time': '2018-05-14T09:42:16.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 8,
        'sample': {
          'speed': 18.489999771118164,
          'longitude': 35.195068359375,
          'latitude': 31.800695419311523,
          'accelAvgX': -0.5466792583465576,
          'accelAvgY': 9.15452766418457,
          'accelAvgZ': 1.1321864128112793,
          'accelPeakX': 2.3188629150390625,
          'accelPeakY': 14.014419555664062,
          'accelPeakZ': 0.7261505126953125,
          'time': '2018-05-14T09:42:21.000Z'
        }
      },
      {
        'reportNumber': 177,
        'sampleNumber': 9,
        'sample': {
          'speed': 20.479999542236328,
          'longitude': 35.19624328613281,
          'latitude': 31.80113983154297,
          'accelAvgX': 1.0168876647949219,
          'accelAvgY': 9.190914154052734,
          'accelAvgZ': 1.727341890335083,
          'accelPeakX': 1.379150390625,
          'accelPeakY': 12.061355590820312,
          'accelPeakZ': 1.36181640625,
          'time': '2018-05-14T09:42:26.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 0,
        'sample': {
          'speed': 21.989999771118164,
          'longitude': 35.196956634521484,
          'latitude': 31.80160140991211,
          'accelAvgX': -0.5618255138397217,
          'accelAvgY': 9.622686386108398,
          'accelAvgZ': 2.223144769668579,
          'accelPeakX': -3.6115875244140625,
          'accelPeakY': 13.697799682617188,
          'accelPeakZ': 0.9775390625,
          'time': '2018-05-14T09:42:31.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 1,
        'sample': {
          'speed': 23.020000457763672,
          'longitude': 35.19789505004883,
          'latitude': 31.802553176879883,
          'accelAvgX': 1.3156869411468506,
          'accelAvgY': 10.174654960632324,
          'accelAvgZ': 2.188356637954712,
          'accelPeakX': -10.56494140625,
          'accelPeakY': 10.070571899414062,
          'accelPeakZ': 2.64990234375,
          'time': '2018-05-14T09:42:36.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 2,
        'sample': {
          'speed': 24.34000015258789,
          'longitude': 35.19865417480469,
          'latitude': 31.803409576416016,
          'accelAvgX': 0.3647337555885315,
          'accelAvgY': 9.522214889526367,
          'accelAvgZ': 2.0269250869750977,
          'accelPeakX': 1.355194091796875,
          'accelPeakY': 15.236068725585938,
          'accelPeakZ': 0.821319580078125,
          'time': '2018-05-14T09:42:41.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 3,
        'sample': {
          'speed': 24.850000381469727,
          'longitude': 35.1994514465332,
          'latitude': 31.804332733154297,
          'accelAvgX': 1.3072763681411743,
          'accelAvgY': 8.83830738067627,
          'accelAvgZ': 2.5383286476135254,
          'accelPeakX': 2.33502197265625,
          'accelPeakY': 12.892745971679688,
          'accelPeakZ': 1.134368896484375,
          'time': '2018-05-14T09:42:46.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 4,
        'sample': {
          'speed': 24.899999618530273,
          'longitude': 35.200252532958984,
          'latitude': 31.805206298828125,
          'accelAvgX': 0.7517662048339844,
          'accelAvgY': 9.314684867858887,
          'accelAvgZ': 2.480410575866699,
          'accelPeakX': 3.997802734375,
          'accelPeakY': 12.629974365234375,
          'accelPeakZ': 2.1872100830078125,
          'time': '2018-05-14T09:42:51.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 5,
        'sample': {
          'speed': 21.549999237060547,
          'longitude': 35.201087951660156,
          'latitude': 31.80594825744629,
          'accelAvgX': 1.117984414100647,
          'accelAvgY': 9.060157775878906,
          'accelAvgZ': 1.4925447702407837,
          'accelPeakX': -2.2881927490234375,
          'accelPeakY': 15.954330444335938,
          'accelPeakZ': 1.39892578125,
          'time': '2018-05-14T09:42:56.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 6,
        'sample': {
          'speed': 22.760000228881836,
          'longitude': 35.202117919921875,
          'latitude': 31.806476593017578,
          'accelAvgX': 2.3218142986297607,
          'accelAvgY': 9.595301628112793,
          'accelAvgZ': 1.7529969215393066,
          'accelPeakX': 1.861572265625,
          'accelPeakY': 12.413909912109375,
          'accelPeakZ': 1.552154541015625,
          'time': '2018-05-14T09:43:01.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 7,
        'sample': {
          'speed': 16.100000381469727,
          'longitude': 35.203102111816406,
          'latitude': 31.806562423706055,
          'accelAvgX': 4.814214706420898,
          'accelAvgY': 9.382805824279785,
          'accelAvgZ': 0.07595936208963394,
          'accelPeakX': 12.015380859375,
          'accelPeakY': 9.731201171875,
          'accelPeakZ': 0.8267059326171875,
          'time': '2018-05-14T09:43:06.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 8,
        'sample': {
          'speed': 16.3799991607666,
          'longitude': 35.203407287597656,
          'latitude': 31.805944442749023,
          'accelAvgX': 1.1242315769195557,
          'accelAvgY': 8.707388877868652,
          'accelAvgZ': 0.0043617188930511475,
          'accelPeakX': 6.038848876953125,
          'accelPeakY': 13.985702514648438,
          'accelPeakZ': -2.1193695068359375,
          'time': '2018-05-14T09:43:11.000Z'
        }
      },
      {
        'reportNumber': 178,
        'sampleNumber': 9,
        'sample': {
          'speed': 19.229999542236328,
          'longitude': 35.203285217285156,
          'latitude': 31.805133819580078,
          'accelAvgX': -0.12357019633054733,
          'accelAvgY': 9.491185188293457,
          'accelAvgZ': 0.6000949740409851,
          'accelPeakX': 7.6387786865234375,
          'accelPeakY': 15.635299682617188,
          'accelPeakZ': -1.169464111328125,
          'time': '2018-05-14T09:43:16.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 0,
        'sample': {
          'speed': 18.639999389648438,
          'longitude': 35.203243255615234,
          'latitude': 31.804298400878906,
          'accelAvgX': -0.7295933961868286,
          'accelAvgY': 9.781957626342773,
          'accelAvgZ': 1.4061644077301025,
          'accelPeakX': -2.5706939697265625,
          'accelPeakY': 12.288803100585938,
          'accelPeakZ': 0.926666259765625,
          'time': '2018-05-14T09:43:21.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 1,
        'sample': {
          'speed': 19.770000457763672,
          'longitude': 35.20360565185547,
          'latitude': 31.803489685058594,
          'accelAvgX': -0.1316412091255188,
          'accelAvgY': 9.432302474975586,
          'accelAvgZ': 1.5985703468322754,
          'accelPeakX': -6.3637237548828125,
          'accelPeakY': 14.968521118164062,
          'accelPeakZ': 0.567535400390625,
          'time': '2018-05-14T09:43:26.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 2,
        'sample': {
          'speed': 20.280000686645508,
          'longitude': 35.2042350769043,
          'latitude': 31.802749633789062,
          'accelAvgX': 0.4024798572063446,
          'accelAvgY': 9.311186790466309,
          'accelAvgZ': 1.5278764963150024,
          'accelPeakX': -1.0216522216796875,
          'accelPeakY': 16.009994506835938,
          'accelPeakZ': 0.5142669677734375,
          'time': '2018-05-14T09:43:31.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 3,
        'sample': {
          'speed': 17.729999542236328,
          'longitude': 35.20489501953125,
          'latitude': 31.802122116088867,
          'accelAvgX': 1.155510425567627,
          'accelAvgY': 8.990961074829102,
          'accelAvgZ': 2.718398332595825,
          'accelPeakX': 0.6596832275390625,
          'accelPeakY': 14.344223022460938,
          'accelPeakZ': 1.0619354248046875,
          'time': '2018-05-14T09:43:36.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 4,
        'sample': {
          'speed': 11.630000114440918,
          'longitude': 35.20513916015625,
          'latitude': 31.80159568786621,
          'accelAvgX': 4.506993770599365,
          'accelAvgY': 8.728021621704102,
          'accelAvgZ': 0.006254969164729118,
          'accelPeakX': 3.6117401123046875,
          'accelPeakY': 14.177825927734375,
          'accelPeakZ': 1.007476806640625,
          'time': '2018-05-14T09:43:41.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 5,
        'sample': {
          'speed': 15.479999542236328,
          'longitude': 35.20462417602539,
          'latitude': 31.801176071166992,
          'accelAvgX': -0.32581275701522827,
          'accelAvgY': 9.123620986938477,
          'accelAvgZ': 0.9969536066055298,
          'accelPeakX': 9.12078857421875,
          'accelPeakY': 13.367401123046875,
          'accelPeakZ': -0.5774993896484375,
          'time': '2018-05-14T09:43:46.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 6,
        'sample': {
          'speed': 18.329999923706055,
          'longitude': 35.203983306884766,
          'latitude': 31.80060386657715,
          'accelAvgX': -1.3960751295089722,
          'accelAvgY': 9.660868644714355,
          'accelAvgZ': 2.230008840560913,
          'accelPeakX': 3.7721405029296875,
          'accelPeakY': 13.834259033203125,
          'accelPeakZ': 0.7716522216796875,
          'time': '2018-05-14T09:43:51.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 7,
        'sample': {
          'speed': 17.739999771118164,
          'longitude': 35.20359420776367,
          'latitude': 31.799854278564453,
          'accelAvgX': 2.6189045906066895,
          'accelAvgY': 9.260329246520996,
          'accelAvgZ': -0.17319834232330322,
          'accelPeakX': 2.8898773193359375,
          'accelPeakY': 11.65374755859375,
          'accelPeakZ': 1.199005126953125,
          'time': '2018-05-14T09:43:56.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 8,
        'sample': {
          'speed': 22.239999771118164,
          'longitude': 35.20271682739258,
          'latitude': 31.79933738708496,
          'accelAvgX': 1.3085094690322876,
          'accelAvgY': 9.786460876464844,
          'accelAvgZ': 1.2646129131317139,
          'accelPeakX': 2.7689666748046875,
          'accelPeakY': 15.920806884765625,
          'accelPeakZ': -0.063934326171875,
          'time': '2018-05-14T09:44:01.000Z'
        }
      },
      {
        'reportNumber': 179,
        'sampleNumber': 9,
        'sample': {
          'speed': 23.1299991607666,
          'longitude': 35.201534271240234,
          'latitude': 31.79918098449707,
          'accelAvgX': 1.4358935356140137,
          'accelAvgY': 9.376510620117188,
          'accelAvgZ': 0.7954419851303101,
          'accelPeakX': 3.6763763427734375,
          'accelPeakY': 11.72137451171875,
          'accelPeakZ': 0.812347412109375,
          'time': '2018-05-14T09:44:06.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 0,
        'sample': {
          'speed': 22.219999313354492,
          'longitude': 35.2003288269043,
          'latitude': 31.7991886138916,
          'accelAvgX': -0.6917388439178467,
          'accelAvgY': 9.573925971984863,
          'accelAvgZ': 1.993893027305603,
          'accelPeakX': -6.9006195068359375,
          'accelPeakY': 13.299758911132812,
          'accelPeakZ': 1.66168212890625,
          'time': '2018-05-14T09:44:11.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 1,
        'sample': {
          'speed': 21.549999237060547,
          'longitude': 35.19925308227539,
          'latitude': 31.798921585083008,
          'accelAvgX': -0.4211733937263489,
          'accelAvgY': 9.325719833374023,
          'accelAvgZ': 1.3811736106872559,
          'accelPeakX': -6.003387451171875,
          'accelPeakY': 13.599029541015625,
          'accelPeakZ': 1.4521942138671875,
          'time': '2018-05-14T09:44:16.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 2,
        'sample': {
          'speed': 21.75,
          'longitude': 35.198333740234375,
          'latitude': 31.79835319519043,
          'accelAvgX': -0.5138276219367981,
          'accelAvgY': 9.666175842285156,
          'accelAvgZ': 1.4698430299758911,
          'accelPeakX': -4.6045684814453125,
          'accelPeakY': 17.229843139648438,
          'accelPeakZ': 1.0966644287109375,
          'time': '2018-05-14T09:44:21.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 3,
        'sample': {
          'speed': 21.1200008392334,
          'longitude': 35.19768142700195,
          'latitude': 31.797536849975586,
          'accelAvgX': 0.27250799536705017,
          'accelAvgY': 9.171173095703125,
          'accelAvgZ': 1.4062013626098633,
          'accelPeakX': 1.4677276611328125,
          'accelPeakY': 13.631362915039062,
          'accelPeakZ': 1.276824951171875,
          'time': '2018-05-14T09:44:26.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 4,
        'sample': {
          'speed': 20.3700008392334,
          'longitude': 35.19739532470703,
          'latitude': 31.796648025512695,
          'accelAvgX': -0.40653741359710693,
          'accelAvgY': 9.566301345825195,
          'accelAvgZ': 1.2263625860214233,
          'accelPeakX': 5.390625,
          'accelPeakY': 11.969772338867188,
          'accelPeakZ': 0.4149017333984375,
          'time': '2018-05-14T09:44:31.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 5,
        'sample': {
          'speed': 19.170000076293945,
          'longitude': 35.19743728637695,
          'latitude': 31.795734405517578,
          'accelAvgX': -0.1730707883834839,
          'accelAvgY': 9.868664741516113,
          'accelAvgZ': 1.8506031036376953,
          'accelPeakX': 2.0495147705078125,
          'accelPeakY': 12.164306640625,
          'accelPeakZ': 1.0170440673828125,
          'time': '2018-05-14T09:44:36.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 6,
        'sample': {
          'speed': 15.369999885559082,
          'longitude': 35.19770812988281,
          'latitude': 31.79503631591797,
          'accelAvgX': -0.010843634605407715,
          'accelAvgY': 9.68822193145752,
          'accelAvgZ': 0.8149968385696411,
          'accelPeakX': 0.662078857421875,
          'accelPeakY': 12.623992919921875,
          'accelPeakZ': 2.2476654052734375,
          'time': '2018-05-14T09:44:41.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 7,
        'sample': {
          'speed': 17.649999618530273,
          'longitude': 35.19803237915039,
          'latitude': 31.794330596923828,
          'accelAvgX': 0.0944836437702179,
          'accelAvgY': 9.476666450500488,
          'accelAvgZ': 1.2166329622268677,
          'accelPeakX': 0.1551055908203125,
          'accelPeakY': 11.456222534179688,
          'accelPeakZ': 1.4150848388671875,
          'time': '2018-05-14T09:44:46.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 8,
        'sample': {
          'speed': 19.68000030517578,
          'longitude': 35.1983528137207,
          'latitude': 31.793546676635742,
          'accelAvgX': 1.3198421001434326,
          'accelAvgY': 10.018719673156738,
          'accelAvgZ': 0.30629292130470276,
          'accelPeakX': 1.3480224609375,
          'accelPeakY': 11.4891357421875,
          'accelPeakZ': 0.948211669921875,
          'time': '2018-05-14T09:44:51.000Z'
        }
      },
      {
        'reportNumber': 180,
        'sampleNumber': 9,
        'sample': {
          'speed': 18.600000381469727,
          'longitude': 35.19850158691406,
          'latitude': 31.792682647705078,
          'accelAvgX': 0.7952048182487488,
          'accelAvgY': 9.237776756286621,
          'accelAvgZ': 1.2392244338989258,
          'accelPeakX': 6.2908477783203125,
          'accelPeakY': 23.341644287109375,
          'accelPeakZ': -1.3945159912109375,
          'time': '2018-05-14T09:44:56.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 0,
        'sample': {
          'speed': 18.229999542236328,
          'longitude': 35.19853210449219,
          'latitude': 31.791881561279297,
          'accelAvgX': 0.9760816097259521,
          'accelAvgY': 9.614594459533691,
          'accelAvgZ': 0.7674430012702942,
          'accelPeakX': 15.926910400390625,
          'accelPeakY': 12.824508666992188,
          'accelPeakZ': 0.4604034423828125,
          'time': '2018-05-14T09:45:02.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 1,
        'sample': {
          'speed': 14.449999809265137,
          'longitude': 35.19853973388672,
          'latitude': 31.791147232055664,
          'accelAvgX': 0.8049535751342773,
          'accelAvgY': 9.512835502624512,
          'accelAvgZ': 1.2214176654815674,
          'accelPeakX': 3.714080810546875,
          'accelPeakY': 12.136764526367188,
          'accelPeakZ': 2.3218841552734375,
          'time': '2018-05-14T09:45:07.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 2,
        'sample': {
          'speed': 12.170000076293945,
          'longitude': 35.198665618896484,
          'latitude': 31.790565490722656,
          'accelAvgX': 0.42543482780456543,
          'accelAvgY': 9.21527099609375,
          'accelAvgZ': 1.360474705696106,
          'accelPeakX': 2.8892822265625,
          'accelPeakY': 11.613632202148438,
          'accelPeakZ': 1.8580169677734375,
          'time': '2018-05-14T09:45:12.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 3,
        'sample': {
          'speed': 12.119999885559082,
          'longitude': 35.198699951171875,
          'latitude': 31.79046058654785,
          'accelAvgX': 1.269636631011963,
          'accelAvgY': 9.419317245483398,
          'accelAvgZ': 1.702819585800171,
          'accelPeakX': 2.089019775390625,
          'accelPeakY': 14.230499267578125,
          'accelPeakZ': 1.0410003662109375,
          'time': '2018-05-14T09:45:17.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 4,
        'sample': {
          'speed': 12.119999885559082,
          'longitude': 35.198699951171875,
          'latitude': 31.79046058654785,
          'accelAvgX': 0.2977953553199768,
          'accelAvgY': 9.24892807006836,
          'accelAvgZ': 1.5870063304901123,
          'accelPeakX': -6.84075927734375,
          'accelPeakY': 11.793212890625,
          'accelPeakZ': 1.5695037841796875,
          'time': '2018-05-14T09:45:22.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 5,
        'sample': {
          'speed': 12.119999885559082,
          'longitude': 35.198699951171875,
          'latitude': 31.79046058654785,
          'accelAvgX': 0.6936528086662292,
          'accelAvgY': 9.17013168334961,
          'accelAvgZ': 1.8264446258544922,
          'accelPeakX': -9.743133544921875,
          'accelPeakY': 12.111038208007812,
          'accelPeakZ': 0.7728424072265625,
          'time': '2018-05-14T09:45:27.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 6,
        'sample': {
          'speed': 12.119999885559082,
          'longitude': 35.198699951171875,
          'latitude': 31.79046058654785,
          'accelAvgX': 1.0744489431381226,
          'accelAvgY': 9.1257963180542,
          'accelAvgZ': 2.2398810386657715,
          'accelPeakX': -0.923492431640625,
          'accelPeakY': 11.921295166015625,
          'accelPeakZ': 0.7734375,
          'time': '2018-05-14T09:45:32.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 7,
        'sample': {
          'speed': 12.119999885559082,
          'longitude': 35.198699951171875,
          'latitude': 31.79046058654785,
          'accelAvgX': 1.0341224670410156,
          'accelAvgY': 9.117185592651367,
          'accelAvgZ': 1.9350956678390503,
          'accelPeakX': -2.3821563720703125,
          'accelPeakY': 12.741302490234375,
          'accelPeakZ': 1.443817138671875,
          'time': '2018-05-14T09:45:37.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 8,
        'sample': {
          'speed': 12.119999885559082,
          'longitude': 35.198699951171875,
          'latitude': 31.79046058654785,
          'accelAvgX': 0.40976953506469727,
          'accelAvgY': 9.856291770935059,
          'accelAvgZ': 0.6010611653327942,
          'accelPeakX': -0.3925628662109375,
          'accelPeakY': 12.7891845703125,
          'accelPeakZ': -0.0214385986328125,
          'time': '2018-05-14T09:45:42.000Z'
        }
      },
      {
        'reportNumber': 181,
        'sampleNumber': 9,
        'sample': {
          'speed': 12.119999885559082,
          'longitude': 35.198699951171875,
          'latitude': 31.79046058654785,
          'accelAvgX': 1.4844999313354492,
          'accelAvgY': 9.368412017822266,
          'accelAvgZ': 2.2701196670532227,
          'accelPeakX': 4.5017852783203125,
          'accelPeakY': 10.775070190429688,
          'accelPeakZ': 2.5792694091796875,
          'time': '2018-05-14T09:45:47.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 0,
        'sample': {
          'speed': 12.119999885559082,
          'longitude': 35.198699951171875,
          'latitude': 31.79046058654785,
          'accelAvgX': 0.8642786145210266,
          'accelAvgY': 9.461202621459961,
          'accelAvgZ': 1.349649429321289,
          'accelPeakX': 2.0866241455078125,
          'accelPeakY': 12.273849487304688,
          'accelPeakZ': 1.0840911865234375,
          'time': '2018-05-14T09:45:51.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 1,
        'sample': {
          'speed': 7.920000076293945,
          'longitude': 35.19921112060547,
          'latitude': 31.785587310791016,
          'accelAvgX': 0.40107643604278564,
          'accelAvgY': 8.981114387512207,
          'accelAvgZ': 2.387937545776367,
          'accelPeakX': -1.7602691650390625,
          'accelPeakY': 12.422882080078125,
          'accelPeakZ': 2.031585693359375,
          'time': '2018-05-14T09:45:56.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 2,
        'sample': {
          'speed': 3.630000114440918,
          'longitude': 35.19917678833008,
          'latitude': 31.785348892211914,
          'accelAvgX': 1.2906463146209717,
          'accelAvgY': 8.70173454284668,
          'accelAvgZ': 3.9794628620147705,
          'accelPeakX': 4.04388427734375,
          'accelPeakY': 11.52685546875,
          'accelPeakZ': 3.6626434326171875,
          'time': '2018-05-14T09:46:01.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 3,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785329818725586,
          'accelAvgX': 0.5377510786056519,
          'accelAvgY': 9.341974258422852,
          'accelAvgZ': 1.7401487827301025,
          'accelPeakX': 1.30133056640625,
          'accelPeakY': 9.353515625,
          'accelPeakZ': 3.60040283203125,
          'time': '2018-05-14T09:46:06.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 4,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785327911376953,
          'accelAvgX': 0.5286501049995422,
          'accelAvgY': 9.296751022338867,
          'accelAvgZ': 1.725590705871582,
          'accelPeakX': 0.448394775390625,
          'accelPeakY': 9.824569702148438,
          'accelPeakZ': 1.6910247802734375,
          'time': '2018-05-14T09:46:11.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 5,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785327911376953,
          'accelAvgX': 0.5552068948745728,
          'accelAvgY': 9.36659049987793,
          'accelAvgZ': 1.7241114377975464,
          'accelPeakX': 0.6088104248046875,
          'accelPeakY': 9.655776977539062,
          'accelPeakZ': 1.7574615478515625,
          'time': '2018-05-14T09:46:16.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 6,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785327911376953,
          'accelAvgX': 0.5281588435173035,
          'accelAvgY': 9.300275802612305,
          'accelAvgZ': 1.7268915176391602,
          'accelPeakX': 0.621978759765625,
          'accelPeakY': 9.72161865234375,
          'accelPeakZ': 1.8502349853515625,
          'time': '2018-05-14T09:46:21.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 7,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785327911376953,
          'accelAvgX': 0.5048038959503174,
          'accelAvgY': 9.298872947692871,
          'accelAvgZ': 1.728061318397522,
          'accelPeakX': 0.5483551025390625,
          'accelPeakY': 9.869461059570312,
          'accelPeakZ': 1.7945709228515625,
          'time': '2018-05-14T09:46:26.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 8,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785327911376953,
          'accelAvgX': 0.554069459438324,
          'accelAvgY': 9.316107749938965,
          'accelAvgZ': 1.7437443733215332,
          'accelPeakX': 0.7141571044921875,
          'accelPeakY': 9.7371826171875,
          'accelPeakZ': 1.7215423583984375,
          'time': '2018-05-14T09:46:31.000Z'
        }
      },
      {
        'reportNumber': 182,
        'sampleNumber': 9,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785327911376953,
          'accelAvgX': 0.5225391387939453,
          'accelAvgY': 9.347801208496094,
          'accelAvgZ': 1.7366676330566406,
          'accelPeakX': 0.5303955078125,
          'accelPeakY': 9.786270141601562,
          'accelPeakZ': 1.7790069580078125,
          'time': '2018-05-14T09:46:36.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 0,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785327911376953,
          'accelAvgX': 0.5451375246047974,
          'accelAvgY': 9.32718563079834,
          'accelAvgZ': 1.7320504188537598,
          'accelPeakX': 0.53338623046875,
          'accelPeakY': 9.800033569335938,
          'accelPeakZ': 1.7700347900390625,
          'time': '2018-05-14T09:46:42.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 1,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785327911376953,
          'accelAvgX': 0.5279484987258911,
          'accelAvgY': 9.316266059875488,
          'accelAvgZ': 1.7211570739746094,
          'accelPeakX': 0.702178955078125,
          'accelPeakY': 9.720428466796875,
          'accelPeakZ': 1.7604522705078125,
          'time': '2018-05-14T09:46:47.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 2,
        'sample': {
          'speed': 0,
          'longitude': 35.19918441772461,
          'latitude': 31.785327911376953,
          'accelAvgX': 0.5506987571716309,
          'accelAvgY': 9.295846939086914,
          'accelAvgZ': 1.7375011444091797,
          'accelPeakX': 0.5118408203125,
          'accelPeakY': 9.725814819335938,
          'accelPeakZ': 1.8053436279296875,
          'time': '2018-05-14T09:46:52.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 3,
        'sample': {
          'speed': 6.96999979019165,
          'longitude': 35.19919204711914,
          'latitude': 31.785221099853516,
          'accelAvgX': -0.12776708602905273,
          'accelAvgY': 8.937179565429688,
          'accelAvgZ': 2.6436500549316406,
          'accelPeakX': 0.0850677490234375,
          'accelPeakY': 14.022201538085938,
          'accelPeakZ': 1.725128173828125,
          'time': '2018-05-14T09:46:57.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 4,
        'sample': {
          'speed': 9.970000267028809,
          'longitude': 35.19934844970703,
          'latitude': 31.78485679626465,
          'accelAvgX': -1.3094463348388672,
          'accelAvgY': 9.844554901123047,
          'accelAvgZ': 1.5154647827148438,
          'accelPeakX': -0.0394287109375,
          'accelPeakY': 13.772613525390625,
          'accelPeakZ': 1.08349609375,
          'time': '2018-05-14T09:47:02.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 5,
        'sample': {
          'speed': 10.210000038146973,
          'longitude': 35.19977569580078,
          'latitude': 31.784509658813477,
          'accelAvgX': 1.0611283779144287,
          'accelAvgY': 9.494858741760254,
          'accelAvgZ': 2.037160634994507,
          'accelPeakX': -1.452606201171875,
          'accelPeakY': 18.030105590820312,
          'accelPeakZ': 1.943603515625,
          'time': '2018-05-14T09:47:07.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 6,
        'sample': {
          'speed': 5.050000190734863,
          'longitude': 35.2000846862793,
          'latitude': 31.784290313720703,
          'accelAvgX': 0.7619848251342773,
          'accelAvgY': 9.129176139831543,
          'accelAvgZ': 1.9494130611419678,
          'accelPeakX': 1.43780517578125,
          'accelPeakY': 12.0469970703125,
          'accelPeakZ': 1.9178619384765625,
          'time': '2018-05-14T09:47:12.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 7,
        'sample': {
          'speed': 0.1599999964237213,
          'longitude': 35.20017623901367,
          'latitude': 31.784231185913086,
          'accelAvgX': 0.6160132884979248,
          'accelAvgY': 9.253854751586914,
          'accelAvgZ': 2.0015041828155518,
          'accelPeakX': 0.5465545654296875,
          'accelPeakY': 10.809188842773438,
          'accelPeakZ': 1.440826416015625,
          'time': '2018-05-14T09:47:17.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 8,
        'sample': {
          'speed': 0,
          'longitude': 35.200172424316406,
          'latitude': 31.784229278564453,
          'accelAvgX': 0.42239731550216675,
          'accelAvgY': 9.35811710357666,
          'accelAvgZ': 1.4775283336639404,
          'accelPeakX': 0.41546630859375,
          'accelPeakY': 9.88861083984375,
          'accelPeakZ': 1.4318389892578125,
          'time': '2018-05-14T09:47:22.000Z'
        }
      },
      {
        'reportNumber': 183,
        'sampleNumber': 9,
        'sample': {
          'speed': 0,
          'longitude': 35.200172424316406,
          'latitude': 31.78422737121582,
          'accelAvgX': 0.4133213758468628,
          'accelAvgY': 9.358823776245117,
          'accelAvgZ': 1.482542634010315,
          'accelPeakX': 0.4202728271484375,
          'accelPeakY': 9.95086669921875,
          'accelPeakZ': 1.51025390625,
          'time': '2018-05-14T09:47:27.000Z'
        }
      },
      {
        'reportNumber': 184,
        'sampleNumber': 0,
        'sample': {
          'speed': 0.3499999940395355,
          'longitude': 35.20017623901367,
          'latitude': 31.784225463867188,
          'accelAvgX': -0.5374882817268372,
          'accelAvgY': 10.108135223388672,
          'accelAvgZ': -1.1372853517532349,
          'accelPeakX': -0.8594512939453125,
          'accelPeakY': 10.361465454101562,
          'accelPeakZ': -1.2712249755859375,
          'time': '2018-05-14T09:47:33.000Z'
        }
      },
      {
        'reportNumber': 184,
        'sampleNumber': 1,
        'sample': {
          'speed': 9.9399995803833,
          'longitude': 35.200439453125,
          'latitude': 31.784019470214844,
          'accelAvgX': -0.2269219607114792,
          'accelAvgY': 9.264643669128418,
          'accelAvgZ': -0.2617863416671753,
          'accelPeakX': 0.9828948974609375,
          'accelPeakY': 11.961990356445312,
          'accelPeakZ': 2.22552490234375,
          'time': '2018-05-14T09:47:38.000Z'
        }
      },
      {
        'reportNumber': 184,
        'sampleNumber': 2,
        'sample': {
          'speed': 13.130000114440918,
          'longitude': 35.20093536376953,
          'latitude': 31.78362274169922,
          'accelAvgX': 0.08306577056646347,
          'accelAvgY': 9.455999374389648,
          'accelAvgZ': 0.7162641882896423,
          'accelPeakX': -5.9626922607421875,
          'accelPeakY': 12.27862548828125,
          'accelPeakZ': -0.74688720703125,
          'time': '2018-05-14T09:47:43.000Z'
        }
      },
      {
        'reportNumber': 185,
        'sampleNumber': 1,
        'sample': {
          'speed': 0,
          'longitude': 35.204750061035156,
          'latitude': 31.782123565673828,
          'accelAvgX': 1.070672631263733,
          'accelAvgY': 9.095230102539062,
          'accelAvgZ': 2.3770885467529297,
          'accelPeakX': 1.674224853515625,
          'accelPeakY': 9.291259765625,
          'accelPeakZ': 3.6524658203125,
          'time': '2018-05-14T09:48:31.000Z'
        }
      },
      {
        'reportNumber': 185,
        'sampleNumber': 2,
        'sample': {
          'speed': 0,
          'longitude': 35.204750061035156,
          'latitude': 31.782123565673828,
          'accelAvgX': 1.04767644405365,
          'accelAvgY': 9.099563598632812,
          'accelAvgZ': 2.362356662750244,
          'accelPeakX': 1.1049957275390625,
          'accelPeakY': 9.5145263671875,
          'accelPeakZ': 2.4751129150390625,
          'time': '2018-05-14T09:48:36.000Z'
        }
      },
      {
        'reportNumber': 185,
        'sampleNumber': 3,
        'sample': {
          'speed': 0,
          'longitude': 35.20475387573242,
          'latitude': 31.782123565673828,
          'accelAvgX': 1.037925362586975,
          'accelAvgY': 9.109127044677734,
          'accelAvgZ': 2.344691753387451,
          'accelPeakX': 1.0385589599609375,
          'accelPeakY': 9.563003540039062,
          'accelPeakZ': 2.4906768798828125,
          'time': '2018-05-14T09:48:41.000Z'
        }
      },
      {
        'reportNumber': 185,
        'sampleNumber': 4,
        'sample': {
          'speed': 0,
          'longitude': 35.20475387573242,
          'latitude': 31.782121658325195,
          'accelAvgX': 0.9109805822372437,
          'accelAvgY': 9.193940162658691,
          'accelAvgZ': 1.9814233779907227,
          'accelPeakX': 0.8961181640625,
          'accelPeakY': 9.8544921875,
          'accelPeakZ': 2.062713623046875,
          'time': '2018-05-14T09:48:46.000Z'
        }
      },
      {
        'reportNumber': 185,
        'sampleNumber': 5,
        'sample': {
          'speed': 11.239999771118164,
          'longitude': 35.20502471923828,
          'latitude': 31.782224655151367,
          'accelAvgX': -0.0825752317905426,
          'accelAvgY': 9.870338439941406,
          'accelAvgZ': -0.3872339129447937,
          'accelPeakX': 4.6729583740234375,
          'accelPeakY': 11.958404541015625,
          'accelPeakZ': 0.70819091796875,
          'time': '2018-05-14T09:48:51.000Z'
        }
      },
      {
        'reportNumber': 185,
        'sampleNumber': 6,
        'sample': {
          'speed': 16.09000015258789,
          'longitude': 35.20576095581055,
          'latitude': 31.78249168395996,
          'accelAvgX': 0.7248001098632812,
          'accelAvgY': 9.491338729858398,
          'accelAvgZ': 2.6653521060943604,
          'accelPeakX': 3.1861572265625,
          'accelPeakY': 15.874130249023438,
          'accelPeakZ': 1.062530517578125,
          'time': '2018-05-14T09:48:56.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 0,
        'sample': {
          'speed': 15.100000381469727,
          'longitude': 35.2065315246582,
          'latitude': 31.78274154663086,
          'accelAvgX': 1.3106030225753784,
          'accelAvgY': 9.377243041992188,
          'accelAvgZ': 1.6146070957183838,
          'accelPeakX': 5.1374359130859375,
          'accelPeakY': 15.48565673828125,
          'accelPeakZ': 0.601654052734375,
          'time': '2018-05-14T09:49:01.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 1,
        'sample': {
          'speed': 14.649999618530273,
          'longitude': 35.207332611083984,
          'latitude': 31.782909393310547,
          'accelAvgX': 1.0820910930633545,
          'accelAvgY': 8.785307884216309,
          'accelAvgZ': 3.9206972122192383,
          'accelPeakX': -2.04217529296875,
          'accelPeakY': 15.011611938476562,
          'accelPeakZ': 0.505889892578125,
          'time': '2018-05-14T09:49:06.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 2,
        'sample': {
          'speed': 8.130000114440918,
          'longitude': 35.207923889160156,
          'latitude': 31.78289031982422,
          'accelAvgX': 1.2798480987548828,
          'accelAvgY': 9.411489486694336,
          'accelAvgZ': 3.176734685897827,
          'accelPeakX': 2.0112152099609375,
          'accelPeakY': 16.052490234375,
          'accelPeakZ': -0.0537567138671875,
          'time': '2018-05-14T09:49:11.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 3,
        'sample': {
          'speed': 2.7100000381469727,
          'longitude': 35.2081413269043,
          'latitude': 31.782835006713867,
          'accelAvgX': 0.6070202589035034,
          'accelAvgY': 9.332075119018555,
          'accelAvgZ': 1.7922443151474,
          'accelPeakX': 5.103912353515625,
          'accelPeakY': 10.506332397460938,
          'accelPeakZ': 4.793304443359375,
          'time': '2018-05-14T09:49:16.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 4,
        'sample': {
          'speed': 6.380000114440918,
          'longitude': 35.20829772949219,
          'latitude': 31.782726287841797,
          'accelAvgX': 1.3686598539352417,
          'accelAvgY': 9.065900802612305,
          'accelAvgZ': 1.5739765167236328,
          'accelPeakX': 1.447967529296875,
          'accelPeakY': 13.540374755859375,
          'accelPeakZ': -0.853424072265625,
          'time': '2018-05-14T09:49:21.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 5,
        'sample': {
          'speed': 14.789999961853027,
          'longitude': 35.208412170410156,
          'latitude': 31.782312393188477,
          'accelAvgX': -0.029702797532081604,
          'accelAvgY': 9.827827453613281,
          'accelAvgZ': 1.481628656387329,
          'accelPeakX': 3.414215087890625,
          'accelPeakY': 13.8109130859375,
          'accelPeakZ': -0.7690277099609375,
          'time': '2018-05-14T09:49:26.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 6,
        'sample': {
          'speed': 17.489999771118164,
          'longitude': 35.2085075378418,
          'latitude': 31.781553268432617,
          'accelAvgX': 1.09855055809021,
          'accelAvgY': 9.057516098022461,
          'accelAvgZ': 2.990983486175537,
          'accelPeakX': 4.6795501708984375,
          'accelPeakY': 14.42083740234375,
          'accelPeakZ': -0.1728668212890625,
          'time': '2018-05-14T09:49:31.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 7,
        'sample': {
          'speed': 14.25,
          'longitude': 35.208641052246094,
          'latitude': 31.780902862548828,
          'accelAvgX': 1.8045573234558105,
          'accelAvgY': 9.591988563537598,
          'accelAvgZ': 1.4040358066558838,
          'accelPeakX': 7.459808349609375,
          'accelPeakY': 13.014251708984375,
          'accelPeakZ': 0.40234375,
          'time': '2018-05-14T09:49:36.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 8,
        'sample': {
          'speed': 13.899999618530273,
          'longitude': 35.20876693725586,
          'latitude': 31.78026008605957,
          'accelAvgX': 0.9361723065376282,
          'accelAvgY': 8.953791618347168,
          'accelAvgZ': 2.411249876022339,
          'accelPeakX': 4.583770751953125,
          'accelPeakY': 12.788589477539062,
          'accelPeakZ': 1.7149505615234375,
          'time': '2018-05-14T09:49:41.000Z'
        }
      },
      {
        'reportNumber': 186,
        'sampleNumber': 9,
        'sample': {
          'speed': 14.649999618530273,
          'longitude': 35.208858489990234,
          'latitude': 31.779645919799805,
          'accelAvgX': -0.797529399394989,
          'accelAvgY': 9.641332626342773,
          'accelAvgZ': 1.5527622699737549,
          'accelPeakX': 6.806793212890625,
          'accelPeakY': 13.602035522460938,
          'accelPeakZ': 2.1195831298828125,
          'time': '2018-05-14T09:49:46.000Z'
        }
      },
      {
        'reportNumber': 187,
        'sampleNumber': 0,
        'sample': {
          'speed': 14.15999984741211,
          'longitude': 35.208961486816406,
          'latitude': 31.77897071838379,
          'accelAvgX': 0.3696950078010559,
          'accelAvgY': 9.995405197143555,
          'accelAvgZ': 0.9764353036880493,
          'accelPeakX': 5.0745849609375,
          'accelPeakY': 11.695648193359375,
          'accelPeakZ': 2.2769927978515625,
          'time': '2018-05-14T09:49:54.000Z'
        }
      },
      {
        'reportNumber': 187,
        'sampleNumber': 1,
        'sample': {
          'speed': 13.100000381469727,
          'longitude': 35.20906066894531,
          'latitude': 31.77829360961914,
          'accelAvgX': 0.964137613773346,
          'accelAvgY': 9.070649147033691,
          'accelAvgZ': 2.629861354827881,
          'accelPeakX': 4.44970703125,
          'accelPeakY': 11.635787963867188,
          'accelPeakZ': 3.01141357421875,
          'time': '2018-05-14T09:49:59.000Z'
        }
      },
      {
        'reportNumber': 187,
        'sampleNumber': 2,
        'sample': {
          'speed': 10.800000190734863,
          'longitude': 35.20909881591797,
          'latitude': 31.777780532836914,
          'accelAvgX': 0.2750137448310852,
          'accelAvgY': 9.125532150268555,
          'accelAvgZ': 2.5323705673217773,
          'accelPeakX': 0.3202972412109375,
          'accelPeakY': 12.89813232421875,
          'accelPeakZ': 2.332672119140625,
          'time': '2018-05-14T09:50:04.000Z'
        }
      },
      {
        'reportNumber': 187,
        'sampleNumber': 3,
        'sample': {
          'speed': 10.09000015258789,
          'longitude': 35.20909881591797,
          'latitude': 31.777305603027344,
          'accelAvgX': 0.2836413085460663,
          'accelAvgY': 8.899325370788574,
          'accelAvgZ': 2.2776570320129395,
          'accelPeakX': 6.5368499755859375,
          'accelPeakY': 12.063751220703125,
          'accelPeakZ': 2.1668701171875,
          'time': '2018-05-14T09:50:09.000Z'
        }
      },
      {
        'reportNumber': 187,
        'sampleNumber': 4,
        'sample': {
          'speed': 7.650000095367432,
          'longitude': 35.20907211303711,
          'latitude': 31.77689552307129,
          'accelAvgX': 1.219164252281189,
          'accelAvgY': 8.761988639831543,
          'accelAvgZ': 3.7687301635742188,
          'accelPeakX': 3.386077880859375,
          'accelPeakY': 13.152511596679688,
          'accelPeakZ': 1.6856231689453125,
          'time': '2018-05-14T09:50:14.000Z'
        }
      },
      {
        'reportNumber': 188,
        'sampleNumber': 0,
        'sample': {
          'speed': 0.6000000238418579,
          'longitude': 35.20905303955078,
          'latitude': 31.776674270629883,
          'accelAvgX': 0.8205035328865051,
          'accelAvgY': 9.041662216186523,
          'accelAvgZ': 2.5033748149871826,
          'accelPeakX': 0.6441192626953125,
          'accelPeakY': 10.108291625976562,
          'accelPeakZ': 3.81707763671875,
          'time': '2018-05-14T09:50:58.000Z'
        }
      },
      {
        'reportNumber': 189,
        'sampleNumber': 0,
        'sample': {
          'speed': 16.829999923706055,
          'longitude': 35.20894241333008,
          'latitude': 31.77438735961914,
          'accelAvgX': 0.5192428231239319,
          'accelAvgY': 9.207708358764648,
          'accelAvgZ': 2.1901743412017822,
          'accelPeakX': 0.4468994140625,
          'accelPeakY': 9.262176513671875,
          'accelPeakZ': 2.10723876953125,
          'time': '2018-05-14T09:51:26.000Z'
        }
      },
      {
        'reportNumber': 189,
        'sampleNumber': 1,
        'sample': {
          'speed': 15.319999694824219,
          'longitude': 35.208885192871094,
          'latitude': 31.773672103881836,
          'accelAvgX': 0.48959439992904663,
          'accelAvgY': 9.277071952819824,
          'accelAvgZ': 2.167696475982666,
          'accelPeakX': -0.1192169189453125,
          'accelPeakY': 9.776321411132812,
          'accelPeakZ': 2.5063018798828125,
          'time': '2018-05-14T09:51:31.000Z'
        }
      },
      {
        'reportNumber': 189,
        'sampleNumber': 2,
        'sample': {
          'speed': 13.859999656677246,
          'longitude': 35.208839416503906,
          'latitude': 31.773008346557617,
          'accelAvgX': 0.5794020891189575,
          'accelAvgY': 9.146294593811035,
          'accelAvgZ': 2.4503605365753174,
          'accelPeakX': 0.652008056640625,
          'accelPeakY': 9.940994262695312,
          'accelPeakZ': 2.552276611328125,
          'time': '2018-05-14T09:51:36.000Z'
        }
      },
      {
        'reportNumber': 189,
        'sampleNumber': 3,
        'sample': {
          'speed': 13.300000190734863,
          'longitude': 35.20878601074219,
          'latitude': 31.772401809692383,
          'accelAvgX': 0.38206785917282104,
          'accelAvgY': 9.13032341003418,
          'accelAvgZ': 2.1271865367889404,
          'accelPeakX': 0.2599029541015625,
          'accelPeakY': 10.230026245117188,
          'accelPeakZ': 2.78594970703125,
          'time': '2018-05-14T09:51:41.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 0,
        'sample': {
          'speed': 12.619999885559082,
          'longitude': 35.20876693725586,
          'latitude': 31.771833419799805,
          'accelAvgX': 0.20072153210639954,
          'accelAvgY': 9.234312057495117,
          'accelAvgZ': 2.1619391441345215,
          'accelPeakX': 0.1331329345703125,
          'accelPeakY': 9.641647338867188,
          'accelPeakZ': 2.2630462646484375,
          'time': '2018-05-14T09:51:47.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 1,
        'sample': {
          'speed': 11.699999809265137,
          'longitude': 35.208797454833984,
          'latitude': 31.77128791809082,
          'accelAvgX': 0.3204699456691742,
          'accelAvgY': 9.14802074432373,
          'accelAvgZ': 2.5882608890533447,
          'accelPeakX': 0.5000457763671875,
          'accelPeakY': 9.30096435546875,
          'accelPeakZ': 2.56866455078125,
          'time': '2018-05-14T09:51:52.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 2,
        'sample': {
          'speed': 10.8100004196167,
          'longitude': 35.20884323120117,
          'latitude': 31.770811080932617,
          'accelAvgX': 0.41248559951782227,
          'accelAvgY': 9.226506233215332,
          'accelAvgZ': 1.8476812839508057,
          'accelPeakX': 1.1071624755859375,
          'accelPeakY': 8.874496459960938,
          'accelPeakZ': 4.4330291748046875,
          'time': '2018-05-14T09:51:57.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 3,
        'sample': {
          'speed': 11.029999732971191,
          'longitude': 35.20888137817383,
          'latitude': 31.770305633544922,
          'accelAvgX': 0.6946409940719604,
          'accelAvgY': 9.12483024597168,
          'accelAvgZ': 2.6714377403259277,
          'accelPeakX': 0.7707061767578125,
          'accelPeakY': 9.351242065429688,
          'accelPeakZ': 2.5263519287109375,
          'time': '2018-05-14T09:52:02.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 4,
        'sample': {
          'speed': 7.150000095367432,
          'longitude': 35.208900451660156,
          'latitude': 31.76987648010254,
          'accelAvgX': 2.1569712162017822,
          'accelAvgY': 8.939592361450195,
          'accelAvgZ': 2.687596082687378,
          'accelPeakX': 2.178558349609375,
          'accelPeakY': 8.987014770507812,
          'accelPeakZ': 3.4270477294921875,
          'time': '2018-05-14T09:52:07.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 5,
        'sample': {
          'speed': 1.9700000286102295,
          'longitude': 35.208763122558594,
          'latitude': 31.769733428955078,
          'accelAvgX': 1.5839741230010986,
          'accelAvgY': 8.853662490844727,
          'accelAvgZ': 3.165632724761963,
          'accelPeakX': 2.08392333984375,
          'accelPeakY': 9.030776977539062,
          'accelPeakZ': 3.5337677001953125,
          'time': '2018-05-14T09:52:12.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 6,
        'sample': {
          'speed': 10.220000267028809,
          'longitude': 35.20854568481445,
          'latitude': 31.76968002319336,
          'accelAvgX': 0.6786075830459595,
          'accelAvgY': 9.611457824707031,
          'accelAvgZ': 0.2983357310295105,
          'accelPeakX': -0.2552642822265625,
          'accelPeakY': 10.067947387695312,
          'accelPeakZ': -1.128936767578125,
          'time': '2018-05-14T09:52:17.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 7,
        'sample': {
          'speed': 16.920000076293945,
          'longitude': 35.207820892333984,
          'latitude': 31.769502639770508,
          'accelAvgX': 0.48285800218582153,
          'accelAvgY': 9.251179695129395,
          'accelAvgZ': 2.331529140472412,
          'accelPeakX': 0.054779052734375,
          'accelPeakY': 10.27862548828125,
          'accelPeakZ': 0.10491943359375,
          'time': '2018-05-14T09:52:22.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 8,
        'sample': {
          'speed': 17.760000228881836,
          'longitude': 35.2069206237793,
          'latitude': 31.769269943237305,
          'accelAvgX': 0.6720612049102783,
          'accelAvgY': 9.171977043151855,
          'accelAvgZ': 2.5120341777801514,
          'accelPeakX': 1.1083526611328125,
          'accelPeakY': 9.852218627929688,
          'accelPeakZ': 2.6735382080078125,
          'time': '2018-05-14T09:52:27.000Z'
        }
      },
      {
        'reportNumber': 190,
        'sampleNumber': 9,
        'sample': {
          'speed': 17.690000534057617,
          'longitude': 35.2060661315918,
          'latitude': 31.768957138061523,
          'accelAvgX': 0.6522581577301025,
          'accelAvgY': 9.215500831604004,
          'accelAvgZ': 2.376887798309326,
          'accelPeakX': -0.5109100341796875,
          'accelPeakY': 9.49871826171875,
          'accelPeakZ': 3.319976806640625,
          'time': '2018-05-14T09:52:32.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 0,
        'sample': {
          'speed': 15.779999732971191,
          'longitude': 35.20539093017578,
          'latitude': 31.768463134765625,
          'accelAvgX': 0.7346431612968445,
          'accelAvgY': 9.230720520019531,
          'accelAvgZ': 2.615410327911377,
          'accelPeakX': 0.3795623779296875,
          'accelPeakY': 9.534027099609375,
          'accelPeakZ': 2.6439666748046875,
          'time': '2018-05-14T09:52:37.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 1,
        'sample': {
          'speed': 11.539999961853027,
          'longitude': 35.204994201660156,
          'latitude': 31.767942428588867,
          'accelAvgX': 0.9187706112861633,
          'accelAvgY': 9.019389152526855,
          'accelAvgZ': 2.8005568981170654,
          'accelPeakX': 0.3779449462890625,
          'accelPeakY': 9.469039916992188,
          'accelPeakZ': 3.1565704345703125,
          'time': '2018-05-14T09:52:42.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 2,
        'sample': {
          'speed': 9.890000343322754,
          'longitude': 35.2047233581543,
          'latitude': 31.767526626586914,
          'accelAvgX': 0.036118701100349426,
          'accelAvgY': 8.903512954711914,
          'accelAvgZ': 3.0179247856140137,
          'accelPeakX': 1.5868988037109375,
          'accelPeakY': 9.620468139648438,
          'accelPeakZ': 2.5741729736328125,
          'time': '2018-05-14T09:52:47.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 3,
        'sample': {
          'speed': 5.260000228881836,
          'longitude': 35.20457077026367,
          'latitude': 31.767213821411133,
          'accelAvgX': 1.39682936668396,
          'accelAvgY': 9.017038345336914,
          'accelAvgZ': 2.831127166748047,
          'accelPeakX': 0.7705230712890625,
          'accelPeakY': 9.505722045898438,
          'accelPeakZ': 3.7784576416015625,
          'time': '2018-05-14T09:52:52.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 4,
        'sample': {
          'speed': 9.829999923706055,
          'longitude': 35.20423889160156,
          'latitude': 31.767105102539062,
          'accelAvgX': 1.1533176898956299,
          'accelAvgY': 9.298868179321289,
          'accelAvgZ': 1.494166612625122,
          'accelPeakX': 1.3043212890625,
          'accelPeakY': 10.100143432617188,
          'accelPeakZ': 0.8140106201171875,
          'time': '2018-05-14T09:52:57.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 5,
        'sample': {
          'speed': 6.769999980926514,
          'longitude': 35.20378494262695,
          'latitude': 31.767093658447266,
          'accelAvgX': 1.2544289827346802,
          'accelAvgY': 8.942015647888184,
          'accelAvgZ': 3.267284870147705,
          'accelPeakX': 1.2783355712890625,
          'accelPeakY': 8.914886474609375,
          'accelPeakZ': 3.6020660400390625,
          'time': '2018-05-14T09:53:02.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 6,
        'sample': {
          'speed': 0.5899999737739563,
          'longitude': 35.2036247253418,
          'latitude': 31.767099380493164,
          'accelAvgX': 0.8476653695106506,
          'accelAvgY': 9.071821212768555,
          'accelAvgZ': 2.6682963371276855,
          'accelPeakX': 1.3451385498046875,
          'accelPeakY': 8.854019165039062,
          'accelPeakZ': 3.5493927001953125,
          'time': '2018-05-14T09:53:07.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 7,
        'sample': {
          'speed': 0,
          'longitude': 35.203617095947266,
          'latitude': 31.7670955657959,
          'accelAvgX': 0.5961622595787048,
          'accelAvgY': 9.262615203857422,
          'accelAvgZ': 1.956209421157837,
          'accelPeakX': 0.562835693359375,
          'accelPeakY': 9.307601928710938,
          'accelPeakZ': 1.8690185546875,
          'time': '2018-05-14T09:53:12.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 8,
        'sample': {
          'speed': 0,
          'longitude': 35.203617095947266,
          'latitude': 31.76709747314453,
          'accelAvgX': 0.59187912940979,
          'accelAvgY': 9.271284103393555,
          'accelAvgZ': 1.9593368768692017,
          'accelPeakX': 0.6038360595703125,
          'accelPeakY': 9.2947998046875,
          'accelPeakZ': 1.95916748046875,
          'time': '2018-05-14T09:53:17.000Z'
        }
      },
      {
        'reportNumber': 191,
        'sampleNumber': 9,
        'sample': {
          'speed': 0,
          'longitude': 35.203609466552734,
          'latitude': 31.767099380493164,
          'accelAvgX': 0.5961084365844727,
          'accelAvgY': 9.264091491699219,
          'accelAvgZ': 1.956819772720337,
          'accelPeakX': 0.587921142578125,
          'accelPeakY': 9.290847778320312,
          'accelPeakZ': 1.963775634765625,
          'time': '2018-05-14T09:53:22.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 0,
        'sample': {
          'speed': 6.119999885559082,
          'longitude': 35.203514099121094,
          'latitude': 31.767108917236328,
          'accelAvgX': 0.24011121690273285,
          'accelAvgY': 9.638341903686523,
          'accelAvgZ': 0.5949723720550537,
          'accelPeakX': -0.3765869140625,
          'accelPeakY': 10.004547119140625,
          'accelPeakZ': -0.8664093017578125,
          'time': '2018-05-14T09:53:27.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 1,
        'sample': {
          'speed': 6.849999904632568,
          'longitude': 35.20316696166992,
          'latitude': 31.767122268676758,
          'accelAvgX': -0.2075476050376892,
          'accelAvgY': 9.276384353637695,
          'accelAvgZ': 2.5893640518188477,
          'accelPeakX': -0.559814453125,
          'accelPeakY': 9.666366577148438,
          'accelPeakZ': 1.916839599609375,
          'time': '2018-05-14T09:53:32.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 2,
        'sample': {
          'speed': 8.630000114440918,
          'longitude': 35.202880859375,
          'latitude': 31.76689910888672,
          'accelAvgX': 1.3720160722732544,
          'accelAvgY': 8.982856750488281,
          'accelAvgZ': 2.774416208267212,
          'accelPeakX': 1.88031005859375,
          'accelPeakY': 9.342025756835938,
          'accelPeakZ': 2.9209136962890625,
          'time': '2018-05-14T09:53:37.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 3,
        'sample': {
          'speed': 7.269999980926514,
          'longitude': 35.20262908935547,
          'latitude': 31.7666072845459,
          'accelAvgX': 1.3246830701828003,
          'accelAvgY': 8.712783813476562,
          'accelAvgZ': 3.6531894207000732,
          'accelPeakX': 1.60736083984375,
          'accelPeakY': 8.637771606445312,
          'accelPeakZ': 4.2523345947265625,
          'time': '2018-05-14T09:53:42.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 4,
        'sample': {
          'speed': 8.770000457763672,
          'longitude': 35.20237731933594,
          'latitude': 31.766372680664062,
          'accelAvgX': 0.5711959004402161,
          'accelAvgY': 9.427385330200195,
          'accelAvgZ': 1.1501877307891846,
          'accelPeakX': 1.31048583984375,
          'accelPeakY': 9.537918090820312,
          'accelPeakZ': 2.0461273193359375,
          'time': '2018-05-14T09:53:47.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 5,
        'sample': {
          'speed': 8.420000076293945,
          'longitude': 35.201969146728516,
          'latitude': 31.7661075592041,
          'accelAvgX': 1.5973981618881226,
          'accelAvgY': 8.907605171203613,
          'accelAvgZ': 2.7617106437683105,
          'accelPeakX': 2.298095703125,
          'accelPeakY': 8.812713623046875,
          'accelPeakZ': 3.418792724609375,
          'time': '2018-05-14T09:53:52.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 6,
        'sample': {
          'speed': 9.149999618530273,
          'longitude': 35.20156478881836,
          'latitude': 31.765981674194336,
          'accelAvgX': 0.3354930281639099,
          'accelAvgY': 9.394553184509277,
          'accelAvgZ': 1.5831012725830078,
          'accelPeakX': 0.0759124755859375,
          'accelPeakY': 9.863479614257812,
          'accelPeakZ': 1.038116455078125,
          'time': '2018-05-14T09:53:57.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 7,
        'sample': {
          'speed': 9.649999618530273,
          'longitude': 35.2010498046875,
          'latitude': 31.765857696533203,
          'accelAvgX': 0.7215369939804077,
          'accelAvgY': 9.15067195892334,
          'accelAvgZ': 2.679535388946533,
          'accelPeakX': 0.9144744873046875,
          'accelPeakY': 9.707916259765625,
          'accelPeakZ': 2.449493408203125,
          'time': '2018-05-14T09:54:02.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 8,
        'sample': {
          'speed': 9.600000381469727,
          'longitude': 35.20054244995117,
          'latitude': 31.765750885009766,
          'accelAvgX': 0.8372632265090942,
          'accelAvgY': 9.2404146194458,
          'accelAvgZ': 2.135953187942505,
          'accelPeakX': 0.537628173828125,
          'accelPeakY': 10.038192749023438,
          'accelPeakZ': 1.572265625,
          'time': '2018-05-14T09:54:07.000Z'
        }
      },
      {
        'reportNumber': 192,
        'sampleNumber': 9,
        'sample': {
          'speed': 9.149999618530273,
          'longitude': 35.199989318847656,
          'latitude': 31.765687942504883,
          'accelAvgX': 0.4788602888584137,
          'accelAvgY': 9.430354118347168,
          'accelAvgZ': 1.3476462364196777,
          'accelPeakX': 0.7933349609375,
          'accelPeakY': 9.665298461914062,
          'accelPeakZ': 1.1778717041015625,
          'time': '2018-05-14T09:54:12.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 0,
        'sample': {
          'speed': 7.71999979019165,
          'longitude': 35.19973373413086,
          'latitude': 31.76567268371582,
          'accelAvgX': 0.6364458203315735,
          'accelAvgY': 9.331690788269043,
          'accelAvgZ': 1.897273063659668,
          'accelPeakX': 0.5977325439453125,
          'accelPeakY': 9.792373657226562,
          'accelPeakZ': 1.3650360107421875,
          'time': '2018-05-14T09:54:56.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 1,
        'sample': {
          'speed': 16.18000030517578,
          'longitude': 35.19584274291992,
          'latitude': 31.76861000061035,
          'accelAvgX': 1.21133553981781,
          'accelAvgY': 9.30509090423584,
          'accelAvgZ': 1.161200761795044,
          'accelPeakX': 0.9887542724609375,
          'accelPeakY': 9.979949951171875,
          'accelPeakZ': 0.3379364013671875,
          'time': '2018-05-14T09:55:01.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 2,
        'sample': {
          'speed': 10.529999732971191,
          'longitude': 35.19591522216797,
          'latitude': 31.76921272277832,
          'accelAvgX': 2.068507432937622,
          'accelAvgY': 9.10437297821045,
          'accelAvgZ': 1.6770484447479248,
          'accelPeakX': 0.9223175048828125,
          'accelPeakY': 9.5487060546875,
          'accelPeakZ': 2.127410888671875,
          'time': '2018-05-14T09:55:06.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 3,
        'sample': {
          'speed': 7.900000095367432,
          'longitude': 35.1959342956543,
          'latitude': 31.76958465576172,
          'accelAvgX': 1.1564682722091675,
          'accelAvgY': 9.42000675201416,
          'accelAvgZ': 0.8697696328163147,
          'accelPeakX': -3.059234619140625,
          'accelPeakY': 9.169219970703125,
          'accelPeakZ': 3.613677978515625,
          'time': '2018-05-14T09:55:11.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 4,
        'sample': {
          'speed': 0.7099999785423279,
          'longitude': 35.195919036865234,
          'latitude': 31.769792556762695,
          'accelAvgX': 0.34856700897216797,
          'accelAvgY': 9.375900268554688,
          'accelAvgZ': 1.504400372505188,
          'accelPeakX': 0.7355194091796875,
          'accelPeakY': 10.345672607421875,
          'accelPeakZ': 3.1086273193359375,
          'time': '2018-05-14T09:55:16.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 5,
        'sample': {
          'speed': 7.599999904632568,
          'longitude': 35.1959342956543,
          'latitude': 31.769983291625977,
          'accelAvgX': -0.3819696605205536,
          'accelAvgY': 9.834440231323242,
          'accelAvgZ': -0.17619532346725464,
          'accelPeakX': -0.3330230712890625,
          'accelPeakY': 10.569107055664062,
          'accelPeakZ': -0.358123779296875,
          'time': '2018-05-14T09:55:21.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 6,
        'sample': {
          'speed': 11.039999961853027,
          'longitude': 35.195953369140625,
          'latitude': 31.770362854003906,
          'accelAvgX': -0.19256341457366943,
          'accelAvgY': 9.782729148864746,
          'accelAvgZ': -0.27988123893737793,
          'accelPeakX': 0.4662933349609375,
          'accelPeakY': 10.064285278320312,
          'accelPeakZ': 0.2660980224609375,
          'time': '2018-05-14T09:55:26.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 7,
        'sample': {
          'speed': 10.789999961853027,
          'longitude': 35.19599151611328,
          'latitude': 31.77092742919922,
          'accelAvgX': 1.4767985343933105,
          'accelAvgY': 9.144136428833008,
          'accelAvgZ': 2.0024399757385254,
          'accelPeakX': -0.2583160400390625,
          'accelPeakY': 10.419113159179688,
          'accelPeakZ': -0.3649444580078125,
          'time': '2018-05-14T09:55:31.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 8,
        'sample': {
          'speed': 5.949999809265137,
          'longitude': 35.19629669189453,
          'latitude': 31.771102905273438,
          'accelAvgX': 2.2598111629486084,
          'accelAvgY': 9.119394302368164,
          'accelAvgZ': 1.3798598051071167,
          'accelPeakX': 3.4188079833984375,
          'accelPeakY': 9.401336669921875,
          'accelPeakZ': 1.82257080078125,
          'time': '2018-05-14T09:55:36.000Z'
        }
      },
      {
        'reportNumber': 193,
        'sampleNumber': 9,
        'sample': {
          'speed': 10.789999961853027,
          'longitude': 35.196502685546875,
          'latitude': 31.770811080932617,
          'accelAvgX': 0.7088820934295654,
          'accelAvgY': 9.679162979125977,
          'accelAvgZ': 0.3631365895271301,
          'accelPeakX': 2.278045654296875,
          'accelPeakY': 9.945236206054688,
          'accelPeakZ': 0.0399169921875,
          'time': '2018-05-14T09:55:41.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 0,
        'sample': {
          'speed': 11.069999694824219,
          'longitude': 35.19667053222656,
          'latitude': 31.770374298095703,
          'accelAvgX': 0.111270472407341,
          'accelAvgY': 9.56971263885498,
          'accelAvgZ': 0.9008485674858093,
          'accelPeakX': 1.935302734375,
          'accelPeakY': 10.722579956054688,
          'accelPeakZ': 4.278961181640625,
          'time': '2018-05-14T09:55:47.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 1,
        'sample': {
          'speed': 7.739999771118164,
          'longitude': 35.196956634521484,
          'latitude': 31.769989013671875,
          'accelAvgX': 0.8021532297134399,
          'accelAvgY': 9.128800392150879,
          'accelAvgZ': 2.5138139724731445,
          'accelPeakX': 1.2879180908203125,
          'accelPeakY': 9.971328735351562,
          'accelPeakZ': 2.78594970703125,
          'time': '2018-05-14T09:55:52.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 2,
        'sample': {
          'speed': 8.90999984741211,
          'longitude': 35.1970329284668,
          'latitude': 31.769681930541992,
          'accelAvgX': 1.2748850584030151,
          'accelAvgY': 9.15722370147705,
          'accelAvgZ': 1.3772947788238525,
          'accelPeakX': 1.5513916015625,
          'accelPeakY': 9.4990234375,
          'accelPeakZ': 3.6529998779296875,
          'time': '2018-05-14T09:55:57.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 3,
        'sample': {
          'speed': 9.3100004196167,
          'longitude': 35.19698715209961,
          'latitude': 31.7692928314209,
          'accelAvgX': 0.5864365100860596,
          'accelAvgY': 9.199039459228516,
          'accelAvgZ': 2.183527946472168,
          'accelPeakX': 1.5154876708984375,
          'accelPeakY': 9.787155151367188,
          'accelPeakZ': 4.870697021484375,
          'time': '2018-05-14T09:56:02.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 4,
        'sample': {
          'speed': 9.100000381469727,
          'longitude': 35.197021484375,
          'latitude': 31.768869400024414,
          'accelAvgX': 0.913043737411499,
          'accelAvgY': 9.118658065795898,
          'accelAvgZ': 2.6467247009277344,
          'accelPeakX': 0.3314971923828125,
          'accelPeakY': 9.60064697265625,
          'accelPeakZ': 2.306976318359375,
          'time': '2018-05-14T09:56:07.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 5,
        'sample': {
          'speed': 11.180000305175781,
          'longitude': 35.1971321105957,
          'latitude': 31.768423080444336,
          'accelAvgX': 0.4247415065765381,
          'accelAvgY': 9.167938232421875,
          'accelAvgZ': 2.439920425415039,
          'accelPeakX': 1.023895263671875,
          'accelPeakY': 10.629974365234375,
          'accelPeakZ': 3.9272613525390625,
          'time': '2018-05-14T09:56:12.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 6,
        'sample': {
          'speed': 10.180000305175781,
          'longitude': 35.197383880615234,
          'latitude': 31.76801872253418,
          'accelAvgX': -0.06688308715820312,
          'accelAvgY': 9.248601913452148,
          'accelAvgZ': 2.4660911560058594,
          'accelPeakX': 0.9767913818359375,
          'accelPeakY': 9.715576171875,
          'accelPeakZ': 3.7452392578125,
          'time': '2018-05-14T09:56:17.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 7,
        'sample': {
          'speed': 9.960000038146973,
          'longitude': 35.19783020019531,
          'latitude': 31.767770767211914,
          'accelAvgX': -0.10282132774591446,
          'accelAvgY': 9.295792579650879,
          'accelAvgZ': 2.354783535003662,
          'accelPeakX': 0.317840576171875,
          'accelPeakY': 9.704803466796875,
          'accelPeakZ': 2.8729095458984375,
          'time': '2018-05-14T09:56:22.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 8,
        'sample': {
          'speed': 9.520000457763672,
          'longitude': 35.19835662841797,
          'latitude': 31.767715454101562,
          'accelAvgX': 0.8518272638320923,
          'accelAvgY': 8.9922456741333,
          'accelAvgZ': 2.866055965423584,
          'accelPeakX': 1.317840576171875,
          'accelPeakY': 9.329452514648438,
          'accelPeakZ': 2.7214813232421875,
          'time': '2018-05-14T09:56:27.000Z'
        }
      },
      {
        'reportNumber': 194,
        'sampleNumber': 9,
        'sample': {
          'speed': 6.5,
          'longitude': 35.19879150390625,
          'latitude': 31.767711639404297,
          'accelAvgX': 1.519493818283081,
          'accelAvgY': 8.783803939819336,
          'accelAvgZ': 3.5009374618530273,
          'accelPeakX': 1.616943359375,
          'accelPeakY': 9.003067016601562,
          'accelPeakZ': 3.613739013671875,
          'time': '2018-05-14T09:56:32.000Z'
        }
      },
      {
        'reportNumber': 195,
        'sampleNumber': 0,
        'sample': {
          'speed': 3.450000047683716,
          'longitude': 35.198890686035156,
          'latitude': 31.767593383789062,
          'accelAvgX': 2.5544307231903076,
          'accelAvgY': 9.093708038330078,
          'accelAvgZ': 1.5006967782974243,
          'accelPeakX': 4.1777801513671875,
          'accelPeakY': 9.844741821289062,
          'accelPeakZ': 2.14483642578125,
          'time': '2018-05-14T09:56:37.000Z'
        }
      },
      {
        'reportNumber': 195,
        'sampleNumber': 1,
        'sample': {
          'speed': 3.450000047683716,
          'longitude': 35.19866943359375,
          'latitude': 31.76756477355957,
          'accelAvgX': 0.9420584440231323,
          'accelAvgY': 8.985079765319824,
          'accelAvgZ': 3.005868673324585,
          'accelPeakX': 1.805419921875,
          'accelPeakY': 9.676010131835938,
          'accelPeakZ': 0.7353057861328125,
          'time': '2018-05-14T09:56:42.000Z'
        }
      }
    ]
  };

  orangeLine = {
    'code': 200,
    'user': {
      'users_id': 3,
      'first_name': 'Roy',
      'last_name': 'Golombick',
      'email': 'roy.golombick@gmail.com',
      'password': 'opendoor',
      'created': '2018-02-20T16:22:07.000Z',
      'modified': '2018-02-20T16:22:07.000Z'
    },
    'samples': [
      {
        'reportNumber': 0,
        'sampleNumber': 1,
        'sample': {
          'speed': 7.512256145477295,
          'longitude': 35.198646545410156,
          'latitude': 31.767728805541992,
          'accelAvgX': 0.6320378184318542,
          'accelAvgY': 9.203343391418457,
          'accelAvgZ': -0.28220075368881226,
          'accelPeakX': -1.8483237028121948,
          'accelPeakY': 12.181697845458984,
          'accelPeakZ': 0.8044517636299133,
          'time': '2018-05-13T14:23:11.000Z'
        }
      },
      {
        'reportNumber': 0,
        'sampleNumber': 2,
        'sample': {
          'speed': 9.175281524658203,
          'longitude': 35.19823455810547,
          'latitude': 31.767772674560547,
          'accelAvgX': 0.8999589085578918,
          'accelAvgY': 9.825675964355469,
          'accelAvgZ': -0.43927690386772156,
          'accelPeakX': 1.6280571222305298,
          'accelPeakY': 13.723564147949219,
          'accelPeakZ': 3.4955344200134277,
          'time': '2018-05-13T14:23:16.000Z'
        }
      },
      {
        'reportNumber': 0,
        'sampleNumber': 3,
        'sample': {
          'speed': 8.74325180053711,
          'longitude': 35.197696685791016,
          'latitude': 31.767826080322266,
          'accelAvgX': 2.4697957038879395,
          'accelAvgY': 9.6104154586792,
          'accelAvgZ': 0.24612674117088318,
          'accelPeakX': 3.7636849880218506,
          'accelPeakY': 12.880805015563965,
          'accelPeakZ': 1.1492167711257935,
          'time': '2018-05-13T14:23:21.000Z'
        }
      },
      {
        'reportNumber': 0,
        'sampleNumber': 4,
        'sample': {
          'speed': 8.965877532958984,
          'longitude': 35.19731521606445,
          'latitude': 31.76807403564453,
          'accelAvgX': 2.2496190071105957,
          'accelAvgY': 9.581191062927246,
          'accelAvgZ': -0.31241148710250854,
          'accelPeakX': 1.158793568611145,
          'accelPeakY': 14.633360862731934,
          'accelPeakZ': 2.2026655673980713,
          'time': '2018-05-13T14:23:26.000Z'
        }
      },
      {
        'reportNumber': 0,
        'sampleNumber': 5,
        'sample': {
          'speed': 10.483028411865234,
          'longitude': 35.19710159301758,
          'latitude': 31.768484115600586,
          'accelAvgX': 0.638522207736969,
          'accelAvgY': 9.844305038452148,
          'accelAvgZ': 0.313430517911911,
          'accelPeakX': 3.5434184074401855,
          'accelPeakY': 12.287043571472168,
          'accelPeakZ': -5.1331682205200195,
          'time': '2018-05-13T14:23:31.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 0,
        'sample': {
          'speed': 8.51298713684082,
          'longitude': 35.197021484375,
          'latitude': 31.768924713134766,
          'accelAvgX': 0.11959841102361679,
          'accelAvgY': 9.91029167175293,
          'accelAvgZ': 0.2357303351163864,
          'accelPeakX': 1.1683704853057861,
          'accelPeakY': 16.338031768798828,
          'accelPeakZ': 7.096413612365723,
          'time': '2018-05-13T14:23:36.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 1,
        'sample': {
          'speed': 8.762167930603027,
          'longitude': 35.19700622558594,
          'latitude': 31.769323348999023,
          'accelAvgX': 0.5240415334701538,
          'accelAvgY': 9.833382606506348,
          'accelAvgZ': 0.9551445245742798,
          'accelPeakX': 0.4118026793003082,
          'accelPeakY': 12.85207462310791,
          'accelPeakZ': 2.920926094055176,
          'time': '2018-05-13T14:23:41.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 2,
        'sample': {
          'speed': 5.97996187210083,
          'longitude': 35.19704055786133,
          'latitude': 31.769634246826172,
          'accelAvgX': 0.9661852121353149,
          'accelAvgY': 9.733413696289062,
          'accelAvgZ': 1.0833003520965576,
          'accelPeakX': -0.019153613597154617,
          'accelPeakY': 16.002843856811523,
          'accelPeakZ': 6.301538944244385,
          'time': '2018-05-13T14:23:46.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 3,
        'sample': {
          'speed': 1.0757490396499634,
          'longitude': 35.197078704833984,
          'latitude': 31.769773483276367,
          'accelAvgX': 0.9288355708122253,
          'accelAvgY': 9.746320724487305,
          'accelAvgZ': 1.2810051441192627,
          'accelPeakX': -0.2298433631658554,
          'accelPeakY': 11.616666793823242,
          'accelPeakZ': 3.88818359375,
          'time': '2018-05-13T14:23:51.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 4,
        'sample': {
          'speed': 3.4714601039886475,
          'longitude': 35.19709396362305,
          'latitude': 31.76982879638672,
          'accelAvgX': -0.32237693667411804,
          'accelAvgY': 9.755266189575195,
          'accelAvgZ': 0.7520228624343872,
          'accelPeakX': 0.06703764945268631,
          'accelPeakY': 10.994174003601074,
          'accelPeakZ': 0.05746084079146385,
          'time': '2018-05-13T14:23:56.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 5,
        'sample': {
          'speed': 5.053506851196289,
          'longitude': 35.19693374633789,
          'latitude': 31.7700138092041,
          'accelAvgX': 0.8980656266212463,
          'accelAvgY': 10.08211898803711,
          'accelAvgZ': 0.29125070571899414,
          'accelPeakX': 1.292868971824646,
          'accelPeakY': 13.148955345153809,
          'accelPeakZ': 3.8307228088378906,
          'time': '2018-05-13T14:24:01.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 6,
        'sample': {
          'speed': 8.661334037780762,
          'longitude': 35.19672393798828,
          'latitude': 31.770307540893555,
          'accelAvgX': 0.7814655303955078,
          'accelAvgY': 9.593387603759766,
          'accelAvgZ': 0.7892522811889648,
          'accelPeakX': 0.6607996821403503,
          'accelPeakY': 12.239158630371094,
          'accelPeakZ': 1.1971008777618408,
          'time': '2018-05-13T14:24:06.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 7,
        'sample': {
          'speed': 8.148896217346191,
          'longitude': 35.19658279418945,
          'latitude': 31.770709991455078,
          'accelAvgX': 0.4256129562854767,
          'accelAvgY': 9.72596549987793,
          'accelAvgZ': 0.9475592970848083,
          'accelPeakX': 3.265691041946411,
          'accelPeakY': 15.935806274414062,
          'accelPeakZ': 6.081272125244141,
          'time': '2018-05-13T14:24:11.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 8,
        'sample': {
          'speed': 7.828420162200928,
          'longitude': 35.19646072387695,
          'latitude': 31.771116256713867,
          'accelAvgX': -1.315748691558838,
          'accelAvgY': 10.309466361999512,
          'accelAvgZ': 2.7707059383392334,
          'accelPeakX': -0.7757213711738586,
          'accelPeakY': 11.72201156616211,
          'accelPeakZ': 4.137180328369141,
          'time': '2018-05-13T14:24:16.000Z'
        }
      },
      {
        'reportNumber': 1,
        'sampleNumber': 9,
        'sample': {
          'speed': 7.529253005981445,
          'longitude': 35.196189880371094,
          'latitude': 31.771194458007812,
          'accelAvgX': -0.6820807456970215,
          'accelAvgY': 9.728358268737793,
          'accelAvgZ': 0.7424589395523071,
          'accelPeakX': -3.5051112174987793,
          'accelPeakY': 11.41555404663086,
          'accelPeakZ': 2.2409727573394775,
          'time': '2018-05-13T14:24:21.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 0,
        'sample': {
          'speed': 12.476335525512695,
          'longitude': 35.19596481323242,
          'latitude': 31.770761489868164,
          'accelAvgX': 0.5663622617721558,
          'accelAvgY': 9.869379043579102,
          'accelAvgZ': 1.3231086730957031,
          'accelPeakX': 0.4118026793003082,
          'accelPeakY': 13.330915451049805,
          'accelPeakZ': 2.38462495803833,
          'time': '2018-05-13T14:24:26.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 1,
        'sample': {
          'speed': 10.358871459960938,
          'longitude': 35.195899963378906,
          'latitude': 31.770206451416016,
          'accelAvgX': 1.0077002048492432,
          'accelAvgY': 9.015432357788086,
          'accelAvgZ': -0.6269456148147583,
          'accelPeakX': 3.533841609954834,
          'accelPeakY': 3.773261785507202,
          'accelPeakZ': 27.322629928588867,
          'time': '2018-05-13T14:24:31.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 2,
        'sample': {
          'speed': 10.107284545898438,
          'longitude': 35.19585418701172,
          'latitude': 31.76976776123047,
          'accelAvgX': 0.9871090650558472,
          'accelAvgY': 9.339881896972656,
          'accelAvgZ': 2.127246141433716,
          'accelPeakX': 4.960785865783691,
          'accelPeakY': 10.716446876525879,
          'accelPeakZ': 18.521543502807617,
          'time': '2018-05-13T14:24:36.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 3,
        'sample': {
          'speed': 11.554594993591309,
          'longitude': 35.195770263671875,
          'latitude': 31.76934242248535,
          'accelAvgX': 1.3298546075820923,
          'accelAvgY': 8.774506568908691,
          'accelAvgZ': -0.03951619565486908,
          'accelPeakX': -1.4844050407409668,
          'accelPeakY': 12.871228218078613,
          'accelPeakZ': -0.5650315880775452,
          'time': '2018-05-13T14:24:41.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 4,
        'sample': {
          'speed': 14.598087310791016,
          'longitude': 35.19577407836914,
          'latitude': 31.768768310546875,
          'accelAvgX': 0.7680816650390625,
          'accelAvgY': 9.595409393310547,
          'accelAvgZ': 0.6987307667732239,
          'accelPeakX': 0.7086837291717529,
          'accelPeakY': 12.018892288208008,
          'accelPeakZ': 1.139639973640442,
          'time': '2018-05-13T14:24:46.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 5,
        'sample': {
          'speed': 16.419328689575195,
          'longitude': 35.195823669433594,
          'latitude': 31.768095016479492,
          'accelAvgX': -0.4624951481819153,
          'accelAvgY': 9.64639949798584,
          'accelAvgZ': 0.8454400897026062,
          'accelPeakX': -0.6799532771110535,
          'accelPeakY': 12.143390655517578,
          'accelPeakZ': -0.2585737705230713,
          'time': '2018-05-13T14:24:51.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 6,
        'sample': {
          'speed': 18.767669677734375,
          'longitude': 35.19624710083008,
          'latitude': 31.76740074157715,
          'accelAvgX': 0.656762957572937,
          'accelAvgY': 9.954780578613281,
          'accelAvgZ': 0.9555310606956482,
          'accelPeakX': -0.9672574996948242,
          'accelPeakY': 13.464990615844727,
          'accelPeakZ': 3.8498764038085938,
          'time': '2018-05-13T14:24:56.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 7,
        'sample': {
          'speed': 16.21333122253418,
          'longitude': 35.196937561035156,
          'latitude': 31.766775131225586,
          'accelAvgX': 2.3769543170928955,
          'accelAvgY': 9.860186576843262,
          'accelAvgZ': 3.425600528717041,
          'accelPeakX': -1.1204863786697388,
          'accelPeakY': 12.756306648254395,
          'accelPeakZ': 2.5091233253479004,
          'time': '2018-05-13T14:25:01.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 8,
        'sample': {
          'speed': 8.753467559814453,
          'longitude': 35.197174072265625,
          'latitude': 31.76634979248047,
          'accelAvgX': 4.690016746520996,
          'accelAvgY': 8.914435386657715,
          'accelAvgZ': -0.5532285571098328,
          'accelPeakX': 1.9632453918457031,
          'accelPeakY': 12.823344230651855,
          'accelPeakZ': 4.213795185089111,
          'time': '2018-05-13T14:25:06.000Z'
        }
      },
      {
        'reportNumber': 2,
        'sampleNumber': 9,
        'sample': {
          'speed': 9.521029472351074,
          'longitude': 35.196773529052734,
          'latitude': 31.766334533691406,
          'accelAvgX': 0.19566577672958374,
          'accelAvgY': 9.820294380187988,
          'accelAvgZ': -0.6436206698417664,
          'accelPeakX': 9.165003776550293,
          'accelPeakY': 10.735600471496582,
          'accelPeakZ': -2.049436569213867,
          'time': '2018-05-13T14:25:11.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 0,
        'sample': {
          'speed': 11.958662033081055,
          'longitude': 35.196197509765625,
          'latitude': 31.766525268554688,
          'accelAvgX': 2.2794690132141113,
          'accelAvgY': 9.421529769897461,
          'accelAvgZ': 0.45704907178878784,
          'accelPeakX': -1.3886369466781616,
          'accelPeakY': 11.27190113067627,
          'accelPeakZ': 6.339846134185791,
          'time': '2018-05-13T14:25:16.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 1,
        'sample': {
          'speed': 8.704755783081055,
          'longitude': 35.19580078125,
          'latitude': 31.766836166381836,
          'accelAvgX': 1.850153923034668,
          'accelAvgY': 9.543121337890625,
          'accelAvgZ': 0.14759859442710876,
          'accelPeakX': 3.5434184074401855,
          'accelPeakY': 11.626243591308594,
          'accelPeakZ': 0.8140285611152649,
          'time': '2018-05-13T14:25:21.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 2,
        'sample': {
          'speed': 4.560739994049072,
          'longitude': 35.19585037231445,
          'latitude': 31.767148971557617,
          'accelAvgX': 0.44858765602111816,
          'accelAvgY': 9.896062850952148,
          'accelAvgZ': 0.42743945121765137,
          'accelPeakX': 1.7142484188079834,
          'accelPeakY': 12.54561710357666,
          'accelPeakZ': 0.6224924325942993,
          'time': '2018-05-13T14:25:26.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 3,
        'sample': {
          'speed': 3.127903938293457,
          'longitude': 35.19587707519531,
          'latitude': 31.7673282623291,
          'accelAvgX': 0.992172360420227,
          'accelAvgY': 9.805643081665039,
          'accelAvgZ': 1.1974495649337769,
          'accelPeakX': 0.7661445140838623,
          'accelPeakY': 10.716446876525879,
          'accelPeakZ': 0.8427590131759644,
          'time': '2018-05-13T14:25:31.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 4,
        'sample': {
          'speed': 0,
          'longitude': 35.19588088989258,
          'latitude': 31.767391204833984,
          'accelAvgX': 0.9158933758735657,
          'accelAvgY': 9.848128318786621,
          'accelAvgZ': -0.13824614882469177,
          'accelPeakX': 1.3407529592514038,
          'accelPeakY': 10.467450141906738,
          'accelPeakZ': 1.1683704853057861,
          'time': '2018-05-13T14:25:36.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 5,
        'sample': {
          'speed': 2.7607290744781494,
          'longitude': 35.19585037231445,
          'latitude': 31.76753044128418,
          'accelAvgX': 1.0731648206710815,
          'accelAvgY': 9.839417457580566,
          'accelAvgZ': 1.4044545888900757,
          'accelPeakX': 0.9959878921508789,
          'accelPeakY': 10.448296546936035,
          'accelPeakZ': 1.7334020137786865,
          'time': '2018-05-13T14:25:41.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 6,
        'sample': {
          'speed': 0,
          'longitude': 35.19581604003906,
          'latitude': 31.76758575439453,
          'accelAvgX': 1.0118894577026367,
          'accelAvgY': 9.823238372802734,
          'accelAvgZ': 0.5197621583938599,
          'accelPeakX': 0.4118026793003082,
          'accelPeakY': 11.013327598571777,
          'accelPeakZ': 0.5267243981361389,
          'time': '2018-05-13T14:25:46.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 7,
        'sample': {
          'speed': 2.247905969619751,
          'longitude': 35.195762634277344,
          'latitude': 31.76768684387207,
          'accelAvgX': 0.8542746305465698,
          'accelAvgY': 9.987006187438965,
          'accelAvgZ': 0.3112378716468811,
          'accelPeakX': 0.7757213711738586,
          'accelPeakY': 10.505757331848145,
          'accelPeakZ': -0.9385270476341248,
          'time': '2018-05-13T14:25:51.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 8,
        'sample': {
          'speed': 2.3208749294281006,
          'longitude': 35.1956901550293,
          'latitude': 31.76780891418457,
          'accelAvgX': 0.9295278787612915,
          'accelAvgY': 9.81904411315918,
          'accelAvgZ': 0.7779042720794678,
          'accelPeakX': 0.06703764945268631,
          'accelPeakY': 10.706870079040527,
          'accelPeakZ': 1.7046716213226318,
          'time': '2018-05-13T14:25:56.000Z'
        }
      },
      {
        'reportNumber': 3,
        'sampleNumber': 9,
        'sample': {
          'speed': 3.5093491077423096,
          'longitude': 35.19562530517578,
          'latitude': 31.76791000366211,
          'accelAvgX': 0.926782488822937,
          'accelAvgY': 9.823500633239746,
          'accelAvgZ': 1.0191739797592163,
          'accelPeakX': 0.8044517636299133,
          'accelPeakY': 10.8505220413208,
          'accelPeakZ': 0.7852981686592102,
          'time': '2018-05-13T14:26:01.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 0,
        'sample': {
          'speed': 0,
          'longitude': 35.19557571411133,
          'latitude': 31.76799201965332,
          'accelAvgX': 0.5029363036155701,
          'accelAvgY': 9.981184005737305,
          'accelAvgZ': -0.7519010305404663,
          'accelPeakX': 0.6320692300796509,
          'accelPeakY': 10.65898609161377,
          'accelPeakZ': 1.4844050407409668,
          'time': '2018-05-13T14:26:06.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 1,
        'sample': {
          'speed': 2.6709139347076416,
          'longitude': 35.195491790771484,
          'latitude': 31.76813316345215,
          'accelAvgX': 0.7149571776390076,
          'accelAvgY': 9.673293113708496,
          'accelAvgZ': 0.7976256608963013,
          'accelPeakX': 0.363918662071228,
          'accelPeakY': 10.831368446350098,
          'accelPeakZ': 1.7046716213226318,
          'time': '2018-05-13T14:26:11.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 2,
        'sample': {
          'speed': 3.4344890117645264,
          'longitude': 35.1954345703125,
          'latitude': 31.768230438232422,
          'accelAvgX': 0.8682735562324524,
          'accelAvgY': 9.686358451843262,
          'accelAvgZ': 0.8345317244529724,
          'accelPeakX': 0.5267243981361389,
          'accelPeakY': 10.72602367401123,
          'accelPeakZ': 0.5746083855628967,
          'time': '2018-05-13T14:26:16.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 3,
        'sample': {
          'speed': 0,
          'longitude': 35.19538879394531,
          'latitude': 31.768320083618164,
          'accelAvgX': 0.6851263046264648,
          'accelAvgY': 9.790084838867188,
          'accelAvgZ': 0.644868016242981,
          'accelPeakX': 0.9289502501487732,
          'accelPeakY': 10.764330863952637,
          'accelPeakZ': 1.6089035272598267,
          'time': '2018-05-13T14:26:21.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 4,
        'sample': {
          'speed': 3.384697914123535,
          'longitude': 35.19532012939453,
          'latitude': 31.768461227416992,
          'accelAvgX': 0.6560613512992859,
          'accelAvgY': 10.002738952636719,
          'accelAvgZ': 0.06120816245675087,
          'accelPeakX': 0.6703764796257019,
          'accelPeakY': 10.716446876525879,
          'accelPeakZ': 0.8331822156906128,
          'time': '2018-05-13T14:26:26.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 5,
        'sample': {
          'speed': 4.577560901641846,
          'longitude': 35.19527053833008,
          'latitude': 31.768661499023438,
          'accelAvgX': 0.8858069777488708,
          'accelAvgY': 9.72931957244873,
          'accelAvgZ': 0.8685516119003296,
          'accelPeakX': 0.4405331015586853,
          'accelPeakY': 10.946290016174316,
          'accelPeakZ': 1.3982137441635132,
          'time': '2018-05-13T14:26:31.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 6,
        'sample': {
          'speed': 5.1782660484313965,
          'longitude': 35.195247650146484,
          'latitude': 31.768844604492188,
          'accelAvgX': 0.7982871532440186,
          'accelAvgY': 9.527885437011719,
          'accelAvgZ': 0.49328911304473877,
          'accelPeakX': 0.8331822156906128,
          'accelPeakY': 11.1474027633667,
          'accelPeakZ': -0.05746084079146385,
          'time': '2018-05-13T14:26:36.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 7,
        'sample': {
          'speed': 2.1734719276428223,
          'longitude': 35.195220947265625,
          'latitude': 31.769041061401367,
          'accelAvgX': 1.027754306793213,
          'accelAvgY': 9.76410961151123,
          'accelAvgZ': 0.6939250826835632,
          'accelPeakX': 0.4596867263317108,
          'accelPeakY': 10.90798282623291,
          'accelPeakZ': 3.399766445159912,
          'time': '2018-05-13T14:26:41.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 8,
        'sample': {
          'speed': 1.6050180196762085,
          'longitude': 35.1952018737793,
          'latitude': 31.769092559814453,
          'accelAvgX': 0.8897044658660889,
          'accelAvgY': 9.873186111450195,
          'accelAvgZ': 0.043146129697561264,
          'accelPeakX': 0.2585737705230713,
          'accelPeakY': 10.524910926818848,
          'accelPeakZ': 1.656787633895874,
          'time': '2018-05-13T14:26:46.000Z'
        }
      },
      {
        'reportNumber': 4,
        'sampleNumber': 9,
        'sample': {
          'speed': 3.1417601108551025,
          'longitude': 35.19518280029297,
          'latitude': 31.769248962402344,
          'accelAvgX': 0.9723016023635864,
          'accelAvgY': 9.78912353515625,
          'accelAvgZ': 1.171158790588379,
          'accelPeakX': 1.091755986213684,
          'accelPeakY': 10.60152530670166,
          'accelPeakZ': 1.4460978507995605,
          'time': '2018-05-13T14:26:51.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 0,
        'sample': {
          'speed': 2.6978659629821777,
          'longitude': 35.195167541503906,
          'latitude': 31.769359588623047,
          'accelAvgX': 1.0031466484069824,
          'accelAvgY': 9.884973526000977,
          'accelAvgZ': 0.7037206888198853,
          'accelPeakX': 0.5554547905921936,
          'accelPeakY': 10.8505220413208,
          'accelPeakZ': 0.7948749661445618,
          'time': '2018-05-13T14:26:56.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 1,
        'sample': {
          'speed': 2.2967300415039062,
          'longitude': 35.19515609741211,
          'latitude': 31.76944923400879,
          'accelAvgX': 1.2832129001617432,
          'accelAvgY': 9.714791297912598,
          'accelAvgZ': 0.6918677687644958,
          'accelPeakX': 1.3120225667953491,
          'accelPeakY': 10.888829231262207,
          'accelPeakZ': 1.1683704853057861,
          'time': '2018-05-13T14:27:01.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 2,
        'sample': {
          'speed': 3.404210090637207,
          'longitude': 35.19514465332031,
          'latitude': 31.7695369720459,
          'accelAvgX': 1.130143404006958,
          'accelAvgY': 9.669004440307617,
          'accelAvgZ': 0.822969377040863,
          'accelPeakX': 0.6129156351089478,
          'accelPeakY': 10.898406028747559,
          'accelPeakZ': 0.689530074596405,
          'time': '2018-05-13T14:27:06.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 3,
        'sample': {
          'speed': 1.573740005493164,
          'longitude': 35.19512176513672,
          'latitude': 31.769695281982422,
          'accelAvgX': 0.8715739250183105,
          'accelAvgY': 9.8185453414917,
          'accelAvgZ': 1.0131025314331055,
          'accelPeakX': 0.727837324142456,
          'accelPeakY': 11.03248119354248,
          'accelPeakZ': 0.24899697303771973,
          'time': '2018-05-13T14:27:11.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 4,
        'sample': {
          'speed': 1.1927529573440552,
          'longitude': 35.195106506347656,
          'latitude': 31.769786834716797,
          'accelAvgX': 0.9236504435539246,
          'accelAvgY': 9.750519752502441,
          'accelAvgZ': 0.5716553926467896,
          'accelPeakX': 0.363918662071228,
          'accelPeakY': 10.342951774597168,
          'accelPeakZ': 1.1971008777618408,
          'time': '2018-05-13T14:27:16.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 5,
        'sample': {
          'speed': 1.6216880083084106,
          'longitude': 35.195098876953125,
          'latitude': 31.769834518432617,
          'accelAvgX': 0.8553056716918945,
          'accelAvgY': 9.715959548950195,
          'accelAvgZ': 0.7184675931930542,
          'accelPeakX': 0.5841852426528931,
          'accelPeakY': 10.620678901672363,
          'accelPeakZ': 1.2832920551300049,
          'time': '2018-05-13T14:27:21.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 6,
        'sample': {
          'speed': 2.2036430835723877,
          'longitude': 35.19508743286133,
          'latitude': 31.76990509033203,
          'accelAvgX': 0.9644753932952881,
          'accelAvgY': 9.654621124267578,
          'accelAvgZ': 1.1746717691421509,
          'accelPeakX': 0.45010992884635925,
          'accelPeakY': 10.72602367401123,
          'accelPeakZ': 1.436521053314209,
          'time': '2018-05-13T14:27:26.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 7,
        'sample': {
          'speed': 1.0858889818191528,
          'longitude': 35.195064544677734,
          'latitude': 31.770015716552734,
          'accelAvgX': 0.9267063140869141,
          'accelAvgY': 9.73286247253418,
          'accelAvgZ': 0.6103746891021729,
          'accelPeakX': 0.5746083855628967,
          'accelPeakY': 10.639832496643066,
          'accelPeakZ': 1.3886369466781616,
          'time': '2018-05-13T14:27:31.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 8,
        'sample': {
          'speed': 2.632412910461426,
          'longitude': 35.19505310058594,
          'latitude': 31.770097732543945,
          'accelAvgX': 0.7545833587646484,
          'accelAvgY': 9.927885055541992,
          'accelAvgZ': -0.15444315969944,
          'accelPeakX': 0.8331822156906128,
          'accelPeakY': 10.735600471496582,
          'accelPeakZ': 0.3064578175544739,
          'time': '2018-05-13T14:27:36.000Z'
        }
      },
      {
        'reportNumber': 5,
        'sampleNumber': 9,
        'sample': {
          'speed': 3.443808078765869,
          'longitude': 35.19501876831055,
          'latitude': 31.77032470703125,
          'accelAvgX': 0.8975901007652283,
          'accelAvgY': 9.94698429107666,
          'accelAvgZ': 1.1036747694015503,
          'accelPeakX': 0.9385270476341248,
          'accelPeakY': 10.773907661437988,
          'accelPeakZ': 0.23942017555236816,
          'time': '2018-05-13T14:27:41.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 0,
        'sample': {
          'speed': 2.547991991043091,
          'longitude': 35.19498825073242,
          'latitude': 31.770484924316406,
          'accelAvgX': 0.6560006141662598,
          'accelAvgY': 9.830533981323242,
          'accelAvgZ': 0.3867972493171692,
          'accelPeakX': 0.5171475410461426,
          'accelPeakY': 11.185709953308105,
          'accelPeakZ': 2.0398597717285156,
          'time': '2018-05-13T14:27:46.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 1,
        'sample': {
          'speed': 3.288748025894165,
          'longitude': 35.19498825073242,
          'latitude': 31.770645141601562,
          'accelAvgX': 0.8007104396820068,
          'accelAvgY': 9.792424201965332,
          'accelAvgZ': 1.1603446006774902,
          'accelPeakX': 0.38307225704193115,
          'accelPeakY': 10.649409294128418,
          'accelPeakZ': 1.7334020137786865,
          'time': '2018-05-13T14:27:51.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 2,
        'sample': {
          'speed': 3.347590923309326,
          'longitude': 35.19497299194336,
          'latitude': 31.7707462310791,
          'accelAvgX': 0.7208571434020996,
          'accelAvgY': 9.80483341217041,
          'accelAvgZ': 1.0827572345733643,
          'accelPeakX': 1.3120225667953491,
          'accelPeakY': 10.668562889099121,
          'accelPeakZ': 1.4844050407409668,
          'time': '2018-05-13T14:27:56.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 3,
        'sample': {
          'speed': 3.769468069076538,
          'longitude': 35.194942474365234,
          'latitude': 31.770915985107422,
          'accelAvgX': 0.3921012580394745,
          'accelAvgY': 9.867677688598633,
          'accelAvgZ': 0.32578176259994507,
          'accelPeakX': 0.5937620401382446,
          'accelPeakY': 10.697293281555176,
          'accelPeakZ': 2.2218191623687744,
          'time': '2018-05-13T14:28:01.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 4,
        'sample': {
          'speed': 3.9279680252075195,
          'longitude': 35.19490432739258,
          'latitude': 31.77110481262207,
          'accelAvgX': 0.5674163699150085,
          'accelAvgY': 9.842896461486816,
          'accelAvgZ': 0.8583543300628662,
          'accelPeakX': 0.7852981686592102,
          'accelPeakY': 11.051634788513184,
          'accelPeakZ': 1.5705963373184204,
          'time': '2018-05-13T14:28:06.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 5,
        'sample': {
          'speed': 3.469698905944824,
          'longitude': 35.19485855102539,
          'latitude': 31.771286010742188,
          'accelAvgX': 0.6063270568847656,
          'accelAvgY': 9.729220390319824,
          'accelAvgZ': 0.5870635509490967,
          'accelPeakX': 0.12449848651885986,
          'accelPeakY': 10.8505220413208,
          'accelPeakZ': 1.5131354331970215,
          'time': '2018-05-13T14:28:11.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 6,
        'sample': {
          'speed': 5.3570990562438965,
          'longitude': 35.194801330566406,
          'latitude': 31.77149772644043,
          'accelAvgX': 0.35333824157714844,
          'accelAvgY': 9.936552047729492,
          'accelAvgZ': 0.46215006709098816,
          'accelPeakX': 0.3734954595565796,
          'accelPeakY': 11.013327598571777,
          'accelPeakZ': 2.183511972427368,
          'time': '2018-05-13T14:28:16.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 7,
        'sample': {
          'speed': 6.354623794555664,
          'longitude': 35.194705963134766,
          'latitude': 31.771743774414062,
          'accelAvgX': 0.8016346096992493,
          'accelAvgY': 9.637063980102539,
          'accelAvgZ': 0.4496268928050995,
          'accelPeakX': 0.5650315880775452,
          'accelPeakY': 11.185709953308105,
          'accelPeakZ': 0.15322890877723694,
          'time': '2018-05-13T14:28:21.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 8,
        'sample': {
          'speed': 5.564549922943115,
          'longitude': 35.19462203979492,
          'latitude': 31.77205467224121,
          'accelAvgX': 0.7397181987762451,
          'accelAvgY': 9.751962661743164,
          'accelAvgZ': 1.4311996698379517,
          'accelPeakX': 0.5267243981361389,
          'accelPeakY': 11.013327598571777,
          'accelPeakZ': 1.0630255937576294,
          'time': '2018-05-13T14:28:26.000Z'
        }
      },
      {
        'reportNumber': 6,
        'sampleNumber': 9,
        'sample': {
          'speed': 6.080945014953613,
          'longitude': 35.1945686340332,
          'latitude': 31.772289276123047,
          'accelAvgX': 0.07345282286405563,
          'accelAvgY': 9.984951972961426,
          'accelAvgZ': 0.8016651272773743,
          'accelPeakX': 0.2106897532939911,
          'accelPeakY': 11.396400451660156,
          'accelPeakZ': 2.2888567447662354,
          'time': '2018-05-13T14:28:31.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 0,
        'sample': {
          'speed': 9.30624008178711,
          'longitude': 35.1944694519043,
          'latitude': 31.772628784179688,
          'accelAvgX': 0.8487510681152344,
          'accelAvgY': 10.005572319030762,
          'accelAvgZ': 0.8690377473831177,
          'accelPeakX': -0.09576806426048279,
          'accelPeakY': 11.425130844116211,
          'accelPeakZ': -1.7812861204147339,
          'time': '2018-05-13T14:28:36.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 1,
        'sample': {
          'speed': 6.699411869049072,
          'longitude': 35.19438552856445,
          'latitude': 31.773012161254883,
          'accelAvgX': 0.6699227094650269,
          'accelAvgY': 9.679339408874512,
          'accelAvgZ': 1.0893436670303345,
          'accelPeakX': 0.6416460275650024,
          'accelPeakY': 11.27190113067627,
          'accelPeakZ': 2.126051187515259,
          'time': '2018-05-13T14:28:41.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 2,
        'sample': {
          'speed': 1.7220499515533447,
          'longitude': 35.194339752197266,
          'latitude': 31.77318572998047,
          'accelAvgX': 0.5524438619613647,
          'accelAvgY': 9.91852855682373,
          'accelAvgZ': 0.38130253553390503,
          'accelPeakX': 0.6703764796257019,
          'accelPeakY': 10.773907661437988,
          'accelPeakZ': 4.1180267333984375,
          'time': '2018-05-13T14:28:46.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 3,
        'sample': {
          'speed': 4.705448150634766,
          'longitude': 35.19430160522461,
          'latitude': 31.773330688476562,
          'accelAvgX': 0.4541838765144348,
          'accelAvgY': 9.885063171386719,
          'accelAvgZ': 0.11475040018558502,
          'accelPeakX': 0.1149216815829277,
          'accelPeakY': 10.96544361114502,
          'accelPeakZ': 0.009576806798577309,
          'time': '2018-05-13T14:28:51.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 4,
        'sample': {
          'speed': 5.889155864715576,
          'longitude': 35.194244384765625,
          'latitude': 31.77358627319336,
          'accelAvgX': 0.819717288017273,
          'accelAvgY': 9.659842491149902,
          'accelAvgZ': 1.7061742544174194,
          'accelPeakX': 0.009576806798577309,
          'accelPeakY': 10.78348445892334,
          'accelPeakZ': 1.9536685943603516,
          'time': '2018-05-13T14:28:56.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 5,
        'sample': {
          'speed': 6.412806987762451,
          'longitude': 35.1942024230957,
          'latitude': 31.7737979888916,
          'accelAvgX': 0.6761482954025269,
          'accelAvgY': 10.148161888122559,
          'accelAvgZ': -0.6086955666542053,
          'accelPeakX': 0.3447650372982025,
          'accelPeakY': 10.764330863952637,
          'accelPeakZ': -2.078166961669922,
          'time': '2018-05-13T14:29:01.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 6,
        'sample': {
          'speed': 6.494153022766113,
          'longitude': 35.194129943847656,
          'latitude': 31.774124145507812,
          'accelAvgX': 0.6555097699165344,
          'accelAvgY': 9.856133460998535,
          'accelAvgZ': 0.9719336032867432,
          'accelPeakX': 0.38307225704193115,
          'accelPeakY': 11.281478881835938,
          'accelPeakZ': 0.14365209639072418,
          'time': '2018-05-13T14:29:06.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 7,
        'sample': {
          'speed': 6.728979110717773,
          'longitude': 35.19407653808594,
          'latitude': 31.774404525756836,
          'accelAvgX': 0.4874719977378845,
          'accelAvgY': 9.832019805908203,
          'accelAvgZ': 0.5217944383621216,
          'accelPeakX': -1.1492167711257935,
          'accelPeakY': 11.35809326171875,
          'accelPeakZ': 0.5554547905921936,
          'time': '2018-05-13T14:29:11.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 8,
        'sample': {
          'speed': 9.547019004821777,
          'longitude': 35.193992614746094,
          'latitude': 31.774768829345703,
          'accelAvgX': 0.34055206179618835,
          'accelAvgY': 9.93372917175293,
          'accelAvgZ': -0.01765681989490986,
          'accelPeakX': -1.0055646896362305,
          'accelPeakY': 11.425130844116211,
          'accelPeakZ': -0.6416460275650024,
          'time': '2018-05-13T14:29:16.000Z'
        }
      },
      {
        'reportNumber': 7,
        'sampleNumber': 9,
        'sample': {
          'speed': 10.389692306518555,
          'longitude': 35.19389724731445,
          'latitude': 31.775230407714844,
          'accelAvgX': 0.5956788659095764,
          'accelAvgY': 9.933913230895996,
          'accelAvgZ': 0.24931800365447998,
          'accelPeakX': 0.26815059781074524,
          'accelPeakY': 11.08994197845459,
          'accelPeakZ': 2.403778553009033,
          'time': '2018-05-13T14:29:21.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 0,
        'sample': {
          'speed': 6.683591842651367,
          'longitude': 35.193843841552734,
          'latitude': 31.7756404876709,
          'accelAvgX': 0.5484403967857361,
          'accelAvgY': 9.676286697387695,
          'accelAvgZ': 1.3353127241134644,
          'accelPeakX': -0.1149216815829277,
          'accelPeakY': 11.042057991027832,
          'accelPeakZ': 2.030282974243164,
          'time': '2018-05-13T14:29:26.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 1,
        'sample': {
          'speed': 2.2909200191497803,
          'longitude': 35.1938362121582,
          'latitude': 31.77585220336914,
          'accelAvgX': 0.6940194964408875,
          'accelAvgY': 9.705841064453125,
          'accelAvgZ': 2.463918447494507,
          'accelPeakX': 0,
          'accelPeakY': 10.524910926818848,
          'accelPeakZ': 2.8634653091430664,
          'time': '2018-05-13T14:29:31.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 2,
        'sample': {
          'speed': 3.2029080390930176,
          'longitude': 35.193843841552734,
          'latitude': 31.77591323852539,
          'accelAvgX': 0.25396549701690674,
          'accelAvgY': 10.050874710083008,
          'accelAvgZ': -1.4823487997055054,
          'accelPeakX': -0.3734954595565796,
          'accelPeakY': 10.697293281555176,
          'accelPeakZ': 1.4844050407409668,
          'time': '2018-05-13T14:29:36.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 3,
        'sample': {
          'speed': 8.64439582824707,
          'longitude': 35.1938591003418,
          'latitude': 31.77621078491211,
          'accelAvgX': 0.383622407913208,
          'accelAvgY': 9.935115814208984,
          'accelAvgZ': 0.018886767327785492,
          'accelPeakX': 0,
          'accelPeakY': 11.377246856689453,
          'accelPeakZ': -0.4118026793003082,
          'time': '2018-05-13T14:29:41.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 4,
        'sample': {
          'speed': 8.897892951965332,
          'longitude': 35.19388198852539,
          'latitude': 31.776582717895508,
          'accelAvgX': 0.5679830312728882,
          'accelAvgY': 9.87088394165039,
          'accelAvgZ': -0.22393840551376343,
          'accelPeakX': -0.3734954595565796,
          'accelPeakY': 11.003750801086426,
          'accelPeakZ': 2.691082715988159,
          'time': '2018-05-13T14:29:46.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 5,
        'sample': {
          'speed': 5.919096946716309,
          'longitude': 35.19392013549805,
          'latitude': 31.77692985534668,
          'accelAvgX': 0.5210003852844238,
          'accelAvgY': 9.811668395996094,
          'accelAvgZ': 0.6090993881225586,
          'accelPeakX': 0.2777273952960968,
          'accelPeakY': 11.08994197845459,
          'accelPeakZ': 1.9536685943603516,
          'time': '2018-05-13T14:29:51.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 6,
        'sample': {
          'speed': 8.349626541137695,
          'longitude': 35.1939697265625,
          'latitude': 31.77724266052246,
          'accelAvgX': 0.4480389356613159,
          'accelAvgY': 9.891087532043457,
          'accelAvgZ': -0.26253741979599,
          'accelPeakX': -0.38307225704193115,
          'accelPeakY': 11.310209274291992,
          'accelPeakZ': 0.9193734526634216,
          'time': '2018-05-13T14:29:56.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 7,
        'sample': {
          'speed': 10.80298137664795,
          'longitude': 35.194053649902344,
          'latitude': 31.777673721313477,
          'accelAvgX': 0.9290519952774048,
          'accelAvgY': 10.063063621520996,
          'accelAvgZ': -0.3088891804218292,
          'accelPeakX': 1.0055646896362305,
          'accelPeakY': 11.291055679321289,
          'accelPeakZ': 2.0398597717285156,
          'time': '2018-05-13T14:30:01.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 8,
        'sample': {
          'speed': 12.020528793334961,
          'longitude': 35.194210052490234,
          'latitude': 31.778173446655273,
          'accelAvgX': 0.5259050130844116,
          'accelAvgY': 9.656009674072266,
          'accelAvgZ': 0.08347156643867493,
          'accelPeakX': 1.1971008777618408,
          'accelPeakY': 12.076353073120117,
          'accelPeakZ': 0.5937620401382446,
          'time': '2018-05-13T14:30:06.000Z'
        }
      },
      {
        'reportNumber': 8,
        'sampleNumber': 9,
        'sample': {
          'speed': 10.095990180969238,
          'longitude': 35.19438171386719,
          'latitude': 31.778623580932617,
          'accelAvgX': 0.3451889753341675,
          'accelAvgY': 9.845044136047363,
          'accelAvgZ': -0.531014084815979,
          'accelPeakX': 0.9289502501487732,
          'accelPeakY': 11.587936401367188,
          'accelPeakZ': 1.0438719987869263,
          'time': '2018-05-13T14:30:11.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 0,
        'sample': {
          'speed': 9.617695808410645,
          'longitude': 35.194580078125,
          'latitude': 31.779037475585938,
          'accelAvgX': 0.598487913608551,
          'accelAvgY': 10.04349136352539,
          'accelAvgZ': -0.4304839074611664,
          'accelPeakX': 0.4405331015586853,
          'accelPeakY': 11.779472351074219,
          'accelPeakZ': 1.0247182846069336,
          'time': '2018-05-13T14:30:16.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 1,
        'sample': {
          'speed': 9.326688766479492,
          'longitude': 35.194793701171875,
          'latitude': 31.779441833496094,
          'accelAvgX': 0.44168123602867126,
          'accelAvgY': 9.74691104888916,
          'accelAvgZ': -0.10878664255142212,
          'accelPeakX': 0.3447650372982025,
          'accelPeakY': 11.185709953308105,
          'accelPeakZ': 1.9536685943603516,
          'time': '2018-05-13T14:30:21.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 2,
        'sample': {
          'speed': 8.928062438964844,
          'longitude': 35.19501876831055,
          'latitude': 31.77979850769043,
          'accelAvgX': 0.570279061794281,
          'accelAvgY': 9.68576431274414,
          'accelAvgZ': 0.5547811985015869,
          'accelPeakX': 0.45010992884635925,
          'accelPeakY': 11.30063247680664,
          'accelPeakZ': 0.5650315880775452,
          'time': '2018-05-13T14:30:26.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 3,
        'sample': {
          'speed': 10.339502334594727,
          'longitude': 35.195281982421875,
          'latitude': 31.78014373779297,
          'accelAvgX': 0.43960174918174744,
          'accelAvgY': 9.88359546661377,
          'accelAvgZ': -0.8564364910125732,
          'accelPeakX': 1.158793568611145,
          'accelPeakY': 11.128249168395996,
          'accelPeakZ': 1.436521053314209,
          'time': '2018-05-13T14:30:31.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 4,
        'sample': {
          'speed': 10.86956787109375,
          'longitude': 35.19562911987305,
          'latitude': 31.78057289123535,
          'accelAvgX': 0.616219162940979,
          'accelAvgY': 9.76212215423584,
          'accelAvgZ': 1.1663157939910889,
          'accelPeakX': -0.8427590131759644,
          'accelPeakY': 11.262324333190918,
          'accelPeakZ': -1.4077905416488647,
          'time': '2018-05-13T14:30:36.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 5,
        'sample': {
          'speed': 9.914637565612793,
          'longitude': 35.19593811035156,
          'latitude': 31.780948638916016,
          'accelAvgX': 0.44864335656166077,
          'accelAvgY': 9.82904052734375,
          'accelAvgZ': 0.18767958879470825,
          'accelPeakX': 0.47884035110473633,
          'accelPeakY': 11.329362869262695,
          'accelPeakZ': -1.1300631761550903,
          'time': '2018-05-13T14:30:41.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 6,
        'sample': {
          'speed': 11.161829948425293,
          'longitude': 35.19625473022461,
          'latitude': 31.78134536743164,
          'accelAvgX': 0.5392979979515076,
          'accelAvgY': 10.029852867126465,
          'accelAvgZ': -0.6189569234848022,
          'accelPeakX': 0.4596867263317108,
          'accelPeakY': 11.60708999633789,
          'accelPeakZ': -1.1683704853057861,
          'time': '2018-05-13T14:30:46.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 7,
        'sample': {
          'speed': 13.55124568939209,
          'longitude': 35.196624755859375,
          'latitude': 31.78180503845215,
          'accelAvgX': 0.2032291442155838,
          'accelAvgY': 9.801586151123047,
          'accelAvgZ': -0.33162808418273926,
          'accelPeakX': 0.6703764796257019,
          'accelPeakY': 11.980585098266602,
          'accelPeakZ': 1.4460978507995605,
          'time': '2018-05-13T14:30:51.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 8,
        'sample': {
          'speed': 14.604814529418945,
          'longitude': 35.19706726074219,
          'latitude': 31.7823486328125,
          'accelAvgX': 0.6418656706809998,
          'accelAvgY': 9.759581565856934,
          'accelAvgZ': 0.7588412165641785,
          'accelPeakX': 0.5363011956214905,
          'accelPeakY': 11.894393920898438,
          'accelPeakZ': 2.5953147411346436,
          'time': '2018-05-13T14:30:56.000Z'
        }
      },
      {
        'reportNumber': 9,
        'sampleNumber': 9,
        'sample': {
          'speed': 15.12549877166748,
          'longitude': 35.19751739501953,
          'latitude': 31.78288459777832,
          'accelAvgX': 0.42556232213974,
          'accelAvgY': 9.742713928222656,
          'accelAvgZ': -0.4192335605621338,
          'accelPeakX': 0.4692635238170624,
          'accelPeakY': 11.41555404663086,
          'accelPeakZ': 0.4118026793003082,
          'time': '2018-05-13T14:31:01.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 0,
        'sample': {
          'speed': 16.69053840637207,
          'longitude': 35.1979866027832,
          'latitude': 31.783466339111328,
          'accelAvgX': 0.53529953956604,
          'accelAvgY': 9.715112686157227,
          'accelAvgZ': 0.1357789933681488,
          'accelPeakX': -0.2106897532939911,
          'accelPeakY': 11.463438034057617,
          'accelPeakZ': -0.43095630407333374,
          'time': '2018-05-13T14:31:06.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 1,
        'sample': {
          'speed': 17.0839900970459,
          'longitude': 35.198490142822266,
          'latitude': 31.784088134765625,
          'accelAvgX': 0.43815678358078003,
          'accelAvgY': 10.287456512451172,
          'accelAvgZ': 0.2815803587436676,
          'accelPeakX': 1.6280571222305298,
          'accelPeakY': 11.942277908325195,
          'accelPeakZ': 1.0534487962722778,
          'time': '2018-05-13T14:31:11.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 2,
        'sample': {
          'speed': 18.067626953125,
          'longitude': 35.19902038574219,
          'latitude': 31.784730911254883,
          'accelAvgX': 0.9565291404724121,
          'accelAvgY': 10.156264305114746,
          'accelAvgZ': -0.14854758977890015,
          'accelPeakX': 0.4213795065879822,
          'accelPeakY': 12.641385078430176,
          'accelPeakZ': -0.7086837291717529,
          'time': '2018-05-13T14:31:16.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 3,
        'sample': {
          'speed': 18.590341567993164,
          'longitude': 35.1995849609375,
          'latitude': 31.785404205322266,
          'accelAvgX': 0.40053942799568176,
          'accelAvgY': 9.719152450561523,
          'accelAvgZ': 0.6488357782363892,
          'accelPeakX': -1.5131354331970215,
          'accelPeakY': 11.865663528442383,
          'accelPeakZ': 0.507570743560791,
          'time': '2018-05-13T14:31:21.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 4,
        'sample': {
          'speed': 18.53414535522461,
          'longitude': 35.200042724609375,
          'latitude': 31.786149978637695,
          'accelAvgX': 0.27483299374580383,
          'accelAvgY': 9.758752822875977,
          'accelAvgZ': 0.7528443336486816,
          'accelPeakX': 0.05746084079146385,
          'accelPeakY': 12.430695533752441,
          'accelPeakZ': 0.9672574996948242,
          'time': '2018-05-13T14:31:26.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 5,
        'sample': {
          'speed': 19.557584762573242,
          'longitude': 35.20030212402344,
          'latitude': 31.786972045898438,
          'accelAvgX': 0.21228250861167908,
          'accelAvgY': 9.820337295532227,
          'accelAvgZ': 0.9335842132568359,
          'accelPeakX': 0.49799394607543945,
          'accelPeakY': 11.329362869262695,
          'accelPeakZ': 2.365471363067627,
          'time': '2018-05-13T14:31:31.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 6,
        'sample': {
          'speed': 20.518484115600586,
          'longitude': 35.20034408569336,
          'latitude': 31.787845611572266,
          'accelAvgX': 0.8783833980560303,
          'accelAvgY': 10.081725120544434,
          'accelAvgZ': 1.234464168548584,
          'accelPeakX': -0.4884171485900879,
          'accelPeakY': 11.693281173706055,
          'accelPeakZ': 2.8443117141723633,
          'time': '2018-05-13T14:31:36.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 7,
        'sample': {
          'speed': 21.270959854125977,
          'longitude': 35.200138092041016,
          'latitude': 31.788740158081055,
          'accelAvgX': 0.3909947872161865,
          'accelAvgY': 9.70943546295166,
          'accelAvgZ': 1.2182519435882568,
          'accelPeakX': 0.7469909191131592,
          'accelPeakY': 11.501745223999023,
          'accelPeakZ': 3.1890766620635986,
          'time': '2018-05-13T14:31:41.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 8,
        'sample': {
          'speed': 19.684934616088867,
          'longitude': 35.19974136352539,
          'latitude': 31.789531707763672,
          'accelAvgX': 1.1064717769622803,
          'accelAvgY': 9.79324722290039,
          'accelAvgZ': 0.9911248683929443,
          'accelPeakX': 0.7948749661445618,
          'accelPeakY': 11.520898818969727,
          'accelPeakZ': 2.0877439975738525,
          'time': '2018-05-13T14:31:46.000Z'
        }
      },
      {
        'reportNumber': 10,
        'sampleNumber': 9,
        'sample': {
          'speed': 21.759559631347656,
          'longitude': 35.19933319091797,
          'latitude': 31.79032325744629,
          'accelAvgX': 0.6948367953300476,
          'accelAvgY': 9.840219497680664,
          'accelAvgZ': 0.43110162019729614,
          'accelPeakX': 0.5841852426528931,
          'accelPeakY': 12.200851440429688,
          'accelPeakZ': -0.3926490843296051,
          'time': '2018-05-13T14:31:51.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 0,
        'sample': {
          'speed': 24.16947364807129,
          'longitude': 35.19886779785156,
          'latitude': 31.791261672973633,
          'accelAvgX': 0.3692137897014618,
          'accelAvgY': 9.666426658630371,
          'accelAvgZ': 1.0820897817611694,
          'accelPeakX': 0.7661445140838623,
          'accelPeakY': 12.469002723693848,
          'accelPeakZ': 3.7445313930511475,
          'time': '2018-05-13T14:31:56.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 1,
        'sample': {
          'speed': 19.564302444458008,
          'longitude': 35.19881057739258,
          'latitude': 31.79125213623047,
          'accelAvgX': 1.575356125831604,
          'accelAvgY': 9.900945663452148,
          'accelAvgZ': 1.5781407356262207,
          'accelPeakX': -0.4692635238170624,
          'accelPeakY': 12.938265800476074,
          'accelPeakZ': 0.43095630407333374,
          'time': '2018-05-13T14:32:01.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 2,
        'sample': {
          'speed': 15.690656661987305,
          'longitude': 35.198638916015625,
          'latitude': 31.791988372802734,
          'accelAvgX': 0.6114791631698608,
          'accelAvgY': 9.708427429199219,
          'accelAvgZ': 1.5561009645462036,
          'accelPeakX': -1.072602391242981,
          'accelPeakY': 11.980585098266602,
          'accelPeakZ': 3.1507694721221924,
          'time': '2018-05-13T14:32:06.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 3,
        'sample': {
          'speed': 16.3317928314209,
          'longitude': 35.198577880859375,
          'latitude': 31.79268455505371,
          'accelAvgX': 0.5879058241844177,
          'accelAvgY': 10.270126342773438,
          'accelAvgZ': 0.7159749269485474,
          'accelPeakX': 0.3447650372982025,
          'accelPeakY': 11.827356338500977,
          'accelPeakZ': 4.443638324737549,
          'time': '2018-05-13T14:32:11.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 4,
        'sample': {
          'speed': 20.199047088623047,
          'longitude': 35.19846725463867,
          'latitude': 31.793485641479492,
          'accelAvgX': 0.22396071255207062,
          'accelAvgY': 8.526238441467285,
          'accelAvgZ': 0.7764613628387451,
          'accelPeakX': 2.585737943649292,
          'accelPeakY': 13.014880180358887,
          'accelPeakZ': 4.663905143737793,
          'time': '2018-05-13T14:32:16.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 5,
        'sample': {
          'speed': 21.96983528137207,
          'longitude': 35.1981315612793,
          'latitude': 31.79437828063965,
          'accelAvgX': 0.5414215922355652,
          'accelAvgY': 9.439339637756348,
          'accelAvgZ': 0.6505488753318787,
          'accelPeakX': -1.6184803247451782,
          'accelPeakY': 13.503297805786133,
          'accelPeakZ': 3.8977603912353516,
          'time': '2018-05-13T14:32:21.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 6,
        'sample': {
          'speed': 22.334529876708984,
          'longitude': 35.1977424621582,
          'latitude': 31.79532241821289,
          'accelAvgX': 2.0584616661071777,
          'accelAvgY': 9.564921379089355,
          'accelAvgZ': 0.7575360536575317,
          'accelPeakX': -0.9097966551780701,
          'accelPeakY': 13.350069046020508,
          'accelPeakZ': 4.3191399574279785,
          'time': '2018-05-13T14:32:26.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 7,
        'sample': {
          'speed': 23.324609756469727,
          'longitude': 35.197635650634766,
          'latitude': 31.79633331298828,
          'accelAvgX': 2.194852590560913,
          'accelAvgY': 9.250700950622559,
          'accelAvgZ': 0.848013162612915,
          'accelPeakX': 3.6104562282562256,
          'accelPeakY': 11.865663528442383,
          'accelPeakZ': 4.185064792633057,
          'time': '2018-05-13T14:32:31.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 8,
        'sample': {
          'speed': 25.024547576904297,
          'longitude': 35.19792175292969,
          'latitude': 31.797361373901367,
          'accelAvgX': 2.705566644668579,
          'accelAvgY': 10.239542007446289,
          'accelAvgZ': 1.0576322078704834,
          'accelPeakX': 1.0055646896362305,
          'accelPeakY': 12.717999458312988,
          'accelPeakZ': 3.5434184074401855,
          'time': '2018-05-13T14:32:36.000Z'
        }
      },
      {
        'reportNumber': 11,
        'sampleNumber': 9,
        'sample': {
          'speed': 23.806743621826172,
          'longitude': 35.19865417480469,
          'latitude': 31.79823875427246,
          'accelAvgX': 2.7841575145721436,
          'accelAvgY': 9.175117492675781,
          'accelAvgZ': 1.1325898170471191,
          'accelPeakX': 3.648763418197632,
          'accelPeakY': 11.683704376220703,
          'accelPeakZ': 0.8906430602073669,
          'time': '2018-05-13T14:32:41.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 0,
        'sample': {
          'speed': 23.749202728271484,
          'longitude': 35.19968795776367,
          'latitude': 31.798749923706055,
          'accelAvgX': 2.5655126571655273,
          'accelAvgY': 10.138680458068848,
          'accelAvgZ': 0.6128324270248413,
          'accelPeakX': 3.620033025741577,
          'accelPeakY': 11.262324333190918,
          'accelPeakZ': 3.6583402156829834,
          'time': '2018-05-13T14:32:47.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 1,
        'sample': {
          'speed': 24.991374969482422,
          'longitude': 35.20095443725586,
          'latitude': 31.798887252807617,
          'accelAvgX': 1.0693469047546387,
          'accelAvgY': 8.969221115112305,
          'accelAvgZ': 1.1389821767807007,
          'accelPeakX': -0.4692635238170624,
          'accelPeakY': 13.589488983154297,
          'accelPeakZ': 0.7852981686592102,
          'time': '2018-05-13T14:32:52.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 2,
        'sample': {
          'speed': 26.68656349182129,
          'longitude': 35.20232391357422,
          'latitude': 31.798995971679688,
          'accelAvgX': -0.4709409773349762,
          'accelAvgY': 10.071816444396973,
          'accelAvgZ': 1.0113086700439453,
          'accelPeakX': -2.0398597717285156,
          'accelPeakY': 13.014880180358887,
          'accelPeakZ': 4.501099109649658,
          'time': '2018-05-13T14:32:57.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 3,
        'sample': {
          'speed': 26.725772857666016,
          'longitude': 35.20359802246094,
          'latitude': 31.79952049255371,
          'accelAvgX': -0.7676196098327637,
          'accelAvgY': 9.161149024963379,
          'accelAvgZ': 1.5545668601989746,
          'accelPeakX': -0.6607996821403503,
          'accelPeakY': 13.991714477539062,
          'accelPeakZ': 3.6391866207122803,
          'time': '2018-05-13T14:33:02.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 4,
        'sample': {
          'speed': 23.281007766723633,
          'longitude': 35.20449447631836,
          'latitude': 31.800342559814453,
          'accelAvgX': -0.010724231600761414,
          'accelAvgY': 10.009767532348633,
          'accelAvgZ': 0.535805881023407,
          'accelPeakX': -2.6623523235321045,
          'accelPeakY': 15.188815116882324,
          'accelPeakZ': 3.3901896476745605,
          'time': '2018-05-13T14:33:07.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 5,
        'sample': {
          'speed': 21.38180923461914,
          'longitude': 35.20488739013672,
          'latitude': 31.801267623901367,
          'accelAvgX': -0.7229406237602234,
          'accelAvgY': 9.339139938354492,
          'accelAvgZ': 0.421259343624115,
          'accelPeakX': -0.2298433631658554,
          'accelPeakY': 13.10107135772705,
          'accelPeakZ': 1.7142484188079834,
          'time': '2018-05-13T14:33:12.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 6,
        'sample': {
          'speed': 23.355792999267578,
          'longitude': 35.204933166503906,
          'latitude': 31.802265167236328,
          'accelAvgX': 0.9365367293357849,
          'accelAvgY': 9.496421813964844,
          'accelAvgZ': 0.42788493633270264,
          'accelPeakX': -1.3982137441635132,
          'accelPeakY': 12.880805015563965,
          'accelPeakZ': 1.0821791887283325,
          'time': '2018-05-13T14:33:17.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 7,
        'sample': {
          'speed': 24.574277877807617,
          'longitude': 35.20494079589844,
          'latitude': 31.80336570739746,
          'accelAvgX': 1.5318865776062012,
          'accelAvgY': 10.078657150268555,
          'accelAvgZ': 1.2470247745513916,
          'accelPeakX': 1.3982137441635132,
          'accelPeakY': 12.986149787902832,
          'accelPeakZ': 3.00711727142334,
          'time': '2018-05-13T14:33:22.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 8,
        'sample': {
          'speed': 25.22943115234375,
          'longitude': 35.20512771606445,
          'latitude': 31.804447174072266,
          'accelAvgX': 2.506312847137451,
          'accelAvgY': 10.053842544555664,
          'accelAvgZ': 0.029450595378875732,
          'accelPeakX': 1.9153614044189453,
          'accelPeakY': 11.66455078125,
          'accelPeakZ': 1.0342950820922852,
          'time': '2018-05-13T14:33:27.000Z'
        }
      },
      {
        'reportNumber': 12,
        'sampleNumber': 9,
        'sample': {
          'speed': 26.28815269470215,
          'longitude': 35.20578384399414,
          'latitude': 31.805461883544922,
          'accelAvgX': 0.7946898341178894,
          'accelAvgY': 9.426302909851074,
          'accelAvgZ': 0.6926295161247253,
          'accelPeakX': 1.1683704853057861,
          'accelPeakY': 13.656526565551758,
          'accelPeakZ': 5.085284233093262,
          'time': '2018-05-13T14:33:32.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 0,
        'sample': {
          'speed': 26.965627670288086,
          'longitude': 35.20664596557617,
          'latitude': 31.806398391723633,
          'accelAvgX': 0.7822629809379578,
          'accelAvgY': 10.568483352661133,
          'accelAvgZ': 0.9863117933273315,
          'accelPeakX': -0.4405331015586853,
          'accelPeakY': 11.559206008911133,
          'accelPeakZ': 3.2752678394317627,
          'time': '2018-05-13T14:33:37.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 1,
        'sample': {
          'speed': 26.784564971923828,
          'longitude': 35.207523345947266,
          'latitude': 31.80736541748047,
          'accelAvgX': 0.8314425349235535,
          'accelAvgY': 11.783919334411621,
          'accelAvgZ': 1.1697975397109985,
          'accelPeakX': 0.2968810200691223,
          'accelPeakY': 14.882357597351074,
          'accelPeakZ': 3.1028854846954346,
          'time': '2018-05-13T14:33:42.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 2,
        'sample': {
          'speed': 27.180400848388672,
          'longitude': 35.20839309692383,
          'latitude': 31.80834197998047,
          'accelAvgX': 1.502321720123291,
          'accelAvgY': 9.875371932983398,
          'accelAvgZ': 0.9785127639770508,
          'accelPeakX': 2.2026655673980713,
          'accelPeakY': 13.48414421081543,
          'accelPeakZ': 4.175487995147705,
          'time': '2018-05-13T14:33:47.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 3,
        'sample': {
          'speed': 27.714841842651367,
          'longitude': 35.20927810668945,
          'latitude': 31.809328079223633,
          'accelAvgX': 0.8994208574295044,
          'accelAvgY': 9.83663272857666,
          'accelAvgZ': 0.49011749029159546,
          'accelPeakX': 1.886630892753601,
          'accelPeakY': 12.890381813049316,
          'accelPeakZ': 1.9632453918457031,
          'time': '2018-05-13T14:33:52.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 4,
        'sample': {
          'speed': 27.996768951416016,
          'longitude': 35.210208892822266,
          'latitude': 31.810327529907227,
          'accelAvgX': 0.49611371755599976,
          'accelAvgY': 9.877229690551758,
          'accelAvgZ': 0.9545623064041138,
          'accelPeakX': -1.1779472827911377,
          'accelPeakY': 13.809755325317383,
          'accelPeakZ': 4.3191399574279785,
          'time': '2018-05-13T14:33:57.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 5,
        'sample': {
          'speed': 25.87373161315918,
          'longitude': 35.21112060546875,
          'latitude': 31.811296463012695,
          'accelAvgX': 0.7596805095672607,
          'accelAvgY': 9.870863914489746,
          'accelAvgZ': 2.0509467124938965,
          'accelPeakX': 1.4460978507995605,
          'accelPeakY': 12.038045883178711,
          'accelPeakZ': 2.9688100814819336,
          'time': '2018-05-13T14:34:02.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 6,
        'sample': {
          'speed': 23.25560188293457,
          'longitude': 35.21175003051758,
          'latitude': 31.812231063842773,
          'accelAvgX': 0.4203970730304718,
          'accelAvgY': 9.799236297607422,
          'accelAvgZ': 0.6177024841308594,
          'accelPeakX': -0.28730419278144836,
          'accelPeakY': 12.440272331237793,
          'accelPeakZ': 4.3191399574279785,
          'time': '2018-05-13T14:34:07.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 7,
        'sample': {
          'speed': 23.17253875732422,
          'longitude': 35.21205520629883,
          'latitude': 31.813243865966797,
          'accelAvgX': 0.2946871519088745,
          'accelAvgY': 10.05864143371582,
          'accelAvgZ': 0.756065845489502,
          'accelPeakX': -0.7661445140838623,
          'accelPeakY': 11.808202743530273,
          'accelPeakZ': 2.470816135406494,
          'time': '2018-05-13T14:34:12.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 8,
        'sample': {
          'speed': 24.211545944213867,
          'longitude': 35.21207809448242,
          'latitude': 31.814306259155273,
          'accelAvgX': 0.8526225686073303,
          'accelAvgY': 9.6947603225708,
          'accelAvgZ': -0.0809287428855896,
          'accelPeakX': 2.4803929328918457,
          'accelPeakY': 15.476119995117188,
          'accelPeakZ': -0.9959878921508789,
          'time': '2018-05-13T14:34:17.000Z'
        }
      },
      {
        'reportNumber': 13,
        'sampleNumber': 9,
        'sample': {
          'speed': 24.2198543548584,
          'longitude': 35.21205139160156,
          'latitude': 31.815391540527344,
          'accelAvgX': 0.8457528948783875,
          'accelAvgY': 10.186606407165527,
          'accelAvgZ': 0.6730034351348877,
          'accelPeakX': -1.50355863571167,
          'accelPeakY': 14.001291275024414,
          'accelPeakZ': 9.050082206726074,
          'time': '2018-05-13T14:34:22.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 0,
        'sample': {
          'speed': 23.913393020629883,
          'longitude': 35.212032318115234,
          'latitude': 31.816476821899414,
          'accelAvgX': 1.3216608762741089,
          'accelAvgY': 9.795574188232422,
          'accelAvgZ': 0.22347845137119293,
          'accelPeakX': 0.9768342971801758,
          'accelPeakY': 11.501745223999023,
          'accelPeakZ': -7.862558364868164,
          'time': '2018-05-13T14:34:27.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 1,
        'sample': {
          'speed': 24.367427825927734,
          'longitude': 35.21220016479492,
          'latitude': 31.817564010620117,
          'accelAvgX': 0.8798452019691467,
          'accelAvgY': 10.049661636352539,
          'accelAvgZ': 0.6282836198806763,
          'accelPeakX': 3.88818359375,
          'accelPeakY': 12.191274642944336,
          'accelPeakZ': 3.4093432426452637,
          'time': '2018-05-13T14:34:32.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 2,
        'sample': {
          'speed': 24.416217803955078,
          'longitude': 35.21256637573242,
          'latitude': 31.818622589111328,
          'accelAvgX': 1.040252923965454,
          'accelAvgY': 9.623051643371582,
          'accelAvgZ': -0.15313827991485596,
          'accelPeakX': 0.4884171485900879,
          'accelPeakY': 11.750741958618164,
          'accelPeakZ': 3.801992416381836,
          'time': '2018-05-13T14:34:37.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 3,
        'sample': {
          'speed': 24.485437393188477,
          'longitude': 35.21306228637695,
          'latitude': 31.819643020629883,
          'accelAvgX': 0.3646532893180847,
          'accelAvgY': 9.930309295654297,
          'accelAvgZ': 0.3960980474948883,
          'accelPeakX': 0.3256114423274994,
          'accelPeakY': 12.928689002990723,
          'accelPeakZ': 1.1492167711257935,
          'time': '2018-05-13T14:34:42.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 4,
        'sample': {
          'speed': 25.175010681152344,
          'longitude': 35.21360397338867,
          'latitude': 31.820659637451172,
          'accelAvgX': 0.6684005856513977,
          'accelAvgY': 10.092534065246582,
          'accelAvgZ': 0.8028905391693115,
          'accelPeakX': 1.9728221893310547,
          'accelPeakY': 13.656526565551758,
          'accelPeakZ': 3.227383852005005,
          'time': '2018-05-13T14:34:47.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 5,
        'sample': {
          'speed': 26.140077590942383,
          'longitude': 35.21414566040039,
          'latitude': 31.821739196777344,
          'accelAvgX': 0.1546216905117035,
          'accelAvgY': 10.357484817504883,
          'accelAvgZ': 0.36697065830230713,
          'accelPeakX': 0.24899697303771973,
          'accelPeakY': 12.986149787902832,
          'accelPeakZ': 4.7405195236206055,
          'time': '2018-05-13T14:34:52.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 6,
        'sample': {
          'speed': 27.087284088134766,
          'longitude': 35.21446228027344,
          'latitude': 31.822887420654297,
          'accelAvgX': -0.24015673995018005,
          'accelAvgY': 9.85425853729248,
          'accelAvgZ': 0.2851654887199402,
          'accelPeakX': 1.139639973640442,
          'accelPeakY': 13.273454666137695,
          'accelPeakZ': 5.765237808227539,
          'time': '2018-05-13T14:34:57.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 7,
        'sample': {
          'speed': 27.63131332397461,
          'longitude': 35.21450424194336,
          'latitude': 31.824098587036133,
          'accelAvgX': -0.0461982786655426,
          'accelAvgY': 9.993058204650879,
          'accelAvgZ': 0.30603498220443726,
          'accelPeakX': -1.1875240802764893,
          'accelPeakY': 14.30774974822998,
          'accelPeakZ': 4.654327869415283,
          'time': '2018-05-13T14:35:02.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 8,
        'sample': {
          'speed': 27.505462646484375,
          'longitude': 35.21427917480469,
          'latitude': 31.825313568115234,
          'accelAvgX': 0.3736765384674072,
          'accelAvgY': 10.102218627929688,
          'accelAvgZ': 0.644578218460083,
          'accelPeakX': -0.181959331035614,
          'accelPeakY': 12.708422660827637,
          'accelPeakZ': 5.324704647064209,
          'time': '2018-05-13T14:35:07.000Z'
        }
      },
      {
        'reportNumber': 14,
        'sampleNumber': 9,
        'sample': {
          'speed': 27.472925186157227,
          'longitude': 35.213809967041016,
          'latitude': 31.826465606689453,
          'accelAvgX': 0.8021966814994812,
          'accelAvgY': 9.762845993041992,
          'accelAvgZ': -0.01418142020702362,
          'accelPeakX': -0.10534487664699554,
          'accelPeakY': 11.769895553588867,
          'accelPeakZ': 1.723825216293335,
          'time': '2018-05-13T14:35:12.000Z'
        }
      }
    ]
  };
}
