import Route from '@ember/routing/route';

export default class LoginRoute extends Route {

	actions = {
		signInToCognito: (provider) => {
			console.log('signInToCognito', provider)
			const self = this;
			const options = { 'provider': provider }

			if (provider === 'Email' && this.get('controller').get('email')) {
				console.log('Provider is Email', this.get('controller').get('email'))
				options.email = this.get('controller').get('email');
			} else if (provider === 'Email' && !this.get('controller').get('email'))
				return;

			self.get('torii').open('cognito', options).then(authorization => {
				console.log('cognito auth done.', authorization);

				if ((authorization && authorization.secret) || provider === 'Email')
					self.transitionTo('confirm-challenge');
				else 
					self.transitionTo('index');
			}).catch((err) => {
				console.error('cognito auth failed ' + err)
				this.transitionTo('login');
			})
		}
	}
}
