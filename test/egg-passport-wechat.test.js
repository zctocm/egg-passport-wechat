'use strict';

const mock = require('egg-mock');

describe('test/egg-passport-wechat.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/egg-passport-wechat-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, eggPassportWechat')
      .expect(200);
  });
});
