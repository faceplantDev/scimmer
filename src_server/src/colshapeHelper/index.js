class colshapeHelper {
  name;
  colshape;
  dimension;
  callback;
  onExit;

  constructor(name, colshape, dimension, callback, onExit) {
    this.name = name;
    this.colshape = colshape;
    this.dimension = dimension;
    this.callback = callback;
    this.onExit = onExit;
  }
}

export class Colshape {
  static list = [];

  static create(name, position, dimension, range, callback, onExit) {
    let ColshapeIndex = Colshape.list.findIndex((element) => element.name == name && element.dimension == dimension);
    if (ColshapeIndex == -1) {
      let colshape = mp.colshapes.newSphere(position.x, position.y, position.z, range, dimension);
      let shapeClass = new colshapeHelper(name, colshape, dimension, callback, onExit);
      Colshape.list.push(shapeClass);

      return shapeClass;
    }

    return false;
  }

  static destroy(name, dimension) {
    let ColshapeIndex = Colshape.list.findIndex((element) => element.name == name && element.dimension == dimension);

    if (ColshapeIndex != -1) {
      const colshape = Colshape.list[ColshapeIndex];
      if (mp.colshapes.exists(colshape.colshape)) colshape.colshape.destroy();
      Colshape.list.splice(ColshapeIndex, 1);
    }
  }
}

mp.events.add("playerEnterColshape", (player, colshape) => {
  let ColshapeIndex = Colshape.list.findIndex((element) => element.colshape == colshape && element.dimension == colshape.dimension);

  if (ColshapeIndex != -1) {
    const colshape = Colshape.list[ColshapeIndex];

    colshape.callback(player);
  }
});

mp.events.add("playerExitColshape", (player, colshape) => {
  let ColshapeIndex = Colshape.list.findIndex((element) => element.colshape == colshape && element.dimension == colshape.dimension);

  if (ColshapeIndex != -1) {
    const colshape = Colshape.list[ColshapeIndex];
    if (colshape.onExit != undefined) colshape.onExit(player);
  }
});
