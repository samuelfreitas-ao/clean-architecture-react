import React, { memo } from 'react'
import { Logo } from '@/presentation/components'

import Styles from './login-header-styles.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquete para programadores</h1>
    </header>
  )
}

export default memo(Header)
