import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MyDropdownModule } from "./my-dropdown/my-dropdown.module";
import { MyOverlayDropdownModule } from "./my-overlay-dropdown/my-overlay-dropdown.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MyDropdownModule,
    MyOverlayDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
