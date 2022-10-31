import { render, screen, fireEvent } from '@testing-library/react';
import Register from './index';

describe('Pages/Register', () => {
    const handleSubmit = jest.fn()
    beforeEach(() => {
        render(<Register onSubmit={handleSubmit} />);
        // render(<Register />);
    })
      
    test('Renders the page', () => {
        const registerPage = screen.getByRole("main")
        expect(registerPage).toBeInTheDocument();
    });

    // test('submits', () => {
    //     const registerForm = screen.getByRole("form")
    //     const submitBtn = screen.getByText("Submit")
    //     fireEvent.submit(registerForm)
    //     expect(handleSubmit).toHaveBeenCalled()
    // })
  })
