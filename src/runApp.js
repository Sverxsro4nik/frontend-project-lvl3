import 'bootstrap';
import './style/style.css';
import createStartLayout from './createStartLayout.js';
import controller from './controller.js';

const app = async () => {
  createStartLayout();
  controller();
};

export default app;
