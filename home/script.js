const crpTexts = Array.from(
  document.querySelectorAll("div.section_crp_text_block  > p.section_text")
);
const eventTexts = Array.from(
  document.querySelectorAll("div.section_loop_text_block  > p.section_text")
);

crpTexts.map((element, index) => {
  element.classList.add("animate__animated");
  element.classList.add("animate__fadeInLeftBig");

  element.style.setProperty("--animate-duration", `${(index + 1) * 0.6}s`);
});

eventTexts.map((element, index) => {
  element.classList.add("animate__animated");
  element.classList.add("animate__fadeInRightBig");

  element.style.setProperty("--animate-duration", `${(index + 1) * 0.6}s`);
});
