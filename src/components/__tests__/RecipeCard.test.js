import { render, screen } from '@testing-library/react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import RecipeCard from '../RecipeCard';

test('renders button element', () => {
  const recipe = {img: '/test.jpg', ID: 123, title: 'Test Recipe'};
  render(
    <Router>
      <RecipeCard recipe={recipe}/>
    </Router>
  );
  const buttonElement = screen.getByText(/View Recipe/i);
  expect(buttonElement).toBeInTheDocument();
});
