import { Meteor } from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'

declare module "meteor/meteor" {
    namespace Meteor {
        interface User {
            /**
             * Extending the User type
             */
            firstName: string,
            lastName: string
        }
    }
}

Accounts.onCreateUser((options, user) => {
    const customizedUser = Object.assign({
        //@ts-ignore
        firstName: options.firstName,
        //@ts-ignore
        lastName: options.lastName
      }, user);
    
      return customizedUser;
})