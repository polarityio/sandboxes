module.exports = {
  logging: { level: 'info' },
  /**
   * Name of the integration which is displayed in the Polarity integrations user interface
   *
   * @type String
   * @required
   */
  name: 'Sandbox',
  /**
   * The acronym that appears in the notification window when information from this integration
   * is displayed.  Note that the acronym is included as part of each "tag" in the summary information
   * for the integration.  As a result, it is best to keep it to 4 or less characters.  The casing used
   * here will be carried forward into the notification window.
   *
   * @type String
   * @required
   */
  acronym: 'SB',
  /**
   * Description for this integration which is displayed in the Polarity integrations user interface
   *
   * @type String
   * @optional
   */
  description:
    "Searches internet for malware sandboxes and provides links to relevant results",
    entityTypes: ['hash','ip','domain'],
    customTypes:[
    {
      key: 'all text',
      regex: /^[\s\S]{2,2048}/
    }
  ],
  defaultColor: 'light-brown',
  /**
   * Provide custom component logic and template for rendering the integration details block.  If you do not
   * provide a custom template and/or component then the integration will display data as a table of key value
   * pairs.
   *
   * @type Object
   * @optional
   */
  styles: ['./styles/style.less'],
  block: {
    component: {
      file: './components/block.js'
    },
    template: {
      file: './templates/block.hbs'
    }
  },
  request: {
    // Provide the path to your certFile. Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    cert: '',
    // Provide the path to your private key. Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    key: '',
    // Provide the key passphrase if required.  Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    passphrase: '',
    // Provide the Certificate Authority. Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    ca: '',
    // An HTTP proxy to be used. Supports proxy Auth with Basic Auth, identical to support for
    // the url parameter (by embedding the auth info in the uri)
    proxy: '',

    rejectUnauthorized: true
  },
  logging: {
    level: 'info' //trace, debug, info, warn, error, fatal
  },
  onDemandOnly: true,
  /**
   * Options that are displayed to the user/admin in the Polarity integration user-interface.  Should be structured
   * as an array of option objects.
   *
   * @type Array
   * @optional
   */
  options: [
    {
      key: 'apiKey',
      name: 'API Key',
      description: 'Valid Google CSE API Key',
      default: '',
      type: 'password',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'sources',
      name: 'Sources to Search',
      description: 'Choose sources to search',
      default: [
        {
          value: 'any.run',
          display: 'any.run'
        },
        {
          value: 'app.any.run',
          display: 'app.any.run'
        },
        {
          value: 'hybrid-analysis.com',
          display: 'hybrid-analysis.com'
        },
        {
          value: 'analyze.intezer.com',
          display: 'analyze.intezer.com'
        },
        {
          value: 'virustotal.com',
          display: 'virustotal.com'
        },
        {
          value: 'joesandbox.com',
          display: 'joesandbox.com'
        },
        {
          value: 'valkyrie.comodo.com',
          display: 'valkyrie.comodo.com'
        },
        {
          value: 'iris-h.services',
          display: 'iris-h.services'
        },
        {
          value: 'labs.inquest.net',
          display: 'labs.inquest.net'
        },
        {
          value: 'manalyzer.org',
          display: 'manalyzer.org'
        },
        {
          value: 'sandbox.pikker.ee',
          display: 'sandbox.pikker.ee'
        },
        {
          value: 'yomi.yoroi.company',
          display: 'yomi.yoroi.company'
        }
      ],
      type: 'select',
      options: [
        {
          value: 'any.run',
          display: 'any.run'
        },
        {
          value: 'app.any.run',
          display: 'app.any.run'
        },
        {
          value: 'hybrid-analysis.com',
          display: 'hybrid-analysis.com'
        },
        {
          value: 'analyze.intezer.com',
          display: 'analyze.intezer.com'
        },
        {
          value: 'virustotal.com',
          display: 'virustotal.com'
        },
        {
          value: 'joesandbox.com',
          display: 'joesandbox.com'
        },
        {
          value: 'valkyrie.comodo.com',
          display: 'valkyrie.comodo.com'
        },
        {
          value: 'iris-h.services',
          display: 'iris-h.services'
        },
        {
          value: 'labs.inquest.net',
          display: 'labs.inquest.net'
        },
        {
          value: 'manalyzer.org',
          display: 'manalyzer.org'
        },
        {
          value: 'sandbox.pikker.ee',
          display: 'sandbox.pikker.ee'
        },
        {
          value: 'yomi.yoroi.company',
          display: 'yomi.yoroi.company'
        }
      ],
      multiple: true,
      userCanEdit: true,
      adminOnly: false
    }
  ]
};
