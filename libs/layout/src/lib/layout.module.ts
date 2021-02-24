import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatTabsModule, RouterModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
