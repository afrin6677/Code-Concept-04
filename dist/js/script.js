(function ($) {
	$.validator.setDefaults({
		debug: true,
		success: "valid"
	});

	$(document).ready(function() {
		loadSignupBehavior();
		initRememberMe();
		initFormValidations();
		initTermsAndConditions();
	})

	function initTermsAndConditions() {
		let current_language = $('.header-buttons .language-switcher').attr('data-current-lang');
		$('.lang-option').unbind('click');
		if ($('.terms-area.terms-' + current_language).length > 0) {
			$('.terms-area.terms-' + current_language).addClass('active');
		}
	}

	function initFormValidations() {
		initFormValidation('form[name="contact-us-form"]');
		initFormValidation('form[name="user-profile"]');
	}
	/**
	 * Fetches form validation
	 */
	function initFormValidation(selector) {
		if ($(selector).length > 0) {

			let rules = {}
			let messages = {}
			$(selector).find('input, textarea, select, optgroup').each(function() {
				let field_type = $(this).attr('type');
				// $(this).get(0).tagName
				if (field_type && field_type != 'hidden') {
					let required = $(this).attr('required');
					let pattern = $(this).attr('pattern');

					rules[$(this).attr('name')] = {}
					messages[$(this).attr('name')] = {}

					if (required && required == 'required') {
						rules[$(this).attr('name')]['required'] = {}
						rules[$(this).attr('name')]['required']['depends'] = function(){
							$(this).val($(this).val().replace(/^\s+/, ''));
							return true;
						};
						messages[$(this).attr('name')]['required'] = 'This field is required.'
					}

					if (pattern) {
						rules[$(this).attr('name')]['pattern'] = pattern;
						messages[$(this).attr('name')]['pattern'] = $(this).attr('data-validation-message')
					}
				}
			});

			$(selector).validate({
				rules: rules,
				messages: messages,
				submitHandler: function (form) {
					form.submit();
				}
			})
		}
	}

	function initRememberMe() {
		let remember_checkbox = $('input[name="rememberme"]');

		if ($('input[name="username"]').length > 0) {
			let username_field = $('input[name="username"]');
			let cookie_value = getCookie('usr_mail');
			if (cookie_value) {
				username_field.val(cookie_value);

				if (remember_checkbox.length > 0) {
					remember_checkbox.prop('checked', true);
				}
			}
		}


		if (remember_checkbox.length > 0) {
			remember_checkbox.click(function() {
				if ($(this).is(':checked')) {
					let email = $(this).closest('form').find('input[name="username"]').val();
					if (email) {
						setCookie('usr_mail', email, 7);
					}
				} else {
					deleteCookie('usr_mail');
				}

			})
		}
	}

	function loadSignupBehavior() {
		let signup_button = $('.header-buttons .signup');
		let window_href = window.location.href;

		if (window_href.includes('#pricing-plans')) {
			doScrollToProducts();
		}

		if ($('div.pricings').length > 0) {
			signup_button.click(function (e) {
				e.preventDefault();
				doScrollToProducts();
			});
		} else {
			signup_button.attr('href', '/#pricing-plans');
		}
	}

	function doScrollToProducts() {
		let pricing_element = $('div.pricings');
		if (pricing_element.length > 0) {
			pricing_element.get(0).scrollIntoView({behavior: 'smooth'})
		}
	}
})(jQuery);

function getCookie(cookieName) {
	// Split the cookies string into an array of individual cookies
	var cookies = document.cookie.split(';');

	// Loop through the cookies to find the one with the specified name
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].trim(); // Remove leading/trailing white spaces
		if (cookie.indexOf(cookieName + '=') === 0) {
			// Found the cookie; extract and return its value
			return cookie.substring(cookieName.length + 1); // Add 1 to skip the '=' character
		}
	}

	// Cookie with the specified name not found
	return null;
}

function deleteCookie(cookieName) {
	// Set the cookie's expiration date to a past date
	document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function setCookie(cookieName, cookieValue, expirationDays) {
	var date = new Date();
	date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + date.toUTCString();
	document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

window.onscroll = function () {
	stickyHeader();
};

// sticky header
var header = document.getElementById('header');

var sticky = header.offsetTop;

function stickyHeader() {
	if (window.scrollY > sticky) {
		header.classList.add('sticky');
	} else {
		header.classList.remove('sticky');
	}
}

// mobile menu
document.addEventListener('DOMContentLoaded', function () {
	const mobileMenuButton = document.getElementById('mobile-menu-icon');
	const mobileMenuButtonClose = document.getElementById(
		'cheeseburger-menu-close'
	);
	const mobileMenu = document.getElementById('cheeseburger-menu');
	const overlay = document.getElementById('overlay');

	mobileMenuButton.addEventListener('click', function () {
		mobileMenu.classList.toggle('open');
		// overlay.style.display = 'block';
		mobileMenuButtonClose.style.display = 'flex';
		mobileMenuButton.style.display = 'none';

	});

	if (mobileMenuButtonClose != null) {
		mobileMenuButtonClose.addEventListener('click', function () {
			mobileMenu.classList.remove('open');
			overlay.style.display = 'none';
			mobileMenuButtonClose.style.display = 'none';
			mobileMenuButton.style.display = 'block';
		});
	}
});

// Get the modal and buttons
const openModalButton = document.getElementById('open-modal');
const closeModalButton = document.getElementById('close-button');
const modal = document.getElementById('languages');

function openModal() {
	modal.style.display = 'flex';
}

function closeModal() {
	modal.style.display = 'none';
}

openModalButton.addEventListener('click', openModal);

if (closeModalButton != null) {
	closeModalButton.addEventListener('click', closeModal);
}


window.addEventListener('click', (event) => {
	if (event.target === modal) {
		closeModal();
	}
});

// Cookie Modal
const acceptCookie = document.getElementById('cookie-button');
const cookieModal = document.getElementById('cookie-modal');
function setCookie(cookieName, cookieValue, expirationDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}
function closeCookieModal() {
    setCookie('cookie-accept', true, 3650);
    // cookieModal.style.display = 'none';
    cookieModal.classList.remove('show-cookie');
    cookieModal.classList.add('hide-cookie');
}
if (acceptCookie != null) {
    acceptCookie.addEventListener('click', closeCookieModal);
}
document.addEventListener('DOMContentLoaded', function() {
    var cookieAccept = getCookie('cookie-accept');
    if(cookieAccept){
        // cookieModal.style.display = 'none';
        cookieModal.classList.remove('show-cookie');
    }else{
        cookieModal.classList.remove('hide-cookie');
        cookieModal.classList.add('show-cookie');
    }
    // console.log('Value of myCookie on document load:', myCookieValue);
});


// Get all elements with the slide-in class
const slideInElements = document.querySelectorAll('.slide-in');

function triggerSlide() {
	slideInElements.forEach((element) => {
		element.classList.add('active');
	});
}

window.addEventListener('load', () => {
	setTimeout(triggerSlide, 700);
});

// Get all elements with the slide-in class, including the image
const zoomInElements = document.querySelectorAll('.zoom-in-image');

// Function to add the active class to trigger the animation
function triggerAnimation() {
	zoomInElements.forEach((element) => {
		element.classList.add('active');
	});
}

// Trigger the animation after a 2-second delay when the page loads
window.addEventListener('load', () => {
	setTimeout(triggerAnimation, 800);
});

// Function to handle the animation when an element enters the viewport
function handleIntersection(entries, observer) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate');
			observer.unobserve(entry.target); // Stop observing once animated
		}
	});
}

// Create an Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, {
	root: null, // Use the viewport as the root
	rootMargin: '0px', // No margin around the viewport
	threshold: 0.2, // Trigger animation when 50% of the element is visible
});

// Get all elements with the slide-up class
const slideUpElements = document.querySelectorAll('.slide-up');

// Observe each element to trigger the animation
slideUpElements.forEach((element) => {
	observer.observe(element);
});