function add(num) {
  const argements = add.arguments;
  console.log("argements", add.arguments);
  if (num != null) {
    return add.bind(null, argements);
  } else {
    return argements.reducer((cv, pv) => {
      return cv + pv;
    }, 0);
  }
}

add(1);
