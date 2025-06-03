import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:6094,
    allowedHosts:['yumeko.smartchainstudio.in','https://yumeko.smartchainstudio.in','https://www.yumeko.smartchainstudio.in','http://www.yumeko.smartchainstudio.in','http://yumeko.smartchainstudio.in']
  },
  preview:{
    port:6094,
    allowedHosts:['yumeko.smartchainstudio.in','https://yumeko.smartchainstudio.in','https://www.yumeko.smartchainstudio.in','http://www.yumeko.smartchainstudio.in','http://yumeko.smartchainstudio.in']
  }
})
