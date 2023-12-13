import { render, screen } from '@testing-library/react';
import App from './App';
import './matchMediaMock'
test('renders layout header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Mock Page/i);
  expect(linkElement).toBeInTheDocument();
});
