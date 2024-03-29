/**
 * 3D
 *
 * Transformation code modified from Coding Train "3D Rendering with Rotation and Projection"
 *  - https://thecodingtrain.com/CodingChallenges/112-3d-rendering.html
 *  - https://editor.p5js.org/codingtrain/sketches/r8l8XXD2A
 *
 */
class ThreeD {

  constructor() {
    this.key = "3d";
    this.name = "3D";
    this.title = "Portimao Grand Prix";
    this.constrain = false
  }

  /**
   * Draw path
   */
  draw(p5) {
    // return this.simpleCube()
    // return this.anaglyphCube()
    // return this.cubeGrid(2)
    // return this.isometricPlanes()
    // return this.sphere()
    // return this.sphereSpiral()
    // return this.noisePlane(p5)
    // return this.geoData()
    return this.grandPrix()
    // return this.geoIsolines(p5)
  }

  simpleCube() {

    let PathHelp = new PathHelper;
    let layers = new Array();
    let paths = new Array();
    let path = new Array();

    // Set angle of shape rotation
    let angle = (5/100) * (2 * Math.PI);

    // Define 3D shape (cube) (x,y,z)
    let points = [
      [-0.5, -0.5, -0.5],
      [0.5, -0.5, -0.5],
      [0.5, 0.5, -0.5],
      [-0.5, 0.5, -0.5],
      [-0.5, -0.5, 0.5],
      [0.5, -0.5, 0.5],
      [0.5, 0.5, 0.5],
      [-0.5, 0.5, 0.5]
    ];

    const rotationZ = [
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle),  Math.cos(angle), 0],
      [0, 0, 1]
    ];

    const rotationX = [
      [1, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle)],
      [0, Math.sin(angle),  Math.cos(angle)]
    ];

    const rotationY = [
      [ Math.cos(angle), 0, Math.sin(angle)],
      [0, 1, 0],
      [-Math.sin(angle), 0, Math.cos(angle)]
    ];

    let projected = [];

    // Loop through Model points and apply transformation and projection
    for (let i = 0; i < points.length; i++) {

      // Apply rotation

      let rotated = this.matrixMultiply(rotationY, points[i]);
      rotated = this.matrixMultiply(rotationX, rotated);

      let distance = 2;
      let z = 1 / (distance - rotated[2]);
      const projection = [
        [z, 0, 0],
        [0, z, 0]
      ];
      rotated = this.matrixMultiply(rotationZ, rotated);

      // Project model onto 2D surface
      let projected2d = this.matrixMultiply(projection, rotated);

      // Scale as necessary
      projected2d = this.matrixMultiply(projected2d, 0.5)

      // Push point to path
      path.push([
        projected2d[0], projected2d[1]
      ])
    }

    // Connect points to create paths (edges)
    for (let i = 0; i < 4; i++) {
      paths.push(
        new Array(
          path[i],
          path[(i + 1) % 4]
        )
      );
      paths.push(
        new Array(
          path[i + 4],
          path[((i + 1) % 4) + 4],
        )
      );
      paths.push(
        new Array(
          path[i],
          path[i + 4]
        )
      );
    }

    layers.push({
      "color": "black",
      "paths": paths
    })

    return layers;
  }

  anaglyphCube() {

    let PathHelp = new PathHelper;
    let layers = new Array();
    let paths = new Array();
    let path = new Array();

    let paths2 = new Array();
    let path2 = new Array();

    // Set angle of shape rotation
    let angle = 0.08 * (2 * Math.PI);

    // Define 3D shape (cube) (x,y,z)
    let points = [
      [-0.5, -0.5, -0.5],
      [0.5, -0.5, -0.5],
      [0.5, 0.5, -0.5],
      [-0.5, 0.5, -0.5],
      [-0.5, -0.5, 0.5],
      [0.5, -0.5, 0.5],
      [0.5, 0.5, 0.5],
      [-0.5, 0.5, 0.5]
    ];

    const rotationZ = [
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle),  Math.cos(angle), 0],
      [0, 0, 1]
    ];

    const rotationX = [
      [1, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle)],
      [0, Math.sin(angle),  Math.cos(angle)]
    ];

    const rotationY = [
      [ Math.cos(angle), 0, Math.sin(angle)],
      [0, 1, 0],
      [-Math.sin(angle), 0, Math.cos(angle)]
    ];

    let projected = [];

    // Loop through Model points and apply transformation and projection
    for (let i = 0; i < points.length; i++) {

      // Apply rotation

      let rotated = this.matrixMultiply(rotationY, points[i]);
      rotated = this.matrixMultiply(rotationX, rotated);

      let distance = 2;
      let z = 1 / (distance - rotated[2]);
      // let z = 1
      const projection = [
        [z, 0, 0],
        [0, z, 0]
      ];
      rotated = this.matrixMultiply(rotationZ, rotated);

      let shape2 = [...rotated]

      // Translate X
      let offset = 0.025
      rotated[0] += offset
      shape2[0] -= offset

      // Project model onto 2D surface
      let projected2d = this.matrixMultiply(projection, rotated);
      let projectedshape2 = this.matrixMultiply(projection, shape2);

      // Scale as necessary
      projected2d = this.matrixMultiply(projected2d,2)
      projectedshape2 = this.matrixMultiply(projectedshape2, 2)

      // Push point to path
      path.push([
        projected2d[0], projected2d[1]
      ])

      path2.push([
        projectedshape2[0], projectedshape2[1]
      ])
    }

    // Connect points to create paths (edges)
    for (let i = 0; i < 4; i++) {
      paths.push(
        new Array(
          path[i],
          path[(i + 1) % 4]
        )
      );
      paths.push(
        new Array(
          path[i + 4],
          path[((i + 1) % 4) + 4],
        )
      );
      paths.push(
        new Array(
          path[i],
          path[i + 4]
        )
      );
    }

    for (let i = 0; i < 4; i++) {
      paths2.push(
        new Array(
          path2[i],
          path2[(i + 1) % 4]
        )
      );
      paths2.push(
        new Array(
          path2[i + 4],
          path2[((i + 1) % 4) + 4],
        )
      );
      paths2.push(
        new Array(
          path2[i],
          path2[i + 4]
        )
      );
    }

    layers.push({
      "color": "cyan",
      "paths": paths
    })

    layers.push({
      "color": "magenta",
      "paths": paths2
    })

    return layers;
  }

  cubeGrid(gridScale) {

    let PathHelp = new PathHelper;
    let layers = new Array();

    // Grid test
    let rows = 3 * gridScale;
    let columns = 5 * gridScale;
    // let side_length = (1/rows);
    let side_length = (1/gridScale) * 0.33

    // Define 3D shape (cube) (x,y,z)
    let points = [
      [-side_length, -side_length, -side_length],
      [ side_length, -side_length, -side_length],
      [ side_length,  side_length, -side_length],
      [-side_length,  side_length, -side_length],
      [-side_length, -side_length,  side_length],
      [ side_length, -side_length,  side_length],
      [ side_length,  side_length,  side_length],
      [-side_length,  side_length,  side_length]
    ];

    // Fill Grid
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {

        let paths = new Array();
        let path = new Array();

        // Index position
        let id = (r * columns) + c;

        // Set angle of shape rotation
        // let angle = (c / columns) * (0.5 * Math.PI);
        let angle = (id / (rows * columns)) * (2 * Math.PI);

        // Set Transformation matrices (rotrations)
        const rotationZ = [
          [Math.cos(angle), -Math.sin(angle), 0],
          [Math.sin(angle),  Math.cos(angle), 0],
          [0, 0, 1]
        ];
        const rotationX = [
          [1, 0, 0],
          [0, Math.cos(angle), -Math.sin(angle)],
          [0, Math.sin(angle),  Math.cos(angle)]
        ];
        const rotationY = [
          [ Math.cos(angle), 0, Math.sin(angle)],
          [0, 1, 0],
          [-Math.sin(angle), 0, Math.cos(angle)]
        ];

        // Loop through Model points and apply transformation and projection
        let projected = [];
        for (let i = 0; i < points.length; i++) {

          // Apply rotation
          let rotated = this.matrixMultiply(rotationY, points[i]);
          rotated = this.matrixMultiply(rotationX, rotated);
          rotated = this.matrixMultiply(rotationZ, rotated);

          // Project model onto 2D surface
          // Calculate "weak perspective" on Z Axis
          let distance = 2;
          let z = 1 / (distance - rotated[2]);
          const projection = [
            [z, 0, 0],
            [0, z, 0]
          ];
          let projected2d = this.matrixMultiply(projection, rotated);

          // Push point to path
          path.push([
            projected2d[0], projected2d[1]
          ])
        }

        // Connect points to create paths (edges)
        for (let i = 0; i < 4; i++) {
          paths.push(
            new Array(
              path[i],
              path[(i + 1) % 4]
            )
          );
          paths.push(
            new Array(
              path[i + 4],
              path[((i + 1) % 4) + 4],
            )
          );
          paths.push(
            new Array(
              path[i],
              path[i + 4]
            )
          );
        }

        // Translate to position on grid
        for (let i = 0; i < paths.length; i++) {

          // Distribute shapes across grid
          // Top-left of this is at local origin (center of canvas)
          paths[i] = PathHelp.translatePath(
            paths[i],
            [
              (2 * (columns/rows) * (c/columns)),
              (2 * (r/rows))
            ]
          )

          // Move from center to top-left
          paths[i] = PathHelp.translatePath(
            paths[i],
            [
              -5/3 + 1/rows,
              -1 + 1/rows
            ]
          )
        }

        // Put each model/shape on its own layer
        layers.push({
          "color": "cyan",
          "paths": paths
        })

      }
    }

    return layers;
  }

  isometricPlanes() {

    let PathHelp = new PathHelper;
    let layers = new Array();
    let paths = new Array();
    let path = new Array();

    // Define 3D shape (cube) (x,y,z)
    let side_length = 1;
    let planes = [
      [
        [-side_length, 0, -side_length],
        [ side_length, 0, -side_length],
        [ side_length, 0, side_length],
        [-side_length, 0, side_length]
      ]
      ,
      [
        [-side_length, -side_length, 0],
        [ side_length, -side_length, 0],
        [ side_length, side_length, 0],
        [-side_length, side_length, 0]
      ]
      ,
      [
        [0, -side_length, -side_length],
        [0,  side_length, -side_length],
        [0,  side_length,  side_length],
        [0, -side_length,  side_length]
      ]
    ];

    // https://en.wikipedia.org/wiki/Rotation_matrix
    const x_rotation = (0/16) * (2 * Math.PI)
    const rotationX = [
      [1, 0, 0],
      [0,  Math.cos(x_rotation), Math.sin(x_rotation)],
      [0, -Math.sin(x_rotation), Math.cos(x_rotation)]
    ];

    const y_rotation = (0/16) * (2 * Math.PI)
    const rotationY = [
      [ Math.cos(y_rotation), 0, Math.sin(y_rotation)],
      [0, 1, 0],
      [-Math.sin(y_rotation), 0, Math.cos(y_rotation)]
    ];

    const z_rotation = (1/16) * (2 * Math.PI)
    const rotationZ = [
      [Math.cos(z_rotation), -Math.sin(z_rotation), 0],
      [Math.sin(z_rotation),  Math.cos(z_rotation), 0],
      [0, 0, 1]
    ];

    let z
    let projected = [];

    // Loop through Model points and apply transformation and projection
    for (let h = 0; h < planes.length; h++) {
      let points = planes[h];
      let paths = new Array();
      let path = new Array();
      for (let i = 0; i < points.length; i++) {

        // Apply rotation
        let world = points[i]

        world = this.matrixMultiply(rotationY, world);
        world = this.matrixMultiply(rotationX, world);
        world = this.matrixMultiply(rotationZ, world);

        // Set projection matrix
        let distance = 8;
        // z = 1
        z = 1 / (distance - world[2]);
        const projection = [
          [z, 0, 0],
          [0, z, 0]
        ];

        // Translate Y
        // world[1] += 0.5;

        // Project model onto 2D surface
        let projected2d = this.matrixMultiply(projection, world);

        // Scale as necessary
        projected2d = this.matrixMultiply(projected2d, 4)

        // Push point to path
        path.push([
          projected2d[0], projected2d[1]
        ])
      }

      // And first point to close path
      path.push(path[0])

      // Add path to Paths
      paths.push(path);

      let color = "black"
      switch(h) {
        case 0:
          color = "green"
          break;
        case 1:
          color = "blue"
          break;
        case 2:
          color = "red"
          break;
        default:
          color = "black"
      }

      layers.push({
        "color": color,
        "paths": paths
      })
    }

    return layers;
  }

  sphere() {

    let PathHelp = new PathHelper;
    let layers = new Array();
    let paths = new Array();
    let path = new Array();

    // Define Model(s)
    let shapes = new Array();
    let shape = new Array();
    let sides = 48;
    let rings = 24;
    let radius = 2;
    for (let a = 1; a < rings; a++) {
      // if (a % 2 == 0) { continue }
      let shape = new Array();
      let y = PathHelp.map(a, 0, rings, -radius, radius)
      let theta_2 = Math.asin(y/radius)
      for (let i = 0; i < sides; i++) {
        let x = radius * Math.sin(theta_2 + Math.PI/2) * Math.cos(i/sides * 2 * Math.PI)
        let z = radius * Math.sin(theta_2 + Math.PI/2) * Math.sin(i/sides * 2 * Math.PI)
        shape.push([x,y,z])
      }
      shapes.push(shape);
    }

    // Define Transformations
    const x_rotation = (1/16) * (2 * Math.PI)
    const rotationX = [
      [1, 0, 0],
      [0,  Math.cos(x_rotation), Math.sin(x_rotation)],
      [0, -Math.sin(x_rotation), Math.cos(x_rotation)]
    ];

    const y_rotation = (2/16) * (2 * Math.PI)
    const rotationY = [
      [ Math.cos(y_rotation), 0, Math.sin(y_rotation)],
      [0, 1, 0],
      [-Math.sin(y_rotation), 0, Math.cos(y_rotation)]
    ];

    const z_rotation = (0/16) * (2 * Math.PI)
    const rotationZ = [
      [Math.cos(z_rotation), -Math.sin(z_rotation), 0],
      [Math.sin(z_rotation),  Math.cos(z_rotation), 0],
      [0, 0, 1]
    ];

    // Loop through Model points and apply transformation and projection
    for (let h = 0; h < shapes.length; h++) {

      // Perspective
      let paths = this.transform(shapes[h], [rotationY, rotationX], 6, 12)

      // Orthographic
      // let paths = this.transform(shapes[h], [rotationY, rotationX], 0.5, 1)

      let color = "black"
      switch(h) {
        case 0:
          color = "red"
          break;
        case 1:
          color = "green"
          break;
        case 2:
          color = "blue"
          break;
        default:
          color = "black"
      }

      layers.push({
        "color": color,
        "paths": paths
      })
    }

    return layers;
  }

  sphereSpiral() {

    let PathHelp = new PathHelper;
    let layers = new Array();

    // Define Model(s)
    let shapes = new Array();
    let shape = new Array();
    let sides = 48;
    let revolutions = 32;
    let radius = 2;
    for (let a = 0; a < revolutions; a++) {
      for (let i = 0; i < sides; i++) {
        let y = PathHelp.map(a*sides + i, 0, revolutions*sides, -radius, radius)
        let theta_2 = Math.asin(y/radius)
        let x = radius * Math.sin(theta_2 + Math.PI/2) * Math.cos(i/sides * 2 * Math.PI)
        let z = radius * Math.sin(theta_2 + Math.PI/2) * Math.sin(i/sides * 2 * Math.PI)
        shape.push([x,y,z])
      }
    }
    shapes.push(shape);

    // Define Transformations
    const x_rotation = (2/16) * (2 * Math.PI)
    const rotationX = [
      [1, 0, 0],
      [0,  Math.cos(x_rotation), Math.sin(x_rotation)],
      [0, -Math.sin(x_rotation), Math.cos(x_rotation)]
    ];

    const y_rotation = (0/16) * (2 * Math.PI)
    const rotationY = [
      [ Math.cos(y_rotation), 0, Math.sin(y_rotation)],
      [0, 1, 0],
      [-Math.sin(y_rotation), 0, Math.cos(y_rotation)]
    ];

    const z_rotation = (0/16) * (2 * Math.PI)
    const rotationZ = [
      [Math.cos(z_rotation), -Math.sin(z_rotation), 0],
      [Math.sin(z_rotation),  Math.cos(z_rotation), 0],
      [0, 0, 1]
    ];

    // Loop through Model points and apply transformation and projection
    for (let h = 0; h < shapes.length; h++) {

      // Perspective
      let paths = this.transform(shapes[h], [rotationY, rotationX], 6, 12)

      // Orthographic
      // let paths = this.transform(shapes[h], [rotationY, rotationX], 0.5, 1)

      let color = "black"
      switch(h) {
        case 0:
          color = "red"
          break;
        case 1:
          color = "green"
          break;
        case 2:
          color = "blue"
          break;
        default:
          color = "black"
      }

      layers.push({
        "color": color,
        "paths": paths
      })
    }

    return layers;
  }

  noisePlane(p5) {

    let PathHelp = new PathHelper;
    let layers = new Array();

    // Define Model(s)
    let shapes = new Array();
    let gridSize = 50;
    let noiseInScale = 10; // 10
    let noiseOutScale = 0.5; // 0.5
    let side_length = 4
    for (let x = 0; x < gridSize; x++) {
      let shape = new Array();
      for (let z = 0; z < gridSize; z++) {
        let y = noiseOutScale * p5.noise(noiseInScale * x/gridSize, noiseInScale * z/gridSize)
        shape.push([
          PathHelp.map(x, 0, gridSize, -side_length, side_length),
          y,
          PathHelp.map(z, 0, gridSize, -side_length, side_length)
        ])
      }
      shapes.push(shape);
    }

    for (let z = 0; z < gridSize; z++) {
      let shape = new Array();
      for (let x = 0; x < gridSize; x++) {
        let y = noiseOutScale * p5.noise(noiseInScale * x/gridSize, noiseInScale * z/gridSize)
        shape.push([
          PathHelp.map(x, 0, gridSize, -side_length, side_length),
          y,
          PathHelp.map(z, 0, gridSize, -side_length, side_length)
        ])
      }
      shapes.push(shape);
    }

    console.log(shapes);

    // Define Transformations
    const x_rotation = 0.05 * (2 * Math.PI)
    const rotationX = [
      [1, 0, 0],
      [0,  Math.cos(x_rotation), Math.sin(x_rotation)],
      [0, -Math.sin(x_rotation), Math.cos(x_rotation)]
    ];

    const y_rotation = (2/16) * (2 * Math.PI)
    const rotationY = [
      [ Math.cos(y_rotation), 0, Math.sin(y_rotation)],
      [0, 1, 0],
      [-Math.sin(y_rotation), 0, Math.cos(y_rotation)]
    ];

    // Loop through Model points and apply transformation and projection
    for (let h = 0; h < shapes.length; h++) {

      // Perspective
      let paths = this.transform(shapes[h], [rotationY, rotationX], 4, 12)

      // Orthographic
      // let paths = this.transform(shapes[h], [rotationY, rotationX], 0.5, 1)

      layers.push({
        "color": "black",
        "paths": paths
      })
    }

    return layers;
  }

  geoData() {

    let Iso = new Isolines();
    let geoData = Iso.getData();
    let geoDataMin = Iso.getDataMin(geoData)
    let geoDataMax = Iso.getDataMax(geoData)

    let PathHelp = new PathHelper;
    let layers = new Array();

    // Define Model(s)
    let shapes = new Array();
    let x_max = geoData[0].length;
    let z_max = geoData.length;

    // Note: This may be mirrored along the x or z axis

    let grid_unit = 4
    for (let x = 0; x < x_max; x++) {
      let shape = new Array();
      for (let z = 0; z < z_max; z++) {
        let y = 0;
        shape.push([
          PathHelp.map(x, 0, x_max, -grid_unit, grid_unit),
          PathHelp.map(-geoData[x][z], geoDataMin, geoDataMax, 0, 0.5),
          PathHelp.map(z, 0, z_max, -grid_unit, grid_unit)
        ])
      }
      shapes.push(shape);
    }

    for (let z = 0; z < z_max; z++) {
      let shape = new Array();
      for (let x = 0; x < x_max; x++) {
        let y = 0;
        shape.push([
          PathHelp.map(x, 0, x_max, -grid_unit, grid_unit),
          PathHelp.map(-geoData[x][z], geoDataMin, geoDataMax, 0, 0.5),
          PathHelp.map(z, 0, z_max, -grid_unit, grid_unit)
        ])
      }
      shapes.push(shape);
    }

    // Define Transformations
    const x_rotation = .09 * (2 * Math.PI)
    const rotationX = [
      [1, 0, 0],
      [0,  Math.cos(x_rotation), Math.sin(x_rotation)],
      [0, -Math.sin(x_rotation), Math.cos(x_rotation)]
    ];

    const y_rotation = (3/8) * (2 * Math.PI)
    const rotationY = [
      [ Math.cos(y_rotation), 0, Math.sin(y_rotation)],
      [0, 1, 0],
      [-Math.sin(y_rotation), 0, Math.cos(y_rotation)]
    ];

    // Loop through Model points and apply transformation and projection
    for (let h = 0; h < shapes.length; h++) {

      // Perspective
      let paths = this.transform(shapes[h], [rotationY, rotationX], 4, 14)

      // Orthographic
      // let paths = this.transform(shapes[h], [rotationY, rotationX], 0.5, 1)

      layers.push({
        "color": "black",
        "paths": paths
      })
    }

    return layers;
  }

  grandPrix() {

    let Iso = new Isolines();

    // Load Geo Data
    let geoData = f1.portimao.terrain.elevations

    let lat_min = f1.portimao.terrain.bbox[1] // y
    let lat_max = f1.portimao.terrain.bbox[3]
    let long_min = f1.portimao.terrain.bbox[0] // x
    let long_max = f1.portimao.terrain.bbox[2]

    let geoDataMin = Iso.getDataMin(geoData)
    let geoDataMax = Iso.getDataMax(geoData)

    let PathHelp = new PathHelper;
    let layers = new Array();

    // Define Model(s)
    let shapes = new Array();
    let x_max = geoData[0].length;
    let y_max = geoData.length;

    // Note: This may be mirrored along the x or z axis

    let grid_unit = 5

    let elevation_scale = 1
    let scale = 5;
    let distance = 12;
    let crop = 10;

    // Vertical Lines of constant Longitude
    //*
    for (let x = 0 + crop; x < x_max - crop; x+=1) {
      let shape = new Array();
      for (let y = 0 + crop; y < y_max - crop; y+=1) {

        let px = PathHelp.map(x, 0, x_max, -grid_unit, grid_unit)
        let py = PathHelp.map(y, 0, y_max, -grid_unit, grid_unit)
        let pz = PathHelp.map(geoData[y][x], geoDataMin, geoDataMax, 0, elevation_scale)

        // Trim to circle
        // if (Math.abs(py) > Math.abs(0.75 * grid_unit * Math.sin(Math.atan2(py,px)))) {
        if (Math.abs(py) > Math.abs((y_max - 2 * crop)/(y_max-1) * grid_unit * Math.sin(Math.atan2(py,px)))) {
          continue;
        }

        shape.push([px, py, pz])
      }
      shapes.push(shape);
    }

    //*/

    // Horizontal Lines of constant Latitude
    //*
    for (let y = 0 + crop; y < y_max - crop; y+=1) {
      let shape = new Array();
      for (let x = 0 + crop; x < x_max - crop; x+=1) {

        let px = PathHelp.map(x, 0, x_max, -grid_unit, grid_unit)
        let py = PathHelp.map(y, 0, y_max, -grid_unit, grid_unit)
        let pz = PathHelp.map(geoData[y][x], geoDataMin, geoDataMax, 0, elevation_scale)

        // Trim to circle
        if (Math.abs(px) > Math.abs((x_max - 2 * crop)/(x_max-1) * grid_unit * Math.cos(Math.atan2(py,px)))) {
          continue;
        }

        shape.push([px, py, pz])
      }
      shapes.push(shape);
    }
    //*/

    // Define Transformations
    const x_rotation = (-2.5/16) * (2 * Math.PI) // 0.09
    const rotationX = [
      [1, 0, 0],
      [0,  Math.cos(x_rotation), Math.sin(x_rotation)],
      [0, -Math.sin(x_rotation), Math.cos(x_rotation)]
    ];

    const y_rotation = (0/16) * (2 * Math.PI) // 3/8
    const rotationY = [
      [ Math.cos(y_rotation), 0, Math.sin(y_rotation)],
      [0, 1, 0],
      [-Math.sin(y_rotation), 0, Math.cos(y_rotation)]
    ];

    const z_rotation = (-1/16) * (2 * Math.PI)
    const rotationZ = [
      [Math.cos(z_rotation), -Math.sin(z_rotation), 0],
      [Math.sin(z_rotation),  Math.cos(z_rotation), 0],
      [0, 0, 1]
    ];

    // Loop through Model points and apply transformation and projection
    let paths = new Array();
    for (let h = 0; h < shapes.length; h++) {

      // Perspective
      paths = paths.concat(this.transform(shapes[h], [rotationZ, rotationY, rotationX], scale, distance));

      // Orthographic
      // paths = paths.concat(this.transform(shapes[h], [rotationZ, rotationY, rotationX], 0.5, 1));
    }
    layers.push({
      "color": "green",
      "paths": paths
    })

    //////// TRACK

    shapes = new Array();
    let shape = new Array();

    // Extract Track coordinates to a polyline
    let path = new Array();
    for (let coordinate of f1.portimao.track.features[0].geometry.coordinates) {
      let x = PathHelp.map(
        PathHelp.map(coordinate[0], long_min, long_max, 0, x_max),
        0, x_max, -grid_unit, grid_unit
      );

      let y = PathHelp.map(
        PathHelp.map(coordinate[1], lat_min, lat_max, 0, y_max),
        0, y_max, grid_unit, -grid_unit
      )
      path.push([x,y])
    }

    // Expand single path to parallel paths
    let parallel_paths = new Array();
    parallel_paths.push(path);
    parallel_paths = parallel_paths.concat(PathHelp.expandPath(path, 0.025, 0.025, 'open'));
    parallel_paths = parallel_paths.concat(PathHelp.expandPath(path, 0.05, 0.05, 'open'));

    for (let i = 0; i < parallel_paths.length; i++) {
      shape = new Array();
      for (let point of parallel_paths[i]) {
        // Interpolate Z value from terrain
        let coordinate_x = PathHelp.map(point[0], -grid_unit, grid_unit, 0, x_max)
        let nearest_x_min = Math.floor(coordinate_x)
        let nearest_x_max = Math.ceil(coordinate_x)

        let coordinate_y = PathHelp.map(point[1], -grid_unit, grid_unit, 0, x_max)
        let nearest_y_min = Math.floor(coordinate_y)
        let nearest_y_max = Math.ceil(coordinate_y)

        // Nearest Neighbor
        // let z = PathHelp.map(geoData[nearest_y_min][nearest_x_min], geoDataMin, geoDataMax, 0, elevation_scale)

        // Bilinear interpolation
        let interpolated_elevation = PathHelp.map(
          coordinate_y,
          nearest_y_min,
          nearest_y_max,
          PathHelp.map(coordinate_x, nearest_x_min, nearest_x_max, geoData[nearest_y_min][nearest_x_min], geoData[nearest_y_min][nearest_x_max]),
          PathHelp.map(coordinate_x, nearest_x_min, nearest_x_max, geoData[nearest_y_max][nearest_x_min], geoData[nearest_y_max][nearest_x_max])
        )
        let z = PathHelp.map(interpolated_elevation, geoDataMin, geoDataMax, 0, elevation_scale)

        shape.push([point[0],point[1],z])
      }
      shapes.push(shape);
    }

    // Loop through Model points and apply transformation and projection
    paths = new Array();
    for (let h = 0; h < shapes.length; h++) {

      // Perspective
      paths = paths.concat(this.transform(shapes[h], [rotationZ, rotationY, rotationX], scale, distance))

      // Orthographic
      // paths = paths.concat(this.transform(shapes[h], [rotationY, rotationX, rotationZ], 0.5, 1))
    }
    layers.push({
      "color": "black",
      "paths": paths
    })

    return layers;
  }

  geoIsolines(p5) {

    // Get Geo Elevation Isolines from other class
    let Iso = new Isolines();

    let isoline_layers = Iso.drawIsolines(p5)
    // console.log(isoline_layers)

    let PathHelp = new PathHelper();

    let layers = new Array();

    // Note: This may be mirrored along the x or z axis
    let shapes = new Array();
    for (let a = 0; a < isoline_layers.length; a++) {
      let layer = isoline_layers[a];
      let paths = layer.paths
      for (let b = 0; b < paths.length; b++) {
        let path = paths[b];
        let shape = new Array()
        for (let c = 0; c < path.length; c++) {
          let point = path[c]
          shape.push([
            point[0],
            PathHelp.map(-a, 0, isoline_layers.length, 0, 0.2),
            // -b * 0.005,
            point[1],
          ])
        }
        shapes.push(shape);
      }
    }

    // Define Transformations
    const x_rotation = (2/32) * (2 * Math.PI)
    const rotationX = [
      [1, 0, 0],
      [0,  Math.cos(x_rotation), Math.sin(x_rotation)],
      [0, -Math.sin(x_rotation), Math.cos(x_rotation)]
    ];

    const y_rotation = (2/16) * (2 * Math.PI)
    const rotationY = [
      [ Math.cos(y_rotation), 0, Math.sin(y_rotation)],
      [0, 1, 0],
      [-Math.sin(y_rotation), 0, Math.cos(y_rotation)]
    ];

    // Loop through Model points and apply transformation and projection
    for (let h = 0; h < shapes.length; h++) {

      // Perspective
      let paths = this.transform(shapes[h], [rotationY, rotationX], 14, 12)

      // Orthographic
      // let paths = this.transform(shapes[h], [rotationY, rotationX], 0.5, 1)

      layers.push({
        "color": "black",
        "paths": paths
      })
    }

    return layers;
  }

  transform(points, transforms, scale = 1, distance = 1) {

    let paths = new Array();
    let path = new Array();
    let z;
    for (let i = 0; i < points.length; i++) {

      // Apply transformation(s)
      let world = points[i]
      for (let transform of transforms) {
        world = this.matrixMultiply(transform, world);
      }

      // Set projection matrix
      z = distance;
      if (distance > 1) {
        z = 1 / (distance - world[2]);
      }
      let projection = [
        [z, 0, 0],
        [0, z, 0]
      ];

      // Translation matrix
      // Temp for this sketch only
      // TODO: make transform loop above able to handle a 4x4 matrix
      /*
      world = this.matrixMultiply([
        [1,0,0,0.5],
        [0,1,0,],
        [0,0,1,0],
        [0,0,0,1]
      ], world.concat(1));
      //*/

      // Project model onto 2D surface
      let projected2d = this.matrixMultiply(projection, world);

      // Scale
      if (scale !== 1) {
        projected2d = this.matrixMultiply(projected2d, scale)
      }

      // Push point to path
      path.push([
        projected2d[0], projected2d[1]
      ])
    }

    // Add path to Paths
    paths.push(path);

    return paths;
  }

  /**
   * Multiply two matrices
   * @param Array Input Matrix
   * @param Array Input Matrix
   * @return Array
   */
  matrixMultiply(a, b) {
    let result = new Array(b.length)
    for (let i = 0; i < a.length; i++) {
      if (Array.isArray(b)) {
        result[i] = this.dotProduct(a[i], b)
      } else {
        result[i] = a[i] * b
      }
    }
    return result;
  }

  /**
   * Perform the dot product between two matrices
   * @param Array Input Matrix
   * @param Array Input Matrix
   * @return Integer Scalar dot product
   */
  dotProduct(a, b) {
    let dot_product = 0;
    for (let i = 0; i < a.length; i++) {
      dot_product += a[i] * b[i]
    }
    return dot_product;
  }

}