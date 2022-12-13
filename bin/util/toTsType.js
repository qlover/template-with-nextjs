function toTsType(strs) {
  return strs.map((i) => "'" + i + "'").join(' | ');
}
module.exports = { toTsType };
