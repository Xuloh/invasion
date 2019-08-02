import * as settings from "settings";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import PropTypes from "prop-types";
import React from "react";

export default class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = settings.get();
    }

    cancelClick() {
        this.props.onClose();
    }

    saveClick() {
        this.props.onClose();
        settings.set(this.state);
    }

    change(key, value) {
        const state = {};
        state[key] = value;
        this.setState(state);
        console.log(key + " : " + value);
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>
                    Settings
                </DialogTitle>
                <DialogContent>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={this.state.showGrid} onChange={(e, v) => this.change("showGrid", v)} color="secondary"/>} label="Show grid"/>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => this.cancelClick()}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={() => this.saveClick()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SettingsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
