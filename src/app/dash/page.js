import { getSession } from "next-auth/react";
import { get } from "../../pages/api/utils/get"
import { getAccessToken } from "../../pages/api/utils/teste";
import { getTopTracks } from "../../pages/api/utils/topTracks";

const Dash = ({ userSessionState }) => {

//  var playlists = get("https://api.spotify.com/v1/me/playlists", userSessionState);
  // console.log('playlists:  ', playlists)

  getSession()
  .then((res) => console.log('getSession:  ', res))
  .catch((err) => console.log('getSession:  ', err))



  get("https://api.spotify.com/v1/me", userSessionState)
    .then((res) => console.log('me res:  ', res))
    .catch((err) => console.log('me err:  ', err))


  get("https://api.spotify.com/v1/me/top/artists", userSessionState)
      .then((res) => console.log('artists res:  ', res))
      .catch((err) => console.log('artists err:  ', err)) 


  /* hgwflh6h259jf0uvy7pbf65fi */

  //var recentAlbunsbr = get("https://api.spotify.com/v1/me/albums?market=BR", userSessionState);
  /* console.log('recentAlbunsbr:  ', recentAlbunsbr) */


/*   const fetchTracks = async () => {
    const topTracks = await getTopTracks(userSessionState);
    console.log(
      topTracks?.map(({ name, artists }) => `${name} by ${artists.map((artist) => artist.name).join(', ')}`)
    );
  // Faça o que precisar com os topTracks, como atualizar o estado, renderizar na página, etc.
  }; */

 // fetchTracks();
/* 
  getAccessToken(userSessionState)
    .then((res) => console.log('getAccessToken res:  ', res))
    .catch((err) => console.log('getAccessToken err:  ', err)) */

  return (
    <>
      <h1 className="text-center mt-5">
        Olá,{' '}
        {userSessionState && userSessionState.status === 'authenticated'
          ? userSessionState.data.user?.name || 'friend'
          : 'stranger'}
        !
      </h1>


    </>
  )
}

export default Dash
