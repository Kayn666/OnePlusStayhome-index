import Vue from "vue";

// let store = {
//     state:Vue.observable({
//         msg:'hello 简单的store'
//     }),
//     setMsg(msg){
//         this.state.msg=msg;
//     }
// }

// let store = Vue.observable({
//     msg:'hello observable'
// })

function formateDate(date){
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dates = date.getDate();
    return `${year}/${month}/${dates}`
}
function formateLeaveDate(date){
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dates = date.getDate()+1;
    return `${year}/${month}/${dates}`
}
let store = Vue.observable({
    enter_time:formateDate(new Date()),
    leave_time:formateLeaveDate(new Date()),
})

export default store;