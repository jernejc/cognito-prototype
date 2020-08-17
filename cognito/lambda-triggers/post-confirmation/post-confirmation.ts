// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { CognitoUserPoolTriggerHandler } from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cup = new CognitoIdentityServiceProvider();

export const handler: CognitoUserPoolTriggerHandler = async event => {
    console.log('PostConfirmation event', event);
    return event;
};
