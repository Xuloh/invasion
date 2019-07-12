import React from "react";
import Menu from "./Menu.js";
import {CssBaseline} from "@material-ui/core";

export default class UI extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Menu/>
            </React.Fragment>
        );
    }
}
