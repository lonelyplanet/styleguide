function updateStyles(name, styles) {
  return {
    type: "UPDATE_STYLES",
    data: {
      name, styles
    },
  };
}

export {
  updateStyles,
};
