import aws from '../aws'

export function initialize(appInstance) {
	console.log('initialize amplify', aws.Config)
	let service = appInstance.lookup('service:amplify', aws.Config)
	service.configure(aws.Config)
}

export default {
  initialize
}
