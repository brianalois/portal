import { BrowserModule } from '@angular/platform-browser';
import { Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule, CovalentModule } from './modules/modules';

import { RouterModule }     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';
import { FacebookModule } from 'ngx-facebook';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ApolloModule, Apollo } from 'apollo-angular';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

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
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule
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
  constructor(
    injector: Injector,
    apollo: Apollo,
    httpLink: HttpLink,
  ) {
    AppInjector = injector;

    // Create an http link:
    const http = httpLink.create({
      uri: 'http://localhost:8082/graphql'
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: `ws://localhost:8082/subscriptions`,
      options: {
        reconnect: true
      }
    });

    const link = split(
      // split based on operation type
      ({ query }) => {
        let definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      ws,
      http,
    );

    apollo.create({

      link: link,
      cache: new InMemoryCache()
    });
  }
}
export let AppInjector: Injector;
