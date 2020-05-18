import {combineReducers} from 'redux';

let money = 800;
let time = 8;
let rate = 0;
let payment = 0;
let interest =0;
let total= 0;
export const handleMoney=(state=money , action )=>{
    if( action.type==='MONEY' ){
        let newState=state;
        newState=action.payload;
        return newState;
    }
    return state;
}
export const handleInterest=(state=interest , action )=>{
    if( action.type==='INTEREST' ){
        let newState=state;
        newState=action.payload;
        return newState;
    }
    return state;
}
export const handleTime=(state=time , action )=>{
    if( action.type==='TIME' ){
        let newState=state;
        newState=action.payload;
        return newState;
    }
    return state;
}

export const handleRate=(state=rate , action )=>{
    if( action.type==='RATE' ){
        let newState=state;
        newState=action.payload;
        return newState;
    }
    return state;
}

export const handlePayment=(state=payment , action )=>{
    if( action.type==='PAYMENT' ){
        let newState=state;
        newState=action.payload;
        return newState;
    }
    return state;
}

export const handleTotal=(state=total , action )=>{
    if( action.type==='TOTAL' ){
        let newState=state;
        newState=action.payload;
        return newState;
    }
    return state;
}

export default combineReducers({
    handleMoney,
    handleTime,
    handlePayment,
    handleRate,
    handleInterest,
    handleTotal
})