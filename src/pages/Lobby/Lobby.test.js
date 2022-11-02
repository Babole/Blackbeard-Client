import { screen } from '@testing-library/react';
import Lobby from './index';

describe('Pages/Lobby', () => {
    beforeEach(() => {
        routerRender(<Lobby />)
    })

    xtest('Renders the page', () => {
        const Lobby = screen.getByRole("main")
        expect(Lobby).toBeInTheDocument()
    });

    xtest("it has a greeting 'Welcome to Room'", () => {
        const greeting = screen.getByTestId('greeting').textContent
        expect(greeting).toBe('Welcome to Room')
    })
})
