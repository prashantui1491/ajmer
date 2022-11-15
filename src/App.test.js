import { render, screen } from '@testing-library/react';
import App from './App';
import UserList from './UserList';

test('Test for navbar title', () => {
  render(<App />);
  const linkElement = screen.getByText("Ajmer Assignment");
  expect(linkElement).toBeInTheDocument();
});

test('Test for navbar title', () => {
  render(<App />);
  const linkElement = screen.getByRole("button",{name:"Submit"});
  expect(linkElement).toBeEnabled();
});

test('Test for navbar title', () => {
  render(<App />);
  expect(screen.getByRole('TextField', { name: 'id' })).toHaveValue('10');
});
