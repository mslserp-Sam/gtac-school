import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/gtac/', // keep this since your site is in domain.com/gtac
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            publicDirectory: 'public',
            buildDirectory: 'build', // Vite will output to public/build automatically
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build',   // <-- MUST BE inside public
        emptyOutDir: true,
    }
});