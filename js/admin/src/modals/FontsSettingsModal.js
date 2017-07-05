import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';

export default class FontsSettingsModal extends SettingsModal {

    title() {
        return app.translator.trans('flagrow-fonts.admin.modal.settings.title');
    }

    form() {
        return [
            m('div', {className: 'Form-group'}, [
                m('label', {for: 'fonts-api-key'}, app.translator.trans('flagrow-fonts.admin.modal.settings.field.googleApiKey')),
                m('input', {
                    id: 'fonts-api-key',
                    className: 'FormControl',
                    bidi: this.setting('flagrow.fonts.google_api_key')
                }),
                m('span', app.translator.trans('flagrow-fonts.admin.modal.settings.field.googleApiKeyDescription', {
                    a: m('a', {
                        href: 'https://developers.google.com/fonts/docs/developer_api#identifying_your_application_to_google',
                        target: '_blank'
                    })
                }))
            ])
        ];
    }
}
