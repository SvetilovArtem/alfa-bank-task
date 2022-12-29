import React from 'react'
import { MdDelete, MdFavorite } from 'react-icons/md';
import styles from '../styles/Item.module.scss'
import { ItemType } from '../types';

export interface ItemProps {
    item: ItemType
    onClick: (item: ItemType) => void,
    favorites: ItemType[],
    removeItem: (item: ItemType) => void
}

const Item = ({ item, onClick, favorites, removeItem }: ItemProps) => {

  return (
    <li className={styles.item}>
        <img src={item.posterUrlPreview} alt="" className={styles.poster} />
        <MdFavorite 
            onClick={() => onClick(item)} 
            color={ favorites.find(f => f.kinopoiskId === item.kinopoiskId) ? 'rgb(237, 78, 78)' : 'rgb(249, 249, 249)'} 
            className={styles.favoriteIcon}
        /> 
        <div className={styles.info}>
            <div className={styles.nameRu}>{item.nameRu}</div>
            <div className={styles.rating}>{item.ratingKinopoisk}</div>
            <div className={styles.year}>{item.year}</div>
        </div>
        <MdDelete 
            color="grey"
            onClick={() => {
                if(!item.kinopoiskId) {
                    return null
                } else {
                    removeItem(item)
                }
            }}
        className={styles.deleteButton}
         />
    </li>
  )
}

export default Item