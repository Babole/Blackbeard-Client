import { screen} from '@testing-library/react';
import { shallow, mount, render } from 'enzyme';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Join from './index'
// import App from '../../App'

describe('Pages/Join', () => {
    let useEffect;

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
      };

    beforeEach(() => {
    /* mocking useEffect */
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect(); // 2 times
    mockUseEffect(); //
})

    // test("check token", () => {
    //     const wrapper = shallow (<Join />)
    //     expect(wrappper.find())
    // })
    // beforeEach(() => {
    //     render(
    //         <BrowserRouter >
    //         <Routes>
    //         <Route path='/join' element={<Join />} />
    //         </Routes>
    //         </BrowserRouter>
    //     )
        // render(
        // <Join />, {wrapper: BrowserRouter}
        // )
    // })

    // test('Renders the page', () => {
    //       render(
    //       <BrowserRouter >
    //         <Routes>
    //         <Route path='/join' element={<Join />} />
    //         </Routes>
    //       </BrowserRouter>
    //       )
    //     const joinpage = screen.getByRole("main")
    //     expect(joinpage).toBeInTheDocument()
    // });

    test('asks user to join', () => {
        const wrapper = shallow (
            <BrowserRouter >
                <Routes>
                    <Route path='/join' element={<Join />} />
                </Routes>
            </BrowserRouter>
        )
        // const join = <h1>Join a Game</h1>
        // expect(wrapper.contains(join)).toEqual(true)
        expect(wrapper.find('container-join')).toEqual(true)
    })

    test('navigates to ', () => {
        const join = screen.getByLabelText("Join")
        fireEvent.click(join)
        expect (location.pathname).toBe('/game')
    })

    test('navigates back to Home', () => {
        const Homebtn = screen.getByLabelText("Home Button")
        fireEvent.click(Homebtn)
        expect (location.pathname).toBe('/home')
    })

})
