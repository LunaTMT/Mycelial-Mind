import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { ComponentType } from 'react';

createInertiaApp({
  resolve: (name: string) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
    return pages[`./pages/${name}.tsx`]; // Fix the path here to include the correct file extension
  },
  setup({ el, App, props }: { el: HTMLElement; App: ComponentType; props: Record<string, any> }) {
    createRoot(el).render(<App {...props} />);
  },
});
