import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
}

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly apiUrl = 'http://localhost:3000/livros';

  constructor(private http: HttpClient) {}

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  criar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  atualizar(id: number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
