'use strict';

describe('Directive: addItemForm', function () {

  // load the directive's module
  beforeEach(module('firebaseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-item-form></add-item-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the addItemForm directive');
  }));
});
