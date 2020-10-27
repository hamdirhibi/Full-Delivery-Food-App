import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Category } from '../Interfaces/Category';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @ViewChild("scheduledOrdersPaginator",{static: false}) paginator: MatPaginator;
  @ViewChild("MatSort",{static: false}) sort: MatSort;
  categories : Array<Category> = new Array<Category>() ; 
  message = ""; 
  category : Category ; 
  disabled = false ;
  isAdd = false;
  display = true; 
  displayedColumns = [ 'name','delete','update'];
  dataSource: MatTableDataSource<Category>;
  name : string ; 
  isUpdate : boolean = false ; 
  constructor(private router : Router ,
            private categoriesService : CategoriesService,
            private toastr : ToastrService,
            public dialog: MatDialog
    )
    { 
    }


  load(){
    this.categoriesService.getAllCategories().subscribe(cat=>{ 
      this.categories=cat ; 
      this.dataSource = new MatTableDataSource(this.categories) ; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
  ngOnInit() {
    this.load() ;
  }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 addClick(){
  this.isUpdate = false ; 
  this.isAdd = true ;
  this.display = false ; 
}

 updateClick(row){
   this.category = row ; 
   this.name=row['name'] ; 
   this.isUpdate = true ; 
   this.isAdd = false ;
   this.display = false ; 
 }

displayClick(){
  this.isUpdate = false ; 
  this.isAdd = false ;
  this.display = true ; 
}

updateCategory(){
  this.categoriesService.updateCategory(this.category._id,{name : this.name}).subscribe(data=>{
    this.toastr.success('Category Updated ', 'Done ! ') ; 
    this.load() ; 
    this.displayClick() ; 
  },
  err =>{
    this.toastr.warning(err.error, 'Failed ! ') ; 
  })
  
}
addCateogry(){
  this.categoriesService.addCategory({name : this.name}).subscribe(data=>{
    this.toastr.success('Category Added ', 'Done ! ') ; 
    this.load() ; 
    this.displayClick() ; 

  },
  err =>{
    this.toastr.warning(err.error, 'Failed ! ') ; 
  })
  
}
deleteCategory(id){

const message = `Are you sure you want to do this?`;

const dialogData = new ConfirmDialogModel("Confirm Action", message);

const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  maxWidth: "400px",
  data: dialogData
});

dialogRef.afterClosed().subscribe(dialogResult => {
  if (dialogResult==true){
    this.categoriesService.deleteCategory(id).subscribe(data=>{
      this.toastr.success('Category deleted ! ' , 'Done ! ') ; 
      this.load() ; 
     },
     err =>{
       this.toastr.warning(err.error , 'error'); 
     })
  }
});


}




}
