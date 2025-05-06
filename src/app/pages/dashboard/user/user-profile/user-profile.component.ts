import { Component, OnInit } from '@angular/core';
import { Cbutton1Component } from '../../../shared/components/cbutton1/cbutton1.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Country {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [Cbutton1Component, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  countrySearchTerm: string = '';
  showCountryDropdown: boolean = false;
  isLoading: boolean = true;
  selectedCountry: Country | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      ]],
      countryCode: ['+1', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}


  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe({
      next: (data) => {
        this.countries = data
          .filter(country => country.idd?.root) // Only include countries with dial codes
          .map(country => ({
            name: country.name.common,
            code: country.idd.root + (country.idd.suffixes?.[0] || ''),
            flag: country.flag
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        this.filteredCountries = [...this.countries];
        
        // Set initial selected country
        const initialCode = this.userForm.get('countryCode')?.value;
        this.selectedCountry = this.countries.find(c => c.code === initialCode) || null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
        this.isLoading = false;
        // Fallback to a basic list if API fails
        this.countries = [
          { name: 'United States', code: '+1', flag: '🇺🇸' },
          { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
          { name: 'India', code: '+91', flag: '🇮🇳' }
        ];
        this.filteredCountries = [...this.countries];
      }
    });
  }

  filterCountries() {
    if (!this.countrySearchTerm) {
      this.filteredCountries = [...this.countries];
      return;
    }

    const searchTerm = this.countrySearchTerm.toLowerCase();
    this.filteredCountries = this.countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm) ||
      country.flag.toLowerCase().includes(searchTerm)
    );
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.userForm.patchValue({ countryCode: country.code });
    this.countrySearchTerm = `${country.flag} ${country.name} (${country.code})`;
    this.showCountryDropdown = false;
  }

  onCountryBlur() {
    setTimeout(() => {
      this.showCountryDropdown = false;
      // Reset search term to selected country when blurring
      if (this.selectedCountry) {
        this.countrySearchTerm = `${this.selectedCountry.flag} ${this.selectedCountry.name} (${this.selectedCountry.code})`;
      }
    }, 200);
  }

  onSearchFocus() {
    this.showCountryDropdown = true;
    // Clear search term when focusing to allow new searches
    this.countrySearchTerm = '';
    this.filteredCountries = [...this.countries];
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
}