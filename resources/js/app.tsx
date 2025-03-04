import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { createRoot } from 'react-dom/client';

import { CartProvider } from '../js/Contexts/CartContext';
import { NavProvider } from '../js/Contexts/NavContext';  
import { DarkModeProvider } from './Contexts/DarkModeContext';

import Lenis from 'lenis'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
  });
  

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <DarkModeProvider>
                <NavProvider>  
                    <CartProvider>  
                        <App {...props} />
                    </CartProvider>
                </NavProvider>
            </DarkModeProvider>
        );
    },
});
