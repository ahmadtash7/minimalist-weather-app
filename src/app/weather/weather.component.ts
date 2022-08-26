import { Component, OnInit } from '@angular/core';
import { RootObject } from './models/weather.model';
import { ServicesService } from './services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public data: any;
  constructor(private weatherService: ServicesService) { }

  ngOnInit(): void {
    this.weatherService.getWeather('lahore')
      .subscribe({
        next: (response) => {
          this.data = response;
          console.log(response.list[0].main.temp);
        }
      })
  }

  // getWeatherData() {
  //   let data = JSON.parse('{"temp":300.84,"feels_like":304.22,"temp_min":300.22,"temp_max":300.84,"pressure":1005,"sea_level":1005,"grnd_level":947,"humidity":78,"temp_kf":0.62}');
  //   this.setWeatherData(data);
  // }

  // setWeatherData(data: any) {
  //   this.WeatherData = data;
  // }
}
