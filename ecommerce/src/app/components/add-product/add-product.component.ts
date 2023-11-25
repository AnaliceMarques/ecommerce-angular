import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProdutoService } from 'src/app/service/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  @Input() currentProduct!: Product;
  @Input() editProduct: boolean = false;

  @Output() public fecharModal = new EventEmitter<any>();

  public product?: any;
  public productForm!: FormGroup;

  categories = ['MASCULINA', 'FEMININA', 'INFANTIL'];
  sizes = ['PP', 'P', 'M', 'G', 'GG', 'XG'];

  constructor(
    private fb: FormBuilder,
    private service: ProdutoService,
    private router: Router
  ) {}

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
    if (this.editProduct) {
      this.fecharModal.emit(false);
    } else {
      this.router.navigate(['/listar-produtos']);
    }
    //this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.editProduct) {
      this.service.editProduct(this.productForm.value).subscribe((res) => {
        this.fecharModal.emit(true);
      });
    } else {
      //this.dialogRef.close(this.userForm.value);
      //this.user = this.userForm.value;
      //this.dialogRef.close(this.user);
      this.service.addProduct(this.productForm.value).subscribe((res) => {
        this.router.navigate(['/listar-produtos']);
        console.log(res);
      });
    }
  }
}
