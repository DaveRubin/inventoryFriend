'use strict';

describe('Filter: getItemImage', function () {

  // load the filter's module
  beforeEach(module('firebaseApp'));

  // initialize a new instance of the filter before each test
  var getItemImage;
  beforeEach(inject(function ($filter) {
    getItemImage = $filter('getItemImage');
  }));

  it('should return the input prefixed with "getItemImage filter:"', function () {
    var text = 'angularjs';
    expect(getItemImage(text)).toBe('getItemImage filter: ' + text);
  });

});
