import React from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import {connect} from 'react-redux';
import { changeTime , changeMoney } from './actions'

class TakeInput extends React.Component {

  render(){
    // These functions handles slider and input values and dispatch the action everytime when any value is changed. 
    const handleSliderMoney =  (event,newValue) => {
      this.props.mo(newValue)
    };
    const handleInputMoney =  (event , newValue) => {
        this.props.mo(event.target.value)
    };
    const handleSliderTime = (event,newValue) => {
      this.props.ti(newValue)
    };
    const handleInputTime = (event , newValue) => {
      this.props.ti(event.target.value)
    };

  return (
    <div className="take-input-outer">
        <div className="money-input-div">
            <div className="input-head">Principal Amount in $ :</div>
            <Input className="input-field-div"
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
            <div className="input-max-min-div"> <div>$500</div> <div>$5000</div> </div>
        </div>
        <div className="time-input-div">
          <div className="input-head">Duration in Months :</div>
          <Input className="input-field-div"
              value= {this.props.time}
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
          <div className="input-max-min-div"> <div>6 months</div> <div>24 months</div> </div>  
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