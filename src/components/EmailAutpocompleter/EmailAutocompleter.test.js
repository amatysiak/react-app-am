import React from 'react';
import ReactDOM from 'react-dom';
import EmailAutocompleter from './EmailAutocompleter';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EmailAutocompleter />, div);
});
