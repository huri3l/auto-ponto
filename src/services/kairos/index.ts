import api from './api'

type SignInRequestData = {
  username: string
  password: string
}

type clockInRequestData = {
  // TODO
}

const auth = (cookie: any) => {
  if (cookie) api.defaults.headers.common['cookie'] = cookie
}

const login = async (data: SignInRequestData) => {
  try {
    const res = await api.post('/Account/LogOn', {
      'LogOnModel.UserName': data.username,
      'LogOnModel.Password': data.password
    })
    if (res.headers['set-cookie']) {
      return { status: 200, data: res.headers['set-cookie'].join(';') }
    }
    return { status: 401, data: { error: 'Kairos login failed!' } }
  } catch (err) {
    console.log(err)
    return { status: 500, data: { error: err.message } }
  }
}

const verifyLogin = async () => {
  try {
    const res = await api.get('/Pessoas/BuscaIdsPessoasOrdenadosPorCracha')

    if (res.status === 200) {
      return { status: 200, data: { user: res.data[0] } }
    } else {
      return { status: 401, data: { error: 'Kairos recover user failed!' } }
    }
  } catch (err) {
    console.log(err)
    return { status: 500, data: { error: err.message } }
  }
}

const logout = () => {
  try {
    return { status: 200, data: { message: 'Logout successfully!' } }
  } catch (err) {
    console.log(err)
    return { status: 500, data: { error: err.message } }
  }
}

const clock_in = async (data: clockInRequestData) => {
  try {
    const res = await api.get('/PedidosJustificativas/AdicionarMotivo', {
      data // TODO
    })
    return { status: res.status, data: res.data }
  } catch (err) {
    console.log(err)
    return { status: 500, data: { error: err.message } }
  }
}

export default {
  auth,
  login,
  verifyLogin,
  logout,
  clock_in
}
