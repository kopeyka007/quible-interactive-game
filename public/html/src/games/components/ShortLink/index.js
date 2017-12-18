import React, { Component } from 'react';
import {FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap';

export default class ShortLink extends Component {
    state = {
        value : this.props.link
    }
    
    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handlerReloadLink(e) {
        this.setState({ value: "new" });
    }

    render() {
        return (
            <FormGroup>
                <InputGroup>
                    <InputGroup.Button>
                        <Button onClick={(event) => this.handlerReloadLink(event)}>Reload</Button>
                    </InputGroup.Button>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Short link"
                        onChange={(event) => this.handleChange(event)}
                    />
                </InputGroup>
            </FormGroup>
        );
    }
}