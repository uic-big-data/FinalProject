import { AfterViewInit, Component } from '@angular/core';
import * as d3 from 'd3';
import { InteractService } from '../interact-service.service'



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  constructor(private interactService: InteractService) { }
  data: any;
  x: any;
  xAxis: any;
  y: any;
  yAxis: any;

  svg: any;
  margin = { top: 30, right: 30, bottom: 70, left: 60 };
  width = 300 - this.margin.left - this.margin.right;
  height = 250 - this.margin.top - this.margin.bottom;

  // Svg to visualize bar chart
  createSvg(): void {
    this.svg = d3.select("#bar")
      .append("svg")
      .attr("width", this.width + this.margin.right + this.margin.left)
      .attr("height", this.height + this.margin.bottom + this.margin.top)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.right + ")");
  }

  // drawbars for bar chart
  drawBars(data: any[]): void {

    this.x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map((d: any) => d.Framework))
      .padding(0.2);


    this.xAxis = this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")");

    this.y = d3.scaleLinear()
      .range([this.height, 0]);

    this.yAxis = this.svg.append("g")
      .attr("class", "myYaxis");
  }

  // update bars based on pixel values obtained from mapcomponent
  update(data: any) {

    this.xAxis.call(d3.axisBottom(this.x));

    this.y.domain([0, d3.max(data, (d: any) => d.Stars)]);
    this.yAxis.transition().duration(100).call(d3.axisLeft(this.y));

    var u = this.svg.selectAll("rect")
      .data(data)

    u
      .join("rect")
      .transition()
      .duration(1000)
      .attr("x", (d: any) => this.x(d.Framework))
      .attr("y", (d: any) => this.y(d.Stars))
      .attr("width", this.x.bandwidth())
      .attr("height", (d: any) => this.height - this.y(d.Stars))
      .attr("fill", "#6e84d1")
  }




  ngAfterViewInit(): void {
    this.interactService.sentiment$
      .subscribe(
        Sentiment => {
          if (Sentiment) {
            this.data = [
              { "Framework": "Summer", "Stars": Sentiment['positive'] },
              { "Framework": "Autumn", "Stars": Sentiment['negative'] },
              { "Framework": "Winter", "Stars": Sentiment['neutral'] },
            ];
            this.update(this.data);
          }
        }
      )
    this.data = [
      { "Framework": "Positive", "Stars": 78 },
      { "Framework": "Negative", "Stars": 20 },
      { "Framework": "Neutral", "Stars": 2 },
    ];

    this.createSvg();
    this.drawBars(this.data);
    this.update(this.data);
  }
}
