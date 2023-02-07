import "../App.css";
import React from "react";
import Game from "./Game";
import Page from "./Page";
import constants from "./consts";
import {InitialGameState} from "./consts";
import queryString from 'query-string';

function Home() {
    const params = queryString.parse(window.location.search);

    return (
        <Page>
            <Game initialState={new InitialGameState(params[constants.CELLS_QUERY_PARAM], params[constants.GENERATION_PARAM])}/>
        </Page>
    );
}

export default Home;
