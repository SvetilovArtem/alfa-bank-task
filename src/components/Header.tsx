import React from 'react'
import styles from '../styles/Header.module.scss'

interface HeaderProps {
    checked: boolean,
    handleChange: () => void
}

const Header = ({ checked, handleChange }: HeaderProps) => {
  return (
    <header className={styles.header} >
        <label htmlFor="checkbox">
            <input type='checkbox' checked={checked} onChange={handleChange} id='checkbox' />
            <span>Отображать избранное</span>
        </label>
        <h2 className={styles.logo}>Cinema-Info</h2>
    </header>
  )
}

export default Header