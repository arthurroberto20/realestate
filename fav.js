

$(document).ready(function() {
	// When someone clicks on one of the links...
	$(".imoveisfav").click(function(event) {
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
		$(".imoveisfav").each(function() {
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

$(document).ready(
    function(){
		$('.item .imoveisfav').click(
          function(){
			var $this = $(this);
			var $thisID = $this.data('id');

            var objectImage = $(this).parents('.item').find(".img").html();
            var objectName = $(this).parents('.item').find(".title").html();
			var objectPrice = $(this).parents('.item').find(".price").html();
			$unstrung = $.parseJSON(Cookies.get('wishlist'));
			var found = $.inArray($thisID, $unstrung);
			/*var data = $("#form-search").serialize();*/
			if (Cookies.get('wishlist')){
if (this.className == 'imoveisfav active') {
	
   $('#favlist').append('<div class="item row"><div class="img col-sm-3">'+ objectImage +'</div><div class="name col-sm-9"><p>'+ objectName +'</p><p>'+ objectPrice +'</p><div></div>');
	$.ajax({
		   data: $thisID,
		   type: "post",
		   url: "savefav.php",
		   success: function($thisID){
				alert("Data Save: " + $thisID);
		   }
  }
  );
   ;
			}
			else if (this.className == 'imoveisfav') {
				var list = document.getElementById("favlist");   // Get the <ul> element with id="myList"
				list.removeChild(list.childNodes[0])
			}
			
			else  {
				
				alert("deu ruim maluco");

				}
			}
		 }
			
	  );
	 
      

	}
	
)
;
$('#add').click( function() {
	var Description = $('#description').val();
   if($("#description").val() == '') {
	 $('#alert').html("<strong>Warning!</strong> You left the to-do empty");
	 $('#alert').fadeIn().delay(1000).fadeOut();
	 return false;
	}
	$('#todos').prepend("<li><input id='check' name='check' type='checkbox'/>" + Description + "</li>");
	$('#form')[0].reset();
	var todos = $('#todos').html();
	localStorage.setItem('todos', todos);
	return false;
 });
 
 if(localStorage.getItem('todos')) {
 $('#todos').html(localStorage.getItem('todos'));
 }
 
 $('#clear').click( function() {
 window.localStorage.clear();
 location.reload();
 return false;
 });