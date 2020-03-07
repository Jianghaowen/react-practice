import React, { Component } from 'react';
import Menu from './Menu_component';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch , Route , Redirect , withRouter} from 'react-router-dom'
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './Dishdetail';
import About from './aboutus';
import {connect} from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos ,fetchLeaders , pushAdvice} from '../redux/actionCreators';
import {actions} from 'react-redux-form';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const mapStateToprops = state => {
    return {
        dishes:state.dishes,
        comments : state.comments,
        promotions : state.promotions,
        leaders: state.leaders,
        Advices : state.advices
    }
};


const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    pushAdvice : (firstname, lastname, telnum, email , agree ,contactType , message) => dispatch(pushAdvice(firstname, lastname, telnum, email , agree ,contactType , message))
  });

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }
      

    render() {
        const Homepage = () => {
            return (
                <Home 
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            )
        };
        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            ) 
        };
        const leader_news = () => {
            return (
                <About Leaders = {this.props.leaders.leaders}/>
            )
        }
        return (
            <section>
                  <Header/>
                  <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch location={this.props.location}>
                            <Route path="/Home" component={Homepage} />
                            <Route exact path = "/About_US" component = {leader_news}/>
                            <Route exact path ="/menu" component= {() =><Menu dishes = {this.props.dishes}/>}/>
                            <Route path = "/menu/:dishId" component = {DishWithId}/>
                            <Route exact path ="/contactus" component = {() =><Contact 
                                                                              resetFeedbackForm = {this.props.resetFeedbackForm}
                                                                              pushAdvice = {this.props.pushAdvice}
                                                                              />}/>
                            <Redirect to = "/Home"/>
                        </Switch>
                      </CSSTransition>
                  </TransitionGroup>
                  <Footer/>
            </section>)
 }
}
export default withRouter(connect(mapStateToprops,mapDispatchToProps)(Main)) ;