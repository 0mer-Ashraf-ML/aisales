import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/error/page404/page404.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: `SellersGPT: The World's First B2B AI Sales Agent for Global Manufacturers and Traders`,
  },
  {
    path: 'solutions',
    loadComponent: () =>
      import('./pages/solutions/solutions.component').then(
        (m) => m.SolutionsComponent
      ),
    title: 'Customized B2B AI Sales Agent Solutions for Manufacturers, Retailers, High-Tech, SaaS Companies and Human Resources Companies | SellersGPT',
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./pages/pricing/pricing.component').then(
        (m) => m.PricingComponent
      ),
    title: 'Pay for Quality Work, Not Software | SellersGPT',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/log-in/log-in.component').then(
        (m) => m.LogInComponent
      ),
    title: 'Log In',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Register',
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/auth/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
    title: 'Forgot Password',
  },
  {
    path: 'otp-verification',
    loadComponent: () =>
      import('./pages/auth/otp/otp.component').then((m) => m.OtpComponent),
    title: 'Verify Code',
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
    title: 'Reset Password',
  },
  {
    path: 'chatbot',
    loadComponent: () =>
      import('./pages/dashboard/chatbot/chatbot.component').then(
        (m) => m.ChatbotComponent
      ),
    title: 'Chatbot',
  },
  {
    path: 'callback',
    loadComponent: () =>
      import('./pages/info/info.component').then((m) => m.InfoComponent),
    title: 'Info',
  },
  {
    path: 'prospects',
    loadComponent: () =>
      import('./pages/dashboard/prospects/prospects.component').then(
        (m) => m.ProspectsComponent
      ),
    title: 'Prospects',
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./pages/payment/payment.component').then(
        (m) => m.PaymentComponent
      ),
    title: 'Payment',
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./pages/dashboard/account/account.component').then(
        (m) => m.AccountComponent
      ),
    title: 'Account',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/welcome/welcome.component').then(
            (m) => m.WelcomeComponent
          ),
        title: 'Welcome',
      },
      {
        path: 'kpi',
        loadComponent: () =>
          import('./pages/dashboard/kpi/kpi.component').then(
            (m) => m.KpiComponent
          ),
        title: 'KPI',
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import(
            './pages/dashboard/notifications/notifications.component'
          ).then((m) => m.NotificationsComponent),
      },
      {
        path: 'ai-agent',
        loadComponent: () =>
          import('./pages/dashboard/ai-agent/ai-agent.component').then(
            (m) => m.AiAgentComponent
          ),
        title: 'AI Agent',
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/dashboard/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
        title: 'Projects',
      },
      {
        path: 'leads',
        loadComponent: () =>
          import('./pages/dashboard/leads/leads.component').then(
            (m) => m.LeadsComponent
          ),
        title: 'Leads',
      },
      {
        path: 'wallet',
        loadComponent: () =>
          import('./pages/dashboard/user/wallet/wallet.component').then(
            (m) => m.WalletComponent
          ),
        title: 'Wallet',
      },
      {
        path: 'billing',
        loadComponent: () =>
          import('./pages/dashboard/user/billing/billing.component').then(
            (m) => m.BillingComponent
          ),
        title: 'Billing',
      },
      {
        path: 'invoice',
        loadComponent: () =>
          import('./pages/dashboard/user/invoice/invoice.component').then(
            (m) => m.InvoiceComponent
          ),
        title: 'Invoice',
      },
      {
        path: 'user-profile',
        loadComponent: () =>
          import(
            './pages/dashboard/user/user-profile/user-profile.component'
          ).then((m) => m.UserProfileComponent),
        title: 'User Profile',
      },
    ],
  },
  {
    path: '404',
    component: Page404Component,
    title: '404 Not Found',
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];
