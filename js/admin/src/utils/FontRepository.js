import app from 'flarum/app';

export default class FontRepository {
    constructor(loading) {
        this.fonts = m.prop([]);
        this.nextPageUrl = null;
        this.loading = loading;
        this.resetNavigation();
        this.sortBy = 'popularity';
        this.filters = {
            search: '',
        };
    }

    /**
     * Loads next page or resets based on nextPageUrl
     */
    loadNextPage() {
        if (this.loading() || !this.nextPageUrl) {
            return;
        }

        this.loading(true);

        app.request({
            method: 'GET',
            url: this.nextPageUrl,
            data: {
                sort: this.sortBy,
                filter: this.filters,
            }
        }).then(result => {
            const newFonts = result.data.map(data => app.store.createRecord('flagrow-fonts', data));
            this.fonts(this.fonts().concat(newFonts));
            this.nextPageUrl = result.links.next;
            this.loading(false);

            WebFont.load({
                google: {
                    families: newFonts.map(font => font.family())
                }
            });

            m.redraw();
        });
    }

    /**
     * Resets the navigation to start all over
     */
    resetNavigation() {
        this.loading(false);
        this.nextPageUrl = app.forum.attribute('apiUrl') + '/flagrow/fonts';
        this.fonts([]);
    }

    /**
     * Changes the sorting property and reload the results
     * @param {string} sortBy
     */
    sort(sortBy) {
        this.sortBy = sortBy;
        this.resetNavigation();
        this.loadNextPage();
    }

    /**
     * Get the current sorting property
     * @returns {string}
     */
    sortedBy() {
        return this.sortBy;
    }

    /**
     * Change the value of a filter
     * @param {string} filter
     * @param {string} filterBy
     */
    filter(filter, filterBy) {
        this.filters[filter] = filterBy;
        this.resetNavigation();
        this.loadNextPage();
    }

    /**
     * Get the value of a filter
     * @param {string} filter
     * @returns {string}
     */
    filteredBy(filter) {
        return this.filters[filter];
    }

    /**
     * Checks if more results are available
     * @returns {boolean}
     */
    hasMore() {
        return !!this.nextPageUrl;
    }

    /**
     * Get the index of an existing item in the results
     * @param font
     * @returns {number}
     */
    getFontIndex(font) {
        return this.fonts().findIndex(f => f.id() == font.id());
    }

    /**
     * Updates an existing item in the results
     * @param response
     */
    updateFontInRepository(response) {
        this.loading(false);

        let font = app.store.createRecord('flagrow-fonts', response.data);
        this.fonts()[this.getFontIndex(font)] = font;
        m.redraw();
    }

    /**
     * Enables the given variants for a font
     * @param {string} family
     * @param {Array} variants
     */
    enableFont(family, variants) {
        this.loading(true);

        app.request({
            url: app.forum.attribute('apiUrl') + '/flagrow/fonts/' + family,
            method: 'PATCH',
            data: {
                variants: variants
            }
        }).then(response => {
            this.updateFontInRepository(response);
        });
    }

    /**
     * Disables a given font
     * @param {string} family
     */
    disableFont(family) {
        this.enableFont(family, []);
    }
}
