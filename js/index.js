$(document).ready(function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // When the user scrolls the page, execute myFunction
  window.onscroll = function () { scrollEffect() };
  // Get the header
  // var header = document.getElementById("myHeader");
  // Get the offset position of the navbar
  // var sticky = header.offsetTop;

  shoppingCart.clearCart();
  displayCart();
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

$('#coffee .carousel').carousel({
  interval: 3000,
  keyboard: true,
  pause: 'hover',
  wrap: true
});

// Registration
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
// just add a class of "floatLabel to the input field!"
floatLabel(".floatLabel");

// Login
var img__btn = document.querySelector('.img__btn');
if (img__btn) {
  img__btn.addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
  });
}

if (document.getElementById("password") && document.getElementById("confirm_password").value) {
  function validatePassword() {
    if (document.getElementById("password").value != document.getElementById("confirm_password").value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity('');
    }
  }

  document.getElementById("password").onchange = validatePassword();
  document.getElementById("confirm_password").onkeyup = validatePassword();
}

// Sign Up
function validateSignUpForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == null || x == "") {
    alert("需要输入名字。");
    return false;
  }
}

// Shopping Cart
function openPopup(e) {
  alert('hrllo')
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
  $("#chatbot").show();

  if (section == "homepage") {
    $("#homepage").show();
    $("#about").show();
  } else {
    $("#" + section).show();
  }

  $("#cart").modal("hide");
  $("#checkbox").prop("checked", false);
  setTheme();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
    if (series == 'machine') {
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

    if (series == 'machine') {
      var specs = [];
      $.each(data.Specification, function (key, val) {
        specs.push("<p id='pd_spec_" + key + "'>" + val + "</p>");
      });
      $('#pd_specs').html(specs.join(""));
      $('#specifications').show();
    }
    else {
      $('#specifications').hide();
    }

    $('#pd_price').html(data.price);

    $('#backButton').click(function () {
      route(series);
    });

    console.log(data);
  });
}

function GetActiveModule() {
  return $('.module:visible')[0].id;
}

function setTheme() {
  var LightTheme = false;
  $('.navbar .hamburger-lines .line').css("background-color", "#fff");

  var darkmodemodulelist = ['machines', 'coffee']
  var lightmodemodulelist = ['about', 'checkout', 'productdetail', 'productdetail2', 'reservation', 'location', 'faqs', 'checkout', 'recipes', 'login']

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


// function Login() {
//   var done = 0;
//   var phonenumber = document.login.phonenumber.value;
//   (phonenumber = phonenumber);
//   var password = document.login.password.value;
//   password = password.toLowerCase();
//   if (username == "帳號" && password == "密碼") { window.location = "登入後會出現的網站"; done = 1; }
//   if (done == 0) { alert("帳號或密碼錯誤時出現的訊息"); }
// }
// if (phonenumber == "phonenumber" && password == "password") { window.location = "登入後會出現的網站"; done = 1; }
// if (done == 0) {
//   alert("密碼不正確,請再次輸入");
// } 