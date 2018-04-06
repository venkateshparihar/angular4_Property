import { Component, OnInit } from '@angular/core';
import { Property } from './../models/property';
import { PropertyService } from './../services/property.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  propertys: Property[] = []; 
  public category: string[]; 
  public categorynum = []; 
  public est: string[]; 
  public estnum = []; 
 chart = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() 
  {
    this.propertyService.getPropertys().then((propertys) => {
      this.propertys = propertys;
      let prop = this.propertys;
      let cat = [];
      let num   = [];
      let est = [];
      let estnum   = [];
      for(var i=0;i<prop.length;i++)
      {
        if(cat.indexOf(prop[i].category) == -1)
        {
          cat[cat.length] = prop[i].category;
        }
        if(est.indexOf(prop[i].estYear) == -1)
        {
          est[est.length] = prop[i].estYear;
        }
        for(var i1=0;i1<cat.length;i1++)
        {
          if(cat[i1]==prop[i].category)
          {
              if(num[i1] == null)
              {
                num[i1] = parseInt("1");
              }
              else
              {
                num[i1] = parseInt(num[i1] + 1);
              }
          }
        }
        for(var i2=0;i2<est.length;i2++)
        {
          if(est[i2]==prop[i].estYear)
          {
              if(estnum[i2] == null)
              {
                estnum[i2] = parseInt("1");
              }
              else
              {
                estnum[i2] = parseInt(estnum[i2] + 1);
              }
          }
        }
      }
      for(var i1=0;i1<num.length;i1++)
      {
        this.categorynum[this.categorynum.length] = parseInt(num[i1]);
      } 
      for(var i1=0;i1<estnum.length;i1++)
      {
        this.estnum[this.estnum.length] = parseInt(estnum[i1]);
      } 
      this.category = cat;
      this.est = est;
    });
  }
  public doughnutChartLabels:string[] = this.category;
  public doughnutChartData:number[] = this.categorynum;
  public doughnutChartType:string = 'doughnut';


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
  {data: this.estnum, label: 'Property'},
  ];

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }

}
