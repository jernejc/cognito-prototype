import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Route.extend({
	session: service(),

	beforeModel(transition) {
		console.log('beforeModel')
		return this.session.fetch()
			.then(() => {
				console.log('session fetched!');
				// get current user
				//const user = this.get('session.currentUser');
			})
			.catch((err) => { 
				console.error('session.fetch: ' + err)
				this.transitionTo('login')
			}) // error means that there is no logged in user
			.finally(() => {
				console.log('finally fetch')
			})
	}
});