import EmberRouter from '@ember/routing/router';
import config from 'typescript-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('overview', { path: '/' });
  this.route('blog-post', { path: '/type-guards-in-handlebars' });
});
