import { screen } from '@testing-library/react';
import Game from './index';

describe('Pages/Game', () => {
    beforeEach(() => {
        routerRender(<Game />);
    })
      
    test('Renders the page', () => {
        const gamePage = screen.getById("phaser-game")
        expect(gamePage).toBeInTheDocument();
    });
  })