import {Router, ServerLocation} from "@reach/router";
import React from "react";
import {Provider} from "react-redux";
import store from "../store";
import Home from "./Home";

const App = ({ path }) => (
    <Provider store={store} >
        <ServerLocation url={path}>
                <Router>
                    <Home path="/" />
            </Router>
        </ServerLocation>
    </Provider>
);

export default App
