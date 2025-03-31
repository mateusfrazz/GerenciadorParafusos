import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtos } from '../Interfaces/Produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
    
  private apiUrl = 'http://localhost:3000/produtos'

  constructor( private http: HttpClient) { }

  getProdutos() : Observable<Produtos[]>{
    return this.http.get<Produtos[]>(this.apiUrl)
  }
}
