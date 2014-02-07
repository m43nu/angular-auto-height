angular.module('twygmbh.auto-height', []).
    directive('twyAutoHeight', [
        '$window', '$timeout', function($window, $timeout) {
            return {
                link: function($scope, $element, $attrs) {
                    var combineHeights, siblings;
                    combineHeights = function(collection) {
                        var heights, node, _i, _len;
                        heights = 0;
                        for (_i = 0, _len = collection.length; _i < _len; _i++) {
                            node = collection[_i];
                            heights += node.offsetHeight;
                        }
                        return heights;
                    };
                    siblings = function($elm) {
                        var elm, _i, _len, _ref, _results;
                        _ref = $elm.parent().children();
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            elm = _ref[_i];
                            if (elm[0] !== $elm[0]) {
                                _results.push(elm);
                            }
                        }
                        return _results;
                    };
                    angular.element($window).bind('resize', function() {
                        var additionalHeight, parentHeight;
                        additionalHeight = $attrs.additionalHeight || 10;
                        console.log(siblings($element));
                        parentHeight = $window.innerHeight - $element.parent()[0].getBoundingClientRect().top;
                        return $element.css('height', parentHeight - combineHeights(siblings($element)) - additionalHeight);
                    });
                    return $timeout(function() {
                        return angular.element($window).triggerHandler('resize');
                    }, 1000);
                }
            };
        }
    ]);