import app from 'flarum/app';
import addEditorFontSelector from 'flagrow/fonts/addEditorFontSelector';

app.initializers.add('flagrow-fonts', () => {
    addEditorFontSelector();
});
