import { screen} from '@testing-library/react';
import Register from './index';

describe('Pages/Register', () => {
    beforeEach(() => {
        routerRender(<Register />);
    })
      
    test('Renders the page', () => {
        const registerPage = screen.getByRole("main")
        expect(registerPage).toBeInTheDocument();
    });
  })
