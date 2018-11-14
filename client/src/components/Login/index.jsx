import React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react/index";
import {Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, Button} from "react-bootstrap"

@inject('authStore')
@observer
export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.login=React.createRef();
        this.password=React.createRef();
    }
   signIn(){
        this.props.authStore.signIn(this.login.current.value, this.password.current.value);
    }
    /**
     * Отрисовка элементов компании на странице с возможностью их удаления.
     */
    render() {
        const {props: {authStore: {userFromDataBase}}} = this;
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Username
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" inputRef={this.login} placeholder="Enter username" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" inputRef={this.password} placeholder="Enter password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={()=>this.signIn()}>Sign in</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
