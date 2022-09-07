import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';  
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ordersDataSource!: MatTableDataSource<any>;
  displayedColumns!: any;

  constructor(
                private orderService: OrderService,
                private router: Router,
                private toastrService: ToastrService
                ) { }

    ngOnInit(): void {

      this.orderService.getOrders().subscribe(
        (data: any) => {
          console.log(data);
          this.ordersDataSource  = new MatTableDataSource(data.map((result: any) => { return { ...result.order, total: result.total, actions: "" } }) );
          this.displayedColumns = ['REFERENCE', 'total', 'updatedAt', 'actions'];

          this.paginator._intl.itemsPerPageLabel  ="Commandes par page";
          this.ordersDataSource.paginator         = this.paginator;
          this.ordersDataSource.sort              = this.sort;
          
          
        },(response) => {
          this.toastrService.error(response.error.message);
        }
      )
    }
  
    applyFilter(event: Event) {
      
      const filterValue             = (event.target as HTMLInputElement).value;
      this.ordersDataSource.filter  = filterValue.trim().toLowerCase();
      console.log(filterValue.trim().toLowerCase());
  
      if (this.ordersDataSource.paginator) {
        this.ordersDataSource.paginator.firstPage();
      }
    }

    onDownloadOrder(order_id: string){
      window.open(environment.apiHostname+'/orders/'+order_id+'/export_to_pdf', '_blank');
    }
  
    onViewOrder(order_id: string){
      this.router.navigateByUrl('/orders/detail/'+order_id);
    }
  
    onDeleteOrder(reference: string, order_id: string){
      if(confirm("êtes-vous sûre vouloir supprimer la commande avec la reference "+reference+"?"))
      {
        this.orderService.deleteOrder(order_id).subscribe(
          (data: any) => {
            this.toastrService.success('Commande supprimé avec succès!');
            this.ngOnInit();
          },(response) => {
            this.toastrService.error(response.error.message);
            this.ngOnInit();
          }
        )
      }
    }

}
