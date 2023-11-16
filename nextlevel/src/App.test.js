import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('sets user cookie on login', () => {
  const user = { email: 'test@example.com', password: 'password' };
  const setCookie = jest.fn();
  const { getByTestId } = render(<App />);
  const loginForm = getByTestId('login-form');
  fireEvent.submit(loginForm, { target: { elements: user } });
  expect(setCookie).toHaveBeenCalledWith('user', expect.any(Object), expect.any(Object));
});

test('hashes user email before storing in cookie', () => {
  const user = { email: 'test@example.com', password: 'password' };
  const setCookie = jest.fn();
  const { getByTestId } = render(<App />);
  const loginForm = getByTestId('login-form');
  fireEvent.submit(loginForm, { target: { elements: user } });
  const [, userWithHashedEmail] = setCookie.mock.calls[0];
  expect(userWithHashedEmail.email).not.toBe(user.email);
});

test('cookie expires after 7 days', () => {
  const user = { email: 'test@example.com', password: 'password' };
  const setCookie = jest.fn();
  const { getByTestId } = render(<App />);
  const loginForm = getByTestId('login-form');
  fireEvent.submit(loginForm, { target: { elements: user } });
  const [, , options] = setCookie.mock.calls[0];
  expect(options.expires).toBeInstanceOf(Date);
  expect(options.expires.getTime()).toBeCloseTo(new Date().getTime() + 7 * 24 * 60 * 60 * 1000, -2);
});