import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                Aileron_Thin: ['Aileron_Thin', ...defaultTheme.fontFamily.sans],
                Aileron_UltraLight: ['Aileron_UltraLight', ...defaultTheme.fontFamily.sans],
                Audrey_Normal: ['Audrey_Normal', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
