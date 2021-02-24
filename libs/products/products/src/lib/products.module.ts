import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

import { ApplicationFormModule } from '@ric/applications/application-form';

import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { productsRoutes } from './products.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    ApplicationFormModule,
    MatDialogModule,
  ],
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsPageComponent,
  ],
})
export class ProductsModule {}
