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
    test("it has input label 'username' ", () => {
        const label = screen.getByLabelText("username")
        expect(label).toBeInTheDocument();
    })
    test("it has input label 'password' ", () => {
        const label = screen.getByLabelText("password")
        expect(label).toBeInTheDocument();
    })
    test("it has input label 'confirm password' ", () => {
        const label = screen.getByLabelText("confirm password")
        expect(label).toBeInTheDocument();
    })
    test("it has submit button", () => {
        const submitBtn = screen.getByTestId("submit-btn")
        expect(submitBtn).toBeInTheDocument();
    })
    test("it has input button to redirect user to Sign In", () => {
        const redirectBtn = screen.getByTestId("redirect-btn")
        expect(redirectBtn).toBeInTheDocument();
    })
  })
