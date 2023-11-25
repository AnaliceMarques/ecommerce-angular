import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  public user?: any;
  public productForm!: FormGroup;

  editProduct: boolean = false;

  currentProduct!: Product;

  tipos = ['ADMIN', 'FUNCIONARIO'];

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,

    private service: ProdutoService,
    private router: Router
  ) {
    console.log(this.data);
    if (this.data) {
      this.editProduct = true;
      this.currentProduct = this.data;
      this.buildForm(this.currentProduct);
    } else {
      this.editProduct = false;
      this.buildForm(this.currentProduct);
    }
  }

  ngOnInit() {
    this.buildForm(this.currentProduct);
  }

  public buildForm(product: Product): void {
    this.productForm = this.fb.group({
      id: [product?.id ?? ''],
      name: [
        product?.name ?? '',
        [Validators.required, Validators.minLength(3)],
      ],
      brand: [
        product?.brand ?? '',
        [Validators.required, Validators.minLength(3)],
      ],
      size: [product?.size ?? '', [Validators.required]],
      reference: [product?.reference ?? '', [Validators.required]],
      category: [product?.category ?? '', [Validators.required]],
      price: [product?.price ?? '', [Validators.required]],
      image: [product?.image ?? ''],
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public fecharModal(event: any): void {
    this.dialogRef.close(event);
  }

  public onSubmit(): void {
    this.dialogRef.close(this.productForm.value);
  }
}
