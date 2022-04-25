import 'bootstrap';
import './style/style.css';
import createForm from './createForm.js';

const app = () => {
  document.body.append(createForm());
};

app();
