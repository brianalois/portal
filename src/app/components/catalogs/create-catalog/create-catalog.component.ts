import { Component, OnInit } from '@angular/core';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';
import { ITdDataTableColumnWidth } from '@covalent/core/data-table/covalent-core-data-table';

@Component({
  selector: 'app-create-catalog',
  templateUrl: './create-catalog.component.html',
  styleUrls: ['./create-catalog.component.css']
})
export class CreateCatalogComponent implements OnInit {
  createForm: ITdDynamicElementConfig[] = [{
    name: 'input',
    label: 'Catalog Name',
    type: TdDynamicElement.Input,
    required: true,
  }, {
    name: 'select',
    label: 'Assign Kiosk Groups',
    type: TdDynamicElement.Select,
    required: true,
    selections: ['Lake Forest', 'Aliso Viejo', 'Irvine'],
    default: 'Lake Forest',
  }];

  kioskGroups = [{
    name: '',
    type: 'checkbox',
    label: 'Lake Forest',
  },
  {
    name: '',
    type: 'checkbox',
    label: 'Aliso Viejo',
  },
  {
    name: '',
    type: 'checkbox',
    label: 'Irvine',
  },
  {
    name: '',
    type: 'checkbox',
    label: 'Spectrum',
  },
  {
    name: '',
    type: 'checkbox',
    label: 'Spectrum',
  },
  {
    name: '',
    type: 'checkbox',
    label: 'Spectrum',
  },
  {
    name: '',
    type: 'checkbox',
    label: 'Spectrum',
  },
  {
    name: '',
    type: 'checkbox',
    label: 'Spectrum',
  },
  {
    name: '',
    type: 'checkbox',
    label: 'Spectrum',
  },
  {
    name: '',
    type: 'checkbox',
    label: 'Quail Hill',
  }];

  groups = [];

  constructor() { }

  ngOnInit() {
    this.groups = ['Lake Forest', 'Aliso Viejo', 'Irvine', 'Spectrum', 'Quail Hill'];
    this.createCheckboxForm(this.groups, this.kioskGroups);
  }

  createCheckboxForm(arr, group) {
    let i = 0;
    group.forEach((item) => {
      item.name = `kg-${i}`;
      item.label = arr[i];
      i++;
    });
    console.log(this.kioskGroups);
  }

}
