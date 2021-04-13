const d = {
  a: 5,
  b: 6,
  c: {
    f: 9,
    g: {
      m: 17,
      n: 3
    }
  }
}

// Полный рекурсивный обход
function flatten(obj) {
  function makeFlatEntriesArray (entry, prevKey) {
    return Object
      .entries(entry)
      .reduce((acc, entry) => {
        if (typeof entry[1] === 'object') {
          acc.push(
            ...makeFlatEntriesArray(
              entry[1],
              prevKey
                ? prevKey.concat('.', entry[0])
                : entry[0]
            )
          )
        } else {
          acc.push(
            prevKey
              ? [prevKey.concat('.', entry[0]), entry[1]]
              : entry)
        }

        return acc
      }, [])
  }

  return Object.fromEntries(makeFlatEntriesArray(obj))
}

console.log(flatten(d))

/* Вывод
[object Object] {
  a: 5,
  b: 6,
  c.f: 9,
  c.g.m: 17,
  c.g.n: 3
}
*/

// Лучшее решение

const flatten = (source) => {
  const result = {};
  const readObject = (obj, prevKey = "") => Object
    .keys(obj)
    .forEach((key) => {
      const val = obj[key];
      if (typeof val !== "object") {
        result[prevKey ? `${prevKey}.${key}`: key] = val;
      } else {
        readObject(val, prevKey ? `${prevKey}.${key}`: key);
      }
    });
    
  return readObject(source);
};
