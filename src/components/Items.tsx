import React from 'react'
import { ItemType } from '../types'
import Item from './Item'
import styles from '../styles/Items.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { addFavorites, removeFavorites, setRemoveItems } from '../redux/slices/itemsSlice'
import Paginate from './Paginate'


interface ItemsProps {
    items: ItemType[],
    checked: boolean
}

const Items = ({ items, checked }: ItemsProps) => {

const dispatch: AppDispatch = useDispatch()  
const favorites = useSelector((state: RootState) => state.itemsReducer.favorites)
const removeItems = useSelector((state: RootState) => state.itemsReducer.removeItems)
const status = useSelector((state: RootState) => state.itemsReducer.status)  

function handleClick(item: ItemType) {
    if(favorites.find(f => f.kinopoiskId === item.kinopoiskId)) {
        dispatch(removeFavorites(item))
    } else {
        dispatch(addFavorites(item))
    }
}

function removeItem(item: ItemType) {
    dispatch(setRemoveItems(item))
}

  return (
        <div className={styles.items}>
            {!checked && <Paginate />}
            <div className={styles.itemsBlock}>
            {items.length === 0 ? <p>Нет избранных</p> : null}
            {   
                !status ?
                items
                    .filter(item => !removeItems.includes(item.kinopoiskId))
                    .map(item => {
                        return (
                            <Item 
                                key={item.kinopoiskId}
                                item={item} 
                                onClick={handleClick} 
                                favorites={favorites} 
                                removeItem={removeItem} 
                            />
                        )
                    }) : <span className={styles.status}>{status}</span>

            }
            
        </div>
        {!checked && <Paginate />}
        
    </div>
    
  )
}

export default Items