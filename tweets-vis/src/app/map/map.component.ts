import { AfterViewInit, Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map: any;

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url:
              'https://api.maptiler.com/maps/positron/256/{z}/{x}/{y}.png?key=KymX1xZCJcVU9j6RwwkM',
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });
  }
}
