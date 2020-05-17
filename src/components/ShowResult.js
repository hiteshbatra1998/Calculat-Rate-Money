import React from 'react'
import axios from 'axios';
import {debounce} from "lodash"
import {connect} from 'react-redux';
import { changeRate , changePayment } from './actions'
class ShowResult extends React.Component{
  
  componentWillMount = debounce( ()=> {
    if( this.props.money>=500 && this.props.money<=5000 &&  this.props.time>=6 && this.props.time<=24 ){
    
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.props.money}&numMonths=${this.props.time}`)
      .then(response => {
        this.props.ra(  response.data.interestRate )
        this.props.pa(  response.data.monthlyPayment.amount)
      })
      .catch(error => {
        alert(error);
      })}
      else{
        alert('Money is to be in between 500 to 5000 and time in between 6 to 24')
      }
    },500);
      componentDidUpdate = debounce( async ()=> {
        if( this.props.money>=500 && this.props.money<=5000 &&  this.props.time>=6 && this.props.time<=24 ){
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
            alert(error);
          })}
          else{
            
            alert('Money is to be in between 500 to 5000 and time in between 6 to 24')
            this.props.ra(  0)
            this.props.pa( 0)
          }
      },1000);
       
    render(){
      
        return (
            <div className="show-result-data">
                <div className="common-flex">
                    <div className="common-bold">Principal Amount :</div> <div> ${this.props.money} </div>
                </div>
                <div className="common-flex">
                    <div className="common-bold">Duration :</div> <div> {this.props.time} months </div>
                </div>
                <div className="common-flex">
                    <div className="common-bold">Rate :</div> <div> {this.props.rate}% </div>
                </div>
                <div className="common-flex">
                    <div className="common-bold">Monthly Payment :</div> <div> ${this.props.payment} </div>
                </div>
                
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