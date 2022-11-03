import { fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Error from './index'

describe('Pages/Error', () => {
    beforeEach(() => {
        routerRender(<Error />)
    })

    test('Renders the page', () => {
        const Error = screen.getByRole("main")
        expect (Error).toBeInTheDocument()
    })
    
    test('it has Error Messgage on Screen', () => {
        const errorMsg = screen.getByText(/Hmmm/i)
        expect(errorMsg).toBeInTheDocument();
    })
    
    test('it has a back Home button', () => {
        const Homebtn = screen.getByLabelText("Home Button")
        expect (Homebtn).toBeInTheDocument()
    })
    
    test('navigates back to Home', () => {
        const history = createMemoryHistory();
        const Homebtn = screen.getByLabelText("Home Button")
        fireEvent.click(Homebtn)
        expect (history.location.pathname).toBe('/')
    })

})
