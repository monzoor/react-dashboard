import React from 'react';
import Enzyme, {
    shallow,
    render,
    mount,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    createSerializer,
} from 'enzyme-to-json';
import sinon from 'sinon';

import { BrowserRouter } from 'react-router-dom';

import { shape } from 'prop-types';

// Instantiate router context
const router = {
    history: new BrowserRouter().history,
    route: {
        location: {},
        match: {},
    },
};

const createContext = () => ({
    context: { router },
    childContextTypes: { router: shape({}) },
});

export function mountWrap(node) {
    return mount(node, createContext());
}

export function shallowWrap(node) {
    return shallow(node, createContext());
}


// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
expect.addSnapshotSerializer(createSerializer({
    mode: 'deep',
}));

// React 16 Enzyme adapter
Enzyme.configure({
    adapter: new Adapter(),
});

// Define globals to cut down on imports in test files
// global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
global.mountWrap = mountWrap;
