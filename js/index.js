$(function () {
  // When the user scrolls the page, execute myFunction
  window.onscroll = function () { scrollEffect() };
  // Get the header
  var header = document.getElementById("myHeader");
  // Get the offset position of the navbar
  var sticky = header.offsetTop;
  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function scrollEffect() {
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
  document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
  });

  function validatePassword() {
    if ($('#password').val != confirm_password.val) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity('');
    }
  }

  password.onchange = validatePassword();
  confirm_password.onkeyup = validatePassword();

  // Sign Up
  function validateSignUpForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
      alert("需要输入名字。");
      return false;
    }
  }
});


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

function routedetail(int) {
  $(".module").hide();
  $("#productdetail").show();

  readTextFile("../data.json", function (text) {
    var data = JSON.parse(text)[int - 1]; // -1 becoz array starts from 0

    $('#productdetailname').html(data.name);
    $('#productdetailtitle').html(data.title);
    $('#pd_header').html(data.header);

    var pics = [];
    $.each(data.pic, function (key, val) {
      pics.push("<a class='slide' href=''><img id='pd_pic_" + key + "' src='" + val + "' /></a>");
    });
    $('#pd_pic').html(pics.join(""));

    var kfs = [];
    $.each(data.keyfeature, function (key, val) {
      kfs.push("<p id='pd_kf_" + key + "'>" + val + "</p>");
    });
    $('#pd_kf').html(kfs.join(""));

    $('#pd_desc_header').html(data.description.header);
    $('#pd_desc_body').html(data.description.body);

    var specs = [];
    $.each(data.Specification, function (key, val) {
      specs.push("<p id='pd_spec_" + key + "'>" + val + "</p>");
    });
    $('#pd_specs').html(specs.join(""));

    $('#pd_price').html(data.price);
    //     "Specification": {
    //       "Weight": "2.8 Kilogram",
    //       "Height": "23.5 Centimeter",
    //       "Removable water tank": "0.7 Litre",
    //       "Used capsule container capacity": "10",
    //       "Power rating (in watts)": "1260 Watt",
    //       "Dimensions (WxDxH)": "11.1 x 23.5 x 32.6 cm",
    //       "Cable Length": "80 Centimeter",
    //       "Warranty": "2 Year",
    //       "Pressure": "19 Bars",
    //       "Others": [
    //         "Folding drip tray for Latte Macchiato glass",
    //         "Optimised heat up time",
    //         "Automatic shut off after 9 mn, programmable",
    //         "Cable storage",
    //         "Automatic power off after 9 mins",
    //         "Fast heat-up"
    //       ]
    //     },

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
  var lightmodemodulelist = ['about', 'checkout', 'productdetail', 'reservation', 'location', 'faqs', 'checkout', 'signup', 'login']

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
