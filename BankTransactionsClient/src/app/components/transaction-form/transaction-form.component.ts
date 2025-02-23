import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionRequest } from '../../models/transaction-request.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {}

  ngOnInit() {Object.keys(this.transactionForm.controls).forEach(key => {
    const controlErrors = this.transactionForm.controls[key].errors;
      if (controlErrors) {
        console.log(`Error in ${key}:`, controlErrors);
      }
    });
    this.transactionForm = this.fb.group({
      fullName:     [
        Validators.required,
        Validators.pattern("^[\u0590-\u05FF\\s'\\-]+$"), 
        Validators.maxLength(20)
      ],
      fullNameEnglish: [
        '',
        [
          Validators.required,
          Validators.pattern("^[A-Za-z\\s'\\-]+$"), // English characters, spaces, apostrophes, hyphens
          Validators.maxLength(15)
        ]
      ],
      accountNumber: ['', [Validators.required, Validators.pattern('^\\d{1,10}$')]],
      birthDate: ['', [Validators.required]],
      identityNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      transactionType: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('^\\d{1,10}$')]],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transactionRequest = (this.transactionForm.value) as TransactionRequest
      this.transactionService.createTransaction(transactionRequest).subscribe(res => {
        console.log(res);
      })
    } else {

      this.transactionForm.markAllAsTouched(); 
    }
  }

  get form() {
    return this.transactionForm.controls;
  }
}