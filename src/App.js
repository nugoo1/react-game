import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  state = {
    controls: {
      movement: {
        iteration: 15,
        direction: "r"
      },
     
    },
    bird: {
      dimensions: {
        height: "100px",
        width: "100px"
      },
      animation: {
        x: 0,
        y: 0,
        selected: true
      },
      talking: {
        x: -110,
        y: -130,
        selected: false
      },
      position: {
        x: 0,
        y: 0
      }
    }
  };

  componentDidMount() {
    this.fly();
    document.addEventListener("keydown", e => {
      this.handleKeyPress(e);
    });
  }

  handleKeyPress = e => {
    if (this.state.bird.talking.selected) {
      return
    }
    switch (e.key) {
      case "ArrowDown":
        this.setState(prevState => {
          return {
            ...prevState,
            bird: {
              ...prevState.bird,
              position: {
                ...prevState.bird.position,
                y: prevState.bird.position.y + this.state.controls.movement.iteration
              }
            }
          };
        });
        break;
      case "ArrowUp":
        this.setState(prevState => {
          return {
            ...prevState,
            bird: {
              ...prevState.bird,
              position: {
                ...prevState.bird.position,
                y: prevState.bird.position.y - this.state.controls.movement.iteration
              }
            }
          };
        });
        break;
      case "ArrowLeft":
        this.setState(prevState => {
          return {
            ...prevState,
            controls: {
              ...prevState.controls,
              movement: {
                ...prevState.controls.movement,
                direction: "l"
              }
            },
            bird: {
              ...prevState.bird,
              position: {
                ...prevState.bird.position,
                x: prevState.bird.position.x - this.state.controls.movement.iteration
              }
            }
          };
        });
        break;
      case "ArrowRight":
        this.setState(prevState => {
          return {
            ...prevState,
            controls: {
              ...prevState.controls,
              movement: {
                ...prevState.controls.movement,
                direction: "r"
              }
            },
            bird: {
              ...prevState.bird,
              position: {
                ...prevState.bird.position,
                x: prevState.bird.position.x + this.state.controls.movement.iteration
              }
            }
          };
        });
        break;
      default:
        return;
    }
  };

  toggleSpeak = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        bird: {
          ...prevState.bird,
          animation: {
            ...prevState.bird.animation,
            selected: !prevState.bird.animation.selected
          },
          talking: {
            ...prevState.bird.talking,
            selected: !prevState.bird.talking.selected
          }
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
    return (
      <div className="App">
        <button
          style={{ position: "absolute", top: "30%", left: "50%" }}
          onClick={this.toggleSpeak}
        >
          Peekaboo!
        </button>
        <div
          className="bird"
          style={{
            height: this.state.bird.dimensions.height,
            width: this.state.bird.dimensions.width,
            backgroundPosition: `${this.state.bird.animation.x}px ${
              this.state.bird.animation.y
            }px`,
            display: !this.state.bird.animation.selected && "none",
            transform: `translate(${this.state.bird.position.x}%, ${
              this.state.bird.position.y
            }%) ${this.state.controls.movement.direction === "r" ? "scaleX(-1)" : "scaleX(1)"}`
             
          }}
        />

        <div
          className="bird"
          style={{
            height: this.state.bird.dimensions.height,
            width: this.state.bird.dimensions.width,
            backgroundPosition: `${this.state.bird.talking.x}px ${
              this.state.bird.talking.y
            }px`,
            display: !this.state.bird.talking.selected && "none",
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
