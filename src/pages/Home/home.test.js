/* istanbul ignore next */
import Home from './index'

describe ('Pages/Home', () => {
    xbeforeEach(() => {
        routerRender(<Home />)
    })

    xtest('Renders the page', ()=>{
        const Home = screen.getByRole('main')
        expect (Home).toBeInTheDocument()
    })

    xtest('it has a create game button', () => {
        const createGameBtn = screen.getByLabelText("Create Game Button")
        expect (createGameBtn).toBeInTheDocument()
    })
})
