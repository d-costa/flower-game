import "./App.css";
import React from "react";
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import About from "./components/About";

class App extends React.Component {
    render() {
        return (
            <div className={"content"}>
                <Router basename={`/${process.env.PUBLIC_URL}`}>
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
