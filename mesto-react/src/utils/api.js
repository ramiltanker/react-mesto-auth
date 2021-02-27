export class Api {
  constructor({ address }) {
    this._address = address;
  }
    

  _getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
} 



      getInitialCards(token) {
          return fetch(`${this._address}/cards`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          })
        .then(res => 
            this._getResponseData(res)
        )
      }
    
    
      addNewCards(data, token) {
          return fetch(`${this._address}/cards`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                name: data.name,
                link: data.link
              }),
          })
          .then(res => 
            this._getResponseData(res)
        )
      }




      getUserInfo(token) {
        return fetch(`${this._address}/users/me`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        .then(res => 
          this._getResponseData(res)
      )
      }

      setProfileInfo(name, about, token) {
        return fetch(`${this._address}/users/me`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name, 
            about: about
          })
        })

        .then(res => 
          this._getResponseData(res)
      )
      }


      setAvatar(avatar, token) {
        return fetch(`${this._address}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: avatar
          })  
        })
        .then(res => 
          this._getResponseData(res)
      )
      }

      
      likeCard(cardId, token) {
        return fetch(`${this._address}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(res => 
          this._getResponseData(res)
      )
      }

      deleteCardLike(cardId, token) {
        return fetch(`${this._address}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(res => 
          this._getResponseData(res)
      )
      }

      deleteCard(cardId, token) {
        return fetch(`${this._address}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then(res => 
          this._getResponseData(res)
      )
      }
      // другие методы работы с API
}

const api = new Api({
  // address: 'https://api.domainname.students.nomoreparties.space',
  address: 'http://localhost:3001',
})

export default api;