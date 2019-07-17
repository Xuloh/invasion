import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";
import {Typography} from "@material-ui/core";

export default class Menu extends React.Component {
    startClick() {
        gameState.start();
    }

    render() {
        const display = this.props.display ? "flex" : "none";
        return (
            <div id="menu" style={{display: display}}>
                <Typography id="title" variant="h1" gutterBottom>Invasion</Typography>
                <Button id="start" variant="contained" color="primary" onClick={() => this.startClick()}>
                    Start
                </Button>
            </div>
        );
    }
}

Menu.propTypes = {
    display: PropTypes.bool
};
