import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MyDropdownComponent } from './my-dropdown.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [DropdownModule, FormsModule, CommonModule],
  declarations: [MyDropdownComponent],
  exports: [MyDropdownComponent],
})
export class MyDropdownModule {}
