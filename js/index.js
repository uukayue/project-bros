$(document).ready(function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // When the user scrolls the page, execute scrollEffect
  window.onscroll = function () { scrollEffect() };

  shoppingCart.clearCart();
  displayCart();

  // just add a class of "floatLabel" to the input field!
  floatLabel(".floatLabel");
});

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scrollEffect() {
  if (window.pageYOffset > document.getElementById("myHeader").offsetTop) {
    document.getElementById("myHeader").classList.add("fixed");
    $(".nav-link .btn").addClass("btn-outline-light");
    $(".nav-link .btn").removeClass("btn-outline-dark");
  } else {
    document.getElementById("myHeader").classList.remove("fixed");
    $(".nav-link .btn").addClass("btn-outline-dark");
    $(".nav-link .btn").removeClass("btn-outline-light");
    setTheme()
  }
}

// Product
$('#machines .carousel').carousel({
  interval: 3000,
  keyboard: true,
  pause: 'hover',
  wrap: true
});

$('#capsules .carousel').carousel({
  interval: 3000,
  keyboard: true,
  pause: 'hover',
  wrap: true
});

// Registration&Checkout
function floatLabel(inputType) {
  $(inputType).each(function () {
    var $this = $(this);
    // on focus add cladd active to label
    $this.focus(function () {
      $this.next().addClass("active");
    });
    //on blur check field and remove class if needed
    $this.blur(function () {
      if ($this.val() === '' || $this.val() === 'blank') {
        $this.next().removeClass();
      }
    });
  });
}


// Sign Up Login
$(document).on('click', '.img__btn', function () {
  document.querySelector('.cont').classList.toggle('s--signup');
})

function validatePassword() {
  let pass = $('#signUpPassword')
  let confirmpass = $('#signUpConfirmPassword')
  if (pass && confirmpass && pass.val() != confirmpass.val()) {
    document.getElementById("signUpConfirmPassword").setCustomValidity("Passwords Don't Match");
  } else {
    document.getElementById("signUpConfirmPassword").setCustomValidity('');
  }
}

$(document).on('change', '#checkoutpassword', function () {
  validatePassword()
})

$(document).on('change', '#checkoutconfirm_password', function () {
  validatePassword()
})

function validateCheckOutPassword() {
  let pass = $('#checkoutpassword')
  let confirmpass = $('#checkoutconfirm_password')
  if (pass && confirmpass && pass.val() != confirmpass.val()) {
    document.getElementById("checkoutconfirm_password").setCustomValidity("Passwords Don't Match");
  } else {
    document.getElementById("checkoutconfirm_password").setCustomValidity('');
  }
}

//checkoutlogin
// var img__btn = document.querySelector('.img__btn');
// if (img__btn) {
//   img__btn.addEventListener('click', function () {
//     document.querySelector('.cont').classList.toggle('s--signup');
//   });
// }

// if (document.getElementById("checkoutpassword") && document.getElementById("checkoutconfirm_password").value) {
//   function validatePassword() {
//     if (document.getElementById("checkoutpassword").value != document.getElementById("checkoutconfirm_password").value) {
//       confirm_password.setCustomValidity("Passwords Don't Match");
//     } else {
//       confirm_password.setCustomValidity('');
//     }
//   }

//   document.getElementById("checkoutpassword").onchange = validatePassword();
//   document.getElementById("checkoutconfirm_password").onkeyup = validatePassword();
// }


// Shopping Cart
function openPopup(e) {
  e.preventDefault();
  $('#popup').addClass("open-popup");
  // return false;
}

function closePopup() {
  $('#popup').removeClass("open-popup");
  return false;
}

//SwitchPages//
function route(section) {
  $(".module").hide();
  $("#guestBtn").hide();

  if (section == "homepage") {
    $("#homepage").show();
    $("#about").show();
  } else if (section == "ordernow") {
    $("#login").show();
    $("#guestBtn").show();
  } else {
    $("#" + section).show();
  }

  $("#cart").modal("hide");
  $("#checkbox").prop("checked", false);
  setTheme();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

//productDetailTemplate//
function routedetail(series, int) {
  $(".module").hide();
  $("#productdetail").show();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  readTextFile("../data.json", function (text) {
    var data = JSON.parse(text)[int - 1]; // -1 becoz array starts from 0

    $('#productdetailname').html(data.name);
    $('#productdetailtitle').html(data.title);
    $('#pd_header').html(data.header);

    var pics = [];
    $.each(data.pic, function (key, val) {
      pics.push("<div class='slide'><img id='pd_pic_" + key + "' src='" + val + "' /></div>");
    });
    $('#pd_pic').html(pics.join(""));
    if (series == 'machines') {
      $('#s3').show();
      $('#s4').show();
      $('slide3').show();
      $('slide4').show();
    } else {
      $('#s3').hide();
      $('#s4').hide();
      $('slide3').hide();
      $('slide4').hide();
    }

    var kfs = [];
    $.each(data.keyfeature, function (key, val) {
      kfs.push("<p id='pd_kf_" + key + "'>" + val + "</p>");
    });
    $('#pd_kf').html(kfs.join(""));

    $('#pd_desc_header').html(data.description.header);
    $('#pd_desc_body').html(data.description.body);

    if (series == 'machines') {
      $('#pd_color').show();
    }
    else {
      $('#pd_color').hide();
    }

    if (series == 'machines') {
      var specs = [];
      $.each(data.Specification, function (key, val) {
        specs.push("<p id='pd_spec_" + key + "'>" + val + "</p>");
      });
      $('#pd_specs_body').html(specs.join(""));
      $('#pd_specs').show();
    }
    else {
      $('#pd_specs_body').hide();
      $('#pd_specs').hide();
    }

    $('#pd_price').html('HKD ' + data.price);

    $('#backButton').click(function () {
      route(series);
    });

    $('#addBtnPD').data('name', data.name);
    $('#addBtnPD').data('price', data.price);

    // console.log($('#addBtnPD'));
  });
}

//navBarColor//
function GetActiveModule() {
  return $('.module:visible')[0].id;
}

function setTheme() {
  var LightTheme = false;
  $('.navbar .hamburger-lines .line').css("background-color", "#fff");

  var darkmodemodulelist = ['machines', 'capsules']
  var lightmodemodulelist = ['about', 'checkout', 'productdetail', 'productdetail2', 'reservation', 'location', 'faqs', 'recipes', 'login']

  var activemodule = GetActiveModule()

  if (lightmodemodulelist.includes(activemodule)) {
    LightTheme = true;
  }
  else if (darkmodemodulelist.includes(activemodule)) {
    LightTheme = false;
    $('.navbar .hamburger-lines .line').css("background-color", "#444");
  }

  if (LightTheme) {
    $("#myHeader").addClass("darkbg");
    $(".nav-link .btn").addClass("btn-outline-light");
    $(".nav-link .btn").removeClass("btn-outline-dark");
  }
  else {
    $("#myHeader").removeClass("darkbg");
    $(".nav-link .btn").addClass("btn-outline-light");
    $(".nav-link .btn").removeClass("btn-outline-dark");
  }
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}
