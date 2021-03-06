import Vue from 'vue'
import router from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
import {
    loginAPI,
    registerAPI,
    getUserInfoAPI,
    updateUserInfoAPI,
    beMemberAPI,
} from '@/api/user'

import {
    getUserOrdersAPI,
    cancelOrderAPI,
    updateOverTimeOrdersAPI,
} from '@/api/order'

const user = {
    state: {
        userId: '',
        userInfo: {},
        userOrderList: [],
        getMembershipModalVisible: false,
        orderDetailModalVisible: false,
        currentOrder: {},
    },

    mutations: {
        reset_state: function(state) {
            state.token = ''
            state.userId = ''
            state.userInfo = {}
            state.userOrderList = []
        },
        set_token: function(state, token) {
            state.token = token
        },
        set_email: (state, data) => {
            state.email = data
        },
        set_userId: (state, data) => {
            state.userId = data
        },
        set_userInfo: (state, data) => {
            state.userInfo = {
                ...state.userInfo,
                ...data,
            }
        },
        set_userOrderList: (state, data) => {
            state.userOrderList = data
        },
        set_getMembershipModalVisible: function(state, data) {
            state.getMembershipModalVisible = data
        },
        set_orderDetailModalVisible: function(state, data) {
            state.orderDetailModalVisible = data
        },
        set_currentOrder: function(state, data) {
            state.currentOrder = data
        },
        set_avatarUrl: function(state, data) {
            state.userInfo.avatarUrl = data
        },
    },

    actions: {
        // 登录验证函数，userData 是需要验证的信息（邮箱和密码）
        login: async ({ dispatch, commit }, userData) => {
            const res = await loginAPI(userData)
            // res 包含了该名用户的所有信息
            if (res) {
                setToken(res.id)
                commit('set_userId', res.id)
                dispatch('getUserInfo')
                if (res.userType == 'Client') {
                    router.push('/hotel/hotelList')
                } else if (res.userType == 'HotelManager') {
                    router.push('/hotelManager/manageHotel')
                } else if (res.userType == 'Salesman') {
                    router.push('/salesman/creditRecharge')
                } else if (res.userType == 'Admin') {
                    router.push('/admin/manageUser')
                }
            } else {
                console.log(res) // undefined
            }
        },
        register: async ({ commit }, data) => {
            const res = await registerAPI(data)
            if (res) {
                message.success('注册成功')
            }
        },
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
                getUserInfoAPI(state.userId)
                    .then((response) => {
                        const data = response
                        if (!data) {
                            reject('登录已过期，请重新登录')
                        }
                        commit('set_userInfo', data)
                        commit('set_userId', data.id)
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        updateUserInfo: async ({ state, dispatch }, data) => {
            const params = {
                id: state.userId,
                avatarUrl: user.avatarUrl,
                ...data,
            }
            const res = await updateUserInfoAPI(params)
            if (res) {
                message.success('修改成功')
                dispatch('getUserInfo')
            }
        },
        updateAvatarUrl: async ({ state, dispatch }, data) => {
            const params = {
                id: state.userId,
                userName: state.userName,
                email: state.email,
                phoneNumber: state.phoneNumber,
                password: state.password,
                ...data,
            }
            const res = await updateUserInfoAPI(params)
            if (res) {
                message.success('修改成功')
                dispatch('getUserInfo')
            }
        },

        beMember: async ({ state, commit }, data) => {
            const params = {
                id: state.userId,
                ...data,
            }
            const res = await beMemberAPI(params)
            if (res) {
                message.success('注册成功')
                commit('set_getMembershipModalVisible', false)
            }
        },
        getUserOrders: async ({ state, commit }) => {
            const data = {
                userId: Number(state.userId),
            }
            const res = await getUserOrdersAPI(data)
            if (res) {
                commit('set_userOrderList', res)
                console.log(state.userOrderList)
            }
        },
        cancelOrder: async ({ state, dispatch }, orderId) => {
            const res = await cancelOrderAPI(orderId)
            if (res) {
                dispatch('getUserOrders')
                message.success('撤销成功')
            } else {
                message.error('撤销失败')
            }
        },
        logout: async ({ commit }) => {
            removeToken()
            resetRouter()
            commit('reset_state')
        },
        // remove token
        resetToken({ commit }) {
            return new Promise((resolve) => {
                removeToken() // must remove  token  first
                commit('reset_state')
                resolve()
            })
        },
        updateUserOverTimeOrders: async (
            { commit, state, dispatch },
            userId
        ) => {
            const res = await updateOverTimeOrdersAPI(userId)
            console.log(res)
            if (res) {
                commit('set_userOrderList', res)
            }
        },
    },
}

export default user
