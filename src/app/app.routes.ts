import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './components/page404/page404.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'login',
        loadComponent: () => import('./components/log-in/log-in.component').then(m => m.LogInComponent),
        title: 'Log In'
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),
        title: 'Register'
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        title: 'Forgot Password'
    },
    {
        path: 'otp-verification',
        loadComponent: () => import('./components/otp/otp.component').then(m => m.OtpComponent),
        title: 'Verify Code'
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
        title: 'Reset Password'
    },
    {
        path: 'chatbot',
        loadComponent: () => import('./pages/chatbot/chatbot.component').then(m => m.ChatbotComponent),
        title: 'Chatbot'
    },
    {
        path: 'callback',
        loadComponent: () => import('./pages/info/info.component').then(m => m.InfoComponent),
        title: 'Info'
    },
    {
        path: 'prospects',
        loadComponent: () => import('./pages/prospects/prospects.component').then(m => m.ProspectsComponent),
        title: 'Prospects'
    },
    {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent),
        title: 'Pricing'
    },
    {
        path: 'account',
        loadComponent: () => import('./pages/account/account.component').then(m => m.AccountComponent),
        title: 'Account',
        children: [
            {
                path: 'kpi',
                loadComponent: () => import('./pages/kpi/kpi.component').then(m => m.KpiComponent),
                title: 'KPI'
            },
            {
                path: 'ai-agent',
                loadComponent: () => import('./pages/ai-agent/ai-agent.component').then(m => m.AiAgentComponent),
                title: 'AI Agent'
            },
            {
                path: 'projects',
                loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
                title: 'Projects'
            },
            {
                path: 'leads',
                loadComponent: () => import('./pages/leads/leads.component').then(m => m.LeadsComponent),
                title: 'Leads'
            },
            {
                path: 'wallet',
                loadComponent: () => import('./pages/wallet/wallet.component').then(m => m.WalletComponent),
                title: 'Wallet'
            },
            {
                path: 'billing',
                loadComponent: () => import('./pages/billing/billing.component').then(m => m.BillingComponent),
                title: 'Billing'
            },
            {
                path: 'invoice',
                loadComponent: () => import('./pages/invoice/invoice.component').then(m => m.InvoiceComponent),
                title: 'Invoice'
            },
            {
                path: 'user',
                loadComponent: () => import('./pages/user-profile/user-profile.component').then(m => m.UserProfileComponent),
                title: 'User'
            },
        ]
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
