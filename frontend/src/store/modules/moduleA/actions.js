// Suponiendo que aquí tendrías lógica para realizar una llamada de inicio de sesión
export const login = ({ commit }, userData) => {
    // Aquí podrías realizar la lógica de inicio de sesión (por ejemplo, llamada a una API)
    // y luego, si el inicio de sesión es exitoso, realizar la mutación para actualizar el estado
    commit('SET_LOGIN_STATUS', true);
    commit('SET_USER', userData);
  };
  
  // Acción para cerrar sesión
  export const logout = ({ commit }) => {
    // Lógica de cierre de sesión
    commit('SET_LOGIN_STATUS', false);
    commit('SET_USER', null);
  };
  