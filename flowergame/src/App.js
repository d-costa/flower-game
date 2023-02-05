import "./App.css";
import React from "react";
import Home from "./components/Home";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";

class App extends React.Component {
    render() {
        return (
            <div className={"content"}>
                <Header/>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                </Router>
            </div>

        );
    }
}

export default App;
