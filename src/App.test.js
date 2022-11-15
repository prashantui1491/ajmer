import { render, screen } from '@testing-library/react';
import App from './App';

test('Test for navbar title', () => {
  render(<App />);
  const linkElement = screen.getByText("Ajmer Assignment");
  expect(linkElement).toBeInTheDocument();
});