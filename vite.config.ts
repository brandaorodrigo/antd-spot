import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    build: {
        outDir: './dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom', 'react-router-dom'],
                    antd: ['antd', 'antd-mobile', '@ant-design/plots'],
                    icon: ['react-icons', 'lottie-react'],
                },
            },
        },
    },
    plugins: [
        react(),
        checker({
            eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' },
            typescript: true,
        }),
    ],
    server: { port: 3000 },
});
