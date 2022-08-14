import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { TEST_IDS } from './constants';

test('renders the App div', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
    );
  expect(screen.getByTestId(TEST_IDS.appDiv)).toBeInTheDocument();
});
