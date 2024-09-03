import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ListProductComponent } from './component/list-product/list-product.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,AddProductComponent , ListProductComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-management';
  counter = 1
}
