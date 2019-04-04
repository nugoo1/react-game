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

// Initial Variables
const movement = {
  x: 0,
  y: 0
};

let direction = "r";
let flySelected = true;

class App extends Component {
  state = {
    controls: {
      movement: {
        iteration: 10,
        direction: direction
      }
    },
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
        }
      },
      position: {
        x: 0,
        y: 0,
        selected: true
      }
    }
  };

  componentDidMount() {
    this.fly();
    document.addEventListener("keydown", e => {
      this.handleKeyPress(e);
    });
  }

  fireball = async () => {
    const direction = this.state.controls.movement.direction === "r"

    await this.setState(prevState => {
      return {
        ...prevState,
        bird: {
          ...prevState.bird,
          fireball: {
            ...prevState.bird.fireball,
            animation: {
              x: prevState.controls.movement.direction === "r" ? prevState.bird.position.x + 50 : prevState.bird.position.x - 50,
              y: prevState.bird.position.y
            }
            
          }
        }
      }
    })

    const fireballAnimation = setInterval(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          bird: {
            ...prevState.bird,
            fireball: {
              ...prevState.bird.fireball,
              selected: true,
              animation: {
                ...prevState.bird.fireball.animation,
                x: direction ? prevState.bird.fireball.animation.x + 4 : prevState.bird.fireball.animation.x -4
              }
              
            }
          }
        }
      })
    }, 16)

    setTimeout(() => {
      clearInterval(fireballAnimation);
      this.setState(prevState => {
        return {
          ...prevState,
          bird: {
            ...prevState.bird,
            fireball: {
              ...prevState.bird.fireball,
              selected: false,
              animation: {
                ...prevState.bird.fireball.animation,
                x: prevState.bird.position.x
              }
            }
          }
        }
      })
    }, 1000)
  };

  handleKeyPress = e => {
    switch (e.keyCode) {
      // Fireball
      case 74:
        if(this.state.bird.fireball.selected || this.state.controls.movement.direction === "u" || this.state.controls.movement.direction === "d") {
          return
        } 
        this.fireball();
        break;

      // Movement
      case 37:
        movement.x =
          this.state.bird.position.x - this.state.controls.movement.iteration;
        direction = "l";
        flySelected = true;
        break;

      case 38:
        movement.y =
          this.state.bird.position.y - this.state.controls.movement.iteration;
        flySelected = false;
        break;

      case 39:
        movement.x =
          this.state.bird.position.x + this.state.controls.movement.iteration;
        direction = "r";
        flySelected = true;
        break;
      case 40:
        movement.y =
          this.state.bird.position.y + this.state.controls.movement.iteration;
        flySelected = false;
        break;
      default:
        return;
    }
    console.log(direction);
    this.setState(prevState => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          movement: {
            ...prevState.controls.movement,
            direction: direction
          }
        },
        bird: {
          ...prevState.bird,
          position: movement,
          selected: flySelected
        }
      };
    });
  };

  fly = (speed = 100) => {
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
    let transformContent = "";
    switch (this.state.controls.movement.direction) {
      // case "u":
      //   transformContent = `${this.state.bird.down.x}px ${
      //     this.state.bird.down.y
      //   }px`;
      //   break;
      // case "d":
      //   transformContent = `${this.state.bird.up.x}px ${
      //     this.state.bird.up.y
      //   }px`;
      //   break;
      default:
        transformContent = `${this.state.bird.animation.x}px ${
          this.state.bird.animation.y
        }px`;
    }
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
            backgroundPosition: transformContent,
            transform: `translate(${this.state.bird.position.x}%, ${
              this.state.bird.position.y
            }%) ${
              this.state.controls.movement.direction === "r"
                ? "scaleX(-1)"
                : "scaleX(1)"
            }`
          }}
        />
        <div
          className="bird fireball"
          style={{
            height: this.state.bird.dimensions.height,
            width: this.state.bird.dimensions.width,
            backgroundPosition: `${this.state.bird.fireball.x}px ${
              this.state.bird.fireball.y
            }px`,
            display: !this.state.bird.fireball.selected && "none",
            
            transform: `translate(${this.state.bird.fireball.animation.x}%, ${
              this.state.bird.fireball.animation.y
            }%)`
          }}
        />
      </div>
    );
  }
}

export default App;
