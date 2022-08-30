import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public city: any;
  public data: any;
  public cloudy: boolean = true;
  public timeStamp: number = 0;
  public timeStampIndex: number = 0;
  public sunset?: Date;
  public sunrise?: Date;
  public conditions: string = '';
  constructor(
    private weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    if ('city' in localStorage) {
      this.weatherService.getWeather(localStorage.getItem('city'))
        .subscribe({
          next: (response) => {
            this.timeStamp = Date.now();
            for (let i = 0; i < response.list.length; i++) {
              if (this.timeStamp < response.list[i].dt) {
                this.timeStampIndex = i;
                break;
              }
            }
            this.city = response.city;
            this.data = response.list[this.timeStampIndex];
            this.conditions = response.list[this.timeStampIndex].weather[this.timeStampIndex].main;
            this.sunrise = new Date(this.city.sunrise * 1000);
            this.sunset = new Date(this.city.sunset * 1000);
          }
          ,
          error: () => {
            alert('ENTERED CITY MAY BE SPELLED INCORRECTLY OR ITS DATA IS NOT AVAILABLE');
            localStorage.removeItem('city');
            localStorage.setItem('city', 'islamabad')
            this.weatherService.getWeather('islamabad')
              .subscribe({
                next: (response) => {
                  this.timeStamp = Date.now();
                  for (let i = 0; i < response.list.length; i++) {
                    if (this.timeStamp < response.list[i].dt) {
                      this.timeStampIndex = i;
                      break;
                    }
                  }
                  this.city = response.city;
                  this.data = response.list[this.timeStampIndex];
                  this.conditions = response.list[this.timeStampIndex].weather[this.timeStampIndex].main;
                  this.sunrise = new Date(this.city.sunrise * 1000);
                  this.sunset = new Date(this.city.sunset * 1000);
                }
              });
          }
        });
    } else {
      this.weatherService.getWeather('islamabad')
        .subscribe({
          next: (response) => {
            this.timeStamp = Date.now();
            for (let i = 0; i < response.list.length; i++) {
              if (this.timeStamp < response.list[i].dt) {
                this.timeStampIndex = i;
                break;
              }
            }
            this.city = response.city;
            this.data = response.list[this.timeStampIndex];
            this.conditions = response.list[this.timeStampIndex].weather[this.timeStampIndex].main;
            this.sunrise = new Date(this.city.sunrise * 1000);
            this.sunset = new Date(this.city.sunset * 1000);
          }
        });
    }
  }
}
