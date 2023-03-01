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
  