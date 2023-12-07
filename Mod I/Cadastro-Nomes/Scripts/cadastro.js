let names = [];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener("load", () => {
  inputName = document.querySelector("#userInput");
  preventFormSubmit();
  activateInput();
});

const preventFormSubmit = () => {
  const handleFormSubmittion = (e) => {
    e.preventDefault();
  };
  let form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmittion);
};

const activateInput = () => {
  const insertName = (newName) => {
    names = [...names, newName];
    render();
  };

  const updateName = (newName) => {
    names[currentIndex] = newName;
    render();
  };

  const handleTyping = (e) => {
    let hasText = !!e.target.value && e.target.value.trim() !== "";

    if (!hasText) {
      return;
    }

    if (e.key === "Enter") {
      if (isEditing) {
        console.log("editing..");
        updateName(event.target.value);
      } else {
        console.log("updating");
        insertName(e.target.value);
      }
      isEditing = false;
      clearInput();
    }
  };
  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
};

const render = () => {
  const createCloseButton = (i) => {
    const deleteName = () => {
      names.splice(i, 1);

      render();
    };

    let closeButton = document.createElement("button");
    closeButton.textContent = "\u00D7";
    closeButton.addEventListener("click", deleteName);
    return closeButton;
  };

  const createSpan = (nome, i) => {
    const editItem = () => {
      inputName.value = nome;
      inputName.focus();
      isEditing = true;
      currentIndex = i;
    };

    let span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = nome;
    span.addEventListener("click", editItem);

    return span;
  };

  let divNames = document.querySelector("#listItems");
  divNames.innerHTML = "";

  let ul = document.createElement("ul");

  for (let i = 0; i < names.length; i++) {
    let currentName = names[i];

    let li = document.createElement("li");
    let closeButton = createCloseButton(i);
    let span = createSpan(currentName, i);

    li.appendChild(closeButton);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
};

const clearInput = () => {
  inputName.value = "";
  inputName.focus();
};
