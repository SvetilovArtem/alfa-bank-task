import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Items from './components/Items';
import Layout from './components/Layout';
import { fetchItems } from './redux/slices/itemsSlice';
import { AppDispatch, RootState } from './redux/store';
import "./index.css"
import Header from './components/Header';

function App() {
  const dispatch: AppDispatch = useDispatch()
  const list = useSelector((state: RootState) => state.itemsReducer.list)
  const favorites = useSelector((state: RootState) => state.itemsReducer.favorites)

  const [checked, setChecked] = useState(false)
  const handleChange = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <div className="App">
      <Header checked={checked} handleChange={handleChange} />
      <Layout>
        <Items items={checked ? favorites : list} />
      </Layout>
      
    </div>
  );
}

export default App;
