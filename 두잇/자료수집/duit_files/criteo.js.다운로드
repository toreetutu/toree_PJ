var CRITEO = function(){
	var criteo_id, criteo_email, criteo_device_type;
	var criteo_zip_code = "";
	var init = function(id, email, device_type, zip_code){
		criteo_id = id;
		criteo_email = email;
		criteo_device_type = device_type;
		criteo_zip_code = zip_code;
	};

	var viewMain = function(){
		window.criteo_q = window.criteo_q || [];
		window.criteo_q.push(
			{event : "setAccount", account : criteo_id},
			{event : "setEmail", email : criteo_email, hash_method: "sha256"},
			{event : "setZipcode", zipcode: criteo_zip_code },
			{event : "setSiteType", type : criteo_device_type},
			{event : "viewHome"}
		);
	};

	var viewProdList = function(prod_id_list, category, keyword){
		window.criteo_q = window.criteo_q || [];
		window.criteo_q.push(
			{event : "setAccount", account : criteo_id},
			{event : "setEmail", email : criteo_email, hash_method: "sha256"},
			{event : "setZipcode", zipcode: criteo_zip_code },
			{event : "setSiteType", type : criteo_device_type},
			{event : "viewList", item : prod_id_list , category : category, keywords : keyword}
		);
	};

	var viewItem = function(prod_id){
		window.criteo_q = window.criteo_q || [];
		window.criteo_q.push(
			{event : "setAccount", account : criteo_id},
			{event : "setEmail", email : criteo_email, hash_method: "sha256"},
			{event : "setZipcode", zipcode: criteo_zip_code },
			{event : "setSiteType", type : criteo_device_type},
			{event : "viewItem", item : prod_id}
		);
	};

	var viewBasket = function(cart_list){
		window.criteo_q = window.criteo_q || [];
		window.criteo_q.push(
			{event : "setAccount", account : criteo_id},
			{event : "setEmail", email : criteo_email, hash_method: "sha256"},
			{event : "setZipcode", zipcode: criteo_zip_code },
			{event : "setSiteType", type : criteo_device_type},
			{event : "viewBasket", item : cart_list}
		);
	};

	var trackTransaction = function(order_no,prod_list){
		window.criteo_q = window.criteo_q || [];
		window.criteo_q.push(
			{event : "setAccount", account : criteo_id},
			{event : "setEmail", email : criteo_email, hash_method: "sha256"},
			{event : "setZipcode", zipcode: criteo_zip_code },
			{event : "setSiteType", type : criteo_device_type},
			{event : "trackTransaction", id : order_no, item : prod_list}
		);
	};

	var npayTrackTransaction = function(npay_order_info){
		var order_info = [];
		for(var i = 0; i<npay_order_info['list'].length; i++){
			var info = {id : npay_order_info['list'][i]['prod_idx'],price : npay_order_info['list'][i]['price'], quantity : npay_order_info['list'][i]['count']};
			order_info.push(info);
		}
		window.criteo_q = window.criteo_q || [];
		window.criteo_q.push(
			{event : "setAccount", account : criteo_id},
			{event : "setEmail", email : criteo_email, hash_method: "sha256"},
			{event: "setZipcode", zipcode: criteo_zip_code },
			{event : "setSiteType", type : criteo_device_type},
			{event : "trackTransaction", id : 'npay'+Math.floor(Math.random()*999999), item : order_info}
		);
	};

	// 장바구니 담기
	var AddToCart = function(id, price){
		window.criteo_q = window.criteo_q || [];
		window.criteo_q.push(
			{event : "setAccount", account : criteo_id},
			{event : "setEmail", email : criteo_email, hash_method: "sha256"},
			{event: "setZipcode", zipcode: criteo_zip_code },
			{event : "setSiteType", type : criteo_device_type},
			{event: "addToCart", item: [ {id: id, price: parseInt(price), quantity: 1 } ]}
		);
	};

	return {
		"init" : function(id, email, device_type,zip_code){
			init(id, email, device_type,zip_code);
		},
		"viewMain" : function(){
			viewMain();
		},
		"viewProdList" : function(prod_id_list, category, keyword){
			viewProdList(prod_id_list, category, keyword);
		},
		"viewItem" : function(prod_id){
			viewItem(prod_id);
		},
		"viewBasket" : function(cart_list){
			viewBasket(cart_list);
		},
		"trackTransaction" : function(order_no,prod_list){
			trackTransaction(order_no,prod_list);
		},
		"npayTrackTransaction" : function(npay_order_info){
			npayTrackTransaction(npay_order_info);
		},
		"AddToCart" : function(id, price){
			AddToCart(id, price);
		}
	}
}();