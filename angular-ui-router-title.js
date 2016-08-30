/**
 * AngularJS module for updating browser title/history based on the current ui-router state.
 *
 * @link https://github.com/nonplus/angular-ui-router-title
 *
 * @license angular-ui-router-title v0.0.4
 * (c) Copyright Stepan Riha <github@nonplus.net>
 * License MIT
 */

(function(angular) {

(function () {
  "use strict";

  angular.module("ui.router.title", ["ui.router"])
    .run(routerTitle);
  routerTitle.$inject = ["$rootScope", "$timeout", "$state"];
  function routerTitle($rootScope, $timeout, $state) {

    $rootScope.$on("$stateChangeSuccess", function () {
      var title = getTitleValue($state.$current.locals.globals.$title);
      $timeout(function () {
        $rootScope.$title = title;
      });

      $rootScope.$breadcrumbs = [];
      var state = $state.$current;
      while (state) {
        if (state.resolve && state.resolve.$title) {
          $rootScope.$breadcrumbs.unshift({
            title: getTitleValue(state.locals.globals.$title),
            state: state.self.name,
            stateParams: state.locals.globals.$stateParams
          })
        }
        state = state.parent;
      }
    });

    function getTitleValue(title) {
      return angular.isFunction(title) ? title() : title;
    }

  }

})();

})(window.angular);