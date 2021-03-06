import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import { getCount, getDistance, getInformation, getName } from './axios/api';

function App() {
  const [info, setInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [firstField, setFirstField] = useState('name');
  const [secondField, setSecondField] = useState('equals');
  const [search, setSearch] = useState('');
  const [head, setHead] = useState({
    name: 0,
    count: 0,
    distance: 0
  });

  useEffect(() => {
    getInfo();
  }, []);
  useEffect(() => {
    if (search == '') {
      getInfo();
    } else if (firstField == 'count') {
      getCount(search, secondField, currentPage, head)
        .then(data => {
          maxPageCount(Math.ceil(data.length / 10));
          setInfo(data.results);
        })
    } else if (firstField == 'distance') {
      getDistance(search, secondField, currentPage, head)
        .then(data => {
          maxPageCount(Math.ceil(data.length / 10));
          setInfo(data.results);
        })
    } else if (firstField == 'name') {
      
      getName(search, secondField, currentPage, head)
        .then(data => {
          maxPageCount(Math.ceil(data.length / 10));
          setInfo(data.results);
        })
    }
  }, [currentPage, head, secondField, firstField]);


  function maxPageCount(cnt) {
    let pageCount = [];
    for (let i = 0; i < cnt; i++) {
      pageCount.push(i);
    }
    setPages(pageCount);
  }

  function getInfo() {
    getInformation(currentPage, head)
      .then(data => {
        maxPageCount(Math.ceil(data.length / 10));
        setInfo(data.results);
      });
  }

  const stringSearch = (event) => {
    if (event != '') {
      if (firstField == 'count') {
        setCurrentPage(1);
        getCount(event, secondField, currentPage, head)
          .then(data => {
            maxPageCount(Math.ceil(data.length / 10));
            setInfo(data.results);
          })
      } else if (firstField == 'distance') {
        setCurrentPage(1);
        getDistance(event, secondField, currentPage, head)
          .then(data => {
            maxPageCount(Math.ceil(data.length / 10));
            setInfo(data.results);
          })
      } else if (firstField == 'name') {
        setCurrentPage(1);
        getName(event, secondField, currentPage, head)
          .then(data => {
            maxPageCount(Math.ceil(data.length / 10));
            setInfo(data.results);
          })
      }
    } else {
      getInfo();
    }
    setSearch(event);
  }

  const sortHead = (e) => {
    if (e == '????????????????') {
      if (head.name == 1) {
        setHead({
          name: 2,
          count: 0,
          distance: 0
        })
      } else {
        setHead({
          name: 1,
          count: 0,
          distance: 0
        })
      }
    }
    if (e == '????????????????????') {
      if (head.count == 1) {
        setHead({
          name: 0,
          count: 2,
          distance: 0
        })
      } else {
        setHead({
          name: 0,
          count: 1,
          distance: 0
        })
      }
    }
    if (e == '????????????????????') {
      if (head.distance == 1) {
        setHead({
          name: 0,
          count: 0,
          distance: 2
        })
      } else {
        setHead({
          name: 0,
          count: 0,
          distance: 1
        })
      }
    }
  }
  
  return (
    <div className="App">
      <div className='sort'>
        <select name="" id="" onClick={(e) => { setFirstField(e.target.value) }}>
          <option value="name">
            ????????????????
          </option>
          <option value="count">
            ????????????????????
          </option>
          <option value="distance">
            ????????????????????
          </option>
        </select>
        <select name="" id="" onClick={(e) => { setSecondField(e.target.value) }}>
          <option value="equals">??????????</option>
          <option value="contains">????????????????</option>
          <option value="more">????????????</option>
          <option value="less">????????????</option>
        </select>
        <input type="text" value={search} onChange={(e) => { stringSearch(e.target.value) }} />
      </div>

      <table>
        <thead>
          <tr onClick={(e) => sortHead(e.target.textContent)}>
            <td>????????</td>
            <td>????????????????</td>
            <td>????????????????????</td>
            <td>????????????????????</td>
          </tr>
        </thead>
        <tbody>
          {info && (
            info
              .map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.date.substr(0, 10)}</td>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td>{item.distance}</td>
                  </tr>
                )
              })
          )}
        </tbody>
      </table>
      <div className='pages__wrapper'>
        {pages && pages.map((item, index) => {
          if (((item + 1 - currentPage > -4) && (item + 1 - currentPage < 4)) || (item == 0) || (item == pages.length - 1)) {
            return (
              <React.Fragment key={index}>
                {((item == pages.length - 1) && (currentPage < pages.length - 1)) ? '...' : ''}
                <span onClick={() => { setCurrentPage(item + 1) }} className={currentPage === index + 1 ? 'currentPage pages' : 'pages'}>
                  {item + 1}
                </span>
                {((item == 0) && (currentPage > 5)) ? '...' : ''}
              </React.Fragment>
            )
          }
        })}
      </div>
    </div>
  );
}

export default App;
