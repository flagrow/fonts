import app from 'flarum/app';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import Select from 'flarum/components/Select';
import Dropdown from 'flarum/components/Dropdown';
import FontRepository from 'flagrow/fonts/utils/FontRepository';

export default class FontsPage extends Component {
    init() {
        this.loading = m.prop(false);
        this.repository = new FontRepository(this.loading);
        this.repository.loadNextPage();
    }

    view() {
        return m('.container', [
            m('h1', 'Fonts'),
            m('div', [
                Select.component({
                    onchange: val => this.repository.sort(val),
                    value: this.repository.sortedBy(),
                    options: {
                        alpha: app.translator.trans('flagrow-fonts.admin.browse.sort.alpha'),
                        date: app.translator.trans('flagrow-fonts.admin.browse.sort.date'),
                        popularity: app.translator.trans('flagrow-fonts.admin.browse.sort.popularity'),
                        trending: app.translator.trans('flagrow-fonts.admin.browse.sort.trending'),
                        enabled: app.translator.trans('flagrow-fonts.admin.browse.sort.enabled'),
                    }
                })
            ]),
            m('.FlagrowFonts-fonts', this.repository.fonts().map(
                font => m('.FlagrowFonts-font', {
                    className: font.enabled() ? 'Font-enabled' : ''
                }, [
                    m('.Font-header', [
                        m('.Font-name', font.family()),
                        Dropdown.component({
                            buttonClassName: 'Button Font-dropdown',
                            label: app.translator.trans('flagrow-fonts.admin.browse.select.' + (font.enabled() ? 'update' : 'enable')),
                            children: [Button.component({
                                    className: 'Button Button--bloc Font-disable',
                                    icon: 'times',
                                    children: 'Disable all',
                                    onclick: () => this.repository.disableFont(font.family())
                            })].concat(font.variants().map( // Concat is required to return a single array so it can be correctly wrapped inside a list
                                variant => Button.component({
                                    className: 'Button Button--block',
                                    icon: variant.enabled ? 'check' : 'square-o',
                                    children: variant.key,
                                    onclick: event => {
                                        event.stopPropagation();

                                        let variants = font.variants().filter(v => {
                                            if (v.key === variant.key) {
                                                return !variant.enabled;
                                            }

                                            return v.enabled;
                                        }).map(v => v.key);

                                        this.repository.enableFont(font.family(), variants);
                                    }
                                })
                            ))
                        })
                    ]),
                    m('.Font-preview', {
                        style: {
                            fontFamily: font.family()
                        }
                    }, app.translator.trans('flagrow-fonts.admin.browse.sample-text')),
                ])
            )),
            this.repository.hasMore() ? Button.component({
                className: 'Button',
                icon: 'plus',
                children: app.translator.trans('flagrow-fonts.admin.browse.loader.' + (this.loading() ? 'loading' : 'more')),
                onclick: () => this.repository.loadNextPage()
            }) : null
        ]);
    }
}
