import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/gtac/',
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            publicDirectory: 'public',
            buildDirectory: 'build',
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'build',
        emptyOutDir: true,
    }
});