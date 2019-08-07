import * as Settings from "settings";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import PropTypes from "prop-types";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Warning from "@material-ui/icons/WarningTwoTone";

export default class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = Settings.get();

        if(!Settings.localStorageAvailable) {
            const warningText = "Local storage is disabled or not supported on your browser. Settings will not persist after you close the tab. If you enabled it, you need to reload the page.";
            this.warning = (
                <Tooltip title={warningText}>
                    <Warning style={{color: "#f1c40f"}}/>
                </Tooltip>
            );
        }
    }

    defaultClick() {
        Settings.reset();
        this.setState(Settings.get());
    }

    cancelClick() {
        this.props.onClose();
    }

    saveClick() {
        this.props.onClose();
        Settings.set(this.state);
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
                        <Tooltip title="Disable this option to improve performance">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.showGrid}
                                        onChange={(e, v) => this.change("showGrid", v)}
                                        color="secondary"
                                    />
                                }
                                label="Show grid"
                            />
                        </Tooltip>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.displayPlayerHP}
                                    onChange={(e, v) => this.change("displayPlayerHP", v)}
                                    color="secondary"
                                />
                            }
                            label="Display player health bar"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.displayEnemyHP}
                                    onChange={(e, v) => this.change("displayEnemyHP", v)}
                                    color="secondary"
                                />
                            }
                            label="Display enemy health bars"
                        />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    {this.warning}
                    <Button onClick={() => this.defaultClick()}>
                        Reset defaults
                    </Button>
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
