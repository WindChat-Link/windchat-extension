import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import App from './App';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'windchat-extension';

document.body.append(root);
createRoot(root).render(
  <App />
);
