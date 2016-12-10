import * as types from './mutation-types.js'


export const state = {
    messages: []
};

export const mutations = {
    [types.ADD_MESSAGE] (state, data) {
        state.messages.push({
            body: data.body,
            username: data.username,
            color: data.color,
            time: new Date()
        })
    }
};