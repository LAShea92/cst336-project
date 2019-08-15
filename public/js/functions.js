// let itemPrice = 0;
// let itemName = "";
// let total = 0;

$(document).ready(function(){
	let itemPrice = 0;
	let itemName = "";
	let total = 0;
	let isAdmin = false;
	//alert($(this).text().trim());
	const addToCart = () => {
		$(".add").on("click", function(){
			
			itemName = $(this).attr("data-item-name");
			itemPrice = $(this).attr("data-item-price");
			
			updateCart(itemName, itemPrice);
		});
	}
	
	const login = () => {
		$("#loginButton").on("click", function(){
			$.ajax({
				method: "post",
				url: "/api/login",
				data: {
							 "username" : $("#username").val(),
							 "password" : $("#password").val()
							},
				success: function(loginFeedback, status){
					isAdmin = loginFeedback.successful;
					if(isAdmin){
						$("#loginForm").toggle();
						$("#adminDisplay").toggle();
						$(".removeItem").toggle();
						$("#viewCart").toggle();
						$(".add").toggle();
						$("#sortByPrice").toggle();
					}
					else{
						//todo
					}
				}
			});
		});
	}
	
	const logout = () => {
		$("#logoutButton").on("click", function(){
    	location.reload();
		});
	}
	
	const deleteItem = () => {
		$(".removeItem").on("click", function(){
			itemName = $(this).attr("data-item-name");
			itemPrice = $(this).attr("data-item-price");
			console.log(itemName);
			console.log(itemPrice);
			$.ajax({
				method: "get",
				url: "/api/removeItem",
				data: {
							 "name" : itemName,
							 "price" : itemPrice
							}
			});
		});
	}
	
	addToCart();
	login();
	logout();
	deleteItem();
	
	function updateCart(name, price){
// 		console.log(name);
// 		console.log(price);
		let priceInt = parseInt(price);
		total += priceInt
// 		let currentTotal = $("#currentTotal").text();
// 		let currentTotalInt = parseInt(currentTotal, 10);
// 		let newTotal = currentTotalInt + priceInt;
		
// 		console.log(currentTotal);
// 		console.log(currentTotalInt);
		$("#total").html("");
		$("#cartItems").append("<tr><td>" + name + "</td><td>$" + price + "</td></tr>");
		$("#total").append("<span>$ </span>");
		$("#total").append("<span id=currentTotal>" + total + "</span>");	
	}//updateCart
// 	$("#viewCart").on("click", function(){
// 		$.ajax({
// 			method: "get",
// 			url: "/viewCart"
// 		});
// 	});
});