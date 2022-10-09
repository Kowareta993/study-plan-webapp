import axios from 'axios';

/* api calls to server 
some calling a callback function after finishing (axios calls are async)
some setting states themselves
*/
export const getCourses = (setState) => {
  axios.get("http://localhost:3001/api/courses").then(
    result => {
      setState(result.data.courses)
    },
    error => {
      setState(null)
    }
  );
}

export const login = (username, password, callback) => {
  axios({
    method: 'post',
    url: 'http://localhost:3001/api/login',
    data: {
      username: username,
      password: password
    },
    withCredentials: true
  }).then(
    result => {
      if (result.data.success)
        callback(result.data.user)
      else
        callback(null)
    },
    error => {
      callback(null)
    }
  )
}

export const createPlan = (option, state, setState) => {
  axios({
    method: 'post',
    url: 'http://localhost:3001/api/plan',
    data: {
      option: option
    },
    withCredentials: true
  }).then((result) => { setState(!state) },
    error => {
    })
}

export const getPlan = (setState) => {
  axios({
    method: 'get',
    url: 'http://localhost:3001/api/plan',
    withCredentials: true
  }).then((result) => {
    if (result.data.success) {
      setState(result.data.plan)
    } else {
      setState(null)
    }
  },
    error => {
      setState(null)
    });
}

export const logout = (callback) => {
  axios({
    method: 'post',
    url: 'http://localhost:3001/api/logout',
    withCredentials: true
  }).then((result) => {
    if (result.data.success) {
    } else {
    }
    callback()
  },
  error => {
    
  });
}

export const deletePlan = (setState, callback) => {
  axios({
    method: 'delete',
    url: 'http://localhost:3001/api/plan',
    withCredentials: true
  }).then((result) => {
    if (result.data.success) {
      setState(null)
    } else {
    }
    callback();
  },
  error => {
    setState(null)
  });
}
export const savePlan = (plan, setState, callback) => {
  axios({
    method: 'put',
    url: 'http://localhost:3001/api/plan',
    data: {
      plan: plan
    },
    withCredentials: true
  }).then((result) => {
    if (result.data.success) {
      setState(null)
    } else {
    }
    callback()
  },
  error => {
    setState(null)
  });
}