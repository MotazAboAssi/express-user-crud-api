function isNotEmptyOrUndefineObject(obj) {
  return (
    obj === undefined ||
    Object.keys(obj).length === 0
  );
}
module.exports = { isNotEmptyOrUndefineObject }