import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.tsx',
                'resources/css/app.css',
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'localhost', // Or use '0.0.0.0' if you need it to be publicly accessible
        port: 5174,
        cors: true, // Enable CORS
    },
});
