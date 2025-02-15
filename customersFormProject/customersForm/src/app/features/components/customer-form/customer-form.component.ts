import { Component, OnInit, signal } from '@angular/core';
import { CityService } from '../../../core/services/city.service';
import { BankService } from '../../../core/services/bank.service';
import { CustomerService } from '../../../core/services/customer.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  cities: any[] = [];
  banks: any[] = [];
  branches: any[] = [];
  isBranchDisabled = signal(true);

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private cityService: CityService,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.loadCities();
    // this.loadBanks();
  }

  initializeForm(): void {
    this.customerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[א-ת\'\- ]{1,20}$/)]],
      fullNameEn: ['', [Validators.required, Validators.pattern(/^[A-Za-z\'\- ]{1,15}$/)]],
      birthDate: ['', Validators.required],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      city: ['', Validators.required],
      bank: ['', Validators.required],
      branch: [{ value: '', disabled: true }, Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern(/^\d{1,10}$/)]]
    });
  }

  loadCities(): void {
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  loadBanks(): void {
    this.bankService.getBanks().subscribe(banks => {
      this.banks = banks;
    });
  }

  onBankChange(event: Event): void {
    this.isBranchDisabled.set(false);
    this.customerForm.get('branch')?.enable();
    const bankId = (event.target as HTMLInputElement).value;
    this.bankService.getBranches(bankId.toString()).subscribe(branches => {
      this.branches = branches;
    });
  }

  submitForm(): void {
    if (this.customerForm.valid) {
      this.customerService.createCustomer(this.customerForm.value).subscribe(
        response => alert('הלקוח נוצר בהצלחה!'),
        error => alert(`שגיאה ביצירת הלקוח: ${error.message}`)
      );
    }
  }
}
