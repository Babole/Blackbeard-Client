import { screen } from '@testing-library/react';
import Create from './index';

describe('Pages/Create', () => {
    beforeEach(() => {
        routerRender(<Create />);
    })
      
    test('Renders the page', () => {
        const createPage = screen.getByRole("main")
        expect(createPage).toBeInTheDocument();
    });
  })