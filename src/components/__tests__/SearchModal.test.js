import { render, screen } from '@testing-library/react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import SearchModal from '../SearchModal';

test('renders button element', () => {
  render(
    <Router>
      <SearchModal />
    </Router>
  );
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});
