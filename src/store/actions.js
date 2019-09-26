import {
    Toast
} from 'mint-ui';
import network from '../axios/index';

export default {
    searchState({
        commit,
        dispatch
    }, searchState) {
        commit('SEARCH_STATE', searchState);
    },
    keyDown({
        commit,
        dispatch
    }, falgkey) {
        commit('SEARCH_KEY',falgkey);
    },
    searchtList({
        commit,
        dispatch
    }, searchtList) {
        commit('SEARCH_LIST',searchtList);
    },
    isInit({
        commit,
        dispatch
    }, isInit) {
        commit('SEARCH_INIT',isInit);
    },
    setPlayingState({
        commit,
        dispatch
    },playing){
        commit('SET_PLAYING_STATE', playing);
    },
}