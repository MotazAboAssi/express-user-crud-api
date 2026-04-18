function isEmptyOrUndefineObject(obj) {
  return (
    obj === undefined ||
    Object.keys(obj).length === 0
  );
}
module.exports = { isEmptyOrUndefineObject }