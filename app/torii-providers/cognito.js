import Waitable from '../mixins/waitable';
import emObject from '@ember/object';
//import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';

export default emObject.extend(Waitable, {
	amplify: service(),

	async open(options) {
		console.log('torii cognito provider open options', options);

		const Auth = this.get('amplify').Auth;
		console.log('auth sdk', Auth)

		const provider = options.provider;

		if (!provider)
			throw new Error('No provider found.');

		if (provider === 'Email' && !options.email)
			throw new Error('No e-mail provided.');

		switch (provider) {
			case 'Google':
				return Auth.federatedSignIn({ provider: provider });
			case 'Email':

				try {
					console.log('Try initial sign in', options.email)
					const response = await Auth.signIn(options.email)
					return response;
				} catch (error) {
					console.error('Initial sign in error ', error);

					if (error.code === "UserNotFoundException") {
						const params = {
							username: options.email,
							password: this._getRandomString(30),
							attributes: {
								name: options.email,
								email: options.email
							}
						};

						try {
							const signUpResponse = await Auth.signUp(params);
							console.log('signUp response', signUpResponse);	
						} catch (error) {
							console.error('SignUp error ' + error);
							throw new Error('SignUp error ' + error);
						}

						try {
							const signInResponse = await Auth.signIn(options.email);
							console.log('signInResponse response', signInResponse);	
						} catch (error) {
							console.error('SignIn error ' + error);
							throw new Error('SignIn error ' + error);
						}

						return signInResponse;
					} else {
						console.log('Sign in error', error);
						throw new Error(error.message);
					}
				}
		}
	},

	async _isAuthenticated() {
		const Auth = this.get('amplify').Auth;
		
		try {
			await Auth.currentSession();
			return true;
		} catch {
			return false;
		}
	},

	_getRandomString(bytes) {
		const randomValues = new Uint8Array(bytes);
		window.crypto.getRandomValues(randomValues);
		return Array.from(randomValues).map(intToHex).join('');

		function intToHex(nr) {
			return nr.toString(16).padStart(2, '0');
		}
	}
});