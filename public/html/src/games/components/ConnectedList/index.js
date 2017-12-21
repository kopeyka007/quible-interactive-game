import React, { Component } from 'react';
import { Image, Button, ListGroupItem, ListGroup } from 'react-bootstrap';

class Gamer extends Component {
    render() {
        return (
            <div>
                 <div className="media">
                    <div className="media-left">
                        <Image src={ this.props.gamer.avatar } circle />
                    </div>
                    <div className="media-body">
                        { this.props.gamer.fname } { this.props.gamer.lname }
                    </div>
                </div>
            </div>
        );
    }
}

export default class ConnectedList extends Component {
    render() {
        let gamers = this.props.connected.map((gamer) => <ListGroupItem  key={gamer.id.toString()}><Gamer gamer={gamer} /></ListGroupItem>);
        return (
            <ListGroup>
                { gamers }
            </ListGroup>
        );
    }
}