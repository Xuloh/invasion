import {CssBaseline} from "@material-ui/core";
import Menu from "ui/Menu";
import PropTypes from "prop-types";
import React from "react";

export default class UI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: true
        };
        this.props.performAction((action, args) => this.performAction(action, args));
    }

    performAction(action, args) {
        switch(action) {
            case "toggleMenu":
                this.setState({
                    displayMenu: args.display
                });
                break;
            default:
                console.warn("UI : unknown action : " + action);
                break;
        }
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
                <Menu display={this.state.displayMenu} startClick={() => this.props.handleAction("startClick")}/>
            </React.Fragment>
        );
    }
}
UI.propTypes = {
    performAction: PropTypes.func,
    handleAction: PropTypes.func
};
