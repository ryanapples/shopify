<script>
	$('.cart__update').click(function (e) {
		e.preventDefault();
		var array = [];
	
		$('.cart__row').each(function (i) {
			array.push($(this).find('input').val());
		});

		$.post('/cart/update.json', { updates: array })
			.then(loadCart);
	});

		function loadCart() {
			getCart()
				.then(function() {
					$('.cart__row').each(function (i) { $(this).find('.cart-total').text(Shopify.formatMoney(window.cartObject.items[i].line_price, "{{ shop.money_format }}"));
					$('.cart__subtotal').text(Shopify.formatMoney(window.cartObject.total_price, "{{ shop.money_format }}"));
				});
			});
		}
		
		function getCart() {
			return $.get('/cart.json', function(data) {
				window.cartObject = data;
			$('#CartCount span').text(window.cartObject.item_count);
		});
	}
</script>