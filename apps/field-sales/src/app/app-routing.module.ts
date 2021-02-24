import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@ric/layout';
import { productsConfig } from '@ric/products/core';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: productsConfig.routes.products,
      },
      {
        path: productsConfig.routes.products,
        loadChildren: () =>
          import('@ric/products/products').then(
            (esModule) => esModule.ProductsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
