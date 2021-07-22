import { render, screen } from '@testing-library/react';
import HomeView from '../HomeView';

test('renders header element', () => {
  render(<HomeView />);
  const headerElement = screen.getByText(/Recipes of the day/i);
  expect(headerElement).toBeInTheDocument();
});
