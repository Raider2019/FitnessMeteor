const select = document.querySelector("select");
const allLangs = ["ru", "ua", "eng"];
let currentLang = localStorage.getItem("language") || "ua";
const langButtons = document.querySelectorAll("[data-btn]");
const currentPathName = window.location.pathname;
let currentTextObject = {};
const myForm = document.forms["FeedForm"];
const MyFormfnameInput = myForm.fname;
const MyFormphonenameInput = myForm.phonename;
const MyFormemailnameInput = myForm.emailname;
const MyFormfnameInputPlaceholder = MyFormfnameInput.placeholder;
const MyFormphonenameInputPlaceholder = MyFormphonenameInput.placeholder;
const MyFormemailnameInputPlaceholder = MyFormemailnameInput.placeholder;
function openSheldulen(evt, dayName) {
  // Declare all variables
  var i, tabcontents, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontents = document.getElementsByClassName("tabcontents");
  for (i = 0; i < tabcontents.length; i++) {
    tabcontents[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(dayName).style.display = "flex";
  evt.currentTarget.className += " active";
}
// Функція для визначення текстового об'єкта залежно від шляху сторінки
function checkPagePathName() {
  switch (currentPathName) {
    case "/index.html":
      currentTextObject = TextArr;
      break;
    default:
      currentTextObject = TextArr;
      break;
  }
}
checkPagePathName();

// Функція для зміни мови на сторінці
function changeLang() {
  for (const key in currentTextObject) {
    const elem = document.querySelector(`[data-lang=${key}]`);
    if (elem) {
      elem.innerHTML = currentTextObject[key][currentLang];
    }
  }
}
changeLang();

// Функція для видалення класу "active" з всіх елементів масиву
function resetActiveClass(arr, activeClass) {
  arr.forEach((elem) => {
    elem.classList.remove(activeClass);
  });
}

// Функція для визначення активного класу для кнопок зміни мови
function checkActiveLangButton() {
  switch (currentLang) {
    case "ru":
      document
        .querySelector(`[data-btn="ru"]`)
        .classList.add("btn__lang_active");
      break;
    case "ua":
      document
        .querySelector(`[data-btn="ua"]`)
        .classList.add("btn__lang_active");
      break;
    case "eng":
      document
        .querySelector(`[data-btn="eng"]`)
        .classList.add("btn__lang_active");
      break;
    default:
      document
        .querySelector(`[data-btn="ru"]`)
        .classList.add("btn__lang_active");
      break;
  }
}

// Додаємо обробники подій для кнопок зміни мови
langButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    currentLang = event.target.dataset.btn;
    localStorage.setItem("language", event.target.dataset.btn);
    resetActiveClass(langButtons, "btn__lang_active");
    btn.classList.add("btn__lang_active");
    changeLang();
  });
});

// Викликаємо функції для визначення мови та активної кнопки мови
checkActiveLangButton();

function ShowLightbox() {
  document.querySelectorAll(".gallary__img__row img").forEach((img) => {
    img.onclick = () => {
      document.querySelector(".pop-up").style.display = "block";
      document.querySelector(".pop-up img").src = img.getAttribute("src");
      document.querySelector(".pop-up .pop-up-title").innerHTML =
        img.getAttribute("data-title");
    };
  });

  document.querySelector(".pop-up span").onclick = () => {
    document.querySelector(".pop-up").style.display = "none";
  };
}
ShowLightbox();
function nametest(input) {
  return !/^[A-Za-zА-Яа-яїЇіІ]+(?:[-'\s][A-Za-zА-Яа-яїЇіІ]+)*$/.test(
    input.value
  );
}

function phonetest(input) {
  return !/^(\+38)?0(39|50|63|66|67|68|73|89|9[1-9])[0-9]{7}$/.test(
    input.value
  );
}
function emailtest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
}
function FormApp() {
  MyFormfnameInput.addEventListener("focus", function (e) {
    MyFormfnameInput.placeholder = "";
    if (MyFormfnameInput.nextElementSibling) {
      MyFormfnameInput.nextElementSibling.remove();
    }
  });

  MyFormfnameInput.addEventListener("blur", function (e) {
    MyFormfnameInput.placeholder = MyFormfnameInputPlaceholder;
  });
  MyFormphonenameInput.addEventListener("focus", function (e) {
    MyFormphonenameInput.placeholder = "";
    if (MyFormphonenameInput.nextElementSibling) {
      MyFormphonenameInput.nextElementSibling.remove();
    }
  });
  MyFormphonenameInput.addEventListener("blur", function (e) {
    MyFormphonenameInput.placeholder = MyFormphonenameInputPlaceholder;
  });
  MyFormemailnameInput.addEventListener("focus", function (e) {
    MyFormemailnameInput.placeholder = "";
    if (MyFormemailnameInput.nextElementSibling) {
      MyFormemailnameInput.nextElementSibling.remove();
    }
  });
  MyFormemailnameInput.addEventListener("blur", function (e) {
    MyFormemailnameInput.placeholder = MyFormemailnameInputPlaceholder;
  });
  MyFormemailnameInput.addEventListener("paste", function (e) {
    event.preventDefault();
    alert("Dont paste email");
  });

  myForm.addEventListener("submit", function (event) {
    if (
      !MyFormfnameInput.value ||
      !MyFormphonenameInput.value ||
      !MyFormemailnameInput.value
    ) {
      Swal.fire("Error Void Data!!");
      event.preventDefault();
    } else if (nametest(MyFormfnameInput)) {
      MyFormfnameInput.parentElement.insertAdjacentHTML(
        "beforeend",
        '<div class="form-error">Введіть коректне імя </div>'
      );
      event.preventDefault();
    } else if (phonetest(MyFormphonenameInput)) {
      MyFormphonenameInput.parentElement.insertAdjacentHTML(
        "beforeend",
        '<div class="form-error">Введіть коректний телефон </div>'
      );
      event.preventDefault();
    } else if (emailtest(MyFormemailnameInput)) {
      MyFormemailnameInput.parentElement.insertAdjacentHTML(
        "beforeend",
        '<div class="form-error">Введіть коректний email</div>'
      );
      event.preventDefault();
    } else {
      Swal.fire({
        text: "You send data!",
        icon: "success",
      });

      myForm.reset();
      event.preventDefault();
    }
  });
}
FormApp();
