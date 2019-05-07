import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductAddComponent } from "./product-add/product-add.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductsComponent } from "./products/products.component";

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Consulta de Productos'}
  },
  {
    path: 'product-details/:_id',
    component: ProductDetailComponent,
    data: { title: 'Detalle del producto'}
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: { title: 'Nuevo producto'}
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Editar producto'}
  },
  {
    path:'',
    redirectTo:'/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
