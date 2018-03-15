import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent implements OnInit {
  data: any[] = [
    {
      'order_number': 1234567890,
      'amount': 34.56,
      'kiosk_group': 'Lake Forest',
      'kiosk_name': 'LF-A',
      'date_created': '2018-10-10T08:33:09'
    },
    {
      'order_number': 2234567890,
      'amount': 18.88,
      'kiosk_group': 'Lake Forest',
      'kiosk_name': 'LF-A',
      'date_created': '2018-10-10T08:33:09'
    },
    {
      'order_number': 1333467890,
      'amount': 9.09,
      'kiosk_group': 'Lake Forest',
      'kiosk_name': 'LF-B',
      'date_created': '2018-03-10T21:33:09'
    },
    {
      'order_number': 5534567890,
      'amount': 109.22,
      'kiosk_group': 'Lake Forest',
      'kiosk_name': 'LF-B',
      'date_created': '2018-10-10T08:33:09'
    },
    {
      'order_number': 4444447890,
      'amount': 10.22,
      'kiosk_group': 'Lake Forest',
      'kiosk_name': 'LF-B',
      'date_created': '2018-11-10T12:33:09'
    },
    {
      'order_number': 1234569999,
      'amount': 75.90,
      'kiosk_group': 'Lake Forest',
      'kiosk_name': 'LF-A',
      'date_created': '2018-10-10T08:33:09'
    },
    {
      'order_number': 3334567890,
      'amount': 4.56,
      'kiosk_group': 'Lake Forest',
      'kiosk_name': 'LF-A',
      'date_created': '2018-10-10T08:33:09'
    },
  ];

  convertedData: any[] = this.data;

  columns: ITdDataTableColumn[] = [
    { name: 'order_number',  label: 'Order Number' },
    { name: 'amount', label: 'Amount' },
    { name: 'kiosk_group', label: 'Kiosk Group' },
    { name: 'kiosk_name', label: 'Kiosk Name' },
    { name: 'date_created', label: 'Date'}
  ];

  constructor() { }

  ngOnInit() {
    this.convertedData = this.data.map(column => {
      column.date_created = this.convertDate(column.date_created);
      return column;
    });
  }

  convertDate(date: string) { // Probably better to use Moment.js
    const convertedDate = new Date(date);
    convertedDate.toDateString();
    return convertedDate.toDateString();
  }

}
