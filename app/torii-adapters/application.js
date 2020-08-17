
import emObject from '@ember/object';
import { inject as service } from '@ember/service';


export default emObject.extend({
	amplify: service(),

  async open(authData) {

		console.log('authData', authData);
		console.log('opening session!');

		// here we call WebAPI to fetch user data

		return {
			cognitoUser: authData,
			//currentUser: user
		};
  },

  close() {
		console.log('torii adapter close')
  },

  async fetch() {
		console.log('torii adapter fetch');
		const Auth = this.get('amplify').Auth;
		const currentUser = await Auth.currentAuthenticatedUser();
		return this.open(currentUser)
  }
});
