import React from "react";
import Menu from "./Menu.js";
import Game from "./Game.js";
import { CssBaseline } from "@material-ui/core";

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Menu/>
                <Game/>
            </React.Fragment>
        );
    }
}
