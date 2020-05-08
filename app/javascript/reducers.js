import { combineReducers } from "redux"
import ReactiveRecord, { reducer } from "reactiverecord"
import "models/User"
export default combineReducers({
    models: reducer.call(ReactiveRecord) /* call it models or anything */
})