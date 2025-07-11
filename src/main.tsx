import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/components/dashboard/ThemeProvider";
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="dashboard-theme">
    <App />
  </ThemeProvider>
);
