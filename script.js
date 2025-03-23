// ✅ Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ✅ Navbar Search Input Toggle
const searchIcon = document.querySelector('.search-icon');
const searchInput = document.getElementById("search-bar");
const clearSearchBtn = document.getElementById("clear-search");

searchIcon.addEventListener("click", () => {
    searchInput.classList.toggle("active");
    if (searchInput.classList.contains("active")) searchInput.focus();
});

// ✅ Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

document.getElementById("hamburger-menu").addEventListener("click", function() {
    document.querySelector(".nav-links").classList.toggle("show");
  });

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ✅ Watchlist Persistence in LocalStorage
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// ✅ Function to Update "My List" UI
function updateMyList() {
    const myListContainer = document.getElementById("my-list-container");
    const emptyMessage = document.getElementById("empty-list");
    myListContainer.innerHTML = watchlist.length ? "" : emptyMessage.style.display = "";
    emptyMessage.style.display = watchlist.length ? "none" : "block";

    watchlist.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-buttons">
                    <a href="${movie.link}" target="_blank">
                        <button class="movie-btn play-btn">▶</button>
                    </a>
                    <button class="movie-btn remove-btn">🗑️</button>
                </div>
            </div>
        `;
        movieCard.querySelector(".remove-btn").addEventListener("click", () => {
            watchlist = watchlist.filter(item => item.title !== movie.title);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
            updateMyList();
        });
        myListContainer.appendChild(movieCard);
    });
}

// ✅ Function to Pick a Random Movie & Redirect
function playRandomMovie() {
    if (!movieCategories.length) return alert("No movies available!");
    const randomMovie = movieCategories.flatMap(c => c.movies)[Math.floor(Math.random() * movieCategories.length)];
    // window.location.href = randomMovie.link;
    window.open(randomMovie.link, "_blank");
}

// ✅ Attach event listener to Hero Play Button
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("hero-play-btn")?.addEventListener("click", playRandomMovie);
    updateMyList();
    renderMovies();
});

// ✅ Function to Render Movies & Attach Event Listeners
function renderMovies() {
    const movieSection = document.querySelector(".movies-section");
    movieSection.innerHTML = ""; // Clear section before rendering

    movieCategories.forEach(category => {
        const categoryContainer = document.createElement("div");
        categoryContainer.id = category.id;
        categoryContainer.innerHTML = `<h2 class="section-title">${category.category}</h2><div class="movie-row"></div>`;

        category.movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.dataset.title = movie.title.toLowerCase();
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-buttons">
                        <a href="${movie.link}" target="_blank">
                            <button class="movie-btn play-btn">▶</button>
                        </a>
                        <button class="movie-btn add-btn">+</button>
                        <button class="movie-btn like-btn">👍</button>
                    </div>
                </div>
            `;

            movieCard.querySelector(".add-btn").addEventListener("click", () => {
                if (!watchlist.some(item => item.title === movie.title)) {
                    watchlist.push(movie);
                    localStorage.setItem("watchlist", JSON.stringify(watchlist));
                    updateMyList();
                    alert(`${movie.title} added to My List 📌`);
                } else alert(`${movie.title} is already in My List!`);
            });

            movieCard.querySelector(".like-btn").addEventListener("click", function () {
                this.classList.toggle("liked");
                this.style.backgroundColor = this.classList.contains("liked") ? "#53d397" : ""; // Green when liked, default when unliked
                alert(this.classList.contains("liked") ? `You liked ${movie.title} ❤️` : `You unliked ${movie.title} 💔`);
            });

            categoryContainer.querySelector(".movie-row").appendChild(movieCard);
        });

        movieSection.appendChild(categoryContainer);
    });
}

// ✅ Search Functionality with Home Button
searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    clearSearchBtn.style.display = query ? "inline-block" : "none";

    document.querySelectorAll(".movie-card").forEach(movieCard => {
        movieCard.style.display = movieCard.dataset.title.includes(query) ? "block" : "none";
    });

    if (query) setTimeout(() => document.querySelector(".movie-card[style='display: block;']")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
});

// ✅ Clear Search and Return to Home
clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    document.querySelectorAll(".movie-card").forEach(movieCard => movieCard.style.display = "block");
    clearSearchBtn.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ✅ Sign-In Modal Functionality
const signInBtn = document.getElementById("openSignIn");
const signInBox = document.getElementById("signInBox");
const closeSignInBtn = document.getElementById("closeSignIn");
const signInForm = document.getElementById("signInForm");

signInBtn.addEventListener("click", (event) => {
    event.preventDefault();
    signInBox.classList.add("show");
});

closeSignInBtn.addEventListener("click", () => signInBox.classList.remove("show"));

signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Sign In Successful!");
    signInForm.reset();
    signInBox.classList.remove("show");
});

window.addEventListener("click", (event) => {
    if (event.target === signInBox) signInBox.classList.remove("show");
});
