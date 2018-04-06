import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Property } from './../models/property';

@Injectable()
export class PropertyService {

  private propertysUrl = 'app/propertys';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getPropertys(): Promise<Property[]> {
    return this.http.get(this.propertysUrl)
      .toPromise()
      .then(response => response.json() as Property[])
      .catch(this.handleError);
  }

  getProperty(id: number): Promise<Property> {
    return this.getPropertys().then(propertys => propertys.find(property => property.id === id));
  }

  create(name: string,category:string,estYear:string,area :string,price :string): Promise<Property> {
    return this.http
      .post(this.propertysUrl, JSON.stringify({ name: name,category :category,estYear:estYear,area:area,price:price }), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(property: Property): Promise<Property> {
    const url = `${this.propertysUrl}/${property.id}`;
    return this.http.put(url, JSON.stringify(property), { headers: this.headers })
      .toPromise()
      .then(() => property)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.propertysUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
