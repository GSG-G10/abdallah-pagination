import { useState, useEffect } from 'react';
import { Card } from 'antd';
import './App.css';
import 'antd/dist/antd.css';

const { Meta } = Card;

function App() {

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);


  const cardsList = cards.map((card) => 
          <Card 
            key={card.id}
            hoverable
            style={{width : '18%', "marginBottom" : '1rem'}}
            cover={<img alt="example" 
            src={card.preview_photos[0].urls.regular} />}
          >
            <Meta title={card.title} description={card.description}/>
          </Card>   
);

  useEffect(() => {
    fetch(`https://api.unsplash.com/search/collections?page=${page}&query=cat&client_id=TwvKJh4prHYcX8rjZdWBMDAHv0-h5ceFoB0Gg3irklI`)
    .then(res => res.json())
    .then(data => {
      setCards(data.results);
    });
  }, [page]);

  return (
    <div className="container">
      <div className="cards">
          {cardsList}
      </div>
    </div>
  );
}

export default App;
