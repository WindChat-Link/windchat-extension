import packageJson from './package.json';

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  "name": "WindChat - ChatGPT TailwindCSS HTML Previewer",
  "manifest_version": 3,
  version: packageJson.version,
  description: packageJson.description,
  "icons": {
    "16": "16.png",
    "32": "32.png",
    "34": "34.png",
    "36": "36.png",
    "48": "48.png",
    "128": "128.png"
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: '34.png',
  },
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  "permissions": [
    "storage"
  ],
  content_scripts: [
    {
      "matches": [
        "https://chat.openai.com/*"
      ],
      js: [
        'src/pages/content/index.js',
      ],
      // KEY for cache invalidation
      css: [
        'assets/css/contentStyle<KEY>.chunk.css',
        "tailwindcss.min.css"
      ],
    },
  ],
  "externally_connectable": {
    "matches": [
      // 注意只能用localhost
      '*://localhost/*',
      "https://*.windchat.link/*"
    ]
  },
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        '34.png',
        "48.png",
        "128.png",
        'lemon.js',
        'ChatGPT_logo.svg',
        'google.svg',
      ],
      "matches": [
        "https://chat.openai.com/*"
      ]
    },
  ],
  "host_permissions": [
    "https://api-dev.windchat.link/*",
    "https://api.windchat.link/*",
    "http://127.0.0.1:3008/*",
    "http://localhost:3008/*"
  ],
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'; script-src-elem 'self' https://accounts.google.com/;"
  },
}


export default manifest;
