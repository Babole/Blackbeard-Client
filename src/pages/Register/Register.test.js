import { fireEvent, screen, render } from '@testing-library/react';
import Register from './index'

describe('Pages/Register', () => {
    beforeEach(() => {
        routerRender(<Register />)
    })

    test('Renders the page', () => {
        const Register = screen.getByRole("main")
        expect (Register).toBeInTheDocument()
    })

    test("it has 'REGISTER' on Screen", () => {
        const register = screen.getByText(/REGISTER/i)
        expect(register).toBeInTheDocument();
    })

    test('navigates to Sign Up', () => {
        const signinBtn = screen.getByLabelText("Sign In Button")
        fireEvent.click(signinBtn)
        expect (location.pathname).toBe('/')
    })

    test('it has a username input', () => {
        const username = screen.getByLabelText('username')
        expect (username).toBeInTheDocument
    })
    
    test('it has a password input', () => {
        const password = screen.getByLabelText('password')
        expect (password).toBeInTheDocument
    })
    
    test('it has a password input', () => {
        const confirm_password = screen.getByLabelText('confirm password')
        expect (confirm_password).toBeInTheDocument
    })
    
    test('it has a submit button', () => {
        const submitbtn = screen.getByTestId('submit-btn')
        expect (submitbtn).toBeInTheDocument
    })

    

})
