(function ($) {
  'use strict';

  function clamp(val, min, max) { return Math.max(Math.min(val, max), min); }
  function identity(val) { return val.toFixed(2); }
  function uchar(val) { return ((val * 255) | 0) + ''; }
  function degree(val) { return ((val * 360) | 0) + ''; }
  function percent(val) { return (val * 100).toFixed(2) + '%'; }
  var base64encode = window.btoa || function (str) {
    var result = [],
        position = -1,
        len = str.length,
        nan0, nan1, nan2, enc = [ ,,, ];

    while (++position < len) {
      nan0 = str.charCodeAt(position);
      nan1 = str.charCodeAt(++position);
      enc[0] = nan0 >> 2;
      enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
      if (isNaN(nan1)) {
        enc[2] = enc[3] = 64;
      } else {
        nan2 = str.charCodeAt(++position);
        enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
        enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
      }
      result.push(
          alphabet.charAt(enc[0]),
          alphabet.charAt(enc[1]),
          alphabet.charAt(enc[2]),
          alphabet.charAt(enc[3]));
    }
    return result.join('');
  };

  var componentMatchers = { r: /R/g, g: /G/g, b: /B/g, h: /H/g, s: /S/g, l: /L/g, a: /A/g, };
  var componentMap = { r: uchar, g: uchar, b: uchar, h: degree, s: percent, l: percent, a: identity, };
  var isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  var isUnsupportedBrowser = /MSIE [1-8]/.test(navigator.userAgent);
  var supportsGradients = !(/MSIE 9.0/.test(navigator.userAgent));
  var supportsTransitions = supportsGradients;
  var isTouchDevice = 'ontouchstart' in document.documentElement;
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var staticComponentValues = { r: 0, g: 0, b: 0, h: 0, s: 1, l: 0.5, a: 1 };
  var componentStops = { r: 2, g: 2, b: 2, h: 7, s: 2, l: 3, a: 2 };

  var LEFT_BUTTON = 0;
  var TRANSITION_END = isSafari ? 'webkitTransitionEnd' : 'transitionend';
  var POINTER_DOWN_EVENT = isTouchDevice ? 'touchstart' : 'mousedown';
  var POINTER_MOVE_EVENT = isTouchDevice ? 'touchmove' : 'mousemove';
  var POINTER_UP_EVENT = isTouchDevice ? 'touchend touchcancel' : 'mouseup';
  var NEW_COLOR_EVENT = 'newcolor';
  var EXPANDED_Z_INDEX = 999999;

  function getGradientTemplate(component, space, staticComponents) {
    var colorComponents = staticComponents ? space.split('').map(function (component) {
      return componentMap[component](staticComponentValues[component]);
    }) : space.split('');
    var componentIndex = space.indexOf(component);
    var colors = [];
    var n = componentStops[component];
    var i;

    // Generate the color stops, e.g. "rgba(R, G, 0, A),rgba(R, G, 255, A)"
    for (i = 0; i < n; ++i) {
      var frac = i / (n - 1);
      colorComponents[componentIndex] = componentMap[component](frac);
      var color = supportsGradients ?
        space + '(' + colorComponents.join().toUpperCase() + ')' :
        '<stop stop-color="' + space + '(' + colorComponents.join().toUpperCase() + ')" offset="' + frac + '"/>';
      colors.push(color);
    }
    colors = colors.join(supportsGradients ? ',' : '');

    // The template function substitutes the color placeholders, e.g. R, G, A for the
    // color values specified in the color argument
    return function (color) {
      var ret = colors;
      for (var c in color) {
        c === component || (ret = ret.replace(componentMatchers[c], componentMap[c](color[c])));
      }
      if (supportsGradients) {
        return 'linear-gradient(to right, ' + ret + ')';
      } else {
        var svg =
          '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" ' +
              'viewBox="0 0 1 1" preserveAspectRatio="none">' +
          '<linearGradient id="the-gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">' +
          ret +
          '</linearGradient>' +
          '<rect x="0" y="0" width="1" height="1" fill="url(#the-gradient)" />' +
          '</svg>';
        return 'url(data:image/svg+xml;base64,' + base64encode(svg) + ')';
      }
    };
  }

  function getRgb(c) {
    if ('r' in c) { return c; }

    var r, g, b;
    var h = c.h, s = c.s, l = c.l;

    function hue2rgb(p, q, t) {
      if (t < 0) { t += 1; }
      if (t > 1) { t -= 1; }
      if (t < 1 / 6) { return p + (q - p) * 6 * t; }
      if (t < 1 / 2) { return q; }
      if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
      return p;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    var ret = { r: r, g: g, b: b };
    'a' in c && (ret.a = c.a);
    return ret;
  }

  function getHsl(c) {
    if ('h' in c) { return c; }

    var r = c.r, g = c.g, b = c.b;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    var ret = { h: h, s: s, l: l };
    'a' in c && (ret.a = c.a);
    return ret;
  }

  // COLOR CLASS

  function Color(space, color) {
    var i, components = {};

    // Validate color space argument
    space = space.toLowerCase();
    if (!(/^(rgb|hsl)a?$/i).test(space)) {
      throw 'Color spaces must be any of the following: "rgb", "rgba", "hsl" or "hsla"';
    }

    // Validate color argument
    if (typeof color === 'string') {
      color = color.toLowerCase();
      if (/^#[0-9a-f]{6}([0-9a-f]{2})?$/.test(color)) {
        space.length === 4 && color.length !== 9 && (color += 'ff');  // Default alpha to fully opaque
        for (i = 1; i < color.length; i += 2) {
          components[space[(i - 1) / 2]] = parseInt(color.substr(i, 2), 16) / 255;
        }
      } else if (/^(rgb|hsl)a?\([\d\s,.%]+\)$/.test(color)) {
        var parsedSpace = color.match(/(rgb|hsl)a?/)[0];
        var componentsArray = color.match(/[\d.]+/g);
        if (/rgb/.test(parsedSpace)) {
          components.r = componentsArray[0] / 255;
          components.g = componentsArray[1] / 255;
          components.b = componentsArray[2] / 255;
        } else {
          components.h = componentsArray[0] / 360;
          components.s = componentsArray[1] / 100;
          components.l = componentsArray[2] / 100;
        }
        components.a = +componentsArray[3];
      } else {
        throw 'Color strings must be hexadecimal (e.g. "#00ff00", or "#00ff00ff") or CSS style (e.g. rgba(0,255,0,1))';
      }
    } else if ($.isPlainObject(color)) {
      var sortedColorComponentKeys = Object.keys(color).sort().join('');
      if (!(/^a?(bgr|hls)$/i).test(sortedColorComponentKeys)) {
        throw 'Color objects must contain either r, g and b keys, or h, s and l keys. The a key is optional.';
      }
      if (space.split('').sort().join('') !== sortedColorComponentKeys) {
        color = /rgb/.test('space') ? getRgb(color) : getHsl(color);
      }
      components = color;
    } else {
      throw 'Unrecognized color format';
    }

    // Make sure the color matches the color space. No-op if they are already the same
    components = /rgb/.test(space) ? getRgb(components) : getHsl(components);
    // Add an alpha channel if missing
    isFinite(components.a) || (components.a = 1);

    for (var key in components) {
      if (components[key] < 0 || 1 < components[key]) { throw 'Color component out of range: ' + key; }
    }

    this.getComponents = function () { return components; };
    this.getComponent = function (componentKey) { return components[componentKey]; };
    this.setComponent = function (componentKey, value) { components[componentKey] = value; };
    this.getSpace = function () { return space; };
  }

  Color.prototype.convertComponents = function (newSpace) {
    newSpace = newSpace || this.getSpace();
    var components = $.extend({}, this.getComponents());

    // See if the components are already in the right space
    if (new RegExp(newSpace).test(this.getSpace())) {
      newSpace.length === 3 && (delete components.a);
      return components;
    }

    components = /rgb/.test(newSpace) ? getRgb(components) : getHsl(components);
    if (/a/.test(newSpace)) {
      var a = this.getComponent('a');
      components.a = typeof a === 'undefined' ? 1 : a;
    }

    return components;
  };

  Color.prototype.componentsToString = function (components, space) {
    function pad(str) {
      return (str.length === 1 ? '0' : '') + str;
    }
    var str = '#';
    for (var i = 0; i < space.length; ++i) {
      str += pad(Math.floor(255 * components[space[i]]).toString(16));
    }
    return str;
  };

  Color.prototype.toString = function (space) {
    space = space || this.getSpace();
    return this.componentsToString(this.convertComponents(space), space);
  };

  Color.prototype.componentsToCssValuesString = function (components, space) {
    var componentArray = [];
    for (var i = 0; i < space.length; ++i) {
      var componentKey = space[i];
      componentArray.push(componentMap[componentKey](components[componentKey]));
    }
    return componentArray.join(', ');
  };

  Color.prototype.toCssString = function (space) {
    space = space || this.getSpace();
    return space + '(' + this.componentsToCssValuesString(this.convertComponents(space), space) + ')';
  };

  // COLORPICKER CLASS

  function Colorpicker($el, userOptions) {
    var self = this;
    var originalClasses = $el.attr('class');
    var $originalChildren = $el.children().detach();
    var originalText = $el.text();
    $el.addClass('colorpicker').empty();

    var options = $.extend({
      color: $el.css('color'),
      colorSpace: 'hsla',
      expandEvent: 'mousedown touchstart',
      collapseEvent: '',
      staticComponents: false,
    }, userOptions);

    var color = new Color(options.colorSpace, options.color);

    $el.addClass('componentcount-' + color.getSpace().length).toggleClass('show-labels', !!options.labels);

    function addChild(className, $parent) { return $('<div>').addClass(className).appendTo($parent); }
    var $document = $(document);
    var $maximizeWrapper = addChild('maximize-wrapper', $el);
    var $innerMaximizeWrapper = addChild('inner-maximize-wrapper', $maximizeWrapper);
    var $uiWrapper = addChild('ui-wrapper', $innerMaximizeWrapper);
    var $displayWrapper = addChild('display-wrapper', $uiWrapper);
    var $display = addChild('display', $displayWrapper);
    var $sliderContainer = addChild('slider-container', $uiWrapper);
    var sliders = $.map(color.getSpace().split(''), function (componentKey) {
      var $slider = addChild('slider ' + componentKey, $sliderContainer);
      addChild('handle', $slider).attr('data-component', componentKey);
      $slider.data({
        componentKey: componentKey,
        template: getGradientTemplate(componentKey, color.getSpace(), options.staticComponents),
      });
      return $slider;
    });

    var $outputWrapper, colorOutputFunction;
    if (options.displayColor) {
      if (!(/^(hex|css)$/.test(options.displayColor))) { throw 'Invalid displayColor value, should be "hex" or "css"'; }
      $outputWrapper = addChild('output-wrapper', $innerMaximizeWrapper);
      colorOutputFunction = {
        hex: color.toString,
        css: color.toCssString,
      }[options.displayColor].bind(color, options.displayColorSpace || options.colorSpace);
    }

    // Listen to new colors, and update the UI accordingly
    function onNewColor(ev, self, componentKey, value) {
      componentKey && color.setComponent(componentKey, value);
      for (var i = 0; i < sliders.length; ++i) {
        var $slider = sliders[i];
        $slider
            .css({
              backgroundImage: $slider.data('template')(color.getComponents()),
            })
            .find('.handle').css({
              left: (color.getComponent($slider.data('componentKey')) * 100) + '%',
            });
        $display.css({ backgroundColor: color.toCssString() });
        options.displayColor && $outputWrapper.text(colorOutputFunction());
      }
    }
    $el.on(NEW_COLOR_EVENT, onNewColor);
    setTimeout(onNewColor.bind(null, undefined, this), 0);

    // Expanding the colorpicker
    var onClickOutside = function (ev) {
      $(ev.target).closest($el).length || collapse();
    };
    var expand, collapse;
    expand = function () {
      $el.addClass('expanded').css({ zIndex: EXPANDED_Z_INDEX });
      var height = 0;
      $innerMaximizeWrapper.children().each(function () { height += $(this).outerHeight(true); });
      $innerMaximizeWrapper.css({ width: $uiWrapper.width(), height: height });
      $(window).on(POINTER_DOWN_EVENT, onClickOutside);
      options.collapseEvent && $el.on(options.collapseEvent, collapse);
      $el.off(options.expandEvent, expand);

      var docWidth = $document.width(), docHeight = $document.height();
      var pos = $uiWrapper.offset();
      var dX = Math.min(0, docWidth - pos.left - $uiWrapper.outerWidth(true) - 10);
      var dY = Math.min(0, docHeight - pos.top - $uiWrapper.outerHeight(true) - 10);
      $el.css('transform', 'translate(' + dX + 'px, ' + dY + 'px)');
    };
    collapse = function () {
      supportsTransitions ?
        $el.off(TRANSITION_END).one(TRANSITION_END, function () { $el.css({ zIndex: '' }); }) :
        $el.css({ zIndex: '' });
      $el.css({ zIndex: EXPANDED_Z_INDEX - 1 });
      $innerMaximizeWrapper.css({ width: '', height: '' });
      $el.removeClass('expanded');
      $(window).off(POINTER_DOWN_EVENT, onClickOutside);
      options.expandEvent && $el.on(options.expandEvent, expand);
      $el.css('transform', '');
    };

    options.expandEvent && $el.on(options.expandEvent, expand);

    var triggerNewColor = function (ev) {
      var $target = $(ev.target);
      if (!$target.hasClass('slider')) { return; }
      var offsetX = isTouchDevice ?
          ev.originalEvent.touches[0].clientX - $(ev.target).offset().left :
          $.isNumeric(ev.offsetX) ? ev.offsetX : ev.clientX - $(ev.target).offset().left;
      $target.trigger(NEW_COLOR_EVENT, [
        self, $target.data('componentKey'), clamp(offsetX / $target.outerWidth(), 0, 1)
      ]);
      ev.preventDefault();
      ev.stopPropagation();
    };
    var onPointerUp = function () {
      $(window).off(POINTER_MOVE_EVENT, triggerNewColor);
    };
    $el.on(POINTER_DOWN_EVENT, function (ev) {
      var $target = $(ev.target);
      if (ev.type === 'mousedown' && ev.button !== LEFT_BUTTON || !$target.hasClass('slider')) { return; }

      triggerNewColor(ev);

      $(window).on(POINTER_MOVE_EVENT, triggerNewColor);
      $(window).one(POINTER_UP_EVENT, onPointerUp);
    });

    // Public functions
    this.destroy = function () {
      $(window).off(POINTER_UP_EVENT, onPointerUp);
      $(window).off(POINTER_MOVE_EVENT, triggerNewColor);
      $(window).off(POINTER_DOWN_EVENT, onClickOutside);
      $el.off().empty().removeData('colorpicker')
          .attr('class', originalClasses).html($originalChildren).text(originalText);
    };
    this.toString = function () { return color.toString.apply(color, arguments); };
    this.toCssString = function () { return color.toCssString.apply(color, arguments); };
    this.toObject = function () { return color.convertComponents.apply(color, arguments); };
    this.getColorSpace = function () { return color.getSpace(); };
    this.on = $el.on.bind($el);
    this.off = $el.off.bind($el);

    $el.data('colorpicker', this);
    return this;
  }

  // REGISTER PLUGIN

  $.fn.colorpicker = function (options) {
    if (isUnsupportedBrowser) { throw 'Colorpicker does not work with your browser'; }
    var $el = this.eq(0);
    if (!$el.length) { throw 'No element matched'; }
    return $el.data('colorpicker') || new Colorpicker($el, options);
  };

}(window.$));
