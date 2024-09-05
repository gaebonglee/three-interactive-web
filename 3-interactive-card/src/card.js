import * as Three from "three";

class Card {
  constructor({ width, height, radius, color }) {
    const x = width / 2 - radius;
    const y = height / 2 - radius;

    const shape = new Three.Shape();

    shape
      .absarc(x, y, radius, Math.PI / 2, 0, true)
      .lineTo(x + radius, -y)
      .absarc(x, -y, radius, 0, -Math.PI / 2, true)
      .lineTo(-x, -(y + radius))
      .absarc(-x, -y, radius, -Math.PI / 2, Math.PI, true)
      .lineTo(-(x + radius), y, radius, Math.PI, Math.PI / 2, true)
      .absarc(-x, y, radius, Math.PI, Math.PI / 2, true);

    const geometry = new Three.ExtrudeGeometry(shape, {
      depth: 0.01,
      bevelThickness: 0.1,
    });
    const material = new Three.MeshStandardMaterial({
      color,
      side: Three.DoubleSide,
      roughness: 0.3,
      metalness: 0.6,
    });

    const mesh = new Three.Mesh(geometry, material);
    this.mesh = mesh;
  }
}

export default Card;
