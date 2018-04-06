import {Component, OnInit} from '@angular/core';
import { Property } from './../../models/property';
import { PropertyService } from './../../services/property.service';

@Component({
	selector: 'app-property',
	templateUrl: './property.component.html',
	styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit 
{
  propertys: Property[] = [];
  public rows:Array<any> = [];
  public columns:Array<any> = [
	{title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
	{
		title: 'Category',
		name: 'category',
		sort: false,
		filtering: {filterString: '', placeholder: 'Filter by category'}
	},
	{title: 'Est Year.', name: 'estYear', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
  {title: 'Area', name: 'area',sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by Area.'}},
	{title: 'Price ($)', name: 'price',sort: 'asc'}	,
	{title: 'Edit', name: 'edit'} , {title: 'Delete', name: 'delete',}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any> = [];

  public constructor(private propertyService: PropertyService) {
    this.length = this.data.length;
  }

  public ngOnInit():void 
  {
      this.propertyService.getPropertys().then((propertys) => {
      this.propertys = propertys;
      this.data = this.propertys;
      for(var i=0;i<this.data.length;i++)
      {
        this.data[i]["delete"] =  '<a href="javascript:void(0)" (click)="delete('+JSON.stringify(this.data[i])+')"><i class="fa fa-trash-o fa-2x"></i></a>';
         this.data[i]["edit"] =  '<a href="#/app/edit-property/'+this.data[i]["id"]+'" ><i class="fa fa-edit fa-2x"></i></a>';
      }
      console.log("propertys",this.propertys);
      this.onChangeTable(this.config);
    });
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any 
  {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
      console.log(columns[i]);
    }


    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any 
  {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
   
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any 
  {
    if(data.column == "delete")
    {
      console.log(data.column);
      console.log(data.row["delete"]);
      var result = data.row["delete"].match(/\(({.*})\)/);
      var delData = JSON.parse(result[1]);
      console.log(delData);
       this.propertyService
        .delete(delData.id)
        .then(() => {
          this.propertys = this.propertys.filter(h => h !== delData);
           this.propertyService.getPropertys().then((propertys) => {
            this.propertys = propertys;
            this.data = this.propertys;
            for(var i=0;i<this.data.length;i++)
            {
              this.data[i]["delete"] =  '<a href="javascript:void(0)" (click)="delete('+JSON.stringify(this.data[i])+')"><i class="fa fa-trash-o fa-2x"></i></a>';
               this.data[i]["edit"] =  '<a href="#/app/edit-property/'+this.data[i]["id"]+'" ><i class="fa fa-edit fa-2x"></i></a>';
            }
            console.log("propertys",this.propertys);
            this.onChangeTable(this.config);
          });
        });
      }
   }
}