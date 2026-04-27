function isNotEmptyOrUndefineObject(obj) {
  console.log(obj )
  return (
    obj !== undefined && obj !== null &&
    Object.keys(obj).length !== 0
  );
}
module.exports = { isNotEmptyOrUndefineObject }