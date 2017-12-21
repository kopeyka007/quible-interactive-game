import React, { Component } from 'react';
import {Button, Image, ListGroup, ListGroupItem} from 'react-bootstrap';


class Friend extends Component {
    constructor(props) {
      super(props);
    }

    handlerInviteFriend(friend) {        
        console.log('Invite ', friend)        
    }
  
    render() {
      return (
        <div>
          <div className="media">
            <div className="media-left">
              <Image src={ this.props.friend.avatar } circle />
            </div>
            <div className="media-body">
              { this.props.friend.fname } { this.props.friend.lname }
            </div>
            <div className="media-right">
              <Button onClick={() => this.handlerInviteFriend(this.props.friend)}>Invite</Button>
            </div>
          </div>
        </div>
      );
    }
}
  

export default class FriendsList extends Component {
    
    constructor(props) {
      super(props);
    }
  
    render() {
      let friends = this.props.list.map((friend) => <ListGroupItem key={friend.id}><Friend friend={friend}/></ListGroupItem>);
      return (
        <ListGroup>
          { friends }
        </ListGroup>
      );
    }
}
