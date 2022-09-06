
import Render from './render'
import Create from './create'
import Landing from './landing'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useEffect, useState } from "react"
import {Amplify, Auth, Hub } from 'aws-amplify'
import awsconfig from '../config/awsconfig.json'
import awsauth from '../config/awsauth.json'

export default function Home() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getUser() {
      const user = await Amplify.Auth.currentAuthenticatedUser()
      console.log('**inside start of index**')
      console.log(user);
      if (user) {
          setLoggedIn(true);
      }
    }
    getUser();
}, []);

  useEffect(() => {
    Amplify.configure({
      Auth:awsconfig,
      oauth: awsauth,
      Storage:{
        AWSS3: {
          bucket: 'nx-dev-demo-s3', //REQUIRED -  Amazon S3 bucket name
          region: 'us-west-2', //OPTIONAL -  Amazon service region
      }},
      ssr:true
    })
    
    console.log('listen hub started')
    Hub.listen('auth', ({ payload: { event, data } }) => {

      console.log('inside hub started')
      console.log(event)
      console.log(data)
        switch (event) {
            case 'signIn':
                console.log('sign in - case 1', event, data)
                const user = await Amplify.Auth.currentAuthenticatedUser()
                console.log(user)
                setLoggedIn(true)
                //props.history.push('/home')
                break
            case 'cognitoHostedUI':
                console.log('sign in - case 2', event, data)
                const user2 = await Amplify.Auth.currentAuthenticatedUser()
                console.log(user2)
                setLoggedIn(true)
                //props.history.push('/home')
                break
            case 'signOut':
                console.log('sign out')
                setLoggedIn(false);
                //props.history.push('/')
                // this.setState({ user: null })
                break
            default:
                break
        }
    })
}, []);

  return (
    <div className={styles.container}>
      {!isLoggedIn && <Landing></Landing> }
      {/* {!isLoggedIn && <Button className="btn btn-primary" onClick={() => Auth.federatedSignIn()}>Sign In</Button>} */}
      {/* {isLoggedIn && <Create></Create>} */}
    </div>
  )
}
