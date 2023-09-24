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
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
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
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MyOverlayDropdownComponent
  implements ControlValueAccessor, AfterViewInit, OnChanges, OnInit
{
  selectedVal: any;
  selectedData: any;
  totalRecords: number;
  datas: any[];
  ngControl: NgControl;
  controlValid: boolean = true;
  disabled: boolean = false;
  @Input() config: MyOverlayDropdownConfig;
  @Input() options: any[];
  @ViewChild('op') overlayPanel: OverlayPanel;
  @Input() isDisabled: boolean = false;
  @Input() columns: [
    {
      label: string;
      type: 'text' | 'numeric' | 'image';
      field: string;
    }
  ];
  @Output() onChanged: EventEmitter<any> = new EventEmitter();
  onChange = (option: any) => {};
  onTouched = () => {};

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options) {
      this.datas = this.options;
      this.totalRecords = this.options.length;
      this.writeValue(this.selectedVal);
    }

    if (changes.disabled) {
      this.setDisabledState(this.disabled);
    }
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    this.checkValid();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  writeValue(obj: any): void {
    this.selectedVal = obj;
    if (this.datas && obj) {
      this.selectedData = this.options.find(
        (x) => x[this.config.optionValue] == obj
      );
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
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  checkValid() {
    this.controlValid = this.ngControl?.valid && this.ngControl.touched;
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
    this.onChange(null);
    this.overlayPanel.toggle(event);
    this.markAsTouched();
  }

  onDropdownChanged(event) {
    this.markAsTouched();
    this.onChange(event.value);
  }
}
