import Service from '@ember/service'
import Amplify, {
  Auth,
  I18n,
  Analytics,
  API,
  Storage,
  Cache,
  PubSub,
  Logger,
  Interactions
} from 'aws-amplify'

console.log('amplify service', Amplify)

export default Service.extend({
  Amplify,
  Auth,
  I18n,
  Analytics,
  API,
  Storage,
  Cache,
  PubSub,
  Interactions,
  Logger,
  configure(config) {
    this.Amplify.configure(config)
  }
})
