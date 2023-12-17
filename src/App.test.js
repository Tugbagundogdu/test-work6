import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('renders title successfully', () => {
  render(<App />);
  const titleElement = screen.getByText(/Emoji List/i); 
  expect(titleElement).toBeInTheDocument();
});

test('renders emoji list on initial load', () => {
  render(<App />);
  const emojiListElement = screen.getByTestId('emoji-list');
  expect(emojiListElement).toBeInTheDocument();
});

test('renders emoji list based on filter', () => {
  render(<App />);
  const filterInput = screen.getByPlaceholderText('Search emojis...'); 
  fireEvent.change(filterInput, { target: { value: 'smile' } }); 
  const filteredEmojis = screen.getAllByTestId('emoji-item'); 
  expect(filteredEmojis.length).toBeGreaterThan(0);
});

test('copies emoji when clicked', () => {
  render(<App />);
  const emojiItem = screen.getByTestId('emoji-item'); 
  fireEvent.click(emojiItem);
  const clipboardContent = navigator.clipboard.readText(); 
  expect(clipboardContent).toEqual(emojiItem.textContent);
});
