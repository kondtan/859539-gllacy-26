var link = document.querySelector(".header-login");

var popup = document.querySelector(".modal-login");

var form = popup.querySelector("form");
var login = popup.querySelector("[name=login]");
var password = popup.querySelector("[name=password]");

var isStorageSupport = true;
var storage = "";

try {
    storage = localStorage.getItem("login");
} catch (err) {
    isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show-login");

    if (storage) {
        login.value = storage;
        password.focus();
    } else {
        login.focus();
    }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        if (popup.classList.contains("modal-show-login")) {
            evt.preventDefault();
            popup.classList.remove("modal-show-login");
            popup.classList.remove("modal-error");
        }
    }
});

form.addEventListener("submit", function (evt) {
    if (!login.value || !password.value) {
        evt.preventDefault();
        popup.classList.add("modal-error");
        console.log("Нужно ввести логин и пароль");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("login", login.value);
        }
    }
});

var feedbackLink = document.querySelector(".feedback-form");

var feedbackPopup = document.querySelector(".modal");
var feedbackContainer = document.querySelector(".feedback");
var feedbackClose = feedbackPopup.querySelector(".modal-close");

var feedbackForm = feedbackPopup.querySelector("form");
var submitButton = feedbackPopup.querySelector("button");
var feedbackName = feedbackPopup.querySelector("[name=name]");
var feedbackEmail = feedbackPopup.querySelector("[name=email]");
var feedbackContents = feedbackPopup.querySelector("[name=contents]");

var isStorageSupport = true;
var storage = "";

try {
    storage = localStorage.getItem("feedbackEmail");
} catch (err) {
    isStorageSupport = false;
}

try {
    storage = localStorage.getItem("feedbackName");
} catch (err) {
    isStorageSupport = false;
}

feedbackLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    feedbackPopup.classList.add("modal-show-feedback");
    feedbackContainer.classList.add("animated-entrance");
    setTimeout(function () {
        feedbackContainer.classList.remove("animated-entrance");
    }, 1000);
});

feedbackClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    feedbackContainer.classList.add("animated-exit");
    feedbackPopup.classList.remove("modal-show-feedback");
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        if (feedbackPopup.classList.contains("modal-show-feedback")) {
            evt.preventDefault();
            feedbackPopup.classList.remove("modal-show-feedback");
            feedbackContainer.classList.remove("modal-error");
        }
    }
});

submitButton.addEventListener("click", function (evt) {
    if (!feedbackName.value || !feedbackPassword.value || !feedbackContents.value) {
        evt.preventDefault();
        feedbackContainer.classList.add("modal-error");
        setTimeout(function () {
            feedbackContainer.classList.remove("modal-error");
        }, 1000);
    } else {
        if (isStorageSupport) {
            localStorage.setItem("feedbackName", name.value);
        }
    }
});

feedbackPopup.addEventListener("click", function (evt) {
    feedbackPopup.classList.remove("modal-show-feedback");
});

feedbackContainer.addEventListener("click", function (evt) {
    evt.stopPropagation();
});