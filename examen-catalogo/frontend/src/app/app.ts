import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './services/category';
import { ProductService } from './services/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  categories: any[] = [];
  items: any[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryChange(): void {
    if (!this.selectedCategoryId) {
      this.items = [];
      return;
    }

    this.productService.byCategory(this.selectedCategoryId).subscribe(data => {
      this.items = data.map(item => ({
        ...item,
        tipo: this.getTipo()
      }));
    });
  }

  getTipo(): string {
    const cat = this.categories.find(c => c.id === this.selectedCategoryId);
    return cat ? cat.name.charAt(0).toUpperCase() + cat.name.slice(1) : '';
  }
}
