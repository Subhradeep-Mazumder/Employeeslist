const global_state ={
    employees:[],
    logincredentials:{
        username:"hruday@gmail.com",
        password :"hruday123"
       },
    login: false,
    loading:false,
    loginmessage:""
       
};
const reducer = (state = global_state, action) => {
    const newState = {...state,
        logincredentials:Object.assign(state.logincredentials),
        employees:state.employees.slice()
    };

        if(action.type === 'loading')
    {
        newState.loading= true;
    }

    if(action.type === 'login')
    {
        newState.loading= false;
        newState.login= true;
        newState.employees=action.value;
    }
    if(action.type === 'logout')
    {
        newState.login= false;
    }
    if(action.type === 'wrongpassword')
    {
        newState.loginmessage="YOU HAVE ENTERED WRONG PASSWORD";
    }

    return newState;
}

export default reducer;