import React, { Component } from "react";
import "./App.scss";

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
        iteration: 15,
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
        selected: false
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

  fireball = () => {
    console.log("Booom!", this.state.controls.movement.direction);
    setTimeout(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          bird: {
            ...prevState.bird,
            fireball: {
              ...prevState.bird.fireball,
              selected: false
            }
          }
        };
      });
    }, 400);
  };

  handleKeyPress = e => {
    switch (e.keyCode) {
      // Fireball
      case 74:
        this.setState(prevState => {
          return {
            ...prevState,
            bird: {
              ...prevState.bird,
              fireball: {
                ...prevState.bird.fireball,
                selected: true
              }
            }
          };
        });
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
        direction = "u";
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
        direction = "d";
        flySelected = false;
        break;
      default:
        return;
    }
    this.setState(prevState => {
      console.log(flySelected);
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
    let transformContent = ""
    switch(this.state.controls.movement.direction) {
      case "u":
        transformContent = `${this.state.bird.down.x}px ${this.state.bird.down.y}px`;
        break;
      case "d":
        transformContent = `${this.state.bird.up.x}px ${this.state.bird.up.y}px`;
        break;
      default: 
        transformContent = `${this.state.bird.animation.x}px ${this.state.bird.animation.y}px`
    }
    return (
      <div className="App">
        <div
          className="bird leftRight"
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

        {/* <div
          className="bird upDown"
          style={{
            height: this.state.bird.dimensions.height,
            width: this.state.bird.dimensions.width,
            backgroundPosition:
              this.state.controls.movement.direction === "u"
                ? `${this.state.bird.down.x}px ${this.state.bird.down.y}px`
                : `${this.state.bird.up.x}px ${this.state.bird.up.y}px`,
            transform: `translate(${this.state.bird.position.x}%, ${
              this.state.bird.position.y
            }%) ${
              this.state.controls.movement.direction === "r"
                ? "scaleX(-1)"
                : "scaleX(1)"
            }`,
            display: !this.state.bird.position.selected && "none"
          }}
        /> */}

        <div
          className={
            this.state.controls.movement.direction === "l"
              ? "bird fireballLeft"
              : "bird fireballRight"
          }
          style={{
            height: this.state.bird.dimensions.height,
            width: this.state.bird.dimensions.width,
            backgroundPosition: `${this.state.bird.fireball.x}px ${
              this.state.bird.fireball.y
            }px`,
            display: !this.state.bird.fireball.selected && "none",
            transform: `translate(${this.state.bird.position.x}%, ${
              this.state.bird.position.y
            }%)`
          }}
        />
      </div>
    );
  }
}

export default App;
