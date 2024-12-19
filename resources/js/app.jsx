import React from 'react';
import ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}');
        return pages[`./Pages/${name}.tsx`] || pages[`./Pages/${name}.jsx`] || (() => { throw new Error(`Page not found: ${name}`) });
    },
    
    setup({ el, App, props }) {
        ReactDOM.createRoot(el).render(<App {...props} />);
    },
});
