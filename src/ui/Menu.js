import React from "react";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export default class Menu extends React.Component {
    render() {
        return (
            <div id="menu">
                <Typography variant="h1" gutterBottom>Invasion</Typography>
                <Button variant="contained" color="primary">
                    Start
                </Button>
            </div>
        );
    }
}
