// // https://stackoverflow.com/questions/20325763/browser-sessionstorage-share-between-tabs
// // https://medium.com/@marciomariani/sharing-sessionstorage-between-tabs-5b6f42c6348c
// // https://blog.guya.net/2015/06/12/sharing-sessionstorage-between-tabs-for-secure-multi-tab-authentication/
// // https://contactmentor.com/session-storage-react-js/

// export function mk_sessionStorageMonitor() {
//    let sessionStorage_transfer = function(event) {
//         console.log("hi");    
//         console.log(event);
//         if(!event) { event = window.event; } // ie suq
//         if(!event.newValue) return;          // do nothing if no value to work with
//         if (event.key == 'getSessionStorage') {
//           // another tab asked for the sessionStorage -> send it
//           localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
//           // the other tab should now have it, so we're done with it.
//           localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
//         } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
//           // another tab sent data <- get it
//           var data = JSON.parse(event.newValue);
//           for (var key in data) {
//             sessionStorage.setItem(key, data[key]);
//           }
//         }
//       };
//     return sessionStorage_transfer;
// }

