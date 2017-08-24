import {extend} from 'flarum/extend';
import TextEditor from 'flarum/components/TextEditor';
import FontSelectorButton from 'flagrow/fonts/components/FontSelectorButton';

export default function () {
    extend(TextEditor.prototype, 'controlItems', function (items) {
        const fontButton = new FontSelectorButton({
            textEditor: this,
        });

        items.add('flagrow-fonts', fontButton, 0);
    });
}
