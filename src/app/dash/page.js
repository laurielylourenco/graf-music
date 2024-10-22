"use client";
import React, { useState, useEffect } from 'react';
import { getTopArtist } from "../../pages/api/utils/topTracks";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dash = ({ userSessionState }) => {

  const [chartData, setChartData] = useState(null);

  const fetchArtistGenres = async (userSessionState) => {
    const topArtist = await getTopArtist(userSessionState);

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
  };

  useEffect(() => {
    fetchArtistGenres(userSessionState);
  }, [userSessionState]);

  return (
    <>
      {/* Título do gráfico */}
      <h1 className="text-center mt-5">
        Olá,{' '}
        {userSessionState && userSessionState.status === 'authenticated'
          ? userSessionState.data.user?.name || 'friend'
          : 'stranger'}
        !
      </h1>

      {/* Explicação do gráfico */}
      <p className="text-center mx-auto mt-3" style={{ maxWidth: '700px', padding: '0 10px' }}>
        O gráfico abaixo mostra os gêneros musicais mais frequentes entre os 10 artistas que você mais escuta.
        Cada barra representa um gênero, e a altura indica quantas vezes esse gênero aparece entre seus
        artistas favoritos. Quanto maior a barra, mais presentes esses estilos estão na sua música do dia a dia.
      </p>

      {/* Renderização do gráfico */}
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
    </>
  );
}

export default Dash;
