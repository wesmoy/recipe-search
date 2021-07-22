import { render, screen } from '@testing-library/react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import RecipeView from '../RecipeView';

const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: Router})
}

test('renders button element', () => {
  renderWithRouter(
    <Router >
      <RecipeView />
    </Router>
  );
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});
