import { AfterViewInit, Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import * as d3 from 'd3';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tile } from 'ol/layer';
import { Select } from 'ol/interaction';
import { InteractService } from '../interact-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  constructor(private interactService: InteractService, private http: HttpClient) { }

  map: any;
  color: any;
  geojson: any;
  vectorSource: any;
  vectorLayer: any

  colorPicker() {
    this.interactService.year$
      .subscribe(
        Year => {
          this.vectorLayer.setVisible(false);
          if (Year == 2020) {
            this.fetchGeoJson('../../assets/countries_count_sentiment_2020.geojson')
          }
          else if (Year == 2021) {
            this.fetchGeoJson('../../assets/countries_count_sentiment_2021.geojson')
          }
          else if (Year == 2022) {
            this.fetchGeoJson('../../assets/countries_count_sentiment_2022.geojson')
          }
          else {
            //this.fetchGeoJson('../../assets/countries_count_sentiment_2023.geojson')
          }
        }
      )
  }

  legendCreator() {
    var thresholds = d3.range(0, 101, 20);

    var colorScale = d3.scaleSequential(d3.interpolateReds)
      .domain([0, 2800]);

    // Define the legend element
    var legend = d3.select("#legend");

    // Generate a legend using a series of divs with background colors
    legend.selectAll("div")
      .data(thresholds)
      .enter().append("div")
      .style("display", "inline-block")
      .style("width", "20px")
      .style("height", "20px")
      .style("background-color", function (d) { return colorScale(d); });

    // Add labels for the legend
    legend.append("div")
      .text(0)
      .style("text-align", "left")
      .style("display", "inline-block")
      .style("width", "20px");

    legend.append("div")
      .text(2800)
      .style("text-align", "right")
      .style("display", "inline-block")
      .style("width", "20px");
  }

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
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });
  }

  fetchGeoJson(URL: any): void {
    this.vectorSource = new VectorSource({
      url: URL,
      format: new GeoJSON(),
    });
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      visible: true,
      opacity: 0.5,
      style: function (feature): any {
        // console.log(feature.getProperties()['tweet_count'] / 1000)
        // console.log(d3.interpolateReds(feature.getProperties()['tweet_count'] / 10))
        if (feature.getProperties()['tweet_count'] !== undefined) {
          return new Style({
            fill: new Fill({
              color: d3.interpolateReds(feature.getProperties()['tweet_count'] / 5),
            }),
          })
        }
      }
    });
    this.map.addLayer(this.vectorLayer)
  }

  ngAfterViewInit(): void {
    // this.sendData();
    this.initialize();
    this.fetchGeoJson('../../assets/countries_count_sentiment_2020.geojson');
    this.colorPicker();
    this.getCountry();
    // this.legendCreator();
  }
  updateValues(sentimentData: any) {
    // Emit new values to chart component using interact service
    this.interactService.sendSentiment(sentimentData);
  }
}
