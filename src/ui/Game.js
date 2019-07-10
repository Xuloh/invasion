import React from "react";

export default class Game extends React.Component {
    render() {
        return (
            <div id="game" className="inactive">
                <div id="player" className="entity"/>
                <div id="pointer" className="entity"/>
            </div>
        );
    }
}
