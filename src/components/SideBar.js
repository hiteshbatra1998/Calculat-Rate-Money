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
            return <div onClick={ ()=>this.Change( list[0] , list[1]  ) }  > {list[0]} , {list[1]}  </div>
        } )
        }
    },500)
    render(){
        
        return (
            <div>
            <div> Previous Values </div>
            {this.renderList( JSON.parse(localStorage.getItem('money')) )}
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