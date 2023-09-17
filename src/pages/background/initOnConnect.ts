import Browser from 'webextension-polyfill';
import { messageError } from '../../utils/error';

export default function initOnConnect() {

  Browser.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(async (msg) => {

      const tabs = await Browser.tabs.query({})
      for (let tab of tabs) {
        try {
          Browser.tabs.sendMessage(tab.id, msg);
        } catch (error: any) {
          messageError(error, '139746');
        }
      }
    });
  });

  // Browser.runtime.onMessageExternal.addListener(
  //   function (request, sender, sendResponse) {
  //     console.log('sender.url', sender.url);
  //     console.log('request', request);
  //     Browser.tabs.create({
  //       url: Browser.runtime.getURL('src/pages/options/index.html'),
  //       active: true,
  //     });

  //   });
}
