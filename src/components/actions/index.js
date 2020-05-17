export const changeMoney =(el)=>{
    return {
        type : 'MONEY',
        payload:el
    }
}

export const changeTime =(el)=>{
    return {
        type : 'TIME',
        payload:el
    }
}
export const changeRate =(el)=>{
    return {
        type : 'RATE',
        payload:el
    }
}
export const changePayment =(el)=>{
    return {
        type : 'PAYMENT',
        payload:el
    }
}