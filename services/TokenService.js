import { Auth, Amplify } from 'aws-amplify';

export async function getTokenAttributes() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    return attributes;
}

export async function getSub() {
    const cognitoUser = await Amplify.Auth.currentAuthenticatedUser()
    return cognitoUser.signInUserSession.idToken.payload.sub
  
}