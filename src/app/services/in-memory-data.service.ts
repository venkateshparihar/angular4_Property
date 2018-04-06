import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let propertys = [
      {id: 11, name: 'Mrs. Nice',category:'residential',estYear:'2016',area:'500',price:"1500000"},
      {id: 12, name: 'Narco',category:'commercial',estYear:'2015',area:'500',price:"1500000"},
      {id: 13, name: 'Bombasto',category:'commercial',estYear:'2016',area:'500',price:"1500000"},
      {id: 14, name: 'Celeritas',category:'residential',estYear:'2015',area:'500',price:"1500000"},
      {id: 15, name: 'Magneta',category:'commercial',estYear:'2016',area:'500',price:"1500000"},
      {id: 16, name: 'RubberMan',category:'commercial',estYear:'2012',area:'500',price:"1500000"},
      {id: 17, name: 'Dynama',category:'residential',estYear:'2012',area:'500',price:"1500000"},
      {id: 18, name: 'Dr IQ',category:'commercial',estYear:'2016',area:'500',price:"1500000"},
      {id: 19, name: 'Magma',category:'commercial',estYear:'2014',area:'500',price:"1500000"},
      {id: 20, name: 'Tornado',category:'residential',estYear:'2013',area:'500',price:"1500000"}
    ];
    return {propertys};
  }
}
