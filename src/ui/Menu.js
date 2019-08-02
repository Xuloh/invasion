import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PlayArrow from "@material-ui/icons/PlayArrow";
import PropTypes from "prop-types";
import React from "react";
import Settings from "@material-ui/icons/Settings";
import SettingsDialog from "ui/SettingsDialog";
import {Typography} from "@material-ui/core";

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSettings: false
        };
    }

    render() {
        const display = this.props.display ? "flex" : "none";
        return (
            <Grid id="menu" container direction="column" alignItems="center" justify="center" spacing={10} style={{display: display}}>
                <Grid item>
                    <Typography id="title" variant="h1">Invasion</Typography>
                </Grid>
                <Grid item>
                    <Button id="start" variant="contained" color="primary" size="large" onClick={() => this.props.startClick()}>
                        <PlayArrow style={{marginRight: "5px"}}/>
                        Start
                    </Button>
                </Grid>
                <Grid item>
                    <Button id="settings" variant="text" color="secondary" size="medium" onClick={() => this.setState({openSettings: true})}>
                        <Settings style={{marginRight: "5px"}}/>
                        Settings
                    </Button>
                    <SettingsDialog open={this.state.openSettings} onClose={() => this.setState({openSettings: false})}/>
                </Grid>
            </Grid>
        );
    }
}

Menu.propTypes = {
    display: PropTypes.bool,
    startClick: PropTypes.func
};
