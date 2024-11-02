"use client";
import React, { useState, useEffect } from 'react';
import { fetchTrackWithRetry, getTopArtist, getTopTracks, getTracks } from "../../pages/api/utils/topTracks";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);


const Dash = ({ userSessionState }) => {

  const [chartData, setChartData] = useState(null);
  const [chartDecada, setChartDecada] = useState(null);

  const [tracksMostPopular, settracksMostPopular] = useState({});
  const [tracksLessPopular, settracksLessPopular] = useState({});
  const [timesearch, settimesearch] = useState("short_term");

  const fetchTracks = async (userSessionState) => {
    const topTracks = await getTopTracks(userSessionState, timesearch);


    var mostpopular = topTracks.reduce((mostPopular, currentTrack) => {
      return currentTrack.popularity > mostPopular.popularity ? currentTrack : mostPopular;
    }, topTracks[0]);

    var lesspopular = topTracks.reduce((mostPopular, currentTrack) => {
      return currentTrack.popularity < mostPopular.popularity ? currentTrack : mostPopular;
    }, topTracks[0]);

    settracksMostPopular(
      {
        image: mostpopular.album.images[1].url,
        name: mostpopular.name,
        popularity: mostpopular.popularity,
      }
    );

    settracksLessPopular(
      {
        image: lesspopular.album.images[1].url,
        name: lesspopular.name,
        popularity: lesspopular.popularity,
      }
    );


    let idsTracks = topTracks?.map(({ id }) => id);
    let dataTracks = [];

    if (idsTracks != undefined) {

      try {

        const urlEncodedStr = encodeURIComponent(idsTracks.toString());
        let infoTrack = await getTracks(userSessionState, urlEncodedStr);

        infoTrack.tracks.map(({ album }) => {

          const releaseDate = album.release_date;
          dataTracks.push(releaseDate);

        })

      } catch (error) {
        console.log(error)
      }


      const decadeCounts = dataTracks.reduce((acc, date) => {
        const year = parseInt(date.split("-")[0], 10);
        const decade = Math.floor(year / 10) * 10;
        acc[decade] = (acc[decade] || 0) + 1;
        return acc;
      }, {});

      const result = Object.entries(decadeCounts).map(([decade, count]) => ({
        decade: `${decade}s`,
        count: count,
      }));

      // Prepara dados para o gráfico 
      const labels = result.map(item => item.decade);
      const data = result.map(item => item.count);

      setChartDecada({
        labels: labels,
        datasets: [
          {
            label: 'Músicas por Década',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            tension: 0.3,
          },
        ],
      });
    }
  };

  const fetchArtistGenres = async (userSessionState) => {

    const topArtist = await getTopArtist(userSessionState, timesearch);

    /* Pega somente generos musicais em seus arrays brutos */
    const genreCount = topArtist?.map(({ genres }) => {
      return genres.reduce((acc, genre) => {
        if (acc[genre]) {
          acc[genre]++;
        } else {
          acc[genre] = 1;
        }
        return acc;
      }, {});
    });

    /* Junta os arrays em so para melhor analise */
    const combinedGenres = genreCount?.reduce((acc, obj) => {
      for (let genre in obj) {
        if (acc[genre]) {
          acc[genre] += obj[genre];
        } else {
          acc[genre] = obj[genre];
        }
      }
      return acc;
    }, {});

    if (combinedGenres != undefined) {
      let ord = Object.entries(combinedGenres).sort((a, b) => b[1] - a[1]);

      const top10 = ord.slice(0, 10);

      const labels = top10.map(item => item[0]);
      const data = top10.map(item => item[1]);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Gêneros Musicais',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });

      return top10;
    }
    return [];
  };

  useEffect(() => {
    fetchArtistGenres(userSessionState);
    fetchTracks(userSessionState);
  }, [userSessionState, timesearch]);

  const handleSelectChange = (event) => {

    settimesearch(event.target.value);
  };


  return (
    <>

      <h1 className="text-center mt-5">
        Olá,{' '}
        {userSessionState && userSessionState.status === 'authenticated'
          ? userSessionState.data.user?.name || 'friend'
          : 'stranger'}
        !
      </h1>


      <div className="row justify-content-end mx-auto">
        <div className='col-lg-3 col-md-3 col-sm-12'>
          <label htmlFor="exampleSelect1" className="form-label mt-4">Por quanto tempo você gostaria de buscar os seus dados ? </label>
          <select className="form-select" id="exampleSelect1" value={timesearch} onChange={handleSelectChange}>
            <option value="short_term">4 semanas</option>
            <option value="medium_term">6 meses</option>
            <option value="long_term">1 ano</option>
          </select>
        </div>
      </div>



      <p className="text-center mx-auto mt-3" style={{ maxWidth: '800px', padding: '0 10px' }}>
        A popularidade das faixas é medida em uma escala de 0 a 100, onde 100 indica a faixa mais popular.
        Esse valor é calculado principalmente com base no total de reproduções recentes da faixa.
        Ou seja, músicas que estão sendo muito ouvidas agora tendem a ter uma popularidade mais alta em comparação com aquelas que foram populares no passado.
        Vale destacar que faixas duplicadas (por exemplo, versões de um single e de um álbum) são avaliadas separadamente.
        Além disso, a popularidade do artista e do álbum é calculada a partir da popularidade de suas faixas.
        É importante lembrar que o valor da popularidade pode ter um leve atraso e não reflete as mudanças em tempo real.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 mb-2">
          <div className="card mb-3" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <h3 className="card-header text-center">Popular</h3>
            <img height={300} src={tracksMostPopular.image} alt="música mais popular" className="" />
            <div className="card-body">
              <h5 className="card-title text-center">{tracksMostPopular.name} - {tracksMostPopular.popularity}</h5>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-2">
          <div className="card mb-3" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <h3 className="card-header text-center">Essa só você escuta!</h3>
            <img height={300} src={tracksLessPopular.image} alt="música menos popular" className="" />
            <div className="card-body">
              <h5 className="card-title text-center">{tracksLessPopular.name} - {tracksLessPopular.popularity}</h5>
            </div>
          </div>
        </div>
      </div>


      <p className="text-center mx-auto mt-3" style={{ maxWidth: '700px', padding: '0 10px' }}>
        O gráfico abaixo mostra os gêneros musicais mais frequentes entre os 10 artistas que você mais escuta.
        Cada barra representa um gênero, e a altura indica quantas vezes esse gênero aparece entre seus
        artistas favoritos. Quanto maior a barra, mais presentes esses estilos estão na sua música do dia a dia.
      </p>

      {chartData && (
        <div style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
          <div style={{ height: '60vh', maxHeight: '500px', minHeight: '300px' }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Distribuição dos Gêneros Musicais',
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                  y: {
                    ticks: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      <h2 className="text-center mt-5">Distribuição das Músicas por Década</h2>
      <p className="text-center mx-auto mt-3" style={{ maxWidth: '700px', padding: '0 10px' }}>
        Este gráfico mostra a quantidade de músicas que você escuta, distribuídas por década de acordo com data de lançamento.
        Cada ponto representa uma década, e a linha conecta os pontos para indicar a tendência ao longo do tempo.
      </p>

      {chartDecada && (
        <div style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
          <div style={{ height: '60vh', maxHeight: '500px', minHeight: '300px' }}>
            <Line
              data={chartDecada}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Músicas por Década',
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                  y: {
                    ticks: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Dash;
