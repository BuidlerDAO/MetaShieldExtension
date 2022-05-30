import React from 'react';
import { render } from 'react-dom';
import Popup from './Popup';
import '../i18n/config';

render(<Popup />, document.querySelector('#chrome-extension-popup'));
