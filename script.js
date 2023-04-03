const MIN_CHARACTER = 2;
const MAX_CHARACTER = 25;
const DATE_TODAY = new Date().toISOString().split("T")[0];

const form = document.getElementById("form");
const firstName = document.getElementById("formName");
const lastName = document.getElementById("formLastName");
const date = document.getElementById("datePicker");
const email = document.getElementById("formEmail");
const password = document.getElementById("formPassword");
const checkPassword = document.getElementById("formCheckPassword");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const error = checkInput(form);
  const formData = new FormData(form);
  const data = [...formData];

  if (error === 0) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
});

function checkInput() {
  let error = 0;
  const nameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const dateValue = date.value;
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const checkPasswordValue = checkPassword.value.trim();

  if (nameValue === "" || nameValue.length < MIN_CHARACTER || nameValue.length > MAX_CHARACTER) {
    setError(firstName, "The First Name must be between 2 and 25 characters");
    error++;
  } else {
    setSuccess(firstName);
  }

  if (lastNameValue === "" || lastNameValue.length < MIN_CHARACTER || lastNameValue.length > MAX_CHARACTER) {
    setError(lastName, "The Last Name must be between 2 and 25 characters");
    error++;
  } else {
    setSuccess(lastName);
  }

  if (dateValue > DATE_TODAY || dateValue === "") {
    setError(date, "Check the date");
    error++;
  } else {
    setSuccess(date);
  }

  if (emailTest(emailValue)) {
    setSuccess(email);
  } else {
    setError(email, "Incorrect email");
    error++;
  }

  if (passwordTest(passwordValue)) {
    setSuccess(password);
  } else {
    setError(
      password,
      "The password is too short add a capital letter and !@#$% and number"
    );
    error++;
  }

  if (passwordValue !== checkPasswordValue) {
    setError(checkPassword, "Password is not the same");
    error++;
  } else if (checkPasswordValue === "") {
    setError(
      checkPassword,
      "The password is too short add a capital letter and !@#$% and number"
    );
  } else {
    setSuccess(checkPassword);
  }
  return error;
}

function setError(input, message) {
  const formItem = input.parentElement;
  const small = formItem.querySelector("small");
  small.innerText = message;
  formItem.className = "form__item error";
}

function setSuccess(input) {
  const formItem = input.parentElement;
  formItem.className = "form__item";
}

function emailTest(email) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    email
  );
}

function passwordTest(password) {
  return /(?=.*[1-9])(?=.*[!@#$%])(?=.*[A-Z])[1-9A-Z!@#$%]{8}/gi.test(password);
}
