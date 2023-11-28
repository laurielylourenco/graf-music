// Criando um arquivo utilitário para lidar com chamadas à API Spotify
export async function fetchWebApi(endpoint, method, token, body) {

    console.log('fetchWebApi:    ',token)
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
    });

    console.log('fetchWebApi res:    ',res)
    return await res.json();
}

export async function getTopTracks(session) {

    let accessToken;
    if (session?.data?.user?.accessToken) {
        accessToken = session.data.user.accessToken;
    } else if (session?.accessToken) {
        accessToken = session.accessToken;
    } else {
        console.error('Token de acesso não encontrado na sessão.');
        return null;
    }
    // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET', accessToken)).items;
}

/* 
export const topTracks = await getTopTracks(accessToken);
console.log(
    topTracks?.map(
        ({ name, artists }) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
);

*/
/* export const getSongs = async (url, session) => {
    //console.log('session:', session);

    let accessToken;
    if (session?.data?.user?.accessToken) {
        accessToken = session.data.user.accessToken;
    } else if (session?.accessToken) {
        accessToken = session.accessToken;
    } else {
        console.error('Token de acesso não encontrado na sessão.');
        return null;
    }
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((res) => res.json())
        .catch((err) => console.log('err', err));
    console.log('accessToken   =>', accessToken)
    return res;
};
 */