import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'gtac': {
                    '50': '#f5f7f6',
                    '100': '#dfe8e4',
                    '200': '#c3d4ce',
                    '300': '#9fb8ac',
                    '400': '#6b9282',
                    '500': '#4a6f5e',
                    '600': '#37584a',
                    '700': '#2d463d',
                    '800': '#283934',
                    '900': '#25302b',
                    '950': '#121d19',
                },
            },
        },
    },

    plugins: [forms],
};
