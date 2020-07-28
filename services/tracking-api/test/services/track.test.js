const app = require('../../src/app');

describe('\'track\' service', () => {
  it('registered the service', () => {
    const service = app.service('track');
    expect(service).toBeTruthy();
  });
});
