const validLogin = {
  password: 'qualquer',
  username: 'alguem',
}

const loginWithoutPassword = {
  username: 'alguem',
}

const invalidLogin = {
  password: 'senhaQueNaoExiste',
  username: 'alguem',
}

const existingUser = {
  id: 1,
  username: 'alguem',
  vocation: 'Guerreiro',
  level: 11,
  password: 'qualquer'
}

export default {
  validLogin,
  existingUser,
  invalidLogin,
  loginWithoutPassword,
}