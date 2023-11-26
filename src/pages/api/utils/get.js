
export const get = async (url, session) => {
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
    .catch((err) => console.log('err',err));

    return res;
};
