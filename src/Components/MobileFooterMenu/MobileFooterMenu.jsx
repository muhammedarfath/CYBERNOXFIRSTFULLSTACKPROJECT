import React from 'react'

function MobileFooterMenu() {
  return (
    <div className="fixed bottom-0 md:hidden w-full bg-white p-4 shadow-lg z-50">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex flex-1 justify-around">
          <div className="text-center">
            <ion-icon name="home-outline" className="text-2xl"></ion-icon>
            <p className="text-xs">Home</p>
          </div>
          <div className="text-center">
            <ion-icon name="heart-outline" className="text-2xl"></ion-icon>
            <p className="text-xs">Like</p>
          </div>
          <div className="text-center">
            <ion-icon name="person-outline" className="text-2xl"></ion-icon>
            <p className="text-xs">Profile</p>
          </div>
          <div className="text-center">
            <ion-icon name="chatbubble-outline" className="text-2xl"></ion-icon>
            <p className="text-xs">Chat</p>
          </div>
          <div className="text-center">
            <ion-icon name="settings-outline" className="text-2xl"></ion-icon>
            <p className="text-xs">Settings</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileFooterMenu
