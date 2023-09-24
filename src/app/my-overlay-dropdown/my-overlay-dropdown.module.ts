import { NgModule } from '@angular/core';
import { MyOverlayDropdownComponent } from './my-overlay-dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayModule } from 'primeng/overlay';

@NgModule({
  imports: [CommonModule, FormsModule, DropdownModule, OverlayModule],
  declarations: [MyOverlayDropdownComponent],
  exports: [MyOverlayDropdownComponent],
})
export class MyDropdownModule {}
