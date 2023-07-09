import { createContext, useEffect, useReducer } from "react";
import Reducer from './Reducer'

const INITIAL_STATE ={
    navigator: JSON.parse(localStorage.getItem("navigator")) || "home",
}

export const Context = createContext(INITIAL_STATE);

export const NavigatorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(()=>{

        localStorage.setItem('navigator', JSON.stringify(state.navigator));
    }, [state.navigator]);
    
    return(
        <Context.Provider value={({ navigator: state.navigator, dispatch})}>
            { children }
        </Context.Provider>
    )
};