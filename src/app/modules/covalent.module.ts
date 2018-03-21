import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { CovalentStepsModule }              from '@covalent/core/steps';
import { CovalentLayoutModule }             from '@covalent/core/layout';
import { CovalentExpansionPanelModule }     from '@covalent/core/expansion-panel';
import { CovalentHttpModule }               from '@covalent/http';
import { CovalentDynamicFormsModule }       from '@covalent/dynamic-forms';
import { CovalentSearchModule }             from '@covalent/core/search';
import { CovalentVirtualScrollModule }      from '@covalent/core/virtual-scroll';
import { CovalentDataTableModule }          from '@covalent/core/data-table';

@NgModule({
  imports: [
    // CovalentStepsModule,
    CovalentLayoutModule,
    CovalentHttpModule,
    CovalentDynamicFormsModule,
    CovalentExpansionPanelModule,
    CovalentSearchModule,
    CovalentVirtualScrollModule,
    CovalentDataTableModule,
  ],
  exports: [
    // CovalentStepsModule,
    CovalentLayoutModule,
    CovalentHttpModule,
    CovalentDynamicFormsModule,
    CovalentExpansionPanelModule,
    CovalentSearchModule,
    CovalentVirtualScrollModule,
    CovalentDataTableModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CovalentModule { }
