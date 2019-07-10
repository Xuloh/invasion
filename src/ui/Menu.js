import React from "react";
import Button from '@material-ui/core/Button';

export default class Menu extends React.Component {
    render() {
        return (
            <div id="menu">
                <h1 id="title">Invasion</h1>
                <Button variant="contained" color="primary">
                    Start
                </Button>
            </div>
        );
    }
}
