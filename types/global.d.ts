import '@glint/environment-ember-loose';

import type EmberTruthHelpersRegistry from 'ember-truth-helpers/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export type Registry = EmberTruthHelpersRegistry;
}
