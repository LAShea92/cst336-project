let item;
$(document).ready(function(){	
	//alert($(this).text().trim());
		$.ajax({
			method: "get",
			url: "/engines",
			success: function(rows, status){
				$("#invContainer").html("");
				console.log(rows[0].imgSrc);
				rows.forEach(function(row, i){
					console.log(rows[0].imgSrc);
					if(i%5==0){
						$("#invContainer").append("<br />");
					}
					$("#invContainer").append("<img class='image' src='"+row.imgSrc+"'width='200' height='200'>");
				})
			}
		});//ajax
	
	function updateCart(action, name, price){
		$.ajax({
			method: "get",
			url: "/api/updateCart",
			data:{"name" : name,
					  "price": price,
					  "action": action
					 }
		});
	}
});