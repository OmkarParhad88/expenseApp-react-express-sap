import React from 'react'
import { SideNavigation } from '@ui5/webcomponents-react';
import {
  SideNavigationItem,
} from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/AllIcons';
const SideNavigationBar = () => {
  return (
    <div>
      <SideNavigation
        collapsed="false"
        onSelectionChange={function _s() { }}
        style={{ width: '20%' }}
      >
        <SideNavigationItem
          icon="documents"
          text="Documents"
          selected
        />
        <SideNavigationItem
         
          icon="action"
          text="Verification"
        />
      
        <SideNavigationItem
          icon="fallback"
          text="Rejected"
        />
        <SideNavigationItem
          icon="accept"
          text="Aproved"
        />
        
      </SideNavigation>
    </div>
  )
}

export default SideNavigationBar
