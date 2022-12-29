import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../redux/slices/itemsSlice'
import { AppDispatch, RootState } from '../redux/store'
import styles from '../styles/Paginate.module.scss'

const Paginate = () => {
    const dispatch: AppDispatch = useDispatch()  
    const currentPage = useSelector((state: RootState) => state.itemsReducer.currentPage) 
    const totalPages = useSelector((state: RootState) => state.itemsReducer.totalPages)     
  return (
        <div className={styles.paginateGroup}>
            <button className={styles.prevButton} disabled={currentPage === 1 ? true : false} onClick={() => dispatch(setCurrentPage(currentPage - 1))}>prev</button>
            <span>{currentPage} | {totalPages}</span>
            <button className={styles.nextButton} disabled={currentPage >= totalPages ? true : false} onClick={() => dispatch(setCurrentPage(currentPage + 1))}>next</button>
        </div>
  )
}

export default Paginate