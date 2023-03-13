import { AfterViewInit, Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import * as d3 from 'd3';
import * as ol from 'ol';
import Vector from 'ol/source/Vector';
import Group from 'ol/layer/Group';
import { Tile } from 'ol/layer';
import { Select } from 'ol/interaction';
import { InteractService } from '../interact-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  constructor(private interactService: InteractService) { }
  map: any;

  source = new VectorSource({
    url: 'http://127.0.0.1:8080/network',
    format: new GeoJSON(),
  });

  VectorLayer = new VectorLayer({
    source: this.source,
    visible: true,
    opacity: 0.80,

    style: function (feature): any {
      // console.log(feature.getProperties()['tweet_count'] / 1000)
      return new Style({
        fill: new Fill({
          color: d3.interpolateReds(feature.getProperties()['tweet_count'] / 1000),
        }),
      })
    }
  });

  layerGroup = new Group({
    layers: [this.VectorLayer],
  });

  getCountry() {
    const select = new Select();

    this.map.addInteraction(select);

    select.on('select', (event: any) => {
      const feature = event.target.getFeatures().item(0);
      if (feature) {
        const countryName = feature.getProperties()['ADMIN'];
        console.log(countryName);
        const sentimentData = feature.getProperties()['sentiment'];
        this.updateValues(sentimentData);
      }
    });
  }


  initialize() {
    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new XYZ({
            url:
              'https://api.maptiler.com/maps/positron/256/{z}/{x}/{y}.png?key=KymX1xZCJcVU9j6RwwkM',
          })
        }),
        this.layerGroup,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });
  }
  ngAfterViewInit(): void {
    this.initialize();
    this.getCountry();
  }
  updateValues(sentimentData: any) {
    // Emit new values to chart component using interact service
    this.interactService.sendSentiment(sentimentData);
  }
}