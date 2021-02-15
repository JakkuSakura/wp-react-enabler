/* global window, document */
if (!window._babelPolyfill) {
    require('@babel/polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';

function get_value(dom) {
    return dom.getAttribute('val') || dom.getAttribute('value') || dom.innerText;
}

export function get_properties(dom) {
    const properties = {};
    // <Node key="xxx">yyy</Node> or <Node key="xxx" value="xxx">/
    if (dom.getAttribute('key')) {
        const key = dom.getAttribute('key');
        properties[key] = properties[key] || get_value(dom);
    }

    // <Node xxx="yyy"/>
    dom.getAttributeNames().forEach(key => {
        properties[key] = properties[key] || dom.getAttribute(key);
    });

    // <xxx class="key"></xxx>
    Array.from(dom.getElementsByClassName('key')).forEach(node => {
        const key = node.tagName;
        properties[key] = properties[key] || get_value(node);
    });

    // <div key="xxx" value="yyy"></div>
    // <div key="xxx">yyy</div>
    dom.querySelectorAll('[key]').forEach(node => {
        const key = node.getAttribute('key');
        properties[key] = properties[key] || get_value(node);
    })

    // <xxx>yyy</xxx>
    Array.from(dom.children).forEach(node => {
        if (node.children.length === 0 && node.getAttributeNames().length === 0) {
            properties[node.tagName] = get_value(node);
        }
    });
    // TODO support list and object
    return properties;
}


export default class ReactInitializer {
    constructor(components) {
        this.components = components;
    }
    initialize() {
        document.querySelectorAll('[react]')
            .forEach(node => {
                const properties = get_properties(node);
                // console.log('passing properties', properties, node);
                const Tag = this.components[node.getAttribute('react')];
                ReactDOM.render(<Tag {...properties}/>, node);
            });
    }
}

