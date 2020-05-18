import React from 'react'
import axios from 'axios';
import {debounce} from "lodash"
import {connect} from 'react-redux';
import { changeRate , changePayment ,changeInterest , changeTotal } from './actions'

class ShowResult extends React.Component{
  
  // Will call API when component is displayed first and used default value to call API. 
  componentWillMount = debounce( ()=> {
    // check the validity of the input values by the user.
    if( this.props.money>=500 && this.props.money<=5000 &&  this.props.time>=6 && this.props.time<=24 ){
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.props.money}&numMonths=${this.props.time}`)
      .then(response => {
        // Set the values of rate, monthly payment interest to be payed and total amount to be given by dispatching actions.
        this.props.ra(  response.data.interestRate )
        this.props.pa(  response.data.monthlyPayment.amount)
        this.props.in( parseInt(this.props.payment) * parseInt(this.props.time) - parseInt(this.props.money))
        this.props.tot( parseInt(this.props.payment) * parseInt(this.props.time))
      })
      .catch(error => {
        alert(error);
      })}
      else{
        // will alert if default values will be invalid.
        alert('Money is to be in between 500 to 5000 and time in between 6 to 24')
      }
    },500);

    // When component is updated or value is being changes then API is called.
    // Debouncing is used when user will stop for 1s then results would be displayed.
    componentDidUpdate = debounce( async ()=> {
      // check the validity of the input values by the user.
      if( this.props.money>=500 && this.props.money<=5000 &&  this.props.time>=6 && this.props.time<=24 ){
        axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.props.money}&numMonths=${this.props.time}`)
          .then(response => {
            // Set the values of rate, monthly payment interest to be payed and total amount to be given by dispatching actions.
            this.props.ra(  response.data.interestRate )
            this.props.pa(  response.data.monthlyPayment.amount)
            this.props.tot( parseInt(this.props.payment) * parseInt(this.props.time))
            this.props.in( parseInt(this.props.payment) * parseInt(this.props.time) - parseInt(this.props.money))
            
            // pushing the values in the local storage.
            var oldItems = JSON.parse(localStorage.getItem('money')) || [] ;
            var num = [this.props.money, this.props.time];
            oldItems.push(num)
            localStorage.setItem('money', JSON.stringify(oldItems));
          })
          .catch(error => {
            alert(error);
          })
      }
      else{      
        // set all the values to 0 when invalid data is being entered.
        alert('Money is to be in between 500 to 5000 and time in between 6 to 24')
        this.props.ra(  0)
        this.props.pa( 0)
        this.props.in(  0)
        this.props.tot( 0)
      }
    },1000);
       
    render(){
        return (
            <div className="show-result-data">
                <div className="common-flex">
                    <div className="common-bold">Interest Rate :</div> <div> {this.props.rate}% </div>
                </div>
                <div className="common-flex">
                    <div className="common-bold">Monthly Payment :</div> <div> ${this.props.payment} </div>
                </div>
                <div className="common-flex">
                    <div className="common-bold">Total Payment :</div> <div className="common-bold"> ${this.props.total} </div>
                </div>
                <div className="common-flex">
                    <div className="common-bold"> Total Interest :</div> <div className="common-bold"> ${this.props.interest} </div>
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
      payment:state.handlePayment,
      interest:state.handleInterest,
      total : state.handleTotal
  }
}

const mapDispatchToProps=dispatch=>{
  return{
      ra:pr=>dispatch( changeRate(pr) ),
      pa:pr=>dispatch( changePayment(pr) ),
      in:pr=>dispatch( changeInterest(pr) ),
      tot:pr=>dispatch( changeTotal(pr) )
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShowResult)