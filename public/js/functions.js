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
						$("#filterByPrice").toggle();
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
	
// 	const filterByCategory = () => {
// 		$("#filterCategory").on("click", function(){
// 			// Temp
// 			return;
			
// 			//console.log($("#category").val());
// 			let catId;
// 			if($("#category").val() == "Engines"){
// 				catId = 1;
// 			}
// 			else if($("#category").val() == "Transmissions"){
// 				catId = 2;
// 			}
// 			else if($("#category").val() == "Seats"){
// 				catId = 3;
// 			}
// 			else if($("#category").val() == "Suspension"){
// 				catId = 4;
// 			}
// 			else if($("#category").val() == "ECUs"){
// 				catId = 5;
// 			}
// 			else{
// 				alert("You must select a category first.");
// 			}
// 			console.log(catId);
// 			$.ajax({
// 				method: "get",
// 				url: "/sortCategory",
// 				data: {
// 							 "catId": catId
// 							},
// // 				success: function(inventory, status){
// // 					console.log(inventory);
// // // 					console.log("success");
// // // 					$("#content").html("");
// // // 					inventory.forEach(function(item){
// // // 						$("#content").append("<div class='itemContainer>");
// // // 						$("#content").append("<img class='image' src='" + item.imgSrc + " width='200' height='200'>");
// // // 						$("#content").append("<span id='desc'>Details: " + item.description + "</span>");
// // // 						$("#content").append("<div class='info'>");
// // // 						$("#content").append("<div id='name'>" + item.name + "</div>");
// // // // 						$("#content").append("<button type='button' class='add' data-item-price='" + >"
// // // 						$("#content").append("</div>");
// // // 					})
					
// // 				}
// 			});
// 		});
// 	}
	
	addToCart();
	login();
	logout();
	deleteItem();
	//filterByCategory();
	
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