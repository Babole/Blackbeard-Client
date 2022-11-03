import { fireEvent, screen, render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Login from './index'

describe('Pages/Login', () => {
    beforeEach(() => {
        routerRender(<Login />)
    })

    test('Renders the page', () => {
        const Login = screen.getByRole("main")
        expect (Login).toBeInTheDocument()
    })

    test("it has 'LOGIN' on Screen", () => {
        const login = screen.getByText(/LOGIN/i)
        expect(login).toBeInTheDocument();
    })

    test('navigates to Sign Up', () => {
        const signupBtn = screen.getByLabelText("Sign Up Button")
        fireEvent.click(signupBtn)
        expect (location.pathname).toBe('/Register')
    })


    test('it has a form', () => {
        const form = screen.getByTestId("login form")
        expect(form).toBeInTheDocument();
    })

    test('it has a username input', () => {
        const username = screen.getByPlaceholderText('Enter username')
        expect (username).toBeInTheDocument
    })
    
    test('it has a password input', () => {
        const password = screen.getByPlaceholderText('Enter password')
        expect (password).toBeInTheDocument
    })
    
    test('it has a submit button', () => {
        const submitbtn = screen.getByTestId('submit-btn')
        expect (submitbtn).toBeInTheDocument
    })

    test('passes login information', () => {
        const username = 'hello'
        const password = '123password'
        const wrapper = shallow(<Login handleLogin={state => {
            expect(state.username).to.be.equal(username)
            expect(state.password).to.be.equal(password);
        }} />)
        wrapper.setState({username:'hello', password: '123password'});
        screen.getByTestId('submit-btn').simulate('click')
    })
})
