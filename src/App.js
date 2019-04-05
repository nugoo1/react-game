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

class App extends Component {
  state = {
    score: 0,
    controls: {
      movement: {
        iteration: 10
      },
      window: {
        width: 0,
        height: 0
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
        animation: []
      },
      position: {
        x: 0,
        y: 0,
        selected: true
      }
    }
  };

  componentDidMount() {
    this.setPosition();
    this.gameLoop();
    document.addEventListener("keydown", e => {
      this.handleKeyPress(e);
    });
    window.addEventListener("resize", this.setPosition);
  }

  fireball = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        bird: {
          ...prevState.bird,
          fireball: {
            ...prevState.bird.fireball,
            animation: [
              ...prevState.bird.fireball.animation,
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

  setPosition = () => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    this.setState(prevState => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          window: {
            ...prevState.controls.window,
            width,
            height
          }
        },
        bird: {
          ...prevState.bird,
          position: {
            x: width / 4,
            y: height / 2
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

    // Switch Statement for Controls
    // **Todo - add multiple key event
    // **Todo - optimize the if statements for switch statements (mobile)
    //

    switch (e.keyCode) {
      // Fireball
      case 74:
        this.fireball();
        break;
      // Movement
      case 37:
        if (this.state.bird.position.x < this.state.controls.window.width * 0.1)
          return;
        movement.x = this.state.controls.movement.iteration * -1;
        break;

      case 38:
        if (
          this.state.bird.position.y <
          this.state.controls.window.height * 0.25
        )
          return;
        movement.y = this.state.controls.movement.iteration * -1;
        break;

      case 39:
        if (this.state.bird.position.x > this.state.controls.window.width * 0.3)
          return;
        movement.x = this.state.controls.movement.iteration;
        break;
      case 40:
        if (
          this.state.bird.position.y >
          this.state.controls.window.height * 0.85
        )
          return;
        movement.y = this.state.controls.movement.iteration;
        break;
      default:
        return;
    }
    this.setState(prevState => {
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
    // this.setState(prevState => {
    //   return {
    //     ...prevState,
    //     enemies: [
    //       ...prevState.enemies,
    //       {
    //         position: {
    //           x:
    //             prevState.controls.window.width -
    //             prevState.controls.window.width * 0.3 +
    //             Math.floor(Math.random() * (400 + 200 + 1)) -
    //             200,
    //           y:
    //             prevState.controls.window.height -
    //             prevState.controls.window.height * 0.4 +
    //             Math.floor(Math.random() * (150 + 100 + 1)) -
    //             100
    //         },
    //         backgroundPosition: {
    //           x: 0,
    //           y: 0
    //         },
    //         dimensions: {
    //           width: "100px",
    //           height: "100px"
    //         }
    //       }
    //     ]
    //   };
    // });

    setInterval(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          enemies: [
            ...prevState.enemies,
            {
              position: {
                x: prevState.controls.window.width - prevState.controls.window.width*0.3 + Math.floor(Math.random() * (400 + 200 + 1)) -200 ,
                y: prevState.controls.window.height - Math.floor(Math.random() * (150 + 200 + 1)) -200
              },
                backgroundPosition: {
                  x: 0,
                  y: 0
                },
              dimensions: {
                width: "100px",
                height: "100px"
              }
            }
          ]
        };
      });
    }, 1500);

    // Physics Loops

    // Enemies
    setInterval(() => {
      const enemyData = this.state.enemies
      .filter(enemyPosition => {
        const distanceX = (Math.abs(enemyPosition.position.x - this.state.bird.position.x) < 60 )
        const distanceY = (Math.abs(enemyPosition.position.y - this.state.bird.position.y) < 60)
        const isIntersected = distanceX && distanceY
        if (isIntersected) {
          this.setState(prevState => {
            return {
              ...prevState,
              score: prevState.score + 1
            }
          })
        }
        return !isIntersected
      })
      .map(enemy => {
        return {
          ...enemy,
          position: {
            x: enemy.position.x - 6,
            y: enemy.position.y
          },
        };
      });
      this.setState((prevState) => {
        return {
          ...prevState,
          enemies: enemyData
        }
      })
    }, 16)

    // Fireball
    setInterval(() => {
      if (!this.state.bird.fireball.animation.length) {
        return;
      }
      const animateData = this.state.bird.fireball.animation
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
              animation: animateData
            }
          }
        };
      });
    }, 16);

    // Animation Loops
    // Gold Coins
    setInterval(() => {
      if (this.state.enemies.length > 0) {
        const animatedCoins = this.state.enemies.map(enemy => {
          return {
            ...enemy,
            backgroundPosition: {
              x: enemy.backgroundPosition.x,
              y: enemy.backgroundPosition.y + 100
            }
          }
        });
        this.setState(prevState => {
          return {
            ...prevState,
            enemies: animatedCoins
          }
        })
      }
    }, 64)

    // Bird
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
    const fireballContent = this.state.bird.fireball.animation.map(fireball => {
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

    const enemyContent = this.state.enemies.map((enemy, i) => {
      return (
        <div
          key={i}
          className="enemy"
          style={{
            height: enemy.dimensions.height,
            width: enemy.dimensions.width,
            backgroundPosition: `${enemy.backgroundPosition.x}px ${
              enemy.backgroundPosition.y
            }px`,
            transform: `translate(${enemy.position.x}%, ${enemy.position.y}%)`
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

        <button onClick={this.fireball} className="fire" />

        {fireballContent}
        {enemyContent}

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
