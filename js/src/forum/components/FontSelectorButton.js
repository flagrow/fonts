import app from 'flarum/app';
import Component from 'flarum/Component';
import Dropdown from 'flarum/components/Dropdown';
import Button from 'flarum/components/Button';
import icon from 'flarum/helpers/icon';

export default class extends Component {
    init() {
        this.textEditor = this.props.textEditor;

        this.fonts = [];

        const enabled_fonts = app.forum.attribute('flagrow.fonts.enabled_fonts');

        if (enabled_fonts) {
            for (let family in enabled_fonts) {
                if (!enabled_fonts.hasOwnProperty(family)) {
                    continue;
                }

                const font = enabled_fonts[family];

                this.fonts.push({
                    family,
                    variants: font.variants || [],
                });
            }
        }
    }

    view() {
        return Dropdown.component({
            className: 'FlagrowFontDropdown',
            buttonClassName: 'Button',
            label: icon('fas fa-font'),
            children: this.fonts.map(
                font => Button.component({
                    className: 'Button Button--block',
                    style: {
                        fontFamily: '"' + font.family + '", sans-serif',
                    },
                    children: font.family,
                    onclick: () => {
                        // Wrap the current selection with BBCode tags
                        // If there's no selection, put them around the cursor
                        // This feature is not available on the TextEditor class so here's an implementation

                        const range = this.textEditor.getSelectionRange();
                        const value = this.textEditor.value();

                        const before = value.slice(0, range[0]);
                        const after = value.slice(range[1]);
                        const selected = value.slice(range[0], range[1]);

                        const tagBefore = '[font=' + font.family + ']';
                        const tagAfter = '[/font]';

                        this.textEditor.setValue(before + tagBefore + selected + tagAfter + after);
                        this.textEditor.setSelectionRange(before.length + tagBefore.length, before.length + tagBefore.length + selected.length);
                    },
                })
            ),
        });
    }
}
