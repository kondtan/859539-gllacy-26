var mapExists = document.querySelector(".map")

var dropdownWrapper = document.querySelector(".dropdown-wrapper")
var catalogLink = dropdownWrapper.querySelector(".catalog-link");
var dropdownPopup = dropdownWrapper.querySelector(".catalog-dropdown");

var searchWrapper = document.querySelector(".search-wrapper");
var headerSearch = searchWrapper.querySelector(".header-search");
var searchPopup = searchWrapper.querySelector("form");

var loginWrapper = document.querySelector(".login-wrapper");
var headerLogin = document.querySelector(".header-login");

var loginPopup = document.querySelector(".modal-login");
var form = loginPopup.querySelector("form");
var login = loginPopup.querySelector("[name=login]");
var password = loginPopup.querySelector("[name=password]");


var feedbackLink = document.querySelector(".feedback-form");
var activeCart = document.querySelector(".cart-active");
var headerCart = document.querySelector(".header-cart");

var isStorageSupport = true;
var storageLogin = "";
var storageEmail = "";
var storageName = "";

try {
    storageLogin = localStorage.getItem("login");
} catch (err) {
    isStorageSupport = false;
}


if (mapExists) {
    mapExists.classList.remove("nojs");
}


//слушаем фидбэк
if (feedbackLink) {
    
    var feedbackPopup = document.querySelector(".modal");
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

    feedbackPopup.addEventListener("click", function (evt) {
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

// слушаем корзину
headerCart.addEventListener("click", function (evt) {
    evt.preventDefault(); 
});

if (activeCart) {
    var cartWrapper = document.querySelector(".cart-wrapper");
    var cartPopup = cartWrapper.querySelector(".cart");
    
    cartWrapper.addEventListener("mouseenter", function(evt) {
        cartPopup.classList.add("show-cart");
    });
    
    cartWrapper.addEventListener("mouseleave", function(evt) {
        cartPopup.classList.remove("show-cart");
    });
}




//слушаем дропдаун меню
dropdownWrapper.addEventListener("mouseenter", function (evt) {
    dropdownPopup.classList.add("show-dropdown");
});

dropdownWrapper.addEventListener("mouseleave", function(evt) {
    dropdownPopup.classList.remove("show-dropdown");
});


// слушаем поиск
headerSearch.addEventListener("mouseenter", function (evt) {
    searchPopup.classList.add("modal-show-search");
});

headerSearch.addEventListener("click", (evt) => {
    evt.preventDefault();
});

searchWrapper.addEventListener("mouseleave", function (evt) {
    searchPopup.classList.remove("modal-show-search");
});

//слушаем логин
headerLogin.addEventListener("mouseenter", function (evt) {
    loginPopup.classList.add("modal-show-login");
    if (storageLogin) {
        login.value = storageLogin;
        password.focus();
    } else {
        login.focus();
    }
});

headerLogin.addEventListener("click", function(evt) {
    evt.preventDefault();
})

form.addEventListener("submit", function(evt) {
    if (!login.value || !password.value) {
        evt.preventDefault();
        loginPopup.classList.add("modal-error");
        setTimeout(function () {
            loginPopup.classList.remove("modal-error");
        }, 1000);
    } else {
        if (isStorageSupport) {
            localStorage.setItem("login", login.value);
        }
    }
});

loginWrapper.addEventListener("mouseleave", function(evt) {
    loginPopup.classList.remove("modal-show-login");
});

// cлушаем ESC
window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        if (loginPopup.classList.contains("modal-show-login")) {
            loginPopup.classList.remove("modal-show-login");
        }
        if (searchPopup.classList.contains("modal-show-search")) {
            searchPopup.classList.remove("modal-show-search");
        }
        if (feedbackPopup && feedbackPopup.classList.contains("modal-show-feedback")) {
            feedbackPopup.classList.remove("modal-show-feedback");
        }
        if (cartPopup && cartPopup.classList.contains("show-cart")) {
            cartPopup.classList.remove("show-cart");
        }
    }
});
