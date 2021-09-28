import React,{ useState, useEffect } from 'react';
import { Card, Pagination, Empty, Input } from 'antd';
import LoadingCards from './components/loadingCards';
import './App.css';
import 'antd/dist/antd.css';

const { Meta } = Card;
const {Search} = Input;


function App() {

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(100);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
    if(search){
      fetch(`https://api.unsplash.com/search/collections?page=${page}&per_page=${pageSize}&query=${search}&client_id=TwvKJh4prHYcX8rjZdWBMDAHv0-h5ceFoB0Gg3irklI`)
      .then(res => res.json())
      .then(data => {
        setCards(data.results);
        setTotal(data.total_pages);
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setLoading(false);
      });
    }else{
      setLoading(false);
    }
  }, [page, pageSize, search]);

  function changePage(page, pageSize){
    setLoading(true);
    setPage(page);
    setPageSize(pageSize);
  }

  function searchHandel(value){
    setLoading(true);
    setSearch(value);
  }

  return (
    <div className="container">

      <div className="search-div">
        <Search placeholder="Search for Images" onSearch={searchHandel} enterButton />
      </div>

      {
        !loading ?
        
        <>
          
          {
          cards.length ? 
          
            <div className="cards">{cardsList}</div>
            
            : 
            
            <div style={{padding : '2rem', marginTop: '8rem'}}>
              <Empty description={false} />
            </div>
          }

        </>
        
        :

        <LoadingCards/>

      }

      {
        cards.length ? <div className="pagination-div">
        <Pagination className="pagination-div" defaultCurrent={page} onChange={changePage} total={total} />
      </div> : ''
      }
      

    </div>
  );
}

export default App;
