import Browser from 'webextension-polyfill';


export default function initMessages() {
  Browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'createTab') {
      chrome.tabs.create({ url: chrome.runtime.getURL(message.url), active: true });
    }
  });

}
