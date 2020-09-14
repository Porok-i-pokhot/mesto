export default class UserInfo{
  constructor ({userName, userInfo, userAvatar}) {
    this._userName = userName;
    this._userInfo = userInfo;
    this._userAvatar = userAvatar;
  }

  getUserInfoFromInputs(dataNameInput, dataOccupationInput) {
    return {
      name: dataNameInput.value = this._userName.textContent,
      info: dataOccupationInput.value = this._userInfo.textContent,
    }
  }

  setUserInfoFromInputs(dataNameInput, dataOccupationInput) {
    const data = {
      name: dataNameInput.value,
      about: dataOccupationInput.value
    };

    this._setUserInfo(data);
  }

  _setUserInfo({name, about, avatar}) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    this._userAvatar.src = avatar;
  }

}
