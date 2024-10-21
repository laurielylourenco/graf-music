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
    return (await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=3', 'GET', accessToken)).items;
}


export async function getTopArtist(session) {

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
    return (await fetchWebApi('v1/me/top/artists?time_range=long_term&limit=30', 'GET', accessToken)).items;
}

