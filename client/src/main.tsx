import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Layout from './Layout/Layout'

createRoot(document.getElementById('root')!).render(
  <Layout>
  <App />
</Layout>
)
