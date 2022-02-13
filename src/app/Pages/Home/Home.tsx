import React, { useState } from 'react';
import IHome from '../../Interfaces/Home';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import './Home.css';

const Home: React.FunctionComponent<IHome> = props => {
  const [signIn, setSignIn] = useState(true);
  return (
    <div className='home'>
      {signIn && <SignIn setSignIn={setSignIn} setLoggedIn={props.setLoginStatus}/>}
      {!signIn && <SignUp setSignIn={setSignIn} setLoggedIn={props.setLoginStatus}/>}
    </div>
  )
}

export default Home;