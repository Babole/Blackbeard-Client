import { screen } from '@testing-library/react';
import Join from './index';

describe('Pages/Join', () => {
    beforeEach(() => {
        routerRender(<Join />);
    })
      
    test('Renders the page', () => {
        const joinPage = screen.getByRole("main")
        expect(joinPage).toBeInTheDocument();
    });
  })