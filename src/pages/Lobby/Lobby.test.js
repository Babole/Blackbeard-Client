<<<<<<< HEAD
import { screen } from '@testing-library/react';
=======
import { screen} from '@testing-library/react';
>>>>>>> 1e37a38774efcfd2781bb79a9f1716ef26640ded
import Lobby from './index';

describe('Pages/Lobby', () => {
    beforeEach(() => {
<<<<<<< HEAD
        routerRender(<Lobby />);
    })
      
    test('Renders the page', () => {
        const lobbyPage = screen.getByRole("main")
        expect(lobbyPage).toBeInTheDocument();
    });
  })
=======
        routerRender(<Lobby />)
    })

    test('Renders the page', () => {
        const Lobby = screen.getByRole("main")
        expect(Lobby).toBeInTheDocument()
    });

    test("it has a greeting 'Welcome to Room'", () => {
        const greeting = screen.getByTestId('greeting').textContent
        expect(greeting).toBe('Welcome to Room')
    })
})
>>>>>>> 1e37a38774efcfd2781bb79a9f1716ef26640ded
