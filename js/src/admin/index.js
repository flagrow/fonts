import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import Font from './models/Font';
import FontsPage from './components/FontsPage';
import FontsSettingsModal from './modals/FontsSettingsModal';

app.initializers.add('flagrow-fonts', app => {
    app.extensionSettings['flagrow-fonts'] = () => app.modal.show(new FontsSettingsModal());
    app.store.models['flagrow-fonts'] = Font;

    app.routes['flagrow-fonts-browser'] = {
        path: '/flagrow/fonts',
        component: FontsPage.component(),
    };

    // Add tab to admin menu
    extend(AdminNav.prototype, 'items', items => {
        items.add('flagrow-fonts', AdminLinkButton.component({
            href: app.route('flagrow-fonts-browser'),
            icon: 'fas fa-font',
            children: app.translator.trans('flagrow-fonts.admin.nav.title'),
            description: app.translator.trans('flagrow-fonts.admin.nav.description'),
        }));
    });
});
