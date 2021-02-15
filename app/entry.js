/* global window, document */
if (! window._babelPolyfill) {
    require('@babel/polyfill');
}

import ReactInitializer from './utils/react-initializer';
import Entry from './containers/Entry';
document.addEventListener('DOMContentLoaded', function() {
    var initializer = new ReactInitializer({Entry: Entry})
    initializer.initialize()
});
