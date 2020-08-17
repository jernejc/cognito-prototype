import Application from 'torii-cognito/app';
import config from 'torii-cognito/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
