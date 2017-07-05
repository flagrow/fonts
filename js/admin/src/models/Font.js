import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

export default class Font extends mixin(Model, {
    family: Model.attribute('family'),
    category: Model.attribute('category'),
    variants: Model.attribute('variants'),

    enabled: Model.attribute('enabled')
}) {}
