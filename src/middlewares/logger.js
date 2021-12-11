// define logger middleware to check every action and its affect on update the store
const logger =(store)=>(next)=>(action)=>{
    console.group (action.type)
    console.log('The action: ', action)
    const newStateValue=next (action);
    console.log('The new state: ', store.getState())
    console.groupEnd()
    return newStateValue;
}

export default logger;