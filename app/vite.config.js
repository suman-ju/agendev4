import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/testSetup.js',
    coverage: {
      include: ['src/App.jsx', 'src/expenseUtils.js', 'src/components/**/*.jsx'],
      reporter: ['text', 'html'],
    },
  },
});
