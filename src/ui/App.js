import React from "react";
import Menu from "./Menu.js";
import Game from "./Game.js";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Menu/>
                <Game/>
            </div>
        );
    }
}
