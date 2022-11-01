import { screen} from '@testing-library/react';
import Create from './index';

describe('Pages/Create', () => {
    beforeEach(() => {
        routerRender(<Create />)
    })

    test('Renders the page', () => {
        const Create = screen.getByRole("main")
        expect(Create).toBeInTheDocument()
    });

    test("it has a greeting 'Create a new Game'", () => {
        const greeting = screen.getByTestId('title').textContent
        expect(greeting).toBe('Create a new Game')
    })
    test("it has input label 'Create new Room' ", () => {
        const label = screen.getByLabelText("roomID").innerHTML
        expect(label).toBe('Create new Room: ');
    })
    test("it has submit button", () => {
        const submitBtn = screen.getByTestId("submit-btn")
        expect(submitBtn).toBeInTheDocument();
    })
})
