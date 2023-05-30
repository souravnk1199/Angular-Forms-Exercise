import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { StatecityService } from '../statecity.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  formData: any = {};
  showData = false;
  country = 'united states';
  states: string[] = [];
  cities: string[] = [];
  addressForm = new FormGroup({
    firstname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    state: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    city: new FormControl('', {
      nonNullable: true,
      validators: [],
    }),
    zipcode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{5}$/)],
    }),
  });

  constructor(private stateCityService: StatecityService) {}

  getControl(field: string) {
    return this.addressForm.get(field) as FormControl;
  }

  onSubmit() {
    this.formData = this.addressForm.getRawValue();
    this.showData = true;
    console.log('submitted');
    console.log(this.addressForm.getRawValue());
    this.addressForm.reset();
    console.log(this.formData);
  }

  getCityService() {
    this.cities = [];
    let state = this.addressForm.get('state')?.value;
    this.stateCityService
      .getCity(this.country, state as string)
      .subscribe((response: any) => {
        if (response.data.length === 0) {
          this.cities.push('No cities Available');
          return;
        }
        for (let city of response.data) {
          this.cities.push(city);
        }
      });
  }

  ngOnInit() {
    this.stateCityService.getState(this.country).subscribe((response: any) => {
      for (let state of response.data.states) {
        this.states.push(state.name);
      }
    });
  }
}
