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
                Audrey: ['Audrey', ...defaultTheme.fontFamily.sans],
                Poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            textShadow: {
                'default': '0 2px 0 #000',
                'beige-glow': '0 0 10px rgba(245, 245, 220, 0.8), 0 0 20px rgba(245, 245, 220, 0.6)',

                'slate-glow': '0 0 25px rgba(31, 41, 55, 1), 0 0 45px rgba(31, 41, 55, 0.7), 0 0 60px rgba(55, 65, 81, 1)', // Slate-like glow
                'golden-glow': '0 0 5px rgba(255, 215, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.5), 0 0 25px rgba(255, 215, 0, 0.3)',


              }
        },
    },

    darkMode: 'class', // This enables dark mode based on the presence of the 'dark' class

    plugins: [forms, require('tailwindcss-textshadow')],

    corePlugins: {
        preflight: true,
    },

    // You only need one `extend` block, combine your existing `extend` with the new additions.
    extend: {
        addComponents: {
            '.scrollbar-hidden::-webkit-scrollbar': {
                display: 'none',
            },
            '.scrollbar-hidden': {
                '-ms-overflow-style': 'none',   // For Internet Explorer
                'scrollbar-width': 'none',       // For Firefox
            },
        },
    },
};
