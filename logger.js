const getTimeStamp = ()=>{
    return new Date().toISOString()
}

const info = (namespace,message,object)=>{
    if(namespace && message && object){
        console.log(`[${getTimeStamp()}] [Info] [${namespace}], ${message}`,object)
    }else{
        console.log(`[${getTimeStamp()}] [Info] [${namespace}], ${message}`)
    }
}

const error = (namespace,message,object)=>{
    if(namespace && message && object){
        console.log(`[${getTimeStamp()}] [ERROR] [${namespace}], ${message}`,object)
    }else{
        console.log(`[${getTimeStamp()}] [ERROR] [${namespace}], ${message}`)
    }
}

const debug = (namespace,message,object)=>{
    if(namespace && message && object){
        console.log(`[${getTimeStamp()}] [DEBUG] [${namespace}], ${message}`,object)
    }else{
        console.log(`[${getTimeStamp()}] [DEBUG] [${namespace}], ${message}`)
    }
}

export {
    info,
    debug,
    error
}