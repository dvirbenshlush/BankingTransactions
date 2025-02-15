import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerFormComponent } from "./features/components/customer-form/customer-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'customersForm';
}
