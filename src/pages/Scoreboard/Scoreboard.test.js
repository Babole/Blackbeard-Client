import { screen} from '@testing-library/react';
import Scoreboard from './index';


// import axios from 'axios';
// jest.mock('axios')

describe('Pages/Scoreboard', () => {
    beforeEach(() => {
        routerRender(<Scoreboard />)
    })

    // beforeEach(() => {
    //     axios.getmockResolvedValue([{"games_won": 0, "username": "User1"}, {"games_won": 0, "username": "Matt"}])
    // })

    test('Renders the page', () => {
        const scoreboardPage = screen.getByRole("scoreboard")
        expect(scoreboardPage).toBeInTheDocument()
    });

    test("it has a header 'Scoreboard'", () => {
        const title = screen.getByTestId('header').innerHTML
        expect(title).toBe('Scoreboard')
    })
})
