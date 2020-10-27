import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../Interfaces/Category';
import { product } from '../Interfaces/Product';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild("scheduledOrdersPaginator",{static: false}) paginator: MatPaginator;
  @ViewChild("MatSort",{static: false}) sort: MatSort;
  pageOfItems: Array<any>;
  categories : Array<Category> = new Array<Category>() ; 
  products : Array<product> = new Array<product>() ; 
  message = ""; 
  disabled = false ;
  isAdd = false;
  display = true; 
  uploadUrl  : string  ;  
  cats : Map<string , string > = new Map<string , string > () ; 
  catsi : Map<string , string > = new Map<string , string > () ; 
  displayedColumns = ['image', 'name', 'price', 'category','available','unit_id','unit_qte','delete','update'];
  dataSource: MatTableDataSource<product>;
  image : any ; 
  name : string ; 
  price : number ;
  category : string ; 
  unit_qte : string ;
  unit_id : string ;
  available : boolean ; 
  isUpdate : boolean ; 
  selectedFile = null ; 
  constructor(private router : Router ,
            private productService : ProductsService ,
            private categoriesService : CategoriesService,
            private toastr : ToastrService,
            public dialog: MatDialog
    )
  { 
      this.uploadUrl = localStorage.getItem('apiUrl') ;
    }
    load (){
      this.categoriesService.getAllCategories().subscribe(cat=>{
        
        this.categories=cat ; 
        this.categories.forEach(elt=>{
          this.cats[elt._id]=elt.name; 
          this.catsi[elt.name]=elt._id;
         })
        this.productService.getAllproducts().subscribe(data=>{
        this.products = data ; 
        this.products.forEach((elt,index) =>{
            this.products[index].category = this.cats[this.products[index].category];
        },this.products)

        this.dataSource = new MatTableDataSource(this.products) ; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
 }
  ngOnInit() {
      this.load() ; 
  }

 addProduct(){
 //  if (this.price==0||)
    const fd = new FormData() ; 
    fd.append('name' , this.name) ; 
    fd.append('image' , this.image) ; 
    fd.append('price' , this.price.toString()) ; 
    fd.append('available' , this.available.toString()) ; 
    fd.append('unit_id' , this.unit_id) ; 
    fd.append('unit_qte' , this.unit_qte) ; 
    fd.append('category' , this.category) ; 
    this.productService.addProduct(fd).subscribe(data=>{
      this.toastr.success('product are added with success ' , 'Done ! ') ; 
      this.name="";
      this.price=0 ; 
      this.unit_qte ='';
      this.addClick() ; 

      this.load() ; 
    },
    err =>{
      this.toastr.warning(err.error , 'error'); 
    })
 }

 deleteProduct(id){
  const message = `Are you sure you want to do this?`;

  const dialogData = new ConfirmDialogModel("Confirm Action", message);

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult==true){
      this.productService.deleteProduct(id).subscribe(data=>{
        this.toastr.success('product deleted ! ' , 'Done ! ') ; 
        this.load() ; 
       },
       err =>{
         this.toastr.warning(err.error , 'error'); 
       })
    }
  });
  

 }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

fileChanged(e) {
  console.log(e.target.files[0]);
  this.image = e.target.files[0];
}

  addClick(){
     this.isAdd = !this.isAdd; 
     this.display=!this.display;

  }

 updateClick(row){
   this.productService.changeProduct(row); 
   this.router.navigate(['/products/update']) ; 
 }



}
