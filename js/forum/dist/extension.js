'use strict';

System.register('flagrow/fonts/addEditorFontSelector', ['flarum/extend', 'flarum/components/TextEditor', 'flagrow/fonts/components/FontSelectorButton'], function (_export, _context) {
    "use strict";

    var extend, TextEditor, FontSelectorButton;

    _export('default', function () {
        extend(TextEditor.prototype, 'controlItems', function (items) {
            var fontButton = new FontSelectorButton({
                textEditor: this
            });

            items.add('flagrow-fonts', fontButton, 0);
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsTextEditor) {
            TextEditor = _flarumComponentsTextEditor.default;
        }, function (_flagrowFontsComponentsFontSelectorButton) {
            FontSelectorButton = _flagrowFontsComponentsFontSelectorButton.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/fonts/components/FontSelectorButton', ['flarum/app', 'flarum/Component', 'flarum/components/Dropdown', 'flarum/components/Button', 'flarum/helpers/icon'], function (_export, _context) {
    "use strict";

    var app, Component, Dropdown, Button, icon, _class;

    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsDropdown) {
            Dropdown = _flarumComponentsDropdown.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }],
        execute: function () {
            _class = function (_Component) {
                babelHelpers.inherits(_class, _Component);

                function _class() {
                    babelHelpers.classCallCheck(this, _class);
                    return babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                }

                babelHelpers.createClass(_class, [{
                    key: 'init',
                    value: function init() {
                        this.textEditor = this.props.textEditor;

                        this.fonts = [];

                        var enabled_fonts = app.forum.attribute('flagrow.fonts.enabled_fonts');

                        if (enabled_fonts) {
                            for (var family in enabled_fonts) {
                                if (!enabled_fonts.hasOwnProperty(family)) {
                                    continue;
                                }

                                var font = enabled_fonts[family];

                                this.fonts.push({
                                    family: family,
                                    variants: font.variants || []
                                });
                            }
                        }
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        return Dropdown.component({
                            buttonClassName: 'Button',
                            label: icon('font'),
                            children: this.fonts.map(function (font) {
                                return Button.component({
                                    className: 'Button Button--block',
                                    style: {
                                        fontFamily: '"' + font.family + '", sans-serif'
                                    },
                                    children: font.family,
                                    onclick: function onclick() {
                                        // Wrap the current selection with BBCode tags
                                        // If there's no selection, put them around the cursor
                                        // This feature is not available on the TextEditor class so here's an implementation

                                        var range = _this2.textEditor.getSelectionRange();
                                        var value = _this2.textEditor.value();

                                        var before = value.slice(0, range[0]);
                                        var after = value.slice(range[1]);
                                        var selected = value.slice(range[0], range[1]);

                                        var tagBefore = '[font=' + font.family + ']';
                                        var tagAfter = '[/font]';

                                        _this2.textEditor.setValue(before + tagBefore + selected + tagAfter + after);
                                        _this2.textEditor.setSelectionRange(before.length + tagBefore.length, before.length + tagBefore.length + selected.length);
                                    }
                                });
                            })
                        });
                    }
                }]);
                return _class;
            }(Component);

            _export('default', _class);
        }
    };
});;
'use strict';

System.register('flagrow/fonts/main', ['flarum/app', 'flagrow/fonts/addEditorFontSelector'], function (_export, _context) {
    "use strict";

    var app, addEditorFontSelector;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowFontsAddEditorFontSelector) {
            addEditorFontSelector = _flagrowFontsAddEditorFontSelector.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-fonts', function () {
                addEditorFontSelector();
            });
        }
    };
});