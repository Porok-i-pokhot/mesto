export default class UserInfo{
  constructor ({userName, userInfo}) {
    this._userName = userName;
    this._userInfo = userInfo;
  }

  getUserInfo(dataNameInput, dataOccupationInput) {
    return {
      name: dataNameInput.value = this._userName.textContent,
      info: dataOccupationInput.value = this._userInfo.textContent
    }
  }

  setUserInfo(dataNameInput, dataOccupationInput) {
    this._userName.textContent = dataNameInput.value
    this._userInfo.textContent = dataOccupationInput.value
  }

}
