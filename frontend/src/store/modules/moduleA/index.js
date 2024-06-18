import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true, // Si quieres que el módulo tenga su propio espacio de nombres
  state,
  actions,
  mutations,
  getters,
};