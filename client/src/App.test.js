import { render, screen , fireEvent } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Test input values', () => {
  render(<App />);
  const input = document.getElementById("stockSymbol");
  fireEvent.change(input, {target: {value: 'Amazon'}})
  expect(input.value).toBe('Amazon')
});

test('Test output algorithm based on stock symbol', () => {
  render(<App />);
  const button = document.getElementById("submit");
  fireEvent.click(button)
  const output = document.getElementById("test");
  expect(output.innerHTML).toBe("Hi")
});
