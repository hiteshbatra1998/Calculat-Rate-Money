import React from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import {connect} from 'react-redux';
import { changeTime , changeMoney } from './actions'
class TakeInput extends React.Component {
  render(){
  const handleSliderMoney =  (event,newValue) => {
    this.props.mo(newValue)
  };
  const handleInputMoney =  (event , newValue) => {
    if( event.target.value>500 ){
      this.props.mo(event.target.value)
    }
    else{
      alert( 'money should be grater than 500' )
    }
  };

  const handleSliderTime = (event,newValue) => {
    this.props.ti(newValue)
  };
  const handleInputTime = (event , newValue) => {
    if( event.target.value>=6 ){
    this.props.ti(event.target.value)
    }
    else{
      alert('Time should be greater than 6')
    }
  };
  
  
  return (
      <div>
    <div className="take-input-outer">
        <div className="money-input-div">
            <div>Enter Money</div>
            <Input
                value={this.props.money }
                margin="dense"
                onChange={handleInputMoney}
                inputProps={{
                step: 1,
                min: 500,
                max: 5500,
                type: 'number'
                }}
            />
            <Slider value={this.props.money } max={5000} min={500} 
                onChange={handleSliderMoney}
            step={1}
            />   
        </div>
        <div className="time-input-div">
        <div>Enter Time</div>
            <Input
                value={this.props.time }
                margin="dense"
                onChange={handleInputTime}
                inputProps={{
                step: 1,
                min: 6,
                max: 24,
                type: 'number'
                }}
            />
            <Slider value={this.props.time } max={24} min={6} 
                onChange={handleSliderTime}
            step={1}
            />   
        </div>  
    </div>
    
    </div>
  );
  }
}
const mapStateToProps = state => {
  return {
      time : state.handleTime,
      money:state.handleMoney
  }
}
const mapDispatchToProps=dispatch=>{
  return{
      mo:pr=>dispatch( changeMoney(pr) ),
      ti:pr=>dispatch( changeTime(pr) ),
  }
}
export default connect(  mapStateToProps , mapDispatchToProps)(TakeInput)