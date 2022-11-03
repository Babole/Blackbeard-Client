import { screen} from '@testing-library/react';
import Scoreboard from './index';
import userEvent from '@testing-library/user-event';

// import axios from 'axios';
// jest.mock('axios')

describe('Pages/Scoreboard', () => {
    // let getUsersScore;
    // beforeEach(() => {
    //     getUsersScore = jest.fn()
    //     routerRender(<Scoreboard get/>)
    // })

    test('Displays users score', async() => {
        expect(useEffectTest()).toBe([{"username": 'Matt', 'games_won': 4}])
    })

    // beforeEach(() => {
    //     axios.getmockResolvedValue([{"games_won": 0, "username": "User1"}, {"games_won": 0, "username": "Matt"}])
    // })
    // beforeEach(()=>{
        
    // })

    test('Renders the page', () => {
        const scoreboardPage = screen.getByRole("scoreboard")
        expect(scoreboardPage).toBeInTheDocument()
    });

    test("it has a header 'Scoreboard'", () => {
        const title = screen.getByTestId('header').innerHTML
        expect(title).toBe('Scoreboard')
    })

    test('navigates back to Home', () => {
        const Homebtn = screen.getByLabelText("Home Button")
        fireEvent.click(Homebtn)
        expect (location.pathname).toBe('/home')
    })
})
