import React , {Component} from 'react';
import {Card ,CardImg ,CardText , CardBody ,CardTitle,Breadcrumb , BreadcrumbItem,Modal ,ModalHeader , ModalBody,Row , Col,Button, Label} from 'reactstrap';
import {Link} from'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './loadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform , Fade , Stagger } from 'react-animation-components';

const maxLength = (len) => (val)=> !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            isModalOpen: false
        };
    this.transform_date = this.transform_date.bind(this);
    this.RenderComments = this.RenderComments.bind(this);
    this.RenderDish = this.RenderDish.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    }

toggleModal() {
        this.setState(
            {
                isModalOpen:!this.state.isModalOpen
            }
        );
    }

handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dish.id, values.Rating, values.username, values.comment);
    }

transform_date(date) {
            if  (date.substring(5,7)==="01"){
                return ("Jan " + date.substring(8,10) + " " + date.substring(0,4))
            } 
            else if (date.substring(5,7)==="02"){
                return ("Feb " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="03"){
                return ("Mar " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="04"){
                return ("Apr " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="05"){
                return ("May " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="06"){
                return ("Jun " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="07"){
                return ("Jul " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="08"){
                return ("Aug " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="09"){
                return ("Sep " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="10"){
                return ("Oct " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="10"){
                return ("Now " + date.substring(8,10) + " " + date.substring(0,4))
            }
            else if (date.substring(5,7)==="12"){
                return ("Dec " + date.substring(8,10) + " " + date.substring(0,4))
            }
    }
RenderComments(comments) {
            if(comments !=null){
                return (
                     <div>
                         <h4>Comments</h4>
                         <ul className = "list-unstyled">
                            <Stagger in>
                             {comments.map((comment) =>{
                                 return (
                                     <Fade key = {comment.id} in>
                                        <li >
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author},{this.transform_date(comment.date.substring(0,10))}</p>
                                        </li> 
                                     </Fade> 
                             )
                                 })}
                            </Stagger>
                         </ul>
                    </div>
                )}
            else {
                return (
                    <div>
                    </div>
                )
            }
            
            }

RenderDish(dish) {
            return (
                <FadeTransform in transformProps = {{
                    exitTransform : 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width = "100%" src={baseUrl + dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
    )
}


render() {
        if(this.props.isLoading) {
            return (
                <div className = "container">
                    <div className = "row">
                        <Loading  />
                    </div>
                </div>
            )
        }
        else if (this.props.errMess) {
          return (  <div className = "container">
                    <div className = "row">
                         <h4>{this.props.errMess}</h4>
                    </div>
                </div>)
        }
        
        else if(this.props.dish !=null){
        return (
        <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.RenderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.RenderComments(this.props.comments
                            )}
                        <br/>
                        <Button outline onClick = {this.toggleModal}>
                                        <span className = "fa fa-sign-in fa-lg"></span> Submit Comment
                        </Button>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                        <Row className="form-group">
                                          <Label htmlFor="Rating" md={2}><strong>Rating</strong></Label>
                                        </Row>
                                        <Row className="form-group">
                                            <Col md={{size: 10}}>
                                                <Control.select model=".Rating" name="Rating"
                                                    className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Control.select>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                          <Label htmlFor="username" md={5}><strong>Your Name</strong></Label>
                                        </Row>
                                        <Row className="form-group">
                                            <Col md={{size: 10}}>
                                            <Control.text model=".username" id="username" name="username"
                                                    placeholder="Your name"
                                                    className="form-control"
                                                    validators={{
                                                        minLength : minLength(3),
                                                        maxLength : maxLength(15)
                                                    }}
        
                                             />
                                              <Errors
                                                    className="text-danger"
                                                    model=".username"
                                                    show="touched"
                                                    messages={{
                                                        minLength: 'your length is too short',
                                                        maxLength: 'your length is too long'
                                                        }}
                                                  />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                           <Label htmlFor="comment" md={5}><strong>Your Feedback</strong></Label>
                                        </Row>
                                        <Row className="form-group">
                                            <Col md={10}>
                                                <Control.textarea model=".comment" id="comment" name="comment"
                                                    rows="12"
                                                    className="form-control" />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col md={{size:2}}>
                                                <Button type="submit" color="primary">
                                                 Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                            </ModalBody>
                    </Modal>
        </div>
     
     
     
     )}
            
    }
}


export default DishDetail;