import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; // This is for your component class
import { MatTableModule } from '@angular/material/table'; // This is for the template
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule // Use MatTableModule here instead of MatTableDataSource
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  dataSource = new MatTableDataSource<any>(); // Use MatTableDataSource here in your class
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}