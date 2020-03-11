'use strict';

const debug = require('debug')('egg-passport-wechat');
const assert = require('assert');
const Strategy = require('passport-wechat').Strategy;

function mount(config, app) {
  config.passReqToCallback = true;
  assert(config.key, '[egg-passport-wechat] config.passportWechat.key required');
  assert(config.secret, '[egg-passport-wechat] config.passportWechat.secret required');
  config.appID = config.key;
  config.appSecret = config.secret;
  // must require `req` params
  app.passport.use('wechat', new Strategy(config, (req, accessToken, refreshToken, profile, expires_in, done) => {
    // format user
    const user = {
      provider: 'wechat',
      openid: profile.openid,
      unionid: profile.unionid,
      nickname: profile.nickname,
      sex: profile.sex,
      city: profile.city,
      province: profile.province,
      country: profile.country,
      headimgurl: profile.headimgurl,
      privilege: profile.privilege,
      accessToken,
      refreshToken,
      expires_in,
      profile,
    };
    debug('%s %s get user: %j', req.method, req.url, user);

    // let passport do verify and call verify hook
    app.passport.doVerify(req, user, done);
  }));
}

module.exports = app => {
  const config = app.config.passportWechat;
  mount(config, app);
};
