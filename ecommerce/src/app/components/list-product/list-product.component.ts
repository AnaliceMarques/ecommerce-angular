import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/service/produto.service';
import { Product } from 'src/app/models/product.model';
import { EditProductComponent } from 'src/app/modais/edit-product/edit-product.component';
import { DeleteProductComponent } from 'src/app/modais/delete-product/delete-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent {
  @Input() public usuario?: any;
  usuarioLogado!: any;
  products!: any[];

  constructor(private dialog: MatDialog, private service: ProdutoService) {
    this.getProducts();
    this.usuarioLogado = JSON.parse(localStorage.getItem('USER') || 'null');
  }

  getProducts() {
    this.service.getProducts().subscribe((res) => {
      if (res) {
        this.products = res;
      } else {
        res.error;
      }
    });
  }

  openDialogDeleteProduct(product: Product) {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      disableClose: true,
      width: '60%',
      data: product,
    });
    dialogRef.afterClosed().subscribe((devolutivaModal: Product) => {
      if (devolutivaModal) {
        this.service.deleteProduct(product).subscribe((res) => {
          this.getProducts();
        });
      }
    });
  }

  openDialogEditProduct(product: Product) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      disableClose: true,
      width: '80%',
      data: product,
    });

    dialogRef.afterClosed().subscribe((devolutivaModal: Product) => {
      if (devolutivaModal) {
        this.getProducts();
      }
    });
  }
}
