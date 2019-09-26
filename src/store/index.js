
import actions from './actions'
import * as getters from './getters'
const state = {
    searchState: true,
    falgkey:'',
    isInit:false,
    searchtList:[],
    playing:false,
    islogin:false
};
export default {
    state,
    getters,
    mutations: {
        SEARCH_STATE(state, data) {
            state.searchState = data;
        },
        SEARCH_KEY(state,data){
            state.falgkey = data ;
        },
        SEARCH_LIST(state,data){
            state.searchtList = data ;
        },
        SEARCH_INIT(state,data){
            state.isInit = data ;
        },
        SET_PLAYING_STATE(state, data){
            state.playing = data;    
        },
    },
    actions: actions
}