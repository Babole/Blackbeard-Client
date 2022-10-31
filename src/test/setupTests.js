import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

const TestProviders = () => {
    return ({ children }) => (
        <Router>
            {children}
        </Router>
    )
}

const routerRender = (ui) => {
    let TestWrapper = TestProviders()
    render(ui, { wrapper: TestWrapper })
}


global.React = React;
global.render = render;
global.routerRender = routerRender
global.userEvent = userEvent;