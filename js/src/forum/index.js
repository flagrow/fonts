import {extend} from 'flarum/extend';
import app from 'flarum/app';
import TextEditor from 'flarum/components/TextEditor';
import FontSelectorButton from './components/FontSelectorButton';

app.initializers.add('flagrow-fonts', () => {
    extend(TextEditor.prototype, 'toolbarItems', function (items) {
        const fontButton = new FontSelectorButton({
            textEditor: this,
        });

        items.add('flagrow-fonts', fontButton);
    });
});
