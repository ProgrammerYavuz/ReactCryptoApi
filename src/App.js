import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    }).catch(error=>alert('Bilgiler Alınırken Hata Oluştu!'));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">React CoinGecko Api</h1>
        <form>
          <input type="text" className="coin-input" onChange={handleChange} placeholder="Arama"/>
        </form>
      </div>
      
      <div className='coin-container-header'>
        <div className='coin-row-header'>
          <div className='coin'>
            <h1>Coin Adı</h1>
            <p>Coin Sembolü</p>
          </div>
          <div className='coin-data'>
            <p className='coin-price'>Coin Fiyatı</p>
            <p className='coin-volume'>Toplam Arz</p>
            <p className='coin-percent'>24h</p>
            <p className='coin-marketcap'>
              Günlük Dolaşım
            </p>
          </div>
        </div>
      </div>

      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
