import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutosService } from '../../services/produtos.service';
import { Produtos } from '../../Interfaces/Produtos';
import { SearchButtonComponent } from "../search-button/search-button.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MATERIALMODULE } from '../../shared/material/material-imports';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    MATERIALMODULE,
    SearchButtonComponent,
    CommonModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  title: string = 'Listagem';
  
  dataSource = new MatTableDataSource<Produtos>();
  displayedColumns: string[] = ['id', 'produto', 'valor'];
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarProdutos(): void {
    this.produtosService.getProdutos().subscribe({
      next: (dados) => {
        this.dataSource.data = dados;
        this.isLoading = false;
        console.log('Dados carregados:', dados);
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