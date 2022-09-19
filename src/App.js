import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import 'reactjs-popup/dist/index.css'

import './App.css'

import Para from './styleComponent'

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

const GameItem = props => {
  const {eachItem, clickImage} = props
  const {imageUrl, id} = eachItem
  const onClickImage = () => {
    clickImage(id)
  }

  return (
    <li>
      <button
        type="button"
        className="button"
        onClick={onClickImage}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <img src={imageUrl} alt={id} className="image" />
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    isGameStart: true,
    score: 0,
    activeId: {},
    randomNumber: {},
    status: '',
  }

  onClickPlayAgian = () => {
    this.setState({isGameStart: true})
  }

  onRenderGameStartPage = () => (
    <ul className="all-images">
      {choicesList.map(eachItem => (
        <GameItem
          eachItem={eachItem}
          key={eachItem.id}
          clickImage={this.clickImage}
        />
      ))}
    </ul>
  )

  clickImage = id => {
    const index = Math.floor(Math.random() * 3)
    const opponent = choicesList[index]
    const userOption = choicesList.find(each => each.id === id)
    if (id === 'PAPER' && opponent.id === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        status: 'YOU WON',
      }))
    }
    if (id === 'SCISSORS' && opponent.id === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        status: 'YOU LOSE',
      }))
    }
    if (id === 'ROCK' && opponent.id === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        status: 'YOU LOSE',
      }))
    }
    if (id === 'SCISSORS' && opponent.id === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        status: 'YOU WON',
      }))
    }
    if (id === 'ROCK' && opponent.id === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        status: 'YOU WON',
      }))
    }
    if (id === 'PAPER' && opponent.id === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        status: 'YOU LOSE',
      }))
    }
    if (id === opponent.id) {
      this.setState({status: 'IT IS DRAW'})
    }

    this.setState({
      activeId: userOption,
      isGameStart: false,
      randomNumber: opponent,
    })
  }

  onRenderResultPage = () => {
    const {activeId, randomNumber, status} = this.state

    return (
      <div className="final-result-container">
        <div className="user-opp-container">
          <div className="each-user">
            <h1 className="status">YOU</h1>
            <img src={activeId.imageUrl} alt="your choice" className="image" />
          </div>
          <div className="each-user">
            <h1 className="status">OPPONENT</h1>
            <img
              src={randomNumber.imageUrl}
              alt="opponent choice"
              className="image"
            />
          </div>
        </div>
        <p className="status">{status}</p>
        <button
          type="button"
          className="play-again-btn"
          onClick={this.onClickPlayAgian}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  onRenderGameInitial = () => {
    const {isGameStart} = this.state

    return (
      <div className="game-play-container">
        {isGameStart && this.onRenderGameStartPage()}

        {!isGameStart && this.onRenderResultPage()}
      </div>
    )
  }

  render() {
    const {score} = this.state
    return (
      <div className="bg-container">
        <div className="header-container">
          <div>
            <h1 className="game-item-name">Rock Paper Scissors</h1>
          </div>
          <div className="score-container">
            <p className="score-heading">Score</p>
            <Para>{score}</Para>
          </div>
        </div>
        {this.onRenderGameInitial()}
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="rules-btn">
                Rules
              </button>
            }
          >
            {close => (
              <div className="inner-popup-container">
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => close()}
                >
                  <RiCloseLine className="close-icon" />
                </button>
                <div className="rules-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                    className="rules-image"
                  />
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default App
