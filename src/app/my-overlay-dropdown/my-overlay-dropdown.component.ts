import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MyOverlayDropdownConfig } from './my-overlay-dropdown-config';

@Component({
  selector: 'lib-my-overlay-dropdown',
  templateUrl: './my-overlay-dropdown.component.html',
  styleUrls: ['./my-overlay-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MyOverlayDropdownComponent),
    },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MyOverlayDropdownComponent), multi: true },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MyOverlayDropdownComponent implements ControlValueAccessor, AfterViewInit, OnChanges, OnInit, Validator {
  selectedVal: any;
  selectedData: any;
  totalRecords: number;
  datas: any[];
  ngControl: NgControl;
  control: any;
  controlValid: boolean = true;
  disabled: boolean = false;
  @Input() config: MyOverlayDropdownConfig;
  @Input() options: any[];
  @ViewChild('op') overlayPanel: OverlayPanel;
  @Input() isDisabled: boolean = false;
  @Output() onChanged: EventEmitter<any> = new EventEmitter();
  onChange = (option: any) => {};
  onTouched = () => {};

  constructor(private cd: ChangeDetectorRef) {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!this.control) {
      this.control = control;
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options) {
      this.datas = this.options;
      this.totalRecords = this.options.length;
      this.writeValue(this.selectedVal);
    }

    if (changes['disabled']) {
      this.setDisabledState(this.disabled);
    }
  }

  ngOnInit(): void {
    this.checkValid();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  writeValue(obj: any): void {
    this.selectedVal = obj;
    if (this.datas && obj) {
      this.selectedData = this.options.find((x) => x[this.config.optionValue] == obj);
    } else if (this.datas && !obj) {
      this.selectedData = null;
    }
    this.markAsTouched();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  checkValid() {
    if (this.control) {
      this.controlValid = this.control.valid;
    }
  }

  onSelectItem(data: any) {
    this.selectedData = data;
    this.onChanged.emit(this.selectedData);
    this.selectedVal = data[this.config.optionValue];
    this.onChange(this.selectedVal);
    this.overlayPanel.toggle(data);
    this.markAsTouched();
  }

  markAsTouched() {
    this.onTouched();
    this.checkValid();
    this.cd.detectChanges();
  }

  onClick(event: any) {
    if (this.disabled || this.isDisabled) return;
    this.overlayPanel.toggle(event);
    this.markAsTouched();
  }

  onDropdownChanged(event: any) {
    this.markAsTouched();
    this.onChange(event.value);
  }
}
