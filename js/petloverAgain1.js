const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};

// Function to filter pets by category
function filterPetsByCategory(category) {
  const petContainer = document.getElementById("petContainer");
  const loadingSpinner = document.getElementById("loadingSpinner");

  // Show the loading spinner
  loadingSpinner.classList.remove("hidden");

  // Add spring effect (bounce animation) to the pet container
  petContainer.classList.add("animate-spring");

  // Clear the container and hide it
  petContainer.innerHTML = "";
  petContainer.classList.add("opacity-0");

  // Wait for 2 seconds (spring effect duration)
  setTimeout(() => {
    // Hide the loading spinner
    loadingSpinner.classList.add("hidden");

    // Remove the spring effect and opacity classes
    petContainer.classList.remove("animate-spring", "opacity-0");

    // Fetch pets and filter by category
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) => {
        const filteredPets = data.pets.filter((pet) => pet.category === category);
        displayPets(filteredPets);
      })
      .catch((error) => console.log(error));
  }, 2000); // 2-second delay
}

// Function to display pets on the webpage
function displayPets(pets) {
  const petContainer = document.getElementById("petContainer");

  // Clear any existing content
  petContainer.innerHTML = "";

  // Loop through the pet data and create a card for each pet
  pets.forEach((pet) => {
    const petCard = document.createElement("div");
    petCard.classList.add("card", "bg-base-100", "shadow-xl", "hover:shadow-2xl", "transition-shadow");

    petCard.innerHTML = `
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold">${pet.pet_name}</h2>
        <img src="${pet.image}" class="h-full w-full object-cover" alt="${pet.pet_name}" />
        <p><strong>Type:</strong> ${pet.category}</p>
        <p><strong>Age:</strong> ${pet.date_of_birth} years</p>
        <p><strong>Gender:</strong> ${pet.gender}</p>
        <p><strong>Price:</strong> ${pet.price}</p>
        <div class="mt-4 flex gap-1">
          <button class="like-btn bg-blue-500 text-white px-4 py-2 rounded">Like</button>
          <button class="adopt-btn bg-green-500 text-white px-4 py-2 rounded">Adopt</button>
          <button class="details-btn bg-purple-500 text-white px-4 py-2 rounded">Details</button>
        </div>
      </div>
    `;

    // Add event listeners to buttons
    const likeBtn = petCard.querySelector(".like-btn");
    const adoptBtn = petCard.querySelector(".adopt-btn");
    const detailsBtn = petCard.querySelector(".details-btn");

    likeBtn.addEventListener("click", () => handleLike(pet.image));
    adoptBtn.addEventListener("click", () => handleAdopt(pet));
    detailsBtn.addEventListener("click", () => handleDetails(pet));

    petContainer.appendChild(petCard);
  });
}

// Handle Like Button Click
function handleLike(imageSrc) {
  const droppedImages = document.getElementById("droppedImages");

  // Create a new image element and set its source
  const img = document.createElement("img");
  img.src = imageSrc;
  img.classList.add("h-48", "w-48", "object-cover", "mb-2");

  // Append the image to the second column
  droppedImages.appendChild(img);
}

// Handle Adopt Button Click
function handleAdopt(pet) {
  const adoptModal = document.getElementById("adoptModal");
  const confirmAdopt = document.getElementById("confirmAdopt");
  const cancelAdopt = document.getElementById("cancelAdopt");

  // Show the modal
  adoptModal.classList.remove("hidden");

  // Confirm adoption
  confirmAdopt.addEventListener("click", () => {
    alert(`You have adopted ${pet.pet_name}!`);
    adoptModal.classList.add("hidden");
  });

  // Cancel adoption
  cancelAdopt.addEventListener("click", () => {
    adoptModal.classList.add("hidden");
  });
}

// Handle Details Button Click
function handleDetails(pet) {
  const detailsModal = document.getElementById("detailsModal");
  const detailName = document.getElementById("detailName");
  const detailImage = document.getElementById("detailImage");
  const detailCategory = document.getElementById("detailCategory");
  const detailBirth = document.getElementById("detailBirth");
  const detailDescription = document.getElementById("detailDescription");
  const closeDetails = document.getElementById("closeDetails");

  // Set pet details in the modal
  detailName.textContent = pet.pet_name;
  detailImage.src = pet.image;
  detailCategory.textContent = pet.category;
  detailBirth.textContent = pet.date_of_birth;
  detailDescription.textContent = pet.pet_details || "No description available.";

  // Show the modal
  detailsModal.classList.remove("hidden");

  // Close the modal
  closeDetails.addEventListener("click", () => {
    detailsModal.classList.add("hidden");
  });
}

// Fetch and display pets when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://openapi.programming-hero.com/api/peddy/categories";
  const categoriesContainer = document.getElementById("api-categories");

  // Fetch categories from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        // Clear any existing content
        categoriesContainer.innerHTML = "";

        // Loop through each category and create a button element
        data.categories.forEach((category) => {
          const categoryButton = document.createElement("button");
          categoryButton.textContent = category.category;
          categoryButton.dataset.category = category.category; // Store category name in dataset
          categoryButton.classList.add(
            "block",
            "text-white",
            "bg-blue-500",
            "hover:bg-blue-700",
            "font-bold",
            "rounded-full",
            "py-2",
            "px-4",
            "text-lg",
            "mb-2",
            "transition",
            "duration-300",
            "ease-in-out"
          );

          // Add click event listener to filter pets by category
          categoryButton.addEventListener("click", () => {
            filterPetsByCategory(category.category);
          });

          // Append to the container
          categoriesContainer.appendChild(categoryButton);
        });
      } else {
        console.log("Failed to fetch categories");
      }
    })
    .catch((error) => console.log("Error fetching data:", error));

  // Load all pets initially
  loadPets();
});