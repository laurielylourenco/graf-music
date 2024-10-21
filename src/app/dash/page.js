import React, { useState, useEffect } from 'react';
import { getTopArtist } from "../../pages/api/utils/topTracks";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dash = ({ userSessionState }) => {

  const [chartData, setChartData] = React.useState(null);

  const fetchArtistGenres = async (userSessionState) => {
    const topArtist = await getTopArtist(userSessionState);

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

  React.useEffect(() => {
    fetchArtistGenres(userSessionState);
  }, [userSessionState]);

  return (
    <>
      <h1 className="text-center mt-5">
        Olá,{' '}
        {userSessionState && userSessionState.status === 'authenticated'
          ? userSessionState.data.user?.name || 'friend'
          : 'stranger'}
        !
      </h1>

      {chartData && (
        <div style={{ width: '50%', margin: 'auto' }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Seus artistas favoritos tocam mais ?',
                },
              },
            }}
          />
        </div>
      )}

    </>
  );
}

export default Dash;
