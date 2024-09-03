import { Component, OnInit ,inject} from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { ReactiveFormsModule ,FormBuilder, FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{
  productList: any[] = [];
  filteredProductList: any[] = [];
  searchForm: FormGroup;
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  constructor(private router: Router) {
    this.searchForm = inject(FormBuilder).group({
      searchText: ['']
    });
    this.filteredProductList = [...this.productList];
  }

  ngOnInit():void{
  const localData = localStorage.getItem("prodictList");
    if(localData != null){
      this.productList = JSON.parse(localData);
    }
    this.totalItems = this.productList.length;
  }

  editProduct(index: number) {
    this.router.navigate(['/addProduct' , {index}]);
  }

  deleteProduct(index: number) {
    alert("Product deleted successfully")
    this.productList.splice(index, 1);
    localStorage.setItem("prodictList",JSON.stringify(this.productList));
  }

  updateFilteredList(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredProductList = this.productList.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateFilteredList();
  }
  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  
  filterResults(text: string) {
    const isLocalPresent = localStorage.getItem("prodictList");
    if(isLocalPresent != null){
      this.productList = JSON.parse(isLocalPresent);
    }
    if (text) {
      for (let i = 0; i < this.productList.length; i++) {
        if(this.productList[i]['productName'].length == 1){
          const productName = this.productList[i]['productName'][0].toLowerCase();
          if (productName.includes(text)) {
            this.filteredProductList.push(this.productList[i]);
          }
        }else{
          const productName = this.productList[i]['productName'].toLowerCase();
          if (productName.includes(text)) {
            this.filteredProductList.push(this.productList[i]);
          }
        }
      }
      this.productList = this.filteredProductList 
    }
  }
}
