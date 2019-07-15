import React from "react";
import Menu from "./Menu.js";
import {CssBaseline} from "@material-ui/core";

export default class UI extends React.Component {
    constructor(props) {
        super(props);
        gameState.$ui = this;
        this.state = {
            displayMenu: true
        };
    }

    toggleMenu(display) {
        this.setState({
            displayMenu: display
        });
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Menu display={this.state.displayMenu}/>
            </React.Fragment>
        );
    }
}
