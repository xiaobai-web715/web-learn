import React from 'react';
import { createRoot } from 'react-dom/client';
import RouterIndex from 'src/router/index.tsx';
import './index.scss';

createRoot(document.getElementById('root')).render(<RouterIndex />);
