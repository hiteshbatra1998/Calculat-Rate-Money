import React from 'react'
import {connect} from 'react-redux';
import {debounce } from 'lodash'
import { changeTime , changeMoney } from './actions'
class SideBar extends React.Component{

    //Actions are dispatched to change the in input and slider when user clicks on previously searched value
    Change( money,time ){              
        this.props.mo(money);  
        this.props.ti(time);
    }


    // Display the list of previously searched value and debouncing is used to update result when user stop sliding for 500ms.
    renderList = debounce( ( ele ) =>{
        // Check if there is some datat in local storage or not
        if(ele){
            return ele.map( (list , key) =>{
                return <div className="list-data-row" key={key} onClick={ ()=>this.Change( list[0] , list[1]  ) }> 
                            <div>${list[0]} </div>
                            <div>{list[1]} months</div>  
                        </div>
            })
        }
    },500)

    render(){
        return (
            <div className="side-main">
            <div className="side-bar-head"> Previous Values </div>
            <div className="side-bar-list">
                {this.renderList( JSON.parse(localStorage.getItem('money')) )}
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
        mo:pr=>dispatch( changeMoney(pr) ),
        ti:pr=>dispatch( changeTime(pr) ),
    }
  }
export default connect(mapStateToProps , mapDispatchToProps)(SideBar)
