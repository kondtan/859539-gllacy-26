var headerLogin = document.querySelector(".header-login");
var feedbackLink = document.querySelector(".feedback-form");

var isStorageSupport = true;
var storageLogin = "";
var storageEmail = "";
var storageName = "";

var loginPopup = document.querySelector(".modal-login");
var form = loginPopup.querySelector("form");
var login = loginPopup.querySelector("[name=login]");
var password = loginPopup.querySelector("[name=password]");

var feedbackPopup = document.querySelector(".modal");
if (feedbackPopup) {
    var feedbackContainer = document.querySelector(".feedback");
    var feedbackClose = feedbackPopup.querySelector(".modal-close");

    var feedbackForm = feedbackPopup.querySelector("form");
    var feedbackName = feedbackPopup.querySelector("[name=name]");
    var feedbackEmail = feedbackPopup.querySelector("[name=email]");
    var feedbackContents = feedbackPopup.querySelector("[name=contents]");
    var submitButton = feedbackPopup.querySelector("button");
    
    feedbackLink.addEventListener("click", function (evt) {
        evt.preventDefault();
        if (document.querySelector("modal-show-feedback") == null) {
            evt.stopPropagation();
        }
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

    feedbackContainer.addEventListener("click", function (evt) {
        evt.stopPropagation();
    });

};

try {
    storageLogin = localStorage.getItem("login");
} catch (err) {
    isStorageSupport = false;
}

headerLogin.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (document.querySelector(".modal-show-login") == null) {
        evt.stopPropagation();
    }
    loginPopup.classList.add("modal-show-login");
    if (isStorageSupport) {
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

window.addEventListener("click", function(evt) {
    loginPopup.classList.remove("modal-show-login");
    if (feedbackPopup) {
        feedbackPopup.classList.remove("modal-show-feedback");
    }
});

loginPopup.addEventListener("click", function(evt) {
    evt.stopPropagation();
})