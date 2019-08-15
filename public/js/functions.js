let itemPrices = [];
let itemNames = [];

$(document).ready(function(){	
	//alert($(this).text().trim());
	const addToCart = () => {
		$(".btn").on("click", function(){
			console.log($(this).prev().val());
			console.log($(this).next().val());
			
			itemNames.push($(this).prev().val());
			itemPrices.push($(this).next().val());
		});
	}
	
	addToCart()
		
	function updateCart(action, name, price){
		$.ajax({
			method: "get",
			url: "/api/updateCart",
			data:{"name" : name,
					  "price": price,
					  "action": action
					 }
		});
	}//updateCart
});