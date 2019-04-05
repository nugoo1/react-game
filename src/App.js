import React, { Component } from "react";
import "./App.scss";

// Images
import backgroundLayer0 from "./images/background/Layer_0000.png";
import backgroundLayer1 from "./images/background/Layer_0001.png";
import backgroundLayer2 from "./images/background/Layer_0002.png";
import backgroundLayer3 from "./images/background/Layer_0003.png";
import backgroundLayer4 from "./images/background/Layer_0004.png";
import backgroundLayer5 from "./images/background/Layer_0005.png";
import backgroundLayer6 from "./images/background/Layer_0006.png";
import backgroundLayer7 from "./images/background/Layer_0007.png";
import backgroundLayer8 from "./images/background/Layer_0008.png";
import backgroundLayer9 from "./images/background/Layer_0009.png";
import backgroundLayer10 from "./images/background/Layer_0010.png";

const demoData = [
  {
    position: {
      x: 0,
      y: 0
    }
  }
];

class App extends Component {
  state = {
    score: 0,
    controls: {
      movement: {
        iteration: 10
      }
    },
    enemies: [],
    bird: {
      dimensions: {
        height: "100px",
        width: "100px"
      },
      animation: {
        x: 0,
        y: 0
      },
      up: {
        x: -100,
        y: -130
      },
      down: {
        x: 15,
        y: -240
      },
      fireball: {
        x: -250,
        y: -130,
        selected: false,
        animation: {
          x: 0,
          y: 0
        },
        test: []
      },
      position: {
        x: 0,
        y: 0,
        selected: true
      }
    }
  };

  componentDidMount() {
    this.test();
    this.gameLoop();
    document.addEventListener("keydown", e => {
      this.handleKeyPress(e);
    });
    window.addEventListener("resize", this.test);
  }

  fireball = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        score: prevState.score + 1,
        bird: {
          ...prevState.bird,
          fireball: {
            ...prevState.bird.fireball,
            test: [
              ...prevState.bird.fireball.test,
              {
                x: prevState.bird.position.x + 50,
                y: prevState.bird.position.y
              }
            ]
          }
        }
      };
    });
  };

  test = () => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    console.log(width, height);
    console.log(width / 100, height / 100);

    this.setState(prevState => {
      return {
        ...prevState,
        bird: {
          ...prevState.bird,
          position: {
            x:  width / 4,
            y:  height / 2
          }
        }
      };
    });
  };

  // Controls
  handleKeyPress = e => {
    // Initial Variables
    const movement = {
      x: 0,
      y: 0
    };

    // Switch Statement for Controls **Todo - add multiple key event
    switch (e.keyCode) {
      // Fireball
      case 74:
        this.fireball();
        break;
      // Movement
      case 37:
        movement.x = this.state.controls.movement.iteration * -1;
        break;

      case 38:
        movement.y = this.state.controls.movement.iteration * -1;
        break;

      case 39:
        movement.x = this.state.controls.movement.iteration;
        break;
      case 40:
        movement.y = this.state.controls.movement.iteration;
        break;
      default:
        return;
    }
    this.setState(prevState => {
      console.log(movement);
      return {
        ...prevState,
        bird: {
          ...prevState.bird,
          position: {
            x: prevState.bird.position.x + movement.x,
            y: prevState.bird.position.y + movement.y
          }
        }
      };
    });
  };

  gameLoop = (speed = 130) => {
    setInterval(() => {
      if (!this.state.bird.fireball.test.length > 0) {
        return;
      }
      const animateData = this.state.bird.fireball.test
        .filter(fireballPosition => {
          return fireballPosition.x < 2000;
        })
        .map(fireball => {
          return {
            x: fireball.x + 20,
            y: fireball.y
          };
        });
      this.setState(prevState => {
        return {
          ...prevState,
          bird: {
            ...prevState.bird,
            fireball: {
              ...prevState.bird.fireball,
              selected: true,
              test: animateData
            }
          }
        };
      });
    }, 16);
    setInterval(() => {
      this.setState(prevState => {
        switch (prevState.bird.animation.x) {
          case 0:
            return {
              ...prevState,
              bird: {
                ...prevState.bird,
                animation: {
                  ...prevState.bird.animation,
                  x: -130
                }
              }
            };
          case -130:
            return {
              ...prevState,
              bird: {
                ...prevState.bird,
                animation: {
                  ...prevState.bird.animation,
                  x: -260
                }
              }
            };
          case -260:
            return {
              ...prevState,
              bird: {
                ...prevState.bird,
                animation: {
                  ...prevState.bird.animation,
                  x: 0
                }
              }
            };
          default:
            return {
              ...prevState
            };
        }
      });
    }, speed);
  };

  render() {
    const fireballContent = this.state.bird.fireball.test.map(fireball => {
      return (
        <div
          key={Math.random()}
          className="bird"
          style={{
            height: this.state.bird.dimensions.height,
            width: this.state.bird.dimensions.width,
            backgroundPosition: `${this.state.bird.fireball.x}px ${
              this.state.bird.fireball.y
            }px`,
            transform: `translate(${fireball.x}%, ${fireball.y}%)`
          }}
        />
      );
    });

    return (
      <div
        className="Map"
        style={{
          backgroundImage: `
          url(${backgroundLayer0}), 
          url(${backgroundLayer1}), 
          url(${backgroundLayer2}), 
          url(${backgroundLayer3}), 
          url(${backgroundLayer4}), 
          url(${backgroundLayer5}), 
          url(${backgroundLayer6}), 
          url(${backgroundLayer7}), 
          url(${backgroundLayer8}), 
          url(${backgroundLayer9}), 
          url(${backgroundLayer10}) `
        }}
      >
        <div
          className="bird"
          style={{
            height: this.state.bird.dimensions.height,
            width: this.state.bird.dimensions.width,
            backgroundPosition: `${this.state.bird.animation.x}px ${
              this.state.bird.animation.y
            }px`,
            transform: `translate(${this.state.bird.position.x}%, ${
              this.state.bird.position.y
            }%) scaleX(-1)`
          }}
        />
        {/* <div
          className="enemy"
          style={{
            height: this.state.bird.dimensions.height,
            width: this.state.bird.dimensions.width,
            backgroundPosition: `${this.state.bird.animation.x}px ${
              this.state.bird.animation.y
            }px`,
            transform: `translate(${this.state.bird.position.x }%, ${
              this.state.bird.position.y
            }%)`
          }}
        /> */}
        
        <button onClick={this.fireball} className="fire" />

        {fireballContent}

        <div className="score">
          <h1>
            Score: <span>{this.state.score}</span>
          </h1>
        </div>
      </div>
    );
  }
}

export default App;
