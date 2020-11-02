import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Customers from './components/Customers/Customers';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders table', () => {
  render(<Customers />);
  const linkElement = screen.getByText(/Company Name/i);
  expect(linkElement).toBeInTheDocument();
});
