/* Set values + misc */
var promoCode;
var promoPrice;
var fadeTime = 300;

/* Assign actions 
$('.quantity input').change(function () {
  updateQuantity(this);
});
 
$('.remove button').click(function () {
  removeItem(this);
});
 
  updateSumItems();
*/

$('.promo-code-cta').click(function () {
  promoCode = $('#promo-code').val();

  if (promoCode == '10off' || promoCode == '10OFF') {
    //If promoPrice has no value, set it as 10 for the 10OFF promocode
    if (!promoPrice) {
      promoPrice = 10;
    } else if (promoCode) {
      promoPrice = promoPrice * 1;
    }
  } else if (promoCode != '') {
    alert("Invalid Promo Code");
    promoPrice = 0;
  }
  //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
  if (promoPrice) {
    $('.summary-promo').removeClass('hide');
    $('.promo-value').text(promoPrice.toFixed(2));
    recalculateCart(true);
  }
});

/* Recalculate cart 
function recalculateCart(onlyTotal) {
  var subtotal = 0;*/

/* Sum up row totals 
$('.basket-product').each(function () {
  subtotal += parseFloat($(this).children('.subtotal').text());
});*/

/* Calculate totals 
var total = subtotal;*/

//If there is a valid promoCode, and subtotal < 10 subtract from total
var promoPrice = parseFloat($('.promo-value').text());
if (promoPrice) {
  if (subtotal >= 10) {
    total -= promoPrice;
  } else {
    alert('Order must be more than £10 for Promo code to apply.');
    $('.summary-promo').addClass('hide');
  }
}
