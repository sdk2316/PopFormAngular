
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  // createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
  //   throw new Error('Method not implemented.');
  // }


  createDb() {

    let users:User[] = [
      { id: 100,title:"Mr", firstName: 'Durgesh', lastName: 'Gupta', dob: '1995-09-23', email: 'dk@gmail.com', password: '1234567890', acceptTerms: true },
      { id: 105, title:"Mrs",firstName: 'Pravin', lastName: 'Gupta', dob: '1995-09-23', email: 'pravingmail.com', password: '1234567890', acceptTerms: true },
      { id: 106,title:"Mr", firstName: 'varsh', lastName: 'Gupta', dob: '1995-09-23', email: 'varsha@gmail.com', password: '1234567890', acceptTerms: true },
      { id: 109, title:"Mr",firstName: 'sam', lastName: 'Gupta', dob: '1995-09-23', email: 'sam@gmail.com', password: '1234567890', acceptTerms: true },
    ]
    return { users };
  }
}
