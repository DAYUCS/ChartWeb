import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the InvoiceApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InvoiceApiProvider {

  private url: string = 'http://10.39.101.14:9080/rest/invoice';

  constructor(public http: HttpClient) {
  }

  getInvoices() {
    return new Promise(resolve => {
      this.http.get(this.url).subscribe(data => {
        resolve(data);
      });
    });
  }

}
