import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | confirm-challenge', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:confirm-challenge');
    assert.ok(route);
  });
});
