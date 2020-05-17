import React from 'react'
import {connect} from 'react-redux';
import {debounce } from 'lodash'
import { changeTime , changeMoney } from './actions'
class SideBar extends React.Component{

    Change( a,b ){
        this.props.mo(a);
        this.props.ti(b);
    }
    renderList = debounce( ( ele ) =>{
        if(ele){
        return ele.map( (list , key) =>{
            return <div className="list-data-row" onClick={ ()=>this.Change( list[0] , list[1]  ) }> 
                        <div>${list[0]} </div>
                        <div>{list[1]} months</div>  
                    </div>
        } )
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