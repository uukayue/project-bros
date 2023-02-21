//SwitchPages//
function route(section) {
  $(".module").hide();

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

function GetActiveModule() {
  return $('.module:visible')[0].id;
}

function setTheme() {
  var LightTheme = false;
  $('.navbar .hamburger-lines .line').css("background-color", "#fff");

  var darkmodemodulelist = ['machines', 'coffee']
  var lightmodemodulelist = ['about', 'checkout', 'productdetail', 'reservation', 'location', 'faqs', 'payment']

  var activemodule = GetActiveModule()

  if(lightmodemodulelist.includes(activemodule)) {
    LightTheme = true;
  }
  else if(darkmodemodulelist.includes(activemodule)) {
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

//HideSlideMenu//
function hide() {
  $("#checkbox").prop("checked", false);
}

// When the user scrolls the page, execute myFunction
$(function () {
  window.onscroll = function () { myFunction() };

  // Get the header
  var header = document.getElementById("myHeader");

  // Get the offset position of the navbar
  var sticky = header.offsetTop;

  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("fixed");
      $(".nav-link .btn").addClass("btn-outline-light");
      $(".nav-link .btn").removeClass("btn-outline-dark");
    } else {
      header.classList.remove("fixed");
      $(".nav-link .btn").addClass("btn-outline-dark");
      $(".nav-link .btn").removeClass("btn-outline-light");
      setTheme()
    }
  }

  //Reservation Page
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

  // Product
  $('#machines .carousel').carousel({
    interval: 3000,
    keyboard: true,
    pause: 'hover',
    wrap: true
  });
});