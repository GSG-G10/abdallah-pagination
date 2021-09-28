import React,{ useState, useEffect } from 'react';
import { Card, Pagination, Avatar } from 'antd';
import LoadingCards from './components/loadingCards';
import './App.css';
import 'antd/dist/antd.css';

const { Meta } = Card;


function App() {

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(100);
  const [loading, setLoading] = useState(true);


  const cardsList = cards.map((card) => 
          <Card 
            key={card.id}
            hoverable
            style={{width : '30%', "marginBottom" : '1rem'}}
            cover={<img alt="example" 
            src={card.preview_photos[0].urls.regular} />}
          >
            <Meta title={card.title} description={card.description}/>
          </Card>   
);

  useEffect(() => {
    fetch(`https://api.unsplash.com/search/collections?page=${page}&per_page=${pageSize}&query=cat&client_id=TwvKJh4prHYcX8rjZdWBMDAHv0-h5ceFoB0Gg3irklI`)
    .then(res => res.json())
    .then(data => {
      setCards(data.results);
      setTotal(data.total_pages);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }, [page, pageSize]);

  function changePage(page, pageSize){
    setLoading(true);
    setPage(page);
    setPageSize(pageSize);
  }

  return (
    <div className="container">

      {
        !loading ?
        
        <div className="cards">
          {cardsList}
        </div>
        
        :

        <LoadingCards/>

      }

      <div className="pagination-div">
        <Pagination className="pagination-div" defaultCurrent={page} onChange={changePage} total={total} />
      </div>
      

    </div>
  );
}

export default App;
