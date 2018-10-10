

$(document).ready(function() {
	// When someone clicks on one of the links...
	$("nav > a").click(function(event) {
		event.preventDefault();
		var $this = $(this);
		// Grab the ID from the data inside the link
		var $thisID = $this.data('id');
		var $shortlist = [];

		// If there is already a wishlist cookie saved..
		if (Cookies.get('wishlist')) {
			// Read the cookie, convert it from a string to an array
			$unstrung = $.parseJSON(Cookies.get('wishlist'));
			// Check to see if the ID of the thing we just clicked lives in the array
			var found = $.inArray($thisID, $unstrung);

			if (found >= 0) {
				// If we did find the item we clicked on already in the cookie, remove it.
				$unstrung.splice(found, 1);
			} else {
				// If we didn't find the item we clicked on in the cookie, add it.
				$unstrung.push($thisID);
			}

			$stringify = JSON.stringify($unstrung);
			// Save the cookie, call it wishlist
			Cookies.set('wishlist', $stringify);

			// If we couldn't see a cookie saved
		} else {
			$shortlist.push($thisID);
			// Convert the data to a string, as Cookies can't store arrays
			$stringify = JSON.stringify($shortlist);
			// Save the cookie, call it wishlist
			Cookies.set('wishlist', $stringify);
		}

		// You don't need this line or notify.min.js, it's purely to demo what lives inside the cookie on Codepen.

		// Now that we've done adding / removing items from the cookie, run the function to check which items should actually appear as active.
		checkwishlist();
	});

	function checkwishlist() {
		// This function adds an active state to any items it finds that are in the cookie.
		$("nav > a").each(function() {
			var $this = $(this);
			var $thisID = $this.data('id');

			if (Cookies.get('wishlist')) {
				$unstrung = $.parseJSON(Cookies.get('wishlist'));
				var found = $.inArray($thisID, $unstrung);
				if (found >= 0) {
					$this.addClass('active');
				} else {
					$this.removeClass('active');
				}
			}
		});
	}
	// When the page is loaded, before doing anything just check to see if anything should have the active state added.
	checkwishlist();
});