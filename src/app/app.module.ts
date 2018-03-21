import { BrowserModule } from '@angular/platform-browser';
import { Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule, CovalentModule } from './modules/modules';

import { RouterModule }     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { FacebookModule } from 'ngx-facebook';

import { FlexLayoutModule } from '@angular/flex-layout';

// services
import { UtilService } from './services/util.service';
import { CookieService } from 'ngx-cookie-service';

// guards
import { ApiGuard } from './guards/api.guard';

// Components
import { AppComponent } from './app.component';
import * as Comps from './components/components';


@NgModule({
  declarations: [
    AppComponent,
    Comps.NavbarComponent,
    Comps.HomeComponent,
    Comps.LoginComponent,
    Comps.RegisterComponent,
    Comps.CompanyUpdateComponent,
    Comps.CompanyCreateComponent,
    Comps.CompanyListComponent,
    Comps.DialogRemoveComponent,
    Comps.DialogDefaultComponent,
    Comps.ProfileComponent,
    Comps.InventoryComponent,
    Comps.SearchBarComponent,
    Comps.FooterComponent,
    Comps.TableComponent,
    Comps.TransactionsComponent,
    Comps.CreateCatalogComponent,
    // ...Object.keys(Comps).map(key => Comps[key]),//cant get this to work with ng build --prod
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routing,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    FacebookModule.forRoot(),
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    CovalentModule,
  ],
  entryComponents: [
    Comps.DialogDefaultComponent,
    Comps.DialogRemoveComponent,
  ],
  providers: [
    UtilService,
    CookieService,
    ApiGuard,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { // https://stackoverflow.com/questions/39101865/angular-2-inject-dependency-outside-constructor
  constructor(injector: Injector) {
    AppInjector = injector;
  }
}
export let AppInjector: Injector;
