import React from "react";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";

export default class Menu extends React.Component {
    startClick() {
        gameState.start();
    }

    render() {
        return (
            <div id="menu">
                <Typography id="title" variant="h1" gutterBottom>Invasion</Typography>
                <Button id="start" variant="contained" color="primary" onClick={() => this.startClick()}>
                    Start
                </Button>
            </div>
        );
    }
}
