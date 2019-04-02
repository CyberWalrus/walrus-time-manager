import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { IntlProvider } from "react-intl";

import App from './components/App/app';

import './styles/styles.scss';
import messages_ru from "./translations/ru.json";
import messages_en from "./translations/en.json";

const messages = {
  'ru': messages_ru,
  'en': messages_en
};
const language = navigator.language.split(/[-_]/)[0];  // language without region code

render((
  <IntlProvider locale={language} messages={messages[language]}>
    <Router>
      <App />
    </Router>
  </IntlProvider>
), document.getElementById('app'));
