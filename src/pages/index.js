

// index.js
import { signIn } from 'next-auth/react';
import HeroSection from '../app/components/Heroes'
import Dash from '../app/dash/page'

const Home = ({ userSessionState, onLogout }) => {
 
  const clickLogin = (mensagem) => {
    signIn('spotify')
  };

  
  return (
    <div>
         {userSessionState.status === 'authenticated'
          ? <Dash userSessionState={userSessionState} />
          : <HeroSection onLogin={clickLogin} />} 
    </div>
  )
}

export default Home
