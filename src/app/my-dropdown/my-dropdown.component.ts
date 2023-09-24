import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'lib-my-dropdown',
  templateUrl: './my-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MyDropdownComponent),
    },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MyDropdownComponent), multi: true },
  ],
})
export class MyDropdownComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges, Validator {
  constructor(private cd: ChangeDetectorRef, private injector: Injector) {}
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!this.control) {
      this.control = control;
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.disabled = changes['disabled']['currentValue'];
    }
  }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }
  selectedOption: any;
  selectedVal: any;
  ngControl: NgControl;
  control: any;
  controlValid: boolean = true;
  touched: boolean = false;
  @Input() options: any[];
  @Input() optionLabel: string;
  @Input() optionValue: string;
  @Input() placeholder: string;
  @Input() classVal: string;
  disabled: boolean = false;
  @Input() isDisabled: boolean = false;
  @Output() onChanged: EventEmitter<any> = new EventEmitter();

  onChange = (option: any) => {};

  onTouched = () => {};

  writeValue(obj: any): void {
    if (!this.options || !this.optionValue || !this.optionLabel) return;
    this.selectedOption = this.options.find((x) => x[this.optionValue] == obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  checkValid() {
    if (this.control) {
      this.controlValid = this.control.valid;
    }
  }

  markAsTouched() {
    this.onTouched();
    this.checkValid();
  }

  onChangeFunc(event: any) {
    this.onChanged.emit(event);
    if (event) {
      this.selectedVal = this.options.find((x) => x[this.optionValue] == event[this.optionValue]);
      this.onChange(this.selectedVal[this.optionValue]);
    } else {
      this.onChange(null);
    }

    this.markAsTouched();
  }

  onDropdownChanged(event: any) {
    this.markAsTouched();
  }
}
