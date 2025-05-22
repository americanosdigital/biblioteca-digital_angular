import { Component, OnInit, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { LivroService, Livro } from '../../shared/services/livros.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  livro = {
    titulo: '',
    autor: '',
    ano: null,
    genero: ''
  };

  isEditando = false;
  idLivro: string | null = null;

  ngOnInit() {
    this.idLivro = this.route.snapshot.paramMap.get('id');

    if (this.idLivro) {
      this.isEditando = true;
      this.http.get<any>(`http://localhost:3000/livros/${this.idLivro}`)
        .subscribe((res) => this.livro = res);
    }
  }

  salvar() {
    if (this.isEditando) {
      this.http.put(`http://localhost:3000/livros/${this.idLivro}`, this.livro)
        .subscribe(() => this.router.navigate(['/livros']));
    } else {
      this.http.post('http://localhost:3000/livros', this.livro)
        .subscribe(() => this.router.navigate(['/livros']));
    }
  }
}
