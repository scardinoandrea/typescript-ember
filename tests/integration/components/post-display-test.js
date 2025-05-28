import { module, test } from 'qunit';
import { setupRenderingTest } from 'typescript-ember/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | post-display', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<PostDisplay />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <PostDisplay>
        template block text
      </PostDisplay>
    `);

    assert.dom().hasText('template block text');
  });
});
