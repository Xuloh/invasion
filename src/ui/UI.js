import {CssBaseline} from "@material-ui/core";
import Menu from "./Menu";
import React from "react";

export default class UI extends React.Component {
    constructor(props) {
        super(props);
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
