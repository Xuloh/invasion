import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PlayArrow from "@material-ui/icons/PlayArrow";
import PropTypes from "prop-types";
import React from "react";
import Settings from "@material-ui/icons/Settings";
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

                <Grid container direction="column" alignItems="center">
                    <Button id="start" variant="contained" color="primary" size="large" onClick={() => this.startClick()}>
                        <PlayArrow style={{marginRight: "5px"}}/>
                        Start
                    </Button>
                    <Button id="settings" variant="text" color="secondary" size="medium" onClick={() => console.log("clicked settings")}>
                        <Settings style={{marginRight: "5px"}}/>
                        Settings
                    </Button>
                </Grid>
            </div>
        );
    }
}

Menu.propTypes = {
    display: PropTypes.bool
};
