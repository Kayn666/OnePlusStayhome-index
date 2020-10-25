import instance from "./http";

function apiIndex() {
    return  new Promise((resolve,reject) => {
        instance.get('/index/index').then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiDetail(sid) {
    return  new Promise((resolve,reject) => {
        instance.get('/index/detail/'+sid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiList(params) {
    return  new Promise((resolve,reject) => {
        instance.get('/index/lists',{
            params
        }).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiLogin(body) {
    return  new Promise((resolve,reject) => {
        instance.post('/index/login',body).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiRegister(body) {
    return  new Promise((resolve,reject) => {
        instance.post('/index/user',body).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiCollection(sid,token) {
    return  new Promise((resolve,reject) => {
        instance.get('/index/collection?sid='+sid+'&token='+token).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiCollectionList() {
    return  new Promise((resolve,reject) => {
        instance.get('/index/collectionlist').then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiPerson() {
    return  new Promise((resolve,reject) => {
        instance.get('/index/user/1').then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiOrders(body) {
    return  new Promise((resolve,reject) => {
        instance.post('/index/orders',body).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiOrdersList(type) {
    return  new Promise((resolve,reject) => {
        instance.get('/index/orderslist?type='+type).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiOrdersStatus(status,oid) {
    return  new Promise((resolve,reject) => {
        instance.get('/index/orders?status='+status+'&oid='+oid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiOrdersQuit(oid) {
    return  new Promise((resolve,reject) => {
        instance.delete('/index/orders/'+oid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

export {apiIndex,apiDetail,apiList,apiLogin,apiRegister,apiCollection,apiCollectionList,apiPerson,apiOrders,apiOrdersList,apiOrdersStatus,apiOrdersQuit}