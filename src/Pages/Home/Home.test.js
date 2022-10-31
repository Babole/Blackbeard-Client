import { screen } from '@testing-library/react';
import Home from './index';

describe('Pages/Home', () => {
    beforeEach(() => {
        routerRender(<Home />);
    })
      
    test('Renders the page', () => {
        const homePage = screen.getByRole("main")
        expect(homePage).toBeInTheDocument();
    });
  })