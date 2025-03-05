import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { AiAgentComponent } from './pages/ai-agent/ai-agent.component';

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
        path: 'chatbot',
        loadComponent: () => import('./pages/chatbot/chatbot.component').then(m => m.ChatbotComponent),
        title: 'Chatbot'
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
        title: 'account'
    },
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
