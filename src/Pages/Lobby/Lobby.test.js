import { screen } from '@testing-library/react';
import Lobby from './index';

describe('Pages/Lobby', () => {
    beforeEach(() => {
        routerRender(<Lobby />);
    })
      
    test('Renders the page', () => {
        const lobbyPage = screen.getByRole("main")
        expect(lobbyPage).toBeInTheDocument();
    });
  })