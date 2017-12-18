import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { InvoiceModel } from '../models/invoice-model';
import { InvoiceApiProvider } from '../providers/invoice-api/invoice-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public InvoiceApiProvider: InvoiceApiProvider) {
  }

  ngOnInit() {
    var invoiceList: Array<InvoiceModel> = [];
    var dates: Array<String> = [];
    var values: Array<number> = [];
    var numbers: Array<number> = [];

    const ec = echarts as any;
    const container = document.getElementById('container');
    console.log('echarts container: ' + container);

    const chart = ec.init(container);

    const option = {
      color: ['#3398DB', '#db0406'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'        // Option：'line' | 'shadow'
        }
      },
      legend: {
        data: ['Face Value in USD', 'Number of Invoices']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: dates
      },
      yAxis: [{
        type: 'value',
        name: 'Face Value in USD'
      },
      {
        type: 'category',
        name: 'Number of Invoices',
        show: false
      }],
      series: [
        {
          name: 'Face Value in USD',
          type: 'bar',
          stack: 'total',
          label: {
            normal: {
              show: true,
              position: 'insideBottom'
            }
          },
          data: values
        },
        {
          name: 'Number of Invoices',
          type: 'bar',
          stack: 'total',
          scale: true,
          label: {
            normal: {
              show: true,
              position: 'outsideTop'
            }
          },
          data: numbers
        }
      ]
    };

    this.InvoiceApiProvider.getInvoices().then((data: Array<InvoiceModel>) => {
      invoiceList = data;
      console.log("Invoices number: " + invoiceList.length);

      //face values and numbers be grouped by date
      var result = [];
      invoiceList.reduce(function (res, value) {
        if (!res[value.maturityDate]) {
          res[value.maturityDate] = {
            qty: 0,
            x: value.maturityDate,
            y: 0
          };
          result.push(res[value.maturityDate]);
        }
        res[value.maturityDate].qty += 1;
        res[value.maturityDate].y += value.faceValueInUSD;
        return res;
      }, {});

      //construct data points
      result.forEach(function (item) {
        dates.push(item.x);
        values.push(item.y);
        numbers.push(item.qty);
      });

      console.log("There are " + dates.length + " dates and " + invoiceList.length + " invoices to be shown.");

      chart.setOption(option);
    });
  }
}
