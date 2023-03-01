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


//SwitchPages//
function route(section) {
  $(".module").hide();
  $("#checkoutloginbutton").hide();
  $("#loginbutton").show();
  $("#guestBtn").hide();

  if (section == "homepage") {
    $("#homepage").show();
    $("#about").show();
  } else if (section == "ordernow") {
    $("#login").show();
    $("#guestBtn").show();
    $("#checkoutloginbutton").show();
    $("#loginbutton").hide();
  } else {
    $("#" + section).show();
  }

  $("#cart").modal("hide");
  $("#checkbox").prop("checked", false);
  setTheme();
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
