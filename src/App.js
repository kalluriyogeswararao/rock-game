import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {isGameStart: true}

  onRenderGameStartPage = () => (
    <div>
      <ul className="all-images">
        {choicesList.map(eachItem => (
          <li>
            <button type="button" className="button">
              <img
                src={eachItem.imageUrl}
                alt={eachItem.id}
                className="image"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

  onRenderGameInitial = () => {
    const {isGameStart} = this.state

    return <div>{isGameStart && this.onRenderGameStartPage()}</div>
  }

  render() {
    return (
      <div className="bg-container">
        <div className="header-container">
          <p className="game-item-name">ROCK</p>
          <p className="game-item-name">PAPER</p>
          <p className="game-item-name">SCISSORS</p>
        </div>
        {this.onRenderGameInitial()}
        <Popup
          trigger={
            <button type="button" className="rules-btn">
              Rules
            </button>
          }
        >
          {close => (
            <div className="popup-container">
              <button
                type="button"
                className="close-btn"
                onClick={() => close()}
              >
                <RiCloseLine className="close-icon" />
                <div className="rules-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                    className="rules-image"
                  />
                </div>
              </button>
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default App
