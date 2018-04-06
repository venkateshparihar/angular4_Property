import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let propertys = [
      {id: 11, name: 'everest',category:'residential',estYear:'2016',area:'500',price:"1500000"},
      {id: 12, name: 'chintan',category:'commercial',estYear:'2015',area:'500',price:"1500000"},
      {id: 13, name: 'sushanti',category:'commercial',estYear:'2016',area:'500',price:"1500000"},
      {id: 14, name: 'rajmoti',category:'residential',estYear:'2015',area:'500',price:"1500000"},
      {id: 15, name: 'rajmoti-2',category:'commercial',estYear:'2016',area:'500',price:"1500000"},
      {id: 16, name: 'pramukh',category:'commercial',estYear:'2012',area:'500',price:"1500000"},
      {id: 17, name: 'snehkunj',category:'residential',estYear:'2012',area:'500',price:"1500000"},
      {id: 18, name: 'avenue',category:'commercial',estYear:'2016',area:'500',price:"1500000"},
      {id: 19, name: 'advance society',category:'commercial',estYear:'2014',area:'500',price:"1500000"},
      {id: 20, name: 'kamdhenu',category:'residential',estYear:'2013',area:'500',price:"1500000"}
    ];
    return {propertys};
  }
}
