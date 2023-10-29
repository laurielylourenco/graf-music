
const Dash = ({ userSessionState }) => {
  return (
    <>


      <h1>
        Welcome,{' '}
        {userSessionState && userSessionState.status === 'authenticated'
          ? userSessionState.data.user?.name || 'friend'
          : 'stranger'}
        !
      </h1>


    </>
  )
}

export default Dash
