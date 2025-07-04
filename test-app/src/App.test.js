import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders login page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const loginElement = screen.getByText(/Login to Your Account/i);
  expect(loginElement).toBeInTheDocument();
});