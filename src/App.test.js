import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header element', () => {
  render(<App />);
  const headerElement = screen.getByText(/Recipes of the day/i);
  expect(headerElement).toBeInTheDocument();
});
