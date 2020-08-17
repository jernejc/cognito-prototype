import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ConfirmChallengeRoute extends Route {
	session = service()
	amplify = service()

	actions = {
		confirmChallenge: async (secret) => {
			console.log('confirmChallenge', secret, this.get('session.cognitoUser'));
			const Auth = this.get('amplify').Auth;
			const response = await Auth.sendCustomChallengeAnswer(this.get('session.cognitoUser'), answer);
			console.log('sendCustomChallengeAnswer response', response)
		}
	}
}
