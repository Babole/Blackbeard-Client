import { screen } from '@testing-library/react';
import { shallow, mount, render } from 'enzyme';
import {BrowserRouter as Router} from 'react-router-dom'
import Lobby from './index';

describe('Pages/Lobby', () => {
    
    beforeEach(() => {
        // const mockedUsedNavigate = jest.fn();
        // jest.mock('react-router-dom', () => ({
        // ...jest.requireActual('react-router-dom'),
        // useNavigate: () => mockedUsedNavigate,
        // }));
        shallow(
        <Router>
            <Lobby />
        </Router>)
    })

    test('Renders the page', () => {
        // const Lobby = screen.getByRole("main")
        const wrapper = shallow
        (<Router>
            <Lobby />
        </Router>).dive()
        const greeting = wrapper.find('[data-testid="greeting"]').text()
        expect(greeting).toMatchInlineSnapshot('Welcome to Room')
    });

    // test("it has a greeting 'Welcome to Room'", () => {
    //     const greeting = screen.getByTestId('greeting').textContent
    //     expect(greeting).toBe('Welcome to Room')
    // })
})
