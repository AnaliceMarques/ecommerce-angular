import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user?: any;
  form!: FormGroup;
  usuario!: any;

  users:any[]= [
    {email:"analice@gmail.com", senha:"123", tipo:"ADMIN"},
    {email:"cleber@gmail.com", senha:"321", tipo:"FUNCIONARIO"},
  ]

  constructor(private fb: FormBuilder, private router: Router) {
    this.buildForm();
    // this.service.getUsuarios().subscribe((res) => {
    //   this.usuarios = res;
    //   console.log(res)
    // })
  }

  ngOnInit(): void {
    const usuarioAutenticado = JSON.parse(localStorage.getItem('USER') || 'null');
    if (usuarioAutenticado) {
      this.usuario = usuarioAutenticado;
    }
  }

  buildForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]],
    })
  }

  login(): void {
    this.user = { email: this.form.value.email, senha: this.form.value.senha};
    this.fazerLogin(this.user)
  }

  fazerLogin(user: any) {
    const existeUsuario: any | undefined = this.users?.find(
      (u) => u.email === user.email && u.senha === user.senha
    );
    if (existeUsuario) {
      console.log('Usuário autenticado', existeUsuario);
      this.usuario = existeUsuario;
      localStorage.setItem('USER', JSON.stringify(this.usuario));
      localStorage.setItem('TIMETOKEN', JSON.stringify(new Date().getTime()));
      this.router.navigate(['/home'])

    } else {
      console.log('Falha no login');
    }
  }
}
