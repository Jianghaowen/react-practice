import React , {Component} from 'react';
import { Navbar, NavbarBrand,Jumbotron , Nav , 
    Collapse ,NavbarToggler,NavItem ,  Button , 
    Modal ,ModalHeader , ModalBody, FormGroup, Input ,Label, Form} from 'reactstrap';
import {NavLink}   from 'react-router-dom';





class Header extends Component {
    constructor(props) {
            super(props);
            this.state = {
                isNavopen:false,
                isModalOpen: false

            };
            this.toggleNav = this.toggleNav.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }
    toggleNav() {
        this.setState(
            {
                isNavOpen:!this.state.isNavOpen
            }
        );
    }
    toggleModal() {
        this.setState(
            {
                isModalOpen:!this.state.isModalOpen
            }
        );
    }
    render() {
        return (
            <>
              <Navbar dark expand="md">
                   <div className = "container">
                      <NavbarToggler onClick = {this.toggleNav}/>
                       <NavbarBrand className = "mr-auto" href="/">
                           <img src = "assets/images/logo.png" height="30px" width = "41px" alt = "The_icon"/>
                        </NavbarBrand>
                           <Collapse isOpen = {this.state.isNavOpen} navbar>
                             <Nav navbar>
                                 <NavItem>
                                     <NavLink className = "nav-link" to = "/home">
                                         <span className = "fa fa-home fa-lg">Home</span>
                                      </NavLink>
                                  </NavItem>
                                  <NavItem>
                                     <NavLink className = "nav-link" to = "/About_US">
                                         <span className = "fa fa-info fa-lg">About US</span>
                                      </NavLink>
                                  </NavItem>
                                  <NavItem>
                                     <NavLink className = "nav-link" to = "/menu">
                                         <span className = "fa fa-list fa-lg">menu</span>
                                      </NavLink>
                                  </NavItem>
                                  <NavItem>
                                     <NavLink className = "nav-link" to = "/contactus">
                                         <span className = "fa fa-address-card fa-lg">Contact US</span>
                                      </NavLink>
                                  </NavItem>
                            </Nav>
                            <Nav className = "ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick = {this.toggleModal}>
                                        <span className = "fa fa-sign-in fa-lg"></span> Login
                                    </Button>
                                </NavItem>
                            </Nav>
                          </Collapse>
                   </div>
              </Navbar>
              <Jumbotron>
                  <div className="container">
                      <div className = "row row-header">
                          <div className="col-12 col-sm-6">
                            <h1>The first website</h1>
                            <p>This is my first website using react framework.It's a good time to study the knowledge from coursera.</p>
                           </div>
                        </div>
                    </div> 
             </Jumbotron>
             {/* <Modal isOpen = {this.state.isModalOpen} toggle = {this.state.toggleModal}>
                 <ModalHeader toggle = {this.state.toggleModal}>login</ModalHeader> */}
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                 <ModalBody>
                    <Form onSubmit = {this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor = "username">Username</Label>
                            <Input type = "text" id = "username" name = "username"
                            innerRef  = {(input) => this.username = input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor = "password">Password</Label>
                            <Input type = "password" id = "password" name = "password"
                            innerRef  = {(input) => this.password = input}
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                               <Input type = "checkbox"  name = "remember"
                               innerRef  = {(input) => this.remember = input}
                               />
                               Remember me 
                            </Label>
                        </FormGroup>
                        <Button type = "submit" value = "submit" className = "primary">Login</Button>
                    </Form>
                 </ModalBody>
              </Modal>
            </>
        )
    }
}
export default Header;