const checkMode = () => {
  const mode = localStorage.getItem("mode");
  if (!mode) {
    localStorage.setItem("mode", "light");
  } else {
    document.body.classList.add(mode);
  }
  return mode;
};

export default checkMode;
