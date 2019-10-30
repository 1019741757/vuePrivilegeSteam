const getters = {
  SteamList: state => state.app.SteamList,
  NetBarName: state => state.app.NetBarName,
  NetBarId: state => state.app.NetBarId,
  NetBarVIP: state => state.app.NetBarVIP,
  NetBarActivity: state => state.app.NetBarActivity,
  OnerName: state => state.user.OnerName,
  AvailableIntegral: state => state.user.AvailableIntegral,
  ConsumerId: state => state.user.ConsumerId,
  ExpireDateTime: state => state.user.ExpireDateTime,
  HeadImgUrl: state => state.user.HeadImgUrl,
  NickName: state => state.user.NickName,
  isSuccessfulLogin: state => state.user.isSuccessfulLogin,
  GameState: state => state.user.GameState,
  PagesLoginIs: state => state.user.PagesLoginIs,
  isNetBarActivity: state => state.user.isNetBarActivity,
  isNewFingerGuide: state => state.user.isNewFingerGuide,
  isQRCode: state => state.user.isQRCode,
  GamerankingPUGB: state => state.user.GamerankingPUGB,
  GamerankingLOL: state => state.user.GamerankingLOL
}
export default getters
