import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./pages/filter-hero/filter-hero.component')
                .then(m => m.FilterHeroComponent)
    },
    {
        path: 'add-superhero',
        loadComponent: () => 
            import('./pages/add-superhero/add-superhero.component')
                .then(m => m.AddSuperheroComponent)
    },
    {
        path: 'edit-superhero/:id',
        loadComponent: () => 
            import('./pages/edit-superhero/edit-superhero.component')
                .then(m => m.EditSuperheroComponent)
    },
];
