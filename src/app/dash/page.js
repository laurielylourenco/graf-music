"use client";
import React, { useState, useEffect } from 'react';
import { fetchTrackWithRetry, getTopArtist, getTopTracks, getTracks } from "../../pages/api/utils/topTracks";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { FaSpotify } from "react-icons/fa";
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
        audio: mostpopular.external_urls.spotify
      }
    );

    settracksLessPopular(
      {
        image: lesspopular.album.images[1].url,
        name: lesspopular.name,
        popularity: lesspopular.popularity,
        audio: lesspopular.external_urls.spotify
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
            label: 'Songs by Decade',
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
            label: 'Music Genres',
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
        Hi,{' '}
        {userSessionState && userSessionState.status === 'authenticated'
          ? userSessionState.data.user?.name || 'friend'
          : 'stranger'}
        !
      </h1>


      <div className="row justify-content-end mx-auto">
        <div className='col-lg-3 col-md-3 col-sm-12'>
          <label htmlFor="exampleSelect1" className="form-label mt-4">For how long would you like to fetch your data from <FaSpotify />? </label>
          <select className="form-select" id="exampleSelect1" value={timesearch} onChange={handleSelectChange}>
            <option value="short_term">4 weeks</option>
            <option value="medium_term">6 months</option>
            <option value="long_term">1 year</option>
          </select>
        </div>
      </div>



      <p className="text-center mx-auto mt-3" style={{ maxWidth: '800px', padding: '0 10px' }}>
        The popularity of tracks is measured on a scale from 0 to 100, where 100 indicates the most popular track.
        This value is primarily calculated based on the total number of recent plays of the track.
        In other words, songs that are being heavily listened to right now tend to have a higher popularity compared to those that were popular in the past.
        It’s important to note that duplicate tracks (e.g., versions of a single and an album) are evaluated separately.
        Additionally, the popularity of the artist and the album is calculated from the popularity of their tracks.
        It’s worth remembering that the popularity value may have a slight delay and does not reflect real-time changes.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 mb-2">
          <div className="card mb-3" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <h3 className="card-header text-center">Popular <FaSpotify /> </h3>
            <img height={300} src={tracksMostPopular.image} alt="most popular songs" className="" />
            <div className="card-body text-center">
              <h5 className="card-title">{tracksMostPopular.name} - {tracksMostPopular.popularity}</h5>
              <a href={tracksMostPopular.audio} className="text-success"> <FaSpotify /> Play on Spotify</a>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-2">
          <div className="card mb-3" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <h3 className="card-header text-center">This one, only you listen to! <FaSpotify /></h3>
            <img height={300} src={tracksLessPopular.image} alt="less popular sogs" className="" />
            <div className="card-body text-center">
              <h5 className="card-title">{tracksLessPopular.name} - {tracksLessPopular.popularity}</h5>
              <a href={tracksLessPopular.audio} className="text-success"> <FaSpotify /> Play on Spotify</a>
            </div>
          </div>
        </div>
      </div>


      <p className="text-center mx-auto mt-3" style={{ maxWidth: '700px', padding: '0 10px' }}>
      The chart below shows the most frequent music genres among the top 10 artists you listen to the most.  
      Each bar represents a genre, and the height indicates how many times that genre appears among your favorite artists. 
      The taller the bar, the more present these styles are in your everyday music.
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
                    text: 'Distribution of Music Genres',
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

      <h2 className="text-center mt-5">Distribution of Songs by Decade</h2>
      <p className="text-center mx-auto mt-3" style={{ maxWidth: '700px', padding: '0 10px' }}>
      This chart shows the number of songs you listen to, distributed by decade based on release date.  
      Each point represents a decade, and the line connects the points to indicate the trend over time.
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
                    text: 'Songs by Decade',
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
