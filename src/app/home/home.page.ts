import { Component, AfterViewInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  standalone: true
})
export class HomePage implements AfterViewInit {
  private map!: L.Map;
  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  async initMap(): Promise<void> {
    this.map = L.map('map').setView([4.60971, -74.08175], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([4.60971, -74.08175]).addTo(this.map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();

    setTimeout(() => {
      this.map.invalidateSize();
    },100);

    async function punto(){
      const point = await Geolocation.getCurrentPosition();
      console.log(point);
    }
  }
}
