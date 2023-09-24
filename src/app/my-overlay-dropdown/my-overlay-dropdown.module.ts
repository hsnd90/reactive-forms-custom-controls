import { NgModule } from '@angular/core';
import { MyOverlayDropdownComponent } from './my-overlay-dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    OverlayPanelModule,
    TableModule,
  ],
  declarations: [MyOverlayDropdownComponent],
  exports: [MyOverlayDropdownComponent],
})
export class MyOverlayDropdownModule {}
