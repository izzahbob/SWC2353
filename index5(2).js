document.querySelector('a[href="#"]').addEventListener('click', (e) => {
    e.preventDefault();
    showFavorites(); 
});
document.querySelector('a[onclick="showFavorites()"]').addEventListener('click', (e) => {
    e.preventDefault();
    showFavorites();
});

		
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoritesPopup = document.getElementById('favoritesPopup');
        const favoritesList = document.getElementById('favorites-list');
        const closeFavoritesBtn = document.getElementById('close-favorites');
        const favoriteCount = document.getElementById('favouriteCount');

        function updateFavoriteCount() {
            favoriteCount.textContent = favorites.length;
        }

        function showFavorites() {
    favoritesPopup.classList.add('open'); // Add open class for display
    renderFavorites();
}

function hideFavorites() {
    favoritesPopup.classList.remove('open'); // Remove open class to hide
}
closeFavoritesBtn.addEventListener('click', hideFavorites);


        function renderFavorites() {
            favoritesList.innerHTML = '';
            favorites.forEach(favorite => {
                const favoriteItem = document.createElement('div');
                favoriteItem.classList.add('favorite-item');
                favoriteItem.innerHTML = `
                    <span>${favorite}</span>
                    <button class="remove-favorite" onclick="removeFavorite('${favorite}')">Remove</button>
                `;
                favoritesList.appendChild(favoriteItem);
            });
        }

        function toggleFavorite(element, title) {
            element.classList.toggle("active");
            const index = favorites.indexOf(title);
            if (index === -1) {
                favorites.push(title);
            } else {
                favorites.splice(index, 1);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoriteCount();
        }

        function removeFavorite(title) {
            favorites = favorites.filter(favorite => favorite !== title);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
            updateFavoriteCount();
        }

        //closeFavoritesBtn.addEventListener('click', hideFavorites);

        // Update favorite count on page load
        updateFavoriteCount();

        // Show favorites when clicking on the Favorites link
        document.querySelector('a[href="#"]').addEventListener('click', (e) => {
            e.preventDefault();
            showFavorites();
        });

        // Initialize favorites on page load
        document.addEventListener('DOMContentLoaded', () => {
            const favoriteIcons = document.querySelectorAll('.add-to-favorites');
            favoriteIcons.forEach(icon => {
                const title = icon.closest('.product-content').querySelector('h3').textContent;
                if (favorites.includes(title)) {
                    icon.classList.add('active');
                }
            });
        });
function toggleCart() {
            const cartDrawer = document.getElementById('cartDrawer');
            const overlay = document.getElementById('overlay');

            cartDrawer.classList.toggle('open');
            overlay.classList.toggle('open');
        }

        function addItemToCart(itemName, price, imageUrl) {
		const cartItemsContainer = document.getElementById('cartItems');
		const cartTotalElement = document.getElementById('cartTotal');
		const cartCountElement = document.getElementById('cartCount');
			
		
		// Create a new cart item element
		const cartItem = document.createElement('div');
		cartItem.classList.add('cart-item');
		cartItem.innerHTML = `
			<img src="${imageUrl}" alt="${itemName}">
			<div class="cart-item-details">
				<p>${itemName}</p>
				<p>$${price.toFixed(2)}</p>
			</div>
			<button onclick="removeItem(this)" class="remove-btn">&times;</button>
		`;

		// Append the new item to the cart
		cartItemsContainer.appendChild(cartItem);

            // Update the cart total and count
            updateCartTotal();
            updateCartCount();
        }

        function removeItem(button) {
            button.parentElement.remove();
            updateCartTotal();
            updateCartCount();
        }

        function updateCartTotal() {
            const cartItems = document.querySelectorAll('.cart-item');
            let total = 0;

            cartItems.forEach(item => {
                const price = parseFloat(item.querySelector('.cart-item-details p:nth-child(2)').innerText.replace('$', ''));
                total += price;
            });

            document.getElementById('cartTotal').innerText = total.toFixed(2);
        }

        function updateCartCount() {
            const cartItems = document.querySelectorAll('.cart-item');
            document.getElementById('cartCount').innerText = cartItems.length;
        }

        function checkout() {
            alert("Proceeding to checkout!");
            toggleCart();
        }



function saveProductToCheckout(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout2.html';
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout2.html";
}


