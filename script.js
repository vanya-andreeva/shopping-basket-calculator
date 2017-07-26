(function() {
"use strict";

var state = document.getElementById('s-state');

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('cart-shop').addEventListener('submit', estimateTotal);
	
	var btnEstimate = document.getElementById('btn-estimate');
	
	btnEstimate.disabled = true;
	
	state.addEventListener('change', function() {
	
		if (state.value === '') {
			btnEstimate.disabled = true;
		} else {
			btnEstimate.disabled = false;
		}
	
	});
});

function estimateTotal(event) {
	event.preventDefault();
	
	if (state.value === '') {
		alert('Please choose your state.');
		
		state.focus();
	}
	
	var itemGlasses = parseInt(document.getElementById('field-q-glasses').value, 10) || 0,
		itemTops = parseInt(document.getElementById('field-q-tops').value, 10) || 0,
		itemShoes = parseInt(document.getElementById('field-q-shoes').value, 10) || 0,
	
		shippingState = state.value,
		shippingMethod = document.querySelector('[name=r_method]:checked').value || "";
		
	var totalQty = itemGlasses + itemTops + itemShoes,
		shippingCostPerItem,
		shippingCost,
		taxFactor = 1,
		estimate,
		totalItemCost = (90 * itemGlasses) + (25 * itemTops) + (30 * itemShoes);

		if (shippingState ==="CA") {
			taxFactor = 1.075;
		} else if (shippingState ==="WA") {
			taxFactor = 1.065;
		} 
		switch(shippingMethod){
			case "usps" :
				shippingCostPerItem = 2;
			break;
			
			case "ups" :
				shippingCostPerItem = 3;
			break;

			default :
				shippingCostPerItem = 0;

		}
		shippingCost = shippingCostPerItem * totalQty;
		
		estimate = "$" + ((totalItemCost * taxFactor) + shippingCost).toFixed(2);
		
		document.getElementById("txt-estimate").value = estimate; 
}

})();