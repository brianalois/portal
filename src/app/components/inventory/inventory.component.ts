import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent implements OnInit {
  data: any[] = [
    {
      'product_name': 'Nike Socks',
      'product_id': 8921,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2010',
    },
    {
      'product_name': 'Nike Shorts',
      'product_id': 8922,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Adidas Shorts',
      'product_id': 8923,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Adidas Shoes',
      'product_id': 8924,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Adidas Socks',
      'product_id': 8925,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Asics Socks',
      'product_id': 8926,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Asics Shoes',
      'product_id': 8927,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Asics Shorts',
      'product_id': 8929,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 8928,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 1928,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 8228,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 8338,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 2328,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 8558,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 6928,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 4528,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 8828,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
    {
      'product_name': 'Nike Shoes',
      'product_id': 1228,
      'remaining': 76,
      'total': 190,
      'kiosk_groups': 'Lake Forest',
      'catalogs': 'Summer 2018',
    },
  ];

  columns: ITdDataTableColumn[] = [
    { name: 'product_name',  label: 'Product Name' },
    { name: 'product_id', label: 'ID' },
    { name: 'remaining', label: 'Remaining' },
    { name: 'total', label: 'Total' },
    { name: 'kiosk_groups', label: 'Kiosk Group(s)' },
    { name: 'catalogs', label: 'Catalog(s)' }
  ];

  constructor() { }

  ngOnInit() {
  }
}
