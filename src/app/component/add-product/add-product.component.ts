import { Component, OnInit } from '@angular/core';
import { Router, RouterModule , ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  receivedValue : string | null = '';
  valueAsce : boolean = false;
  index : number = -1;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.userForm =  new FormGroup({
      productName: new FormControl("",[Validators.required]),
      catagory: new FormControl(""),
      price:  new FormControl(""),
      description: new FormControl(""),
      quantity: new FormControl(""),
      datepeacker: new FormControl("")
    })
  }

  ngOnInit(): void {
    this.receivedValue = this.route.snapshot.paramMap.get('index');
    console.log(this.valueAsce , this.index)
    if(this.receivedValue !== null && this.index == -1){
      this.valueAsce = true;
      this.index = Number(this.receivedValue);
      this.makeAnObject();
    }
  }

  makeAnObject(): void{
    const isLocalPresent = localStorage.getItem("prodictList");
    if(isLocalPresent != null){
      const oldData = JSON.parse(isLocalPresent);
      this.userForm = oldData[this.index];
      this.userForm = new FormGroup({
        productName: new FormControl([oldData[this.index].productName]),
        category: new FormControl([oldData[this.index].category!=undefined?oldData[this.index].category:"Electronics"]),
        price: new FormControl([oldData[this.index].price]),
        description: new FormControl([oldData[this.index].description]),
        quantity: new FormControl([oldData[this.index].quantity]),
        datepeacker: new FormControl([oldData[this.index].datepeacker])
      });
    }
    console.log(this.userForm.value)
  }

  onSubmit() {
    if(this.index != -1){
      const isFormValid = this.userForm.valid;
      this.isFormSubmitted =  true;
      const isLocalPresent = localStorage.getItem("prodictList");
      if(isLocalPresent != null){
        const oldData = JSON.parse(isLocalPresent);
        oldData[this.index] = (this.userForm.value);
        localStorage.setItem("prodictList",JSON.stringify(oldData));

      } else{
        const newData = [];
        newData.push(this.userForm.value);
        localStorage.setItem("prodictList",JSON.stringify(newData));
      }
      alert('Product updated successfully!');
      this.router.navigate(['/home']);
    }else{
      const isFormValid = this.userForm.valid;
      this.isFormSubmitted =  true;
      const isLocalPresent = localStorage.getItem("prodictList");
      if(isLocalPresent != null){
        const oldData = JSON.parse(isLocalPresent);
        oldData.push(this.userForm.value);
        localStorage.setItem("prodictList",JSON.stringify(oldData));

      } else{
        const newData = [];
        newData.push(this.userForm.value);
        localStorage.setItem("prodictList",JSON.stringify(newData));
      }
      alert('Product added successfully!');
      this.router.navigate(['/home']);
    }
  }
}
