polarity.export = PolarityComponent.extend({
  // Hides the filter menu by default
  viewFilters: false,
  // This is the initial view limit. The user can view up to 10 by clicking on a "view more" action link
  viewLimit: 5,
  // Stores any error messages from our onMessage hook
  errorMessage: '',
  infoMessage: '',
  details: Ember.computed.alias('block.data.details'),
  searchResults: Ember.computed.alias('details.searchResults'),
  searchInformation: Ember.computed.alias('searchResults.searchInformation'),
  icons: Ember.computed.alias('details.icons'),
  searchFilters: Ember.computed.alias('block.storage.searchFilters'),
  numSourcesToSearch: Ember.computed.alias('block.storage.numSourcesToSearch'),
  init: function () {
    this._super(...arguments);
    const searchedSources = this.get('block.userOptions.sources');
    if (!this.get('block.storage.searchFilters')) {
      this.set('block.storage', {});
      this.set('block.storage.searchFilters', [
        {
          displayValue: 'app.any.run',
          filterValue: 'app.any.run',
          id: 'app-checkbox',
          value: searchedSources.some((source) => source.value === 'app.any.run')
        },
        {
          displayValue: 'any.run',
          filterValue: 'any.run',
          id: 'any-checkbox',
          value: searchedSources.some((source) => source.value === 'any.run')
        },
        {
          displayValue: 'VirusTotal',
          filterValue: 'virustotal.com',
          id: 'vt-checkbox',
          value: searchedSources.some((source) => source.value === 'virustotal.com')
        },
        {
          displayValue: 'Joe Sandbox',
          filterValue: 'joesandbox.com',
          id: 'js-checkbox',
          value: searchedSources.some((source) => source.value === 'joesandbox.com')
        },
        {
          displayValue: 'Intezer',
          filterValue: 'analyze.intezer.com',
          id: 'intezer-checkbox',
          value: searchedSources.some((source) => source.value === 'analyze.intezer.com')
        },
        {
          displayValue: 'Hybrid Analysis',
          filterValue: 'hybrid-analysis.com',
          id: 'ha-checkbox',
          value: searchedSources.some((source) => source.value === 'hybrid-analysis.com')
        },
        {
          displayValue: 'Valkyrie Comodo',
          filterValue: 'valkyrie.comodo.com',
          id: 'comodo-checkbox',
          value: searchedSources.some((source) => source.value === 'valkyrie.comodo.com')
        },
        {
          displayValue: 'IRIS-H',
          filterValue: 'iris-h.services',
          id: 'irish-checkbox',
          value: searchedSources.some((source) => source.value === 'iris-h.services')
        },
        {
          displayValue: 'Labs.Inquest',
          filterValue: 'labs.inquest.net',
          id: 'inquest-checkbox',
          value: searchedSources.some((source) => source.value === 'labs.inquest.net')
        },
        {
          displayValue: 'Manalyzer',
          filterValue: 'manalyzer.org',
          id: 'manalyzer-checkbox',
          value: searchedSources.some((source) => source.value === 'manalyzer.org')
        },
        {
          displayValue: 'Sandbox Pikker',
          filterValue: 'sandbox.pikker.ee',
          id: 'pikker-checkbox',
          value: searchedSources.some((source) => source.value === 'sandbox.pikker.ee')
        },
        {
          displayValue: 'Yomi Yoroi',
          filterValue: 'yomi.yoroi.company',
          id: 'yomi-checkbox',
          value: searchedSources.some((source) => source.value === 'yomi.yoroi.company')
        },
        {
          displayValue: 'Triage',
          filterValue: 'tria.ge',
          id: 'tria-checkbox',
          value: searchedSources.some((source) => source.value === 'tria.ge')
        },
        {
          displayValue: 'VMRay',
          filterValue: 'threatfeed.vmray.com',
          id: 'vmray-checkbox',
          value: searchedSources.some((source) => source.value === 'threatfeed.vmray.com')
        }
      ]);
      this.set('block.storage.numSourcesToSearch', this.get('block.storage.searchFilters.length'));
    }
  },
  actions: {
    toggleFilter: function () {
      this.toggleProperty('viewFilters');
    },
    applyFilter: function () {
      this.set('errorMessage', '');
      this.set('infoMessage', '');

      const numSourcesToSearch = this.getNumSourcesSearched();
      if (numSourcesToSearch === 0) {
        this.set('infoMessage', 'Select at least one source to search');
        return;
      }
      this.set('filtering', true);
      const payload = {
        entity: this.block.entity,
        searchFilters: this.searchFilters.reduce((acc, filter) => {
          if (filter.value) {
            acc.push(filter.filterValue);
          }
          return acc;
        }, [])
      };

      this.sendIntegrationMessage(payload)
        .then((searchResults) => {
          this.set('block.data.details.searchResults', searchResults);
        })
        .catch((err) => {
          console.error(err);
          if (typeof err.meta === 'string') {
            this.set('errorMessage', err.meta);
          } else if (typeof err.meta === 'object' && typeof err.meta.error === 'string') {
            this.set('errorMessage', err.meta.error);
          } else if (typeof err.meta === 'object' && typeof err.meta.detail === 'string') {
            this.set('errorMessage', err.meta.detail);
          } else {
            this.set('errorMessage', JSON.stringify(err.meta));
          }
        })
        .finally(() => {
          this.set('numSourcesToSearch', numSourcesToSearch);
          this.set('filtering', false);
        });
    },
    selectAll: function () {
      for (let i = 0; i < this.searchFilters.length; i++) {
        this.set(`searchFilters.${i}.value`, true);
      }
    },
    clearAll: function () {
      for (let i = 0; i < this.searchFilters.length; i++) {
        this.set(`searchFilters.${i}.value`, false);
      }
    },
    viewMore: function () {
      this.set('viewLimit', 10);
    }
  },
  getNumSourcesSearched() {
    let numSourcesToSearch = 0;
    for (let i = 0; i < this.searchFilters.length; i++) {
      if (this.searchFilters[i].value === true) {
        ++numSourcesToSearch;
      }
    }
    return numSourcesToSearch;
  }
});
