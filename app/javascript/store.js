import ReactiveRecord, { reducer, middleware } from 'reactiverecord';
import { createStore, compose, applyMiddleware } from 'redux';
import "models/User"

const storeEnhancers = [applyMiddleware(middleware.call(ReactiveRecord))];

const store = createStore(reducer.call(ReactiveRecord), compose.apply(this, storeEnhancers));

ReactiveRecord.store = store;
ReactiveRecord.dispatch = store.dispatch;
ReactiveRecord.setAPI({ prefix: '/api', headers: { Accept: '*/*'} });

export default store;
