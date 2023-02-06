import "../App.css";
import React from "react";
import Game from "./Game";
import Page from "./Page";
import constants from "./consts";
import queryString from 'query-string';

function Home() {
    const params = queryString.parse(window.location.search);

    return (
        <Page>
            <Game queryState={params[constants.CELLS_QUERY_PARAM]}/>
        </Page>
    );
}

export default Home;