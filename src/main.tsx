
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if this is the user's first visit
const isFirstVisit = !localStorage.getItem('zsee-app-visited');
if (isFirstVisit) {
  // Mark as visited
  localStorage.setItem('zsee-app-visited', 'true');
}

createRoot(document.getElementById("root")!).render(<App />);
