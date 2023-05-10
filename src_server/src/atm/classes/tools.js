export class Tools {
  static calculatePointFromOffsetWithHeading(position, offset, heading) {
    const offsetObjectRotation = new mp.Vector3(0, 0, heading);

    return new mp.Vector3(
      position.x + offset.x * Math.cos(offsetObjectRotation.z) - offset.y * Math.sin(offsetObjectRotation.z),
      position.y + offset.x * Math.sin(offsetObjectRotation.z) + offset.y * Math.cos(offsetObjectRotation.z),
      position.z + offset.z
    );
  }
}
