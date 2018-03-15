import { Routes, RouterModule } from '@angular/router';

// Components
import * as Comps from './components/components';

// Guards
import { ApiGuard } from './guards/api.guard';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Comps.HomeComponent, pathMatch: 'full' },

  // Auth
  { path: 'login', component: Comps.LoginComponent, pathMatch: 'full' },

  // User
  { path: 'user/update', component: Comps.ProfileComponent, pathMatch: 'full' },

  // Company
  { path: 'company/create', component: Comps.CompanyCreateComponent, pathMatch: 'full' },
  { path: 'company/list', component: Comps.CompanyListComponent, pathMatch: 'full' },
  { path: 'company/update/:id', component: Comps.CompanyUpdateComponent, pathMatch: 'full' },

  // Inventory, Transactions
  { path: 'inventory', component: Comps.InventoryComponent, pathMatch: 'full' },
  { path: 'transactions', component: Comps.TransactionsComponent, pathMatch: 'full' },

  // Catalog
  { path: 'catalog/create', component: Comps.CreateCatalogComponent, pathMatch: 'full' }
];

// canActivate:[ApiGuard],

export const routing = RouterModule.forRoot(APP_ROUTES);
