document.querySelectorAll(".radio-input").forEach((item, idx) => {
  item.addEventListener("change", () => {
    document.querySelectorAll(".sub-container").forEach((content, idt) => {
      if (idx !== idt) {
        content.classList.remove("active");
      }
    });
    document.querySelectorAll(".sub-container")[idx].classList.add("active");
  });
});

document.querySelectorAll(".common-input").forEach((item, index) => {
  item.addEventListener("change", () => {
    if (item.getAttribute("target") == "vessel-container") {
      if (item.value !== "Select") {
        findArea(item);
      } else {
        unchecking(item);
      }
    }
    if (item.checked == true) {
      findArea(item);
      if (
        item.classList.contains("company-input") ||
        item.classList.contains("fleet-input") ||
        item.classList.contains("type-input")
      ) {
        let parent = item.parentElement.parentElement;
        let setInputs = Array.from(parent.querySelectorAll(`input`));
        setInputs.shift();

        let checker = setInputs.every((inp) => {
          return inp.checked == true;
        });

        if (checker) {
          parent.querySelector(".all-input").checked = true;
        }
      }
    } else if (item.checked == false) {
      if (item.classList.contains("all-input")) {
        let parent = item.parentElement.parentElement;
        let setInputs = parent.querySelectorAll(`input`);
        setInputs.forEach((checkBtn) => {
          if (checkBtn.getAttribute("value") !== "All") {
            checkBtn.checked = false;
            unchecking(checkBtn);
          }
        });
      } else {
        unchecking(item);
      }

      if (
        item.classList.contains("company-input") ||
        item.classList.contains("fleet-input") ||
        item.classList.contains("type-input")
      ) {
        let parent = item.parentElement.parentElement;
        let setInputs = Array.from(parent.querySelectorAll(`input`));
        setInputs.shift();

        let checker = setInputs.some((inp) => {
          return inp.checked == false;
        });

        if (checker) {
          parent.querySelector(".all-input").checked = false;
        }
      }
    }

    let pclose = document.querySelectorAll(".close");

    pclose.forEach((close) => {
      close.addEventListener("click", function () {
        this.parentElement.remove();
        let value = this.previousElementSibling.textContent;
        if (value == "Boi" || value == "Moi") {
          document.querySelector("select").value = "Select";
        } else {
          document.querySelectorAll(".common-input").forEach((data) => {
            if (data.value == value) {
              data.checked = false;

              if (
                data.classList.contains("company-input") ||
                data.classList.contains("fleet-input") ||
                data.classList.contains("type-input")
              ) {
                let parent = data.parentElement.parentElement;
                let setInputs = Array.from(parent.querySelectorAll(`input`));
                setInputs.shift();

                let checker = setInputs.some((inp) => {
                  return inp.checked == false;
                });

                if (checker) {
                  parent.querySelector(".all-input").checked = false;
                }
              }
            }
          });
        }

        hider();
      });
    });

    hider();
  });
});

function hider() {
  let yearInput = Array.from(document.querySelectorAll(".year-input"));
  let periodCheckers = yearInput.some((pitem) => {
    return pitem.checked == true;
  });
  if (periodCheckers) {
    document.querySelector(".container2").classList.add("active");
  } else if (!periodCheckers) {
    companyReset();
    fleetReset();
    flagReset();
    typeReset();
    vesselReset();
    yardReset();
  }
  let companyInput = Array.from(document.querySelectorAll(".company-input"));
  let companyCheckers = companyInput.some((pitem) => {
    return pitem.checked == true;
  });
  if (companyCheckers) {
    document.querySelector(".container3").classList.add("active");
  } else if (!companyCheckers) {
    fleetReset();
    flagReset();
    typeReset();
    vesselReset();
    yardReset();
  }
  let fleetInput = Array.from(document.querySelectorAll(".fleet-input"));
  let fleetCheckers = fleetInput.some((pitem) => {
    return pitem.checked == true;
  });
  if (fleetCheckers) {
    document.querySelector(".container4").classList.add("active");
  } else if (!fleetCheckers) {
    flagReset();
    typeReset();
    vesselReset();
    yardReset();
  }
  let flagInput = Array.from(document.querySelectorAll(".flag-input"));
  let flagCheckers = flagInput.some((pitem) => {
    return pitem.checked == true;
  });
  if (flagCheckers) {
    document.querySelector(".container5").classList.add("active");
  } else if (!flagCheckers) {
    typeReset();
    vesselReset();
    yardReset();
  }

  let typeInput = Array.from(document.querySelectorAll(".type-input"));
  let typeCheckers = typeInput.some((pitem) => {
    return pitem.checked == true;
  });
  if (typeCheckers) {
    document.querySelector(".container6").classList.add("active");
  } else if (!typeCheckers) {
    vesselReset();
    yardReset();
  }

  let vesselInput = document.querySelector(".vessel-input");

  if (vesselInput.value !== "Select") {
    document.querySelector(".container7").classList.add("active");
  } else if (vesselInput.value == "Select") {
    yardReset();
  }
}
function findArea(input) {
  if (input.classList.contains("all-input")) {
    let parent = input.parentElement.parentElement;
    let setInputs = parent.querySelectorAll(`input`);
    setInputs.forEach((checkBtn) => {
      if (checkBtn.getAttribute("value") !== "All") {
        checkBtn.checked = true;
        let target = checkBtn.getAttribute("target");
        creatingbtn(checkBtn, target);
      }
    });
  } else {
    let target = input.getAttribute("target");
    creatingbtn(input, target);
  }
}

function creatingbtn(input, targetContainer) {
  let btns = document.querySelectorAll(".tag-btn");
  let btnSpan = document.querySelectorAll(".tag-btn span");
  if (btns) {
    if (input.getAttribute("target") == "vessel-container") {
      btnSpan.forEach((btn) => {
        if (btn.textContent == "Boi" || btn.textContent == "Moi") {
          btn.parentElement.remove();
        }
      });
    } else {
      btnSpan.forEach((btn) => {
        if (input.value == btn.textContent) {
          btn.parentElement.remove();
        }
      });
    }
  }

  let button = document.createElement("button");

  button.setAttribute("class", `tag-btn`);

  button.style.display = "flex";
  button.innerHTML = `<span>${input.value}</span><p class ='close'>+</p>`;
  document.querySelector(`.${targetContainer}`).appendChild(button);
}

function unchecking(input) {
  let btns = document.querySelectorAll(".tag-btn");
  let btnSpan = document.querySelectorAll(".tag-btn span");
  if (btns) {
    if (input.getAttribute("target") == "vessel-container") {
      btnSpan.forEach((btn) => {
        if (btn.textContent == "Boi" || btn.textContent == "Moi") {
          btn.parentElement.remove();
        }
      });
    } else {
      btnSpan.forEach((btn) => {
        if (input.value == btn.textContent) {
          btn.parentElement.remove();
        }
      });
    }
  }
}

function companyReset() {
  document.querySelectorAll(".container2 input").forEach((data) => {
    data.checked = false;
  });
  document.querySelectorAll(".company-container button").forEach((btn) => {
    btn.remove();
  });
  document.querySelector(".container2").classList.remove("active");
}

function fleetReset() {
  document.querySelectorAll(".container3 input").forEach((data) => {
    data.checked = false;
  });
  document.querySelectorAll(".fleet-container button").forEach((btn) => {
    btn.remove();
  });
  document.querySelector(".container3").classList.remove("active");
}

function flagReset() {
  document.querySelectorAll(".container4 input").forEach((data) => {
    data.checked = false;
  });
  document.querySelectorAll(".flag-container button").forEach((btn) => {
    btn.remove();
  });
  document.querySelector(".container4").classList.remove("active");
}

function typeReset() {
  document.querySelectorAll(".container5 input").forEach((data) => {
    data.checked = false;
  });
  document.querySelectorAll(".type-container button").forEach((btn) => {
    btn.remove();
  });
  document.querySelector(".container5").classList.remove("active");
}

function vesselReset() {
  document.querySelector("select").value = "Select";
  document.querySelectorAll(".vessel-container button").forEach((btn) => {
    btn.remove();
  });
  document.querySelector(".container6").classList.remove("active");
}

function yardReset() {
  document.querySelectorAll(".container7 input").forEach((data) => {
    data.checked = false;
  });
  document.querySelectorAll(".yard-container button").forEach((btn) => {
    btn.remove();
  });

  document.querySelector(".container7").classList.remove("active");
}
