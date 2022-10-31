import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    routerRender(<App />)
  })

  test('Renders the app', () => {
    const app = screen.getByRole("application")
    expect(app).toBeInTheDocument();
  });

  // test('renders learn react link', () => {
  //   const linkElement = screen.getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
  // });
})

