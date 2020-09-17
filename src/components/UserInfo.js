export default class UserInfo{
  constructor ({userName, userAbout, userAvatar, userId}) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
    this._userId = userId;
  }

  //присвоение инпутам значений из текста
  getUserInfoFromInputs(dataNameInput, dataOccupationInput) {
    return {
      name: dataNameInput.value = this._userName.textContent,
      info: dataOccupationInput.value = this._userAbout.textContent,
    }
  }

  getUserId() {
    return this._userId;
  }

  //присвоение данных пользователя на страницу при загрузке
  setUserInfo({name, about, avatar, _id}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this.setAvatar(avatar);
    this._userId = _id;
  }

  setAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
