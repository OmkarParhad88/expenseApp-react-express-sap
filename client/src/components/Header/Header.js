import React from 'react'
import { ShellBar } from '@ui5/webcomponents-react';
import { Avatar} from '@ui5/webcomponents-react';
const Header = () => {
  return (
    <div>
      <ShellBar
        onLogoClick={function _s() { }}
        primaryTitle="Expense Details"
        profile={
          <Avatar
            icon="employee"
            size="S"
          />
        }
      >
      </ShellBar>
    </div>
  )
}

export default Header
