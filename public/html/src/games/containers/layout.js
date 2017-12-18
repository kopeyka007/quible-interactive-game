import React from 'react';
import ReactDOM from 'react-dom';

import { FriendsList, ShortLink, ConnectedList } from 'games/components';
import {Grid, Row, Col } from 'react-bootstrap';

export default class Layout extends React.Component {
    state = {
        link : "http://quibble.dev/game/Q23shdsd",
        connected : [
          {
            id : 1,
            lname : "Lname",
            fname : "Fname",
            avatar : "//placehold.it/50x50"
          },
          {
            id : 2,
            lname : "Lname",
            fname : "Fname",
            avatar : "//placehold.it/50x50"
          },
          {
            id : 3,
            lname : "Lname",
            fname : "Fname",
            avatar : "//placehold.it/50x50"
          }
        ],
        friends : [
          {
            id : 1,
            lname : "Lname",
            fname : "Fname",
            avatar : "//placehold.it/50x50"
          },
          {
            id : 2,
            lname : "Lname",
            fname : "Fname",
            avatar : "//placehold.it/50x50"
          },
          {
            id : 3,
            lname : "Lname",
            fname : "Fname",
            avatar : "//placehold.it/50x50"
          }
        ]
      }
      
    render() {
        return (
            <div >
                <Grid>
                <br />
                <Row>
                  <Col md={12}>
                    <ShortLink link={this.state.link} />
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <div className="well">
                      <ConnectedList connected={this.state.connected} />
                    </div>
                  </Col>
                  <Col md={4}>
                    <FriendsList list={this.state.friends} />
                  </Col>
                </Row>
              </Grid>
            </div>
        );
    }
}