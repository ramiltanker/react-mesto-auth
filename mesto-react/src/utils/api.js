export class Api {
  constructor({ address, token, cohort}) {
    this._token = token;
    this._cohort = cohort;
    this._address = address;
  }
    

  _getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
} 



      getInitialCards() {
          return fetch(`${this._address}/${this._cohort}/cards`, {
            headers: {
              authorization: this._token
            }
          })
        .then(res => 
            this._getResponseData(res)
        )
      }
    
    
      addNewCards(data) {
          return fetch(`${this._address}/${this._cohort}/cards`, {
              method: 'POST',
              headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
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




      getUserInfo() {
        return fetch(`${this._address}/${this._cohort}/users/me`, {
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
        })
        .then(res => 
          this._getResponseData(res)
      )
      }

      setProfileInfo(name, about) {
        return fetch(`${this._address}/${this._cohort}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
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


      setAvatar(avatar) {
        return fetch(`${this._address}/${this._cohort}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: this._token,
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

      
      likeCard(cardId) {
        return fetch(`${this._address}/${this._cohort}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          }
        })
        .then(res => 
          this._getResponseData(res)
      )
      }

      deleteCardLike(cardId) {
        return fetch(`${this._address}/${this._cohort}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          }
        })
        .then(res => 
          this._getResponseData(res)
      )
      }

      deleteCard(cardId) {
        return fetch(`${this._address}/${this._cohort}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          }
        })
        .then(res => 
          this._getResponseData(res)
      )
      }
      // другие методы работы с API
}

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1',
  token: '0ab7ee2c-4048-41b7-8933-e3538494cc1c',
  cohort: 'cohort-17',
})

export default api;