import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlider,
    MatSliderThumb
  ],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Input() categories: string[] = [];
  @Input() maxPriceLimit: number = 100;

  selectedCategory: string = '';
  maxPrice: number = 0;
  searchTerm: string = '';

  @Output() filterChange = new EventEmitter<{ category: string, maxPrice: number | null, searchTerm: string }>();

  applyFilters() {
    console.log('Categoría seleccionada:', this.selectedCategory);
    console.log('Precio máximo:', this.maxPrice);
    this.filterChange.emit({
      category: this.selectedCategory,
      maxPrice: this.maxPrice,
      searchTerm: this.searchTerm.trim().toLowerCase()
    });
  }
}
