import { createStore } from "vuex";
import axios from "../axiosInstance";

const store = createStore({
  state: {
    isLoggedIn: false,
    currentUser: null,
    token: null,
  },
  mutations: {
    login(state, user) {
      state.isLoggedIn = true;
      state.currentUser = user.user;
      state.token = user.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.token = null;
    },
    close(state){
      state.isLoggedIn = false;
      state.currentUser =  null;
      state.token = null;
    }
  },
  actions: {
    async register({ commit }, { name, password, gmail }) {
      try {
        const response = await axios.post("users/register", {
          name: name,
          password: password,
          gmail: gmail,
        });
        commit("login", response.data);
        localStorage.setItem('token', response.data.token);
        return response.data;
      } catch (error) {
        commit("logout");
        throw new Error(error.message);
      }
    },
    async login({ commit }, {password, gmail }) {
      try {
        console.log(password)
        const response = await axios.post("users/login", {
          password: password,
          gmail: gmail,
        });
        commit("login", response.data);
        localStorage.setItem('token', response.data.token);
        return response.data;  
      } catch (error) {
        commit("logout");
        return false
      }
    
    },
    async close({commit})
    {commit("close")
  localStorage.removeItem( 'token' )}
  },
  
  
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    currentUser: (state) => state.currentUser,
    token: (state) => state.token,
  },
});
export default store;
