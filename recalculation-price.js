$(document).ready(function() {
	
	$(".add-products").on("click", function(event){
		
		var selectedProducts = new Array();
		var elems = $("input").filter("[type = 'checkbox']");
  
		$(elems).each(function(){

			if ($(this).prop("checked")) {

				selectedProducts.push($(this).next().find(".t-em").html());
				
			}

		});

		var htmlSumProducts = "";
		var plaseForHtml = $(".wrap-add-price").html("");
		var originPrice = $(".original-price").eq(0);
		var totalPrice = $(".total-price").eq(0).removeClass('hidden');
		var tmpSum = parseInt($(originPrice).html().replace(/\s+/g, ''), 10);

		$(selectedProducts).each(function() {

			htmlSumProducts += "<div class='add-price'>+ " + this + "</div>";
			tmpSum += parseInt(this, 10);

		});

		$(plaseForHtml).append(htmlSumProducts);
		if (selectedProducts.length > 0) {
			// $(totalPrice).removeClass('hidden');
			tmpSum = ("" + tmpSum).replace(/.+?(?=\D|$)/, function(x) {

    					return x.replace(/(\d)(?=(?:\d\d\d)+$)/g, "$1 ");

					});

			$(totalPrice).html(tmpSum + " p");
		} else {
			$(totalPrice).addClass('hidden');
		};

	});

});