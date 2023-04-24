import { AfterViewInit, Component } from '@angular/core';
import * as d3 from 'd3';
import { InteractService } from '../interact-service.service';

@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.css']
})
export class TimeSeriesComponent implements AfterViewInit {
  constructor(private interactService: InteractService) { }

  svg: any;
  margin: any;
  width: any;
  height: any;
  card: boolean | undefined;
  showCard() {
    this.card = true;
  }
  hideCard() {
    this.card = false;
  }

  colorPicker() {
    this.interactService.year$
      .subscribe(
        Year => {
          if (Year == 2020) {
            console.log(Year);
            this.timeSeriesGenerator("../../assets/forecast2020_split.csv");
          }
          else if (Year == 2021) {
            console.log(Year);
            this.timeSeriesGenerator("../../assets/forecast2021_split.csv");
          }
          else if (Year == 2022) {
            console.log(Year);
            this.timeSeriesGenerator("../../assets/forecast2022_split.csv");

          }
          else {
            console.log(Year);
          }
        }
      )
  }
  svgCreator() {
    this.margin = { top: 10, right: 30, bottom: 20, left: 40 },
      this.width = 1250 - this.margin.left - this.margin.right,
      this.height = 120 - this.margin.top - this.margin.bottom;

    // append the svg object to the body of the page
    this.svg = d3.select("#time-series")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
  }

  legendGenerator() {
    var svgLegend = d3.select("#legend")

    // Handmade legend
    svgLegend.append("circle").attr("cx", 150).attr("cy", 130).attr("r", 6).style("fill", "green")
    svgLegend.append("circle").attr("cx", 150).attr("cy", 145).attr("r", 6).style("fill", "red")
    svgLegend.append("circle").attr("cx", 150).attr("cy", 160).attr("r", 6).style("fill", "steelblue")
    svgLegend.append("text").attr("x", 160).attr("y", 134).text("Predicted Price - Test").style("font-size", "15px").attr("alignment-baseline", "middle")
    svgLegend.append("text").attr("x", 160).attr("y", 149).text("Actual Price").style("font-size", "15px").attr("alignment-baseline", "middle")
    svgLegend.append("text").attr("x", 160).attr("y", 164).text("Predicted Price - Train").style("font-size", "15px").attr("alignment-baseline", "middle")
  }

  timeSeriesGenerator(csvFileName: any) {
    if (this.svg) {
      this.svg.selectAll("*").remove();
    }
    // Read the data
    d3.csv(csvFileName,
      // When reading the csv, format the data
      function (d: any) {
        return { date: new Date(d.Date), close: d.Close, result: d.Results_train, result_test: d.Results_test }
      }
    ).then((data) => {
      // Add X axis
      console.log(data.forEach((d) => console.log(d.close)))
      const xTent = d3.extent(data, d => d.date);
      const x = d3.scaleTime()
        .domain(<[Date, Date]>xTent)
        .range([0, this.width]);
      this.svg.append("g")
        .attr("transform", `translate(0, ${this.height})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.result; })])
        .range([this.height, 0]);
      this.svg.append("g")
        .call(d3.axisLeft(y));

      const resultPoints = data.map((d) => [x(d.date), y(d.result)]);
      const resultTestPoints = data.map((d) => [x(d.date), y(d.result_test)]);
      const closePoints = data.map((d) => [x(d.date), y(d.close)]);
      // Add the line
      this.svg.append("path")
        .datum(resultPoints)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line());

      this.svg.append("path")
        .datum(closePoints)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line());

      this.svg.append("path")
        .datum(resultTestPoints)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line());
    });

  }
  ngAfterViewInit(): void {
    this.svgCreator();
    this.legendGenerator();
    this.timeSeriesGenerator("../../assets/forecast2020_split.csv");
    this.colorPicker();
  }
}


