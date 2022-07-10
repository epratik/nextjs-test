import { Auth, Amplify } from 'aws-amplify';

export async function getTokenAttributes() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    return attributes;
}

export async function getSub() {
    const cognitoUser = await Amplify.Auth.currentAuthenticatedUser()
    console.log(cognitoUser.signInUserSession)
    return cognitoUser.signInUserSession.idToken.payload.sub
}

export async function getJwtToken() {
    const cognitoUser = await Amplify.Auth.currentAuthenticatedUser()
    return cognitoUser.signInUserSession.idToken.jwtToken
}


export async function getIdentityPoolSubId() {
    const credentials = await Amplify.Auth.currentUserCredentials();
    return credentials.identityId;
}