import React from 'react'
import axios from 'axios';
import {debounce} from "lodash"
import {connect} from 'react-redux';
import { changeRate , changePayment } from './actions'
class ShowResult extends React.Component{
  
  componentWillMount = debounce( ()=> {
    
    
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.props.money}&numMonths=${this.props.time}`)
      .then(response => {
        this.props.ra(  response.data.interestRate )
        this.props.pa(  response.data.monthlyPayment.amount)
      })
      .catch(error => {
        console.log(error);
      });
    },500);
      componentDidUpdate = debounce( async ()=> {
        axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.props.money}&numMonths=${this.props.time}`)
          .then(response => {
            this.props.ra(  response.data.interestRate )
            this.props.pa(  response.data.monthlyPayment.amount)
         
            var oldItems = JSON.parse(localStorage.getItem('money')) || [] ;
            var num = [this.props.money, this.props.time];
            
            oldItems.push(num)
            localStorage.setItem('money', JSON.stringify(oldItems));
          })
          .catch(error => {
            console.log(error);
          });
      },500);
       
    render(){
      
        return (
            <div>
                <br/>
                money : {this.props.money}
                <br/>
                time : {this.props.time}
                <br/>
                rate : {this.props.rate}
                <br/>
                payment : {this.props.payment}
                <br/>
            </div>
        )
    }
}
const mapStateToProps = state => {
  return {
      time : state.handleTime,
      money:state.handleMoney,
      rate:state.handleRate,
      payment:state.handlePayment
  }
}

const mapDispatchToProps=dispatch=>{
  return{
      ra:pr=>dispatch( changeRate(pr) ),
      pa:pr=>dispatch( changePayment(pr) ),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShowResult)