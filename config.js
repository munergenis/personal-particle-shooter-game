export const CONFIG = {
  canvas: {
    initialColor: "rgba(0, 0, 0, 1)",
    updateColor: "rgba(0, 0, 0, 0.25)",
  },
  player: {
    radius: 30,
    color: "maroon"
  },
  projectile: {
    radius: 5,
    color: "white",
    velocity: 10
  },
  enemy: {
    radius: {
      min: 10,
      max: 50
    },
    color: {
      10: "#E9FF97",
      20: "#FFD18E",
      30: "#FFA38F",
      40: "#FF7EE2"
    },
    velocity: 1
  },
  levels: {
    1: {
      enemies: {
        int: 1000,
        density: 1
      },
      kills: 5
    },
    2: {
      enemies: {
        int: 1000,
        density: 1
      },
      kills: 5
    },
    3: {
      enemies: {
        int: 1000,
        density: 1
      },
      kills: 5
    },
    4: {
      enemies: {
        int: 1000,
        density: 1
      },
      kills: 5
    },
    5: {
      enemies: {
        int: 1000,
        density: 1
      },
      kills: 5
    }
  }
}