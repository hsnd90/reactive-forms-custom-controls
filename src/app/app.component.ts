import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { MyOverlayDropdownConfig } from './my-overlay-dropdown/my-overlay-dropdown-config';

@Component({
  selector: 'app-component',
  template: `
  <form [formGroup]="form"> 
    <lib-my-dropdown (onChanged)="dropdownChanged($event)" [classVal]="'p-fluid'" formControlName="country" [options]="countries" [optionLabel]="'name'" [optionValue]="'code'"></lib-my-dropdown>
    <br>
    <lib-my-overlay-dropdown (onChanged)="overlayChanged($event)" [config]="config" formControlName="item" [options]="datas"></lib-my-overlay-dropdown>
  </form>`,
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      country: ['AU', Validators.required],
      item: [10, Validators.required],
    });

    this.form.valueChanges.subscribe((data) => {
      console.log('Form Value:', data);
    });

    this.getDatas();
  }
  ngAfterViewInit(): void {}
  countries: any[] | undefined;
  form: FormGroup;
  datas: any[] = [];
  totalRecords: number = 20;

  config: MyOverlayDropdownConfig = {
    columns: [
      {
        label: 'Ad',
        type: 'text',
        field: 'name',
      },
      {
        label: 'Kullanıcı Adı',
        type: 'text',
        field: 'username',
      },
    ],
    optionLabel: 'name',
    optionValue: 'id',
    rowsPerPage: 5,
    classVal: 'p-fluid',
  };

  getDatas() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any) => {
        this.datas = data;
      });
  }

  onLazyLoad(event: any) {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((x: any) => {
          let totalRecords = x.length;
          let result = x.slice(event.first, event.first + event.rows);
          return { result, totalRecords };
        })
      )
      .subscribe((data: any) => {
        this.totalRecords = data.totalRecords;
        this.datas = data.result;
      });
  }

  selectedCountry: string | undefined;

  dropdownChanged(event) {
    console.log('Dropdown Value', event);
  }

  overlayChanged(event) {
    console.log('Overlay Dropdown Value', event);
  }

  ngOnInit() {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ];
  }
}
