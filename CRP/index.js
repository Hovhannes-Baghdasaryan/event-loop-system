const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const button = document.getElementById("run_button");
const div_span1 = document.getElementById("div_span1");
const div_span2 = document.getElementById("div_span2");
const p_span1 = document.getElementById("p_span1");
const p_span2 = document.getElementById("p_span2");
const p_span1_text = document.getElementById("p_span1_text");
const p_span2_text = document.getElementById("p_span2_text");
const class_span = document.getElementById("class_span");
const texts = Array.from(document.querySelectorAll("span"));

let color = "";
let tagSelectedValue = "";

select1.addEventListener("change", (event) => {
  tagSelectedValue = event.target.value;
});

select2.addEventListener("change", (event) => {
  color = event.target.value;
});

button.addEventListener("click", () => {
  if (color && tagSelectedValue) {
    if (+tagSelectedValue === 1) {
      p_span1.classList.add("p_anim2");
      p_span2.classList.add("p_anim1");

      setTimeout(() => {
        p_span1_text.classList.add(color);
        p_span2_text.classList.add(color);
      }, 5500);

      setTimeout(() => {
        p_span1.removeAttribute("class");
        p_span2.removeAttribute("class");
        p_span1_text.classList.remove(color);
        p_span2_text.classList.remove(color);
      }, 7200);
    }

    if (+tagSelectedValue === 2) {
      p_span1.classList.add("div_p_anime1");
      p_span2.classList.add("div_p_anime2");

      div_span1.classList.add("div_p_anime3");
      div_span2.classList.add("div_p_anime3");

      setTimeout(() => {
        p_span1_text.classList.add(color);
      }, 10000);

      setTimeout(() => {
        p_span1.removeAttribute("class");
        p_span2.removeAttribute("class");
        div_span2.removeAttribute("class");
        div_span1.removeAttribute("class");
        p_span1_text.classList.remove(color);
        p_span2_text.classList.remove(color);
      }, 11000);
    }

    if (+tagSelectedValue === 3) {
      class_span.classList.add("class_text");

      setTimeout(() => {
        class_span.classList.remove("class_text");
      }, 2000);

      setTimeout(() => {
        p_span1_text.classList.add(color);
      }, 3000);

      setTimeout(() => {
        p_span1.removeAttribute("class");
        p_span2.removeAttribute("class");
        p_span1_text.classList.remove(color);
        p_span2_text.classList.remove(color);
      }, 4000);
    }
  } else {
    alert("Please Select values");
  }
});
