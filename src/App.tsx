import React, { useState, useEffect } from 'react';
import {movies, Movie} from './movies';
import './App.css';

function App(): JSX.Element {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(() => parseInt(localStorage.getItem('selectedMovieIndex') || '0'));
  const [selectedMoviePrice, setSelectedMoviePrice] = useState<number>(() => parseInt(localStorage.getItem('selectedMoviePrice') || '10'));

  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  useEffect(() => {
    localStorage.setItem('selectedMovieIndex', selectedMovieIndex.toString());
    localStorage.setItem('selectedMoviePrice', selectedMoviePrice.toString());
  }, [selectedMovieIndex, selectedMoviePrice]);

  const handleSeatClick = (index: number): void => {
    const seatIndex = selectedSeats.indexOf(index);

    if (seatIndex > -1) {
      setSelectedSeats([...selectedSeats.slice(0, seatIndex), ...selectedSeats.slice(seatIndex + 1)]);
    } else {
      setSelectedSeats([...selectedSeats, index]);
    }
  };

  const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedMovieIndex(e.target.selectedIndex);
    setSelectedMoviePrice(parseInt(e.target.value));
  };

  return (
    <div className="App">
      <div className="movie-container">
        <label>Pick a movie</label>
        <select value={selectedMoviePrice} onChange={handleMovieChange}>
          {movies.map((movie: Movie, index: number) => (
            <option key={index} value={movie.price.toString()}>
              {movie.name} (${movie.price})
            </option>
          ))}
        </select>
      </div>

      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className="container">
        <div className="screen"></div>

        {movies[selectedMovieIndex].seats.map((row: boolean[], rowIndex: number) => (
          <div className="row" key={rowIndex}>
            {row.map((seat: boolean, seatIndex: number) => (
              <div
                className={`seat ${seat ? '' : 'occupied'} ${selectedSeats.includes(rowIndex * row.length + seatIndex) ? 'selected' : ''}`}
                key={seatIndex}
                onClick={() => handleSeatClick(rowIndex * row.length + seatIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <p className="text">
        You have selected <span id="count">{selectedSeats.length}</span> seats for a price of $<span id="total">{selectedSeats.length * selectedMoviePrice}</span>
      </p>

      <button type="reset" onClick={() => setSelectedSeats([])}>Reset</button>
    </div>
  );
}

export default App;
