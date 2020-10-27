import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/Interfaces/Product';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/Interfaces/Category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  product : product ; 
  categories : Category[]; 
  category : string ; 
  image : any ; 
  name : string ; 
  price : number ;
  unit_qte : number ;
  unit_id : string ;
  available : boolean ; 
  link : string ; 
  uploadUrl  : string  ;  
  imageUrl: any;
  show : boolean =  true ; 
  id : string ; 
  constructor(private productService : ProductsService,
          private categoryService : CategoriesService,
          private router : Router,
          private toastr : ToastrService
    ) { 
      this.uploadUrl = localStorage.getItem('apiUrl') ;

    }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(data=> {
      this.categories =data ; 
      console.log(data) ;
    })
    this.productService.currentProduct.subscribe(data=>{
      if (data == null)
       this.router.navigate(['/products']) ; 
      console.log(data) ; 
      this.id = data['_id'] ; 
       this.product=data ; 
      this.name = data['name']; 
      this.price = data['price']; 
      this.available = data['available']; 
      this.unit_id = data['unit_id']; 
      this.unit_qte = data['unit_qte']; 
      this.link = data['image']; 
      this.category = data['category']
      
    })
  }

  fileChanged(e) {
    console.log(e.target.files[0]);
    this.image = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (event : any) =>{
      this.imageUrl = event.target.result ; 
    }
    reader.readAsDataURL(this.image) ; 
    this.show = false ; 
  }
  

  updateName(){
    this.productService.updateName(this.id,this.name).subscribe(data=> {
        this.toastr.success('Name Updated ', 'Done ! ') ; 
    },
    err =>{
      this.toastr.warning(err.error, 'Failed ! ') ; 
    
    })
  }

  updatePrice(){
    this.productService.updatePrice(this.id,this.price).subscribe(data=> {
        this.toastr.success('Price Updated ', 'Done ! ') ; 
    },
    err =>{
      this.toastr.warning(err.error, 'Failed ! ') ; 
    
    })
  }



  updateAvailablity(){
    this.productService.updateAvailabily(this.id,this.available).subscribe(data=> {
        this.toastr.success('Name Updated ', 'Done ! ') ; 
    },
    err =>{
      this.toastr.warning(err.error, 'Failed ! ') ; 
    
    })
  }

  updateUnitId(){
    this.productService.updateUnitID(this.id,this.unit_id).subscribe(data=> {
        this.toastr.success('Unit ID Updated ', 'Done ! ') ; 
    },
    err =>{
      this.toastr.warning(err.error, 'Failed ! ') ; 
    
    })
  }
  updateUnitQte(){
    this.productService.updateUnitQte(this.id,this.unit_qte).subscribe(data=> {
        this.toastr.success('Unit Qte Updated ', 'Done ! ') ; 
    },
    err =>{
      this.toastr.warning(err.error, 'Failed ! ') ; 
    
    })
  }


  updateCategory(){
    this.productService.updateCategory(this.id,this.category).subscribe(data=> {
      this.toastr.success('Category Updated ', 'Done ! ') ; 
  },
  err =>{
    this.toastr.warning(err.error, 'Failed ! ') ; 
  
  })
}

updateImage(){
  if (!this.show){
  const fd = new FormData() ; 
  fd.append('image',this.image) ; 
  this.productService.updateImage(this.id,fd).subscribe(data=> {
    this.toastr.success('Image Updated ', 'Done ! ') ; 
    },
    err =>{
      this.toastr.warning(err.error, 'Failed ! ') ; 
    })
    }
  else {
    this.toastr.warning('Upload image before', 'Failed ! ') ; 
  }

  }


  
}
