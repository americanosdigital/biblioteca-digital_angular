import { Component, OnInit, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { LivroService, Livro } from '../../shared/services/livros.service';


@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent ],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  livro: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:3000/livros/${id}`)
      .subscribe(res => this.livro = res);
  }
}
