export default class UserInfo{
  constructor ({userName, userAbout, userAvatar}) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
  }

  getUserInfoFromInputs(dataNameInput, dataOccupationInput) {
    return {
      name: dataNameInput.value = this._userName.textContent,
      info: dataOccupationInput.value = this._userAbout.textContent,
    }
  }

  setUserInfo({name, about, avatar}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this.setAvatar(avatar);
  }

  setAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
