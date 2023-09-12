class Auth {
  constructor(options) {
    this._url = options.url;    
  }  

  registerUser(password, email) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({password, email})
    })    
  }

  authorizeUser(password, email) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({password, email})
    })    
  }
  
  signOut() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      credentials: 'include'
    })
  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include'      
    })     
  }
}

const auth = new Auth({
  url: 'https://api.pavelkazaninmesto.nomoredomainsicu.ru'    
})

export default auth;