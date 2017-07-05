import app from 'flarum/app';
import FontsSettingsModal from 'flagrow/fonts/modals/FontsSettingsModal';
import Font from 'flagrow/fonts/models/Font';
import addFontsPage from 'flagrow/fonts/addFontsPage';

app.initializers.add('flagrow-fonts', app => {
    app.extensionSettings['flagrow-fonts'] = () => app.modal.show(new FontsSettingsModal());
    app.store.models['flagrow-fonts'] = Font;

    addFontsPage();
});
