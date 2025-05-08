import { Component, inject, OnInit } from '@angular/core';
import { Cbutton1Component } from '../../../shared/components/cbutton1/cbutton1.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../services/common.service';
import { IUser } from '../../../../models/user.interface';

interface Country {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [Cbutton1Component, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  countrySearchTerm: string = '';
  showCountryDropdown: boolean = false;
  isLoading: boolean = true;
  selectedCountry: Country | null = null;
  user!: IUser;

  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly commonService = inject(CommonService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
        ],
      ],
      countryCode: ['+1', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    this.fetchCountries();
    
    this.userForm.get('countryCode')?.valueChanges.subscribe(code => {
      this.selectedCountry = this.countries.find(c => c.code === code) || null;
    });
  
    this.setData();
  }
  
  async setData() {
    this.user = (
      await this.authService
        .getUser(this.commonService.getUser()?.id!)
        .toPromise()
    ).data;
  
    const patchData: any = {
      name: this.user?.fullName,
      email: this.user?.email,
    };
  
    const fullContact = this.user?.contact || '';
    const { countryCode, contact } = this.extractCountryCodeFromContact(fullContact);
    console.log('Country Code:', countryCode);
    console.log('Contact:', contact);
    if (countryCode && contact) {
      patchData.countryCode = countryCode;
      patchData.contact = contact;
    }
  
    this.userForm.patchValue(patchData);
  }
  
  
  
  

  fetchCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe({
      next: (data) => {
        this.countries = data
          .filter((country) => country.idd?.root)
          .map((country) => ({
            name: country.name.common,
            code: country.idd.root + (country.idd.suffixes?.[0] || ''),
            flag: country.flag,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        this.filteredCountries = [...this.countries];

        // Set initial selected country
        const initialCode = this.userForm.get('countryCode')?.value;
        this.selectedCountry =
          this.countries.find((c) => c.code === initialCode) || null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
        this.isLoading = false;
        // Fallback to a basic list if API fails
        this.countries = [
          { name: 'United States', code: '+1', flag: '🇺🇸' },
          { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
          { name: 'India', code: '+91', flag: '🇮🇳' },
        ];
        this.filteredCountries = [...this.countries];
      },
    });
  }
  extractCountryCodeFromContact(fullContact: string): { countryCode: string; contact: string } {
    if (!fullContact) return { countryCode: '', contact: '' };
  
    // Sort by longest code first to ensure correct match
    const sortedCodes = this.countries
      .map((c) => c.code)
      .sort((a, b) => b.length - a.length);
  
    const code = sortedCodes.find((code) => fullContact.startsWith(code));
    return code
      ? {
          countryCode: code,
          contact: fullContact.slice(code.length),
        }
      : { countryCode: '', contact: fullContact };
  }
  
  filterCountries() {
    if (!this.countrySearchTerm) {
      this.filteredCountries = [...this.countries];
      return;
    }

    const searchTerm = this.countrySearchTerm.toLowerCase();
    this.filteredCountries = this.countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm) ||
        country.flag.toLowerCase().includes(searchTerm),
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
      const formData = this.userForm.value;
      const userData: any = {
        fullName: formData.name,
        email: formData.email,
        contact: formData.countryCode + formData.contact,
      };

      if (formData.password) {
        userData.password = formData.password;
      }

      this.authService.updateUser(this.user.id!, userData).subscribe({
        next: (res) => {
          this.toastr.success('Profile updated successfully!');
          this.userForm.reset();
          this.setData();
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          this.toastr.error('Failed to update profile. Please try again.');
        },
      });

      console.log('Form Submitted:', this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
}
