function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}

$('#productdetail .carousel').carousel({
  interval: 300,
  keyboard: true,
  // pause: 'hover',
  wrap: true
});

$('#productdetail2 .carousel').carousel({
  interval: 300,
  keyboard: true,
  // pause: 'hover',
  wrap: true
});

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

    $('#addBtnPD').data('name', data.name.replace(' ',''));
    $('#addBtnPD').data('price', data.price);

    // console.log($('#addBtnPD'));
  });
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

