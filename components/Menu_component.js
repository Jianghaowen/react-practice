import React, { Component } from 'react';
// import {Card ,CardImg ,CardImgOverlay , CardText , CardBody ,CardTitle , CardGroup} from 'reactstrap';
import {Card ,CardImg ,CardImgOverlay , CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from'react-router-dom';
import {Loading} from './loadingComponent';
import { baseUrl } from '../shared/baseUrl';



class Menu extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            //   selectedDish : null
        }
        console.log ("Menu component construct is invoked")
    }
    // transform_date(date) {
    //         if  (date.substring(5,7)==="01"){
    //             return ("Jan " + date.substring(8,10) + " " + date.substring(0,4))
    //         } 
    //         else if (date.substring(5,7)==="02"){
    //             return ("Feb " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="03"){
    //             return ("Mar " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="04"){
    //             return ("Apr " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="05"){
    //             return ("May " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="06"){
    //             return ("Jun " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="07"){
    //             return ("Jul " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="08"){
    //             return ("Aug " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="09"){
    //             return ("Sep " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="10"){
    //             return ("Oct " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="10"){
    //             return ("Now " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    //         else if (date.substring(5,7)==="12"){
    //             return ("Dec " + date.substring(8,10) + " " + date.substring(0,4))
    //         }
    // }

    // componentDidMount() {
    //     console.log("Menu component componentDidMount is invoked")
    // }
    // onDishSelect(dish) {
    //     this.setState({selectedDish:dish})
    // }
    
    // renderDish(dish){
    //     if (dish !=null){
    //      const selected_food = dish.comments.map(food => {
    //             return (
    //                     <section key = {food.id} >
    //                         <CardText>{food.comment}</CardText>
    //                         <CardText>-- {food.author},{this.transform_date(food.date.substring(0,10))} </CardText><br/>
    //                     </section>
    //             )
    //         } );
    //         return (
    //             <CardGroup>
    //                 <Card className = "col-12 col-md-5 m-1">
    //                     <CardImg width = "100%" src={dish.image} alt={dish.name}/>
    //                     <CardBody>
    //                         <CardTitle>{dish.name}</CardTitle>
    //                         <CardText>{dish.description}</CardText>
    //                     </CardBody>
    //                 </Card>
    //                 <Card className = "col-12 col-md-5 m-1 ">
    //                    <CardBody>
    //                        <CardTitle>Comment</CardTitle>
    //                             {selected_food}
    //                     </CardBody>
    //                 </Card>
    //              </CardGroup>
            
    //          )
    //     }
    //     else{
    //         return (
    //             <div></div>
    //         )
    //     }
    // }

    render() {
        const menu = this.props.dishes.dishes.map(dish=> {
            // return (<div onClick = {() => this.onDishSelect(dish)} key = {dish.id} className ="col-12 col-md-5 m-1" >
            return (
                      <Card className ="col-12 col-md-5 m-1"key = {dish.id} >
                          <Link to = {`/menu/${dish.id}`}>
                          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                              <CardImgOverlay>
                                  <CardTitle>{dish.name}</CardTitle>
                              </CardImgOverlay>
                            </Link>
                      </Card>

                   )
        }
            );
        if(this.props.dishes.isLoading) {
                return (
                    <div className = "container">
                        <div className = "row">
                            <Loading  />
                        </div>
                    </div>
                )
            }
            else if (this.props.dishes.errMess) {
            return (
                <div className = "container">
                        <div className = "row">
                             <h4>{this.props.dishes.errMess}</h4>
                        </div>
                    </div>)
            }
        else 
            return (
                <div className = "container">
                    <div className = "row">
                        <Breadcrumb>
                        <BreadcrumbItem><Link to = "/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>>
                        </Breadcrumb>
                        <div className = "col-12">
                            <h3>Menu</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className = "row">
                            {menu}
                    </div>
                    {/* <div className = "row">
                        {this.renderDish(this.state.selectedDish)}
                    </div> */}
                </div>
            
            )
    }
}
export default Menu;
