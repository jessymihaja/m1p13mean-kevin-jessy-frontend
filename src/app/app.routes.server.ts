import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'client/shop/:id',
    renderMode: RenderMode.Server 
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
