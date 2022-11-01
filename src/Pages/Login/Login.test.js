import { render, screen, fireEvent } from '@testing-library/react';
import Login from './index';

describe('Pages/Login', () => {
    const handleSubmit = jest.fn()
    beforeEach(() => {
        routerRender(<Login onSubmit={handleSubmit} />);
        // render(<Login />);
    })
      
    test('Renders the page', () => {
        const loginPage = screen.getByRole("main")
        expect(loginPage).toBeInTheDocument();
    });

    // test('submits', () => {
    //     const loginForm = screen.getByRole("form")
    //     const submitBtn = screen.getByText("Submit")
    //     fireEvent.submit(loginForm)
    //     expect(handleSubmit).toHaveBeenCalled()
    // })
  })
