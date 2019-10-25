var headerLogin = document.querySelector(".header-login");
var feedbackLink = document.querySelector(".feedback-form");

var loginPopup = document.querySelector(".modal-login");
var feedbackPopup = document.querySelector(".modal");
var feedbackContainer = document.querySelector(".feedback");
var feedbackClose = feedbackPopup.querySelector(".modal-close");

var form = loginPopup.querySelector("form");
var login = loginPopup.querySelector("[name=login]");
var password = loginPopup.querySelector("[name=password]");

var feedbackForm = feedbackPopup.querySelector("form");
var feedbackName = feedbackPopup.querySelector("[name=name]");
var feedbackEmail = feedbackPopup.querySelector("[name=email]");
var feedbackContents = feedbackPopup.querySelector("[name=contents]");
var submitButton = feedbackPopup.querySelector("button");

var isStorageSupport = true;
var storageLogin = "";
var storageEmail = "";
var storageName = "";

try {
    storageLogin = localStorage.getItem("login");
} catch (err) {
    isStorageSupport = false;
}

headerLogin.addEventListener("click", function (evt) {
    evt.preventDefault();
    loginPopup.classList.add("modal-show-login");

    if (storageLogin) {
        login.value = storageLogin;
        password.focus();
    } else {
        login.focus();
    }
});

form.addEventListener("submit", function (evt) {
    if (!login.value || !password.value) {
        evt.preventDefault();
        loginPopup.classList.add("modal-error");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("login", login.value);
        }
    }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        if (loginPopup.classList.contains("modal-show-login")) {
            loginPopup.classList.remove("modal-show-login");
            loginPopup.classList.remove("modal-error");
        }
        if (feedbackPopup.classList.contains("modal-show-feedback")) {
            feedbackPopup.classList.remove("modal-show-feedback");
            feedbackContainer.classList.remove("modal-error");
        }
    }
});

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

submitButton.addEventListener("click", function (evt) {
    if (!feedbackName.value || !feedbackEmail.value || !feedbackContents.value) {
        evt.preventDefault();
        feedbackContainer.classList.add("modal-error");
        setTimeout(function () {
            feedbackContainer.classList.remove("modal-error");
        }, 1000);
    } else {
        if (isStorageSupport) {
            localStorage.setItem("feedbackName", feedbackName.value);
            localStorage.setItem("feedbackEmail", feedbackEmail.value);
        }
    }
});

feedbackPopup.addEventListener("click", function (evt) {
    feedbackPopup.classList.remove("modal-show-feedback");
});

feedbackContainer.addEventListener("click", function (evt) {
    evt.stopPropagation();
});