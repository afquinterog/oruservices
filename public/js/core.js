(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/State', ['exports', 'jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery);
    global.State = mod.exports;
  }
})(this, function (exports, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _class = function () {
    function _class(states) {
      babelHelpers.classCallCheck(this, _class);

      this._states = Object.assign({}, states);
      this._values = {};
      this._relations = {};
      this._callbacks = {};
      this._define();
    }

    babelHelpers.createClass(_class, [{
      key: '_define',
      value: function _define() {
        var _this = this;

        var self = this,
            keys = Object.keys(this._states),
            obj = {},
            tmpRelations = [],
            composites = [];

        var _loop = function _loop(i, l) {
          var key = keys[i],
              value = _this._states[key];
          if (typeof value !== 'function') {
            Object.defineProperty(obj, key, {
              set: function set() {
                return false;
              },
              get: function get() {
                tmpRelations.push(key);
                return self._states[key];
              },

              enumerable: true,
              configurable: true
            });
            _this._values[key] = _this._states[key];
            _this._relations[key] = [];
          } else {
            composites.push(key);
          }
        };

        for (var i = 0, l = keys.length; i < l; i++) {
          _loop(i, l);
        }

        var _loop2 = function _loop2(_i, _l) {
          var key = composites[_i];
          Object.defineProperty(obj, key, {
            set: function set() {
              return false;
            },
            get: function get() {
              var value = self._states[key].call(obj);
              self._addRelation(key, tmpRelations);
              tmpRelations = [];
              self._values[key] = value;
              return value;
            },

            enumerable: true,
            configurable: true
          });

          // use get function to create the relationship
          obj[key];
        };

        for (var _i = 0, _l = composites.length; _i < _l; _i++) {
          _loop2(_i, _l);
        }
      }
    }, {
      key: '_compare',
      value: function _compare(state) {
        if (this._states[state] !== this._values[state]) {
          var value = this._values[state];
          this._values[state] = this._states[state];
          this._dispatch(state, value, this._states[state]);
          this._compareComposite(state);
        }
      }
    }, {
      key: '_compareComposite',
      value: function _compareComposite(state) {
        var relations = this.getRelation(state);

        if (relations && relations.length > 0) {
          for (var i = 0, l = relations.length; i < l; i++) {
            var _state = relations[i],
                value = this._states[_state]();

            if (value !== this._values[_state]) {
              this._dispatch(_state, this._values[_state], value);
              this._values[_state] = value;
            }
          }
        }
      }
    }, {
      key: '_addRelation',
      value: function _addRelation(state, relations) {
        for (var i = 0, l = relations.length; i < l; i++) {
          var pros = relations[i];
          this._relations[pros].push(state);
        }
      }
    }, {
      key: '_dispatch',
      value: function _dispatch(state, origValue, newValue) {
        if (this._callbacks[state]) {
          this._callbacks[state].fire([newValue, origValue]);
        }
      }
    }, {
      key: 'getRelation',
      value: function getRelation(state) {
        return this._relations[state].length > 0 ? this._relations[state] : null;
      }
    }, {
      key: 'on',
      value: function on(state, callback) {
        if (typeof state === 'function') {
          callback = state;
          state = 'all';
        }

        if (!this._callbacks[state]) {
          this._callbacks[state] = _jquery2.default.Callbacks();
        }
        this._callbacks[state].add(callback);
      }
    }, {
      key: 'off',
      value: function off(state, callback) {
        if (this._callbacks[state]) {
          this._callbacks[state].remove(callback);
        }
      }
    }, {
      key: 'set',
      value: function set(state, value) {
        var isDeep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (typeof state === 'string' && typeof value !== 'undefined' && typeof this._states[state] !== 'function') {
          this._states[state] = value;
          if (!isDeep) this._compare(state);
        } else if ((typeof state === 'undefined' ? 'undefined' : babelHelpers.typeof(state)) === 'object') {
          for (var _key in state) {
            if (typeof state[_key] !== 'function') {
              this.set(_key, state[_key], true);
            }
          }
          for (var _key2 in state) {
            if (typeof state[_key2] !== 'function') {
              this._compare(_key2);
            }
          }
        }

        return this._states[state];
      }
    }, {
      key: 'get',
      value: function get(state) {
        if (state) {
          return this._values[state];
        } else {
          return this._values;
        }
      }
    }]);
    return _class;
  }();

  exports.default = _class;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Component', ['exports', 'jquery', 'State'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('State'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.State);
    global.Component = mod.exports;
  }
})(this, function (exports, _jquery, _State) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _State2 = babelHelpers.interopRequireDefault(_State);

  if (typeof Object.assign === 'undefined') Object.assign = _jquery2.default.extend;

  var _class = function () {
    function _class() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      babelHelpers.classCallCheck(this, _class);

      this.$el = options.$el ? options.$el : (0, _jquery2.default)(document);
      this.el = this.$el[0];
      delete options.$el;

      this.children = this.getDefaultChildren();
      this.actions = this.getDefaultActions();
      this.initialState = this.getDefaultState();

      this._willProcess = _jquery2.default.Callbacks();
      this._processed = _jquery2.default.Callbacks();

      if (this.willProcess) this._willProcess.add(this.willProcess);
      if (this.processed) this._processed.add(this.processed);

      this.isProcessed = false;

      this.mix(options);

      this.state = null;
    }

    babelHelpers.createClass(_class, [{
      key: '_combineInitialState',
      value: function _combineInitialState() {
        var childrenInitialState = {};
        for (var i = 0, l = this.children.length; i < l; i++) {
          var child = this.children[i];

          Object.assign(childrenInitialState, child.initialState);
        }
        return Object.assign(childrenInitialState, this.initialState);
      }
    }, {
      key: '_process',
      value: function _process(state) {
        this._willProcess.fireWith(this);

        this.state = state ? state : new _State2.default(this.initialState);

        this._registerActions();

        for (var i = 0, l = this.children.length; i < l; i++) {
          this.children[i]._process(this.state);
          this.children[i].isProcessed = true;
        }

        this._processed.fireWith(this);
      }
    }, {
      key: '_registerActions',
      value: function _registerActions() {
        var _this = this;

        var actions = this.actions;

        var _loop = function _loop(state) {
          var action = actions[state];
          if (typeof action === 'function') {
            _this.state.on(state, function () {
              var _actions$state;

              for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
              }

              (_actions$state = actions[state]).apply.apply(_actions$state, [_this].concat(params));
            });
          } else if (typeof action === 'string' && typeof _this[action] === 'function') {
            _this.state.on(state, function () {
              var _action;

              for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                params[_key2] = arguments[_key2];
              }

              (_action = _this[action]).apply.apply(_action, [_this].concat(params));
            });
          }
        };

        for (var state in actions) {
          _loop(state);
        }
      }
    }, {
      key: 'run',
      value: function run() {
        if (!this.isProcessed) {
          this._process();
          this.isProcessed = true;
        }

        this.setState.apply(this, arguments);
      }
    }, {
      key: 'setState',
      value: function setState() {
        if (this.state) {
          var _state;

          (_state = this.state).set.apply(_state, arguments);
        }
      }
    }, {
      key: 'getState',
      value: function getState() {
        if (this.state) {
          var _state2;

          return (_state2 = this.state).get.apply(_state2, arguments);
        } else {
          return null;
        }
      }
    }, {
      key: 'getDefaultState',
      value: function getDefaultState() {
        return {};
      }
    }, {
      key: 'getDefaultChildren',
      value: function getDefaultChildren() {
        return [];
      }
    }, {
      key: 'getDefaultActions',
      value: function getDefaultActions() {
        return {};
      }
    }, {
      key: 'mix',
      value: function mix() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (this.isInit) return;

        var _options$children = options.children;
        var children = _options$children === undefined ? [] : _options$children;
        var _options$actions = options.actions;
        var actions = _options$actions === undefined ? {} : _options$actions;
        var _options$state = options.state;
        var state = _options$state === undefined ? {} : _options$state;
        var _options$willProcess = options.willProcess;
        var willProcess = _options$willProcess === undefined ? false : _options$willProcess;
        var _options$processed = options.processed;
        var processed = _options$processed === undefined ? false : _options$processed;


        children = children.filter(function (child) {
          return child instanceof Component;
        });
        this.children = [].concat(babelHelpers.toConsumableArray(this.children), babelHelpers.toConsumableArray(children));

        this.actions = Object.assign({}, this.actions, actions);

        this.initialState = Object.assign({}, this.initialState, state);
        this.initialState = this._combineInitialState();

        if (typeof willProcess !== 'function') this._willProcess.add(willProcess);
        if (typeof processed !== 'function') this._processed.add(processed);

        delete options.children;
        delete options.actions;
        delete options.state;
        delete options.willProcess;
        delete options.processed;

        Object.assign(this, options);
        return this;
      }
    }, {
      key: 'triggerResize',
      value: function triggerResize() {
        if (document.createEvent) {
          var ev = document.createEvent('Event');
          ev.initEvent('resize', true, true);
          window.dispatchEvent(ev);
        } else {
          element = document.documentElement;
          var event = document.createEventObject();
          element.fireEvent('onresize', event);
        }
      }
    }]);
    return _class;
  }();

  exports.default = _class;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Plugin', ['exports', 'jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery);
    global.Plugin = mod.exports;
  }
})(this, function (exports, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pluginFactory = exports.getDefaults = exports.getPlugin = exports.getPluginAPI = exports.Plugin = undefined;

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var plugins = {};
  var apis = {};

  var Plugin = function () {
    function Plugin($el) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      babelHelpers.classCallCheck(this, Plugin);

      this.name = this.getName();
      this.$el = $el;
      this.options = options;
      this.isRendered = false;
    }

    babelHelpers.createClass(Plugin, [{
      key: 'getName',
      value: function getName() {
        return 'plugin';
      }
    }, {
      key: 'render',
      value: function render() {
        if (_jquery2.default.fn[this.name]) {
          this.$el[this.name](this.options);
        } else {
          return false;
        }
      }
    }, {
      key: 'initialize',
      value: function initialize() {
        if (this.isRendered) {
          return false;
        }
        this.render();
        this.isRendered = true;
      }
    }], [{
      key: 'getDefaults',
      value: function getDefaults() {
        return {};
      }
    }, {
      key: 'register',
      value: function register(name, obj) {
        if (typeof obj === 'undefined') {
          return;
        }

        plugins[name] = obj;

        if (typeof obj.api !== 'undefined') {
          Plugin.registerApi(name, obj);
        }
      }
    }, {
      key: 'registerApi',
      value: function registerApi(name, obj) {
        var api = obj.api();

        if (typeof api === 'string') {
          (function () {
            var api = obj.api().split('|');
            var event = api[0] + ('.plugin.' + name);
            var func = api[1] || 'render';

            var callback = function callback(e) {
              var $el = (0, _jquery2.default)(this);
              var plugin = $el.data('pluginInstance');

              if (!plugin) {
                plugin = new obj($el, _jquery2.default.extend(true, {}, getDefaults(name), $el.data()));
                plugin.initialize();
                $el.data('pluginInstance', plugin);
              }

              plugin[func](e);
            };

            apis[name] = function (selector, context) {
              if (context) {
                (0, _jquery2.default)(context).off(event);
                (0, _jquery2.default)(context).on(event, selector, callback);
              } else {
                (0, _jquery2.default)(selector).on(event, callback);
              }
            };
          })();
        } else if (typeof api === 'function') {
          apis[name] = api;
        }
      }
    }]);
    return Plugin;
  }();

  exports.default = Plugin;


  function getPluginAPI(name) {
    if (typeof name === 'undefined') {
      return apis;
    } else {
      return apis[name];
    }
  }

  function getPlugin(name) {
    if (typeof plugins[name] !== 'undefined') {
      return plugins[name];
    } else {
      console.warn('Plugin:' + name + ' has no warpped class.');
      return false;
    }
  }

  function getDefaults(name) {
    var PluginClass = getPlugin(name);

    if (PluginClass) {
      return PluginClass.getDefaults();
    } else {
      return {};
    }
  }

  function pluginFactory(name, $el) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var PluginClass = getPlugin(name);

    if (PluginClass && typeof PluginClass.api === 'undefined') {
      return new PluginClass($el, _jquery2.default.extend(true, {}, getDefaults(name), options));
    } else if (_jquery2.default.fn[name]) {
      var plugin = new Plugin($el, options);
      plugin.getName = function () {
        return name;
      };
      plugin.name = name;
      return plugin;
    } else if (typeof PluginClass.api !== 'undefined') {
      // console.log('Plugin:' + name + ' use api render.');
      return false;
    } else {
      console.warn('Plugin:' + name + ' script is not loaded.');
      return false;
    }
  }

  exports.Plugin = Plugin;
  exports.getPluginAPI = getPluginAPI;
  exports.getPlugin = getPlugin;
  exports.getDefaults = getDefaults;
  exports.pluginFactory = pluginFactory;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Base', ['exports', 'jquery', 'Component', 'Plugin'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Component'), require('Plugin'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Component, global.Plugin);
    global.Base = mod.exports;
  }
})(this, function (exports, _jquery, _Component2, _Plugin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Component3 = babelHelpers.interopRequireDefault(_Component2);

  var _class = function (_Component) {
    babelHelpers.inherits(_class, _Component);

    function _class() {
      babelHelpers.classCallCheck(this, _class);
      return babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    babelHelpers.createClass(_class, [{
      key: 'initializePlugins',
      value: function initializePlugins() {
        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        (0, _jquery2.default)('[data-plugin]', context || this.$el).each(function () {
          var $this = (0, _jquery2.default)(this),
              name = $this.data('plugin'),
              plugin = (0, _Plugin.pluginFactory)(name, $this, $this.data());
          if (plugin) {
            plugin.initialize();
          }
        });
      }
    }, {
      key: 'initializePluginAPIs',
      value: function initializePluginAPIs() {
        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

        var apis = (0, _Plugin.getPluginAPI)();

        for (var name in apis) {
          (0, _Plugin.getPluginAPI)(name)('[data-plugin=' + name + ']', context);
        }
      }
    }]);
    return _class;
  }(_Component3.default);

  exports.default = _class;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Config', ['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Config = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var values = {
    fontFamily: 'Noto Sans, sans-serif',
    primaryColor: 'blue',
    assets: '../assets'
  };

  function get() {
    var data = values;
    var callback = function callback(data, name) {
      return data[name];
    };

    for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
      names[_key] = arguments[_key];
    }

    for (var i = 0; i < names.length; i++) {
      var name = names[i];

      data = callback(data, name);
    }

    return data;
  }

  function set(name, value) {
    if (typeof name === 'string' && typeof value !== 'undefined') {
      values[name] = value;
    } else if ((typeof name === 'undefined' ? 'undefined' : babelHelpers.typeof(name)) === 'object') {
      values = $.extend(true, {}, values, name);
    }
  }

  function getColor(name, level) {
    if (name === 'primary') {
      name = get('primaryColor');
      if (!name) {
        name = 'red';
      }
    }

    if (typeof values.colors === 'undefined') {
      return null;
    }

    if (typeof values.colors[name] !== 'undefined') {
      if (level && typeof values.colors[name][level] !== 'undefined') {
        return values.colors[name][level];
      }

      if (typeof level === 'undefined') {
        return values.colors[name];
      }
    }

    return null;
  }

  function colors(name, level) {
    return getColor(name, level);
  }

  exports.get = get;
  exports.set = set;
  exports.getColor = getColor;
  exports.colors = colors;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Section/Menubar', ['exports', 'jquery', 'Component'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Component'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Component);
    global.SectionMenubar = mod.exports;
  }
})(this, function (exports, _jquery, _Component2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Component3 = babelHelpers.interopRequireDefault(_Component2);

  var $BODY = (0, _jquery2.default)('body');
  var $HTML = (0, _jquery2.default)('html');

  var Scrollable = function () {
    function Scrollable($el) {
      babelHelpers.classCallCheck(this, Scrollable);

      this.$el = $el;
      this.native = false;
      this.api = null;
    }

    babelHelpers.createClass(Scrollable, [{
      key: 'init',
      value: function init() {
        if ($BODY.is('.site-menubar-native')) {
          this.native = true;
          return;
        }

        if (!this.api) {
          this.api = this.$el.asScrollable({
            namespace: 'scrollable',
            skin: 'scrollable-inverse',
            direction: 'vertical',
            contentSelector: '>',
            containerSelector: '>'
          }).data('asScrollable');
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        if (this.api) {
          this.api.destroy();
          this.api = null;
        }
      }
    }, {
      key: 'update',
      value: function update() {
        if (this.api) {
          this.api.update();
        }
      }
    }, {
      key: 'enable',
      value: function enable() {
        if (this.native) {
          return;
        }
        if (!this.api) {
          this.init();
        }
        if (this.api) {
          this.api.enable();
        }
      }
    }, {
      key: 'disable',
      value: function disable() {
        if (this.api) {
          this.api.disable();
        }
      }
    }]);
    return Scrollable;
  }();

  var _class = function (_Component) {
    babelHelpers.inherits(_class, _Component);

    function _class() {
      var _ref;

      babelHelpers.classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = babelHelpers.possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      _this.$menuBody = _this.$el.children('.site-menubar-body');
      _this.$menu = _this.$el.find('[data-plugin=menu]');

      _this.scrollable = new Scrollable(_this.$menuBody);
      return _this;
    }

    babelHelpers.createClass(_class, [{
      key: 'processed',
      value: function processed() {
        $HTML.removeClass('css-menubar').addClass('js-menubar');

        this.change(this.getState('menubarType'));
      }
    }, {
      key: 'getDefaultState',
      value: function getDefaultState() {
        return {
          menubarType: 'hide' // open, hide;
        };
      }
    }, {
      key: 'getDefaultActions',
      value: function getDefaultActions() {
        return {
          menubarType: 'change'
        };
      }
    }, {
      key: 'getMenuApi',
      value: function getMenuApi() {
        return this.$menu.data('menuApi');
      }
    }, {
      key: 'update',
      value: function update() {
        this.scrollable.update();
      }
    }, {
      key: 'change',
      value: function change(type) {
        this.reset();
        this[type]();
      }
    }, {
      key: 'animate',
      value: function animate(doing) {
        var _this2 = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        $BODY.addClass('site-menubar-changing');

        doing.call(this);

        this.$el.trigger('changing.site.menubar');

        var menuApi = this.getMenuApi();
        if (menuApi) {
          menuApi.refresh();
        }

        setTimeout(function () {
          callback.call(_this2);
          $BODY.removeClass('site-menubar-changing');
          _this2.update();
          _this2.$el.trigger('changed.site.menubar');
        }, 500);
      }
    }, {
      key: 'reset',
      value: function reset() {
        $BODY.removeClass('site-menubar-hide site-menubar-open');
      }
    }, {
      key: 'open',
      value: function open() {
        this.animate(function () {
          $BODY.addClass('site-menubar-open');
          $HTML.addClass('disable-scrolling');
        }, function () {
          this.scrollable.init();
        });
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.animate(function () {
          $BODY.addClass('site-menubar-hide');
          $HTML.removeClass('disable-scrolling');
        }, function () {
          this.scrollable.destroy();
        });
      }
    }]);
    return _class;
  }(_Component3.default);

  exports.default = _class;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Section/Sidebar', ['exports', 'jquery', 'Base', 'Plugin'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Base'), require('Plugin'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Base, global.Plugin);
    global.SectionSidebar = mod.exports;
  }
})(this, function (exports, _jquery, _Base2, _Plugin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Base3 = babelHelpers.interopRequireDefault(_Base2);

  var _class = function (_Base) {
    babelHelpers.inherits(_class, _Base);

    function _class() {
      babelHelpers.classCallCheck(this, _class);
      return babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    babelHelpers.createClass(_class, [{
      key: 'processed',
      value: function processed() {
        if (typeof _jquery2.default.slidePanel === 'undefined') {
          return;
        }
        var sidebar = this;
        (0, _jquery2.default)(document).on('click', '[data-toggle="site-sidebar"]', function () {
          var $this = (0, _jquery2.default)(this);

          var direction = 'right';
          if ((0, _jquery2.default)('body').hasClass('site-menubar-flipped')) {
            direction = 'left';
          }

          var options = _jquery2.default.extend({}, (0, _Plugin.getDefaults)('slidePanel'), {
            direction: direction,
            skin: 'site-sidebar',
            dragTolerance: 80,
            template: function template(options) {
              return '<div class="' + options.classes.base + ' ' + options.classes.base + '-' + options.direction + '">\n\t    <div class="' + options.classes.content + ' site-sidebar-content"></div>\n\t    <div class="slidePanel-handler"></div>\n\t    </div>';
            },
            afterLoad: function afterLoad() {
              var self = this;
              this.$panel.find('.tab-pane').asScrollable({
                namespace: 'scrollable',
                contentSelector: '> div',
                containerSelector: '> div'
              });

              sidebar.initializePlugins(self.$panel);

              this.$panel.on('shown.bs.tab', function () {
                self.$panel.find('.tab-pane.active').asScrollable('update');
              });
            },
            beforeShow: function beforeShow() {
              if (!$this.hasClass('active')) {
                $this.addClass('active');
              }
            },
            afterHide: function afterHide() {
              if ($this.hasClass('active')) {
                $this.removeClass('active');
              }
            }
          });

          if ($this.hasClass('active')) {
            _jquery2.default.slidePanel.hide();
          } else {
            var url = $this.data('url');
            if (!url) {
              url = $this.attr('href');
              url = url && url.replace(/.*(?=#[^\s]*$)/, '');
            }

            _jquery2.default.slidePanel.show({
              url: url
            }, options);
          }
        });

        (0, _jquery2.default)(document).on('click', '[data-toggle="show-chat"]', function () {
          (0, _jquery2.default)('#conversation').addClass('active');
        });

        (0, _jquery2.default)(document).on('click', '[data-toggle="close-chat"]', function () {
          (0, _jquery2.default)('#conversation').removeClass('active');
        });
      }
    }]);
    return _class;
  }(_Base3.default);

  exports.default = _class;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Section/PageAside', ['exports', 'jquery', 'Component'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Component'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Component);
    global.SectionPageAside = mod.exports;
  }
})(this, function (exports, _jquery, _Component2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Component3 = babelHelpers.interopRequireDefault(_Component2);

  var $BODY = (0, _jquery2.default)('body');
  // const $HTML = $('html');

  var _class = function (_Component) {
    babelHelpers.inherits(_class, _Component);

    function _class() {
      var _ref;

      babelHelpers.classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = babelHelpers.possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      _this.$scroll = _this.$el.find('.page-aside-scroll');
      _this.scrollable = _this.$scroll.asScrollable({
        namespace: 'scrollable',
        contentSelector: '> [data-role=\'content\']',
        containerSelector: '> [data-role=\'container\']'
      }).data('asScrollable');
      return _this;
    }

    babelHelpers.createClass(_class, [{
      key: 'processed',
      value: function processed() {
        var _this2 = this;

        if ($BODY.is('.page-aside-fixed') || $BODY.is('.page-aside-scroll')) {
          this.$el.on('transitionend', function () {
            _this2.scrollable.update();
          });
        }

        Breakpoints.on('change', function () {
          var current = Breakpoints.current().name;

          if (!$BODY.is('.page-aside-fixed') && !$BODY.is('.page-aside-scroll')) {
            if (current === 'xs') {
              _this2.scrollable.enable();
              _this2.$el.on('transitionend', function () {
                _this2.scrollable.update();
              });
            } else {
              _this2.$el.off('transitionend');
              _this2.scrollable.disable();
            }
          }
        });

        (0, _jquery2.default)(document).on('click.pageAsideScroll', '.page-aside-switch', function () {
          var isOpen = _this2.$el.hasClass('open');

          if (isOpen) {
            _this2.$el.removeClass('open');
          } else {
            _this2.scrollable.update();
            _this2.$el.addClass('open');
          }
        });

        (0, _jquery2.default)(document).on('click.pageAsideScroll', '[data-toggle="collapse"]', function (e) {
          var $trigger = (0, _jquery2.default)(e.target);
          if (!$trigger.is('[data-toggle="collapse"]')) {
            $trigger = $trigger.parents('[data-toggle="collapse"]');
          }
          var href = void 0;
          var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
          var $target = (0, _jquery2.default)(target);

          if ($target.attr('id') === 'site-navbar-collapse') {
            _this2.scrollable.update();
          }
        });
      }
    }]);
    return _class;
  }(_Component3.default);

  exports.default = _class;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Plugin/menu', ['Plugin'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('Plugin'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.Plugin);
    global.PluginMenu = mod.exports;
  }
})(this, function (_Plugin2) {
  'use strict';

  var _Plugin3 = babelHelpers.interopRequireDefault(_Plugin2);

  var NAME = 'menu';

  var Scrollable = function () {
    function Scrollable($el, light) {
      babelHelpers.classCallCheck(this, Scrollable);

      this.$el = $el;
      this.light = light;
      this.built = false;
      this.init();
    }

    babelHelpers.createClass(Scrollable, [{
      key: 'init',
      value: function init() {
        this.$el.asScrollable({
          namespace: 'scrollable',
          skin: '', // this.light ? '' : 'scrollable-inverse',
          direction: 'vertical',
          contentSelector: '>',
          containerSelector: '>'
        });

        this.built = true;
      }
    }, {
      key: 'update',
      value: function update($target) {
        if (typeof $target !== 'undefined') {
          $($target).data('asScrollable').update();
        } else {
          this.$el.each(function () {
            $(this).data('asScrollable').update();
          });
        }
      }
    }, {
      key: 'enable',
      value: function enable() {
        this.$el.each(function () {
          $(this).data('asScrollable').enable();
        });
      }
    }, {
      key: 'disable',
      value: function disable() {
        this.$el.each(function () {
          $(this).data('asScrollable').disable();
        });
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.$el.each(function () {
          $(this).data('asScrollable').update();
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.$el.each(function () {
          $(this).data('asScrollable').disable();
        });

        this.built = false;
      }
    }]);
    return Scrollable;
  }();

  var Menu = function (_Plugin) {
    babelHelpers.inherits(Menu, _Plugin);

    function Menu() {
      var _ref;

      babelHelpers.classCallCheck(this, Menu);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = babelHelpers.possibleConstructorReturn(this, (_ref = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref, [this].concat(args)));

      _this.$scrollItems = _this.$el.find('.site-menu-scroll-wrap');

      return _this;
    }

    babelHelpers.createClass(Menu, [{
      key: 'getName',
      value: function getName() {
        return NAME;
      }
    }, {
      key: 'render',
      value: function render() {
        this.bindEvents();
        this.bindResize();

        if (Breakpoints.current().name !== 'xs') {
          this.scrollable = new Scrollable(this.$scrollItems, this.options.light);
        }
        this.$el.data('menuApi', this);
      }
    }, {
      key: 'globalClick',
      value: function globalClick(flag) {
        switch (flag) {
          case 'on':
            $(document).on('click.site.menu', function (e) {
              if ($('.dropdown > [data-dropdown-toggle="true"]').length > 0) {
                if ($(e.target).closest('.dropdown-menu').length === 0) {
                  $('.dropdown > [data-dropdown-toggle="true"]').attr('data-dropdown-toggle', 'false').closest('.dropdown').removeClass('open');
                }
              }
            });
            break;
          case 'off':
            $(document).off('click.site.menu');
            break;
        }
      }
    }, {
      key: 'open',
      value: function open($tag) {
        if ($tag.is('.dropdown')) {
          $('[data-dropdown-toggle="true"]').attr('data-dropdown-toggle', 'false').closest('.dropdown').removeClass('open');
          $tag.find('>.dropdown-toggle').attr('data-dropdown-toggle', 'true');
        }
        $tag.addClass('open');
      }
    }, {
      key: 'close',
      value: function close($tag) {
        $tag.removeClass('open');
        if ($tag.is('.dropdown')) {
          $tag.find('>.dropdown-toggle').attr('data-dropdown-toggle', 'false');
        }
      }
    }, {
      key: 'reset',
      value: function reset() {
        $('.dropdown > [data-dropdown-toggle="true"]').attr('data-dropdown-toggle', 'false').closest('.dropdown').removeClass('open');
      }
    }, {
      key: 'bindEvents',
      value: function bindEvents() {
        var self = this;

        if (Breakpoints.current().name !== 'xs') {
          this.globalClick('on');
        }

        this.$el.on('open.site.menu', '.site-menu-item', function (e) {
          var $item = $(this);

          if (Breakpoints.current().name === 'xs') {
            self.expand($item, function () {
              self.open($item);
            });
          } else {
            self.open($item);
          }

          if (self.options.accordion) {
            $item.siblings('.open').trigger('close.site.menu');
          }

          e.stopPropagation();
        }).on('close.site.menu', '.site-menu-item.open', function (e) {
          var $item = $(this);

          if (Breakpoints.current().name === 'xs') {
            self.collapse($item, function () {
              self.close($item);
            });
          } else {
            self.close($item);
          }

          e.stopPropagation();
        }).on('click.site.menu ', '.site-menu-item', function (e) {
          var $item = $(this);
          if ($item.is('.has-sub') && $(e.target).closest('.site-menu-item').is(this)) {
            if ($item.is('.open')) {
              $item.trigger('close.site.menu');
            } else {
              $item.trigger('open.site.menu');
            }
          }

          if (Breakpoints.current().name === 'xs') {
            e.stopPropagation();
          } else {
            if ($item.is('.dropdown')) {
              e.stopPropagation();
            }

            if ($(e.target).closest('.site-menu-scroll-wrap').length === 1) {
              self.scrollable.update($(e.target).closest('.site-menu-scroll-wrap'));
              e.stopPropagation();
            }
          }
        });
      }
    }, {
      key: 'bindResize',
      value: function bindResize() {
        var _this2 = this;

        var prevBreakpoint = Breakpoints.current().name;
        Breakpoints.on('change', function () {
          var current = Breakpoints.current().name;

          _this2.reset();
          if (current === 'xs') {
            _this2.globalClick('off');
            _this2.scrollable.destroy();
            _this2.$el.off('click.site.menu.scroll');
          } else {
            if (prevBreakpoint === 'xs') {
              if (!_this2.scrollable) {
                _this2.scrollable = new Scrollable(_this2.$scrollItems, _this2.options.light);
              }
              if (!_this2.scrollable.built) {
                _this2.scrollable.init();
              }

              _this2.scrollable.enable();

              _this2.globalClick('off');
              _this2.globalClick('on');

              $('.site-menu .scrollable-container', _this2.$el).css({
                'height': '',
                'width': ''
              });

              _this2.$el.one('click.site.menu.scroll', '.site-menu-item', function () {
                _this2.scrollable.refresh();
              });
            }
          }
          prevBreakpoint = current;
        });
      }
    }, {
      key: 'collapse',
      value: function collapse($item, callback) {
        var self = this;
        var $sub = $($('> .site-menu-sub', $item)[0] || $('> .dropdown-menu', $item)[0] || $('> .site-menu-scroll-wrap', $item)[0]);

        $sub.show().slideUp(this.options.speed, function () {
          $(this).css('display', '');

          $(this).find('> .site-menu-item').removeClass('is-shown');

          if (callback) {
            callback();
          }

          self.$el.trigger('collapsed.site.menu');
        });
      }
    }, {
      key: 'expand',
      value: function expand($item, callback) {
        var self = this;
        var $sub = $($('> .site-menu-sub', $item)[0] || $('> .dropdown-menu', $item)[0] || $('> .site-menu-scroll-wrap', $item)[0]);
        var $children = $sub.is('.site-menu-sub') ? $sub.children('.site-menu-item').addClass('is-hidden') : $($sub.find('.site-menu-sub')[0]).addClass('is-hidden');

        $sub.hide().slideDown(this.options.speed, function () {
          $(this).css('display', '');

          if (callback) {
            callback();
          }

          self.$el.trigger('expanded.site.menu');
        });

        setTimeout(function () {
          $children.addClass('is-shown');
          $children.removeClass('is-hidden');
        }, 0);
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.$el.find('.open').filter(':not(.active)').removeClass('open');
      }
    }], [{
      key: 'getDefaults',
      value: function getDefaults() {
        return {
          speed: 250,
          accordion: true
        };
      }
    }]);
    return Menu;
  }(_Plugin3.default);

  _Plugin3.default.register(NAME, Menu);
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Site', ['exports', 'jquery', 'Base', 'Menubar', 'Sidebar', 'PageAside'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Base'), require('Menubar'), require('Sidebar'), require('PageAside'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Base, global.SectionMenubar, global.SectionSidebar, global.SectionPageAside);
    global.Site = mod.exports;
  }
})(this, function (exports, _jquery, _Base2, _Menubar, _Sidebar, _PageAside) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getInstance = exports.run = exports.Site = undefined;

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Base3 = babelHelpers.interopRequireDefault(_Base2);

  var _Menubar2 = babelHelpers.interopRequireDefault(_Menubar);

  var _Sidebar2 = babelHelpers.interopRequireDefault(_Sidebar);

  var _PageAside2 = babelHelpers.interopRequireDefault(_PageAside);

  var DOC = document;
  var $DOC = (0, _jquery2.default)(document);
  var $BODY = (0, _jquery2.default)('body');

  var Site = function (_Base) {
    babelHelpers.inherits(Site, _Base);

    function Site() {
      babelHelpers.classCallCheck(this, Site);
      return babelHelpers.possibleConstructorReturn(this, (Site.__proto__ || Object.getPrototypeOf(Site)).apply(this, arguments));
    }

    babelHelpers.createClass(Site, [{
      key: 'willProcess',
      value: function willProcess() {
        this.startLoading();
        this.initializePluginAPIs();
        this.initializePlugins();
      }
    }, {
      key: 'processed',
      value: function processed() {
        this.polyfillIEWidth();
        this.initBootstrap();

        this.setupMenubar();
        this.setupFullScreen();
        this.setupMegaNavbar();
        this.setupNavbarCollpase();
        // Dropdown menu setup
        // ===================
        this.$el.on('click', '.dropdown-menu-media', function (e) {
          e.stopPropagation();
        });
      }
    }, {
      key: '_getDefaultMeunbarType',
      value: function _getDefaultMeunbarType() {
        return 'hide';
      }
    }, {
      key: 'getDefaultState',
      value: function getDefaultState() {
        var menubarType = this._getDefaultMeunbarType();

        return {
          menubarType: menubarType
        };
      }
    }, {
      key: 'getDefaultActions',
      value: function getDefaultActions() {
        return {
          menubarType: function menubarType(type) {
            (0, _jquery2.default)('[data-toggle="menubar"]').each(function () {
              var $this = (0, _jquery2.default)(this);
              var $hamburger = (0, _jquery2.default)(this).find('.hamburger');

              if ($hamburger.length > 0) {
                $hamburger.toggleClass('hided', !(type === 'open'));
              } else {
                $this.toggleClass('hided', !(type === 'open'));
              }
            });
          }
        };
      }
    }, {
      key: 'getDefaultChildren',
      value: function getDefaultChildren() {
        this.menubar = new _Menubar2.default({
          $el: (0, _jquery2.default)('.site-menubar')
        });

        this.sidebar = new _Sidebar2.default();
        var children = [this.menubar, this.sidebar];
        var $aside = (0, _jquery2.default)('.page-aside');
        if ($aside.length > 0) {
          children.push(new _PageAside2.default({
            $el: $aside
          }));
        }
        return children;
      }
    }, {
      key: 'getCurrentBreakpoint',
      value: function getCurrentBreakpoint() {
        var bp = Breakpoints.current();
        return bp ? bp.name : 'lg';
      }
    }, {
      key: 'initBootstrap',
      value: function initBootstrap() {
        // Tooltip setup
        // =============
        $DOC.tooltip({
          selector: '[data-tooltip=true]',
          container: 'body'
        });

        (0, _jquery2.default)('[data-toggle="tooltip"]').tooltip();
        (0, _jquery2.default)('[data-toggle="popover"]').popover();
      }
    }, {
      key: 'polyfillIEWidth',
      value: function polyfillIEWidth() {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
          var msViewportStyle = DOC.createElement('style');
          msViewportStyle.appendChild(DOC.createTextNode('@-ms-viewport{width:auto!important}'));
          DOC.querySelector('head').appendChild(msViewportStyle);
        }
      }
    }, {
      key: 'setupFullScreen',
      value: function setupFullScreen() {
        if (typeof screenfull !== 'undefined') {
          $DOC.on('click', '[data-toggle="fullscreen"]', function () {
            if (screenfull.enabled) {
              screenfull.toggle();
            }

            return false;
          });

          if (screenfull.enabled) {
            DOC.addEventListener(screenfull.raw.fullscreenchange, function () {
              (0, _jquery2.default)('[data-toggle="fullscreen"]').toggleClass('active', screenfull.isFullscreen);
            });
          }
        }
      }
    }, {
      key: 'setupMegaNavbar',
      value: function setupMegaNavbar() {
        $DOC.on('click', '.navbar-mega .dropdown-menu', function (e) {
          e.stopPropagation();
        }).on('show.bs.dropdown', function (e) {
          var $target = (0, _jquery2.default)(e.target);
          var $trigger = e.relatedTarget ? (0, _jquery2.default)(e.relatedTarget) : $target.children('[data-toggle="dropdown"]');
          var animation = $trigger.data('animation');

          if (animation) {
            (function () {
              var $menu = $target.children('.dropdown-menu');
              $menu.addClass('animation-' + animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $menu.removeClass('animation-' + animation);
              });
            })();
          }
        }).on('shown.bs.dropdown', function (e) {
          var $menu = (0, _jquery2.default)(e.target).find('.dropdown-menu-media > .list-group');

          if ($menu.length > 0) {
            var api = $menu.data('asScrollable');
            if (api) {
              api.update();
            } else {
              $menu.asScrollable({
                namespace: 'scrollable',
                contentSelector: '> [data-role=\'content\']',
                containerSelector: '> [data-role=\'container\']'
              });
            }
          }
        });
      }
    }, {
      key: 'setupMenubar',
      value: function setupMenubar() {
        var _this2 = this;

        (0, _jquery2.default)(document).on('click', '[data-toggle="menubar"]', function () {
          var type = _this2.getState('menubarType');
          switch (type) {
            case 'open':
              type = 'hide';
              break;
            case 'hide':
              type = 'open';
              break;
            // no default
          }

          _this2.setState('menubarType', type);

          return false;
        });

        (0, _jquery2.default)(document).on('collapsed.site.menu expanded.site.menu', function () {
          var type = _this2.getState('menubarType');

          if (type === 'open' && _this2.menubar && _this2.menubar.scrollable) {
            _this2.menubar.scrollable.update();
          }
        });

        Breakpoints.on('change', function () {
          _this2.setState('menubarType', _this2._getDefaultMeunbarType());
        });
      }
    }, {
      key: 'setupNavbarCollpase',
      value: function setupNavbarCollpase() {
        (0, _jquery2.default)(document).on('click', "[data-target='#site-navbar-collapse']", function (e) {
          var $trigger = (0, _jquery2.default)(this);
          var isClose = $trigger.hasClass('collapsed');
          $BODY.addClass("site-navbar-collapsing");
          $BODY.toggleClass("site-navbar-collapse-show", !isClose);
          setTimeout(function () {
            $BODY.removeClass("site-navbar-collapsing");
          }, 350);
        });
      }
    }, {
      key: 'startLoading',
      value: function startLoading() {
        if (typeof _jquery2.default.fn.animsition === 'undefined') {
          return false;
        }

        // let loadingType = 'default';
        $BODY.animsition({
          inClass: 'fade-in',
          inDuration: 800,
          loading: true,
          loadingClass: 'loader-overlay',
          loadingParentElement: 'html',
          loadingInner: '\n      <div class="loader-content">\n        <div class="loader-index">\n          <div></div>\n          <div></div>\n          <div></div>\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>',
          onLoadEvent: true
        });
      }
    }]);
    return Site;
  }(_Base3.default);

  var instance = null;

  function getInstance() {
    if (!instance) {
      instance = new Site();
    }
    return instance;
  }

  function run() {
    var site = getInstance();
    site.run();
  }

  exports.default = Site;
  exports.Site = Site;
  exports.run = run;
  exports.getInstance = getInstance;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Plugin/asscrollable', ['exports', 'Plugin'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('Plugin'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Plugin);
    global.PluginAsscrollable = mod.exports;
  }
})(this, function (exports, _Plugin2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Plugin3 = babelHelpers.interopRequireDefault(_Plugin2);

  var NAME = 'scrollable'; // import $ from 'jquery';

  var Scrollable = function (_Plugin) {
    babelHelpers.inherits(Scrollable, _Plugin);

    function Scrollable() {
      babelHelpers.classCallCheck(this, Scrollable);
      return babelHelpers.possibleConstructorReturn(this, (Scrollable.__proto__ || Object.getPrototypeOf(Scrollable)).apply(this, arguments));
    }

    babelHelpers.createClass(Scrollable, [{
      key: 'getName',
      value: function getName() {
        return NAME;
      }
    }, {
      key: 'render',
      value: function render() {
        var $el = this.$el;

        $el.asScrollable(this.options);
      }
    }], [{
      key: 'getDefaults',
      value: function getDefaults() {
        return {
          namespace: 'scrollable',
          contentSelector: '> [data-role=\'content\']',
          containerSelector: '> [data-role=\'container\']'
        };
      }
    }]);
    return Scrollable;
  }(_Plugin3.default);

  _Plugin3.default.register(NAME, Scrollable);

  exports.default = Scrollable;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Plugin/slidepanel', ['exports', 'jquery', 'Plugin'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Plugin'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Plugin);
    global.PluginSlidepanel = mod.exports;
  }
})(this, function (exports, _jquery, _Plugin2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Plugin3 = babelHelpers.interopRequireDefault(_Plugin2);

  var NAME = 'slidePanel';

  var SlidePanel = function (_Plugin) {
    babelHelpers.inherits(SlidePanel, _Plugin);

    function SlidePanel() {
      babelHelpers.classCallCheck(this, SlidePanel);
      return babelHelpers.possibleConstructorReturn(this, (SlidePanel.__proto__ || Object.getPrototypeOf(SlidePanel)).apply(this, arguments));
    }

    babelHelpers.createClass(SlidePanel, [{
      key: 'getName',
      value: function getName() {
        return NAME;
      }
    }, {
      key: 'render',
      value: function render() {
        if (typeof _jquery2.default.slidePanel === 'undefined') {
          return;
        }
        if (!this.options.url) {
          this.options.url = this.$el.attr('href');
          this.options.url = this.options.url && this.options.url.replace(/.*(?=#[^\s]*$)/, '');
        }

        this.$el.data('slidePanelWrapAPI', this);
      }
    }, {
      key: 'show',
      value: function show() {
        var options = this.options;

        _jquery2.default.slidePanel.show({
          url: options.url
        }, options);
      }
    }], [{
      key: 'getDefaults',
      value: function getDefaults() {
        return {
          closeSelector: '.slidePanel-close',
          mouseDragHandler: '.slidePanel-handler',
          loading: {
            template: function template(options) {
              return '<div class="' + options.classes.loading + '">\n                    <div class="loader loader-default"></div>\n                  </div>';
            },
            showCallback: function showCallback(options) {
              this.$el.addClass(options.classes.loading + '-show');
            },
            hideCallback: function hideCallback(options) {
              this.$el.removeClass(options.classes.loading + '-show');
            }
          }
        };
      }
    }, {
      key: 'api',
      value: function api() {
        return 'click|show';
      }
    }]);
    return SlidePanel;
  }(_Plugin3.default);

  _Plugin3.default.register(NAME, SlidePanel);
  exports.default = SlidePanel;
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Plugin/toolbar', ['exports', 'jquery', 'Plugin'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Plugin'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Plugin);
    global.PluginToolbar = mod.exports;
  }
})(this, function (exports, _jquery, _Plugin2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Plugin3 = babelHelpers.interopRequireDefault(_Plugin2);

  var NAME = 'toolbar';

  var Toolbar = function (_Plugin) {
    babelHelpers.inherits(Toolbar, _Plugin);

    function Toolbar() {
      babelHelpers.classCallCheck(this, Toolbar);
      return babelHelpers.possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
    }

    babelHelpers.createClass(Toolbar, [{
      key: 'getName',
      value: function getName() {
        return NAME;
      }
    }, {
      key: 'render',
      value: function render() {
        if (!_jquery2.default.fn.toolbar) {
          return;
        }

        var $el = this.$el,
            content = $el.data('toolbar');

        if (content) {
          this.options.content = content;
        }

        $el.toolbar(this.options);
      }
    }], [{
      key: 'getDefaults',
      value: function getDefaults() {
        return {
          hideOnClick: true,
          event: 'hover'
        };
      }
    }]);
    return Toolbar;
  }(_Plugin3.default);

  _Plugin3.default.register(NAME, Toolbar);

  exports.default = Toolbar;
});
