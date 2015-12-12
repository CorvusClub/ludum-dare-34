(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _renderer = require("./lib/renderer.js");

var _renderer2 = _interopRequireDefault(_renderer);

var _engine = require("./lib/engine.js");

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = (function () {
    function Game(canvas) {
        _classCallCheck(this, Game);

        this.renderer = new _renderer2.default(canvas);
        this.engine = new _engine2.default();
    }

    _createClass(Game, [{
        key: "update",
        value: function update(time) {
            this.engine.update(time);
            this.renderer.update(time);
        }
    }]);

    return Game;
})();

},{"./lib/engine.js":2,"./lib/renderer.js":3}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function Engine() {
    _classCallCheck(this, Engine);
};

},{}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function Renderer(canvas) {
    _classCallCheck(this, Renderer);

    this.canvas = canvas;
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9lbmdpbmUuanMiLCJsaWIvcmVuZGVyZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRU0sSUFBSTtBQUNOLGFBREUsSUFBSSxDQUNNLE1BQU0sRUFBRTs4QkFEbEIsSUFBSTs7QUFFRixZQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFhLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLFlBQUksQ0FBQyxNQUFNLEdBQUcsc0JBQVksQ0FBQztLQUM5Qjs7aUJBSkMsSUFBSTs7K0JBTUMsSUFBSSxFQUFFO0FBQ1QsZ0JBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLGdCQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5Qjs7O1dBVEMsSUFBSTs7Ozs7Ozs7SUNGSixNQUFNLEdBQ1IsU0FERSxNQUFNLEdBQ007MEJBRFosTUFBTTtDQUdQOzs7Ozs7O0lDSEMsUUFBUSxHQUNWLFNBREUsUUFBUSxDQUNFLE1BQU0sRUFBRTswQkFEbEIsUUFBUTs7QUFFTixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztDQUN4QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSBcIi4vbGliL3JlbmRlcmVyLmpzXCI7XG5pbXBvcnQgRW5naW5lIGZyb20gXCIuL2xpYi9lbmdpbmUuanNcIjtcbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGNhbnZhcyk7XG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEVuZ2luZSgpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUodGltZSkge1xuICAgICAgICB0aGlzLmVuZ2luZS51cGRhdGUodGltZSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIudXBkYXRlKHRpbWUpO1xuICAgIH1cbn0iLCJjbGFzcyBFbmdpbmUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBcbiAgICB9XG59IiwiY2xhc3MgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB9XG59Il19
