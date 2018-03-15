import { Component, OnInit, Input } from '@angular/core';
import { ITdDataTableColumn, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent } from '@covalent/core/data-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[];
  @Input() columns: any[];
  searchTerm: string;
  filteredData: any[] = this.data;
  filteredTotal: number;
  sortBy: string;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  selectedRow: any[] = [];

  constructor(private dataTableService: TdDataTableService) { }

  ngOnInit() {
    this.filter();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    const excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    newData = this.dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this.dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    this.filteredData = newData;
  }

  onRowClick(e) {
    console.log(e.row);
  }

}
