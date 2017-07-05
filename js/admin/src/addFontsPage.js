import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import FontsPage from 'flagrow/fonts/components/FontsPage';

export default function () {
    // create the route
    app.routes['flagrow-fonts-browser'] = {
        path: '/flagrow/fonts',
        component: FontsPage.component()
    };

    // Add tab to admin menu
    extend(AdminNav.prototype, 'items', items => {
        items.add('flagrow-fonts', AdminLinkButton.component({
            href: app.route('flagrow-fonts-browser'),
            icon: 'font',
            children: app.translator.trans('flagrow-fonts.admin.nav.title'),
            description: app.translator.trans('flagrow-fonts.admin.nav.description')
        }));
    });
}
