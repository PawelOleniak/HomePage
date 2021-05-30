
export default function promiseMiddleware() {
    return (next) => (action)=>{
        const { promise, type, ...rest } = action;
        if(!promise || typeof promise.then !== "function"){
            return next(action);
        }
        const SUCCESS= `${type}_SUCCESS`
        const REQUEST= `${type}_REQUEST`
        const FALIURE= `${type}_FALIURE`
        next({type: REQUEST, ...rest })

        return promise
            .then( response => response.json())
            .then( data => {
                next({
                    type: SUCCESS,
                    payload: data,
                    ...rest,

                })
            })
            .catch(error => {
                next({type: FALIURE, error, ...rest})
            })
    }
}