
const Reducer = (state, action) => {
    switch (action.type) {
        case "HOME":
            return{
                navigator: action.payload,
            }
        case "NOTIFICATIONS":
            return{
               navigator: action.payload,
            }
        case "PROJECTS":
            return{
                navigator: action.payload,
            }
        case "ANALYTICS":
            return{
                navigator: action.payload,
            }
        case "SETTINGS":
                return{
                    navigator: action.payload,
                }
        default:
            return state;
    }
}

export default Reducer