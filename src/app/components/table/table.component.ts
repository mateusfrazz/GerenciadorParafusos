import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProdutosService } from '../../services/produtos.service';
import { Produtos } from '../../Interfaces/Produtos';
import { CommonModule } from '@angular/common';
import { SearchButtonComponent } from "../search-button/search-button.component";
import {MatPaginatorModule} from '@angular/material/paginator';
import { materialImports } from '../../shared/material/material-imports';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    materialImports,
    CommonModule,
    MatInputModule,
    MatTableModule,
    SearchButtonComponent,
],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  title: string= 'Listagem';
  
  dataSource = new MatTableDataSource<Produtos>();
  displayedColumns: string[] = ['id', 'produto', 'valor'];
  isLoading = true;

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtosService.getProdutos().subscribe({
      next: (dados) => {
        this.dataSource.data = dados;
        this.isLoading = false;
        console.log('Dados carregados:', dados); // Para verificação
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}