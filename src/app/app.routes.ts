import { Routes } from '@angular/router';
import { ListProductComponent } from './component/list-product/list-product.component';
import { AddProductComponent } from './component/add-product/add-product.component';
export const routes: Routes = [
    {
        path: 'home',
        component: ListProductComponent
    },

    {
        path: 'addProduct',
        component: AddProductComponent
    }
];
