const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json(res))
      .then((data) => displayPets(data.pets))
      .catch((error) => console.log(error));
  };
  
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
          <div class="mt-4 flex  gap-1">
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
    img.classList.add("h-24", "w-24", "object-cover", "mb-2"); // Add some styling
  
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
    const detailCategory = document.getElementById("detailCategory");
    const detailBirth = document.getElementById("detailBirth");
    const detailDescription = document.getElementById("detailDescription");
    const closeDetails = document.getElementById("closeDetails");
  
    // Set pet details in the modal
    detailName.textContent = pet.pet_name;
    detailCategory.textContent = pet.category;
    detailBirth.textContent = pet.date_of_birth;
    detailDescription.textContent = pet.description || "No description available.";
  
    // Show the modal
    detailsModal.classList.remove("hidden");
  
    // Close the modal
    closeDetails.addEventListener("click", () => {
      detailsModal.classList.add("hidden");
    });
  }
  
  // Fetch and display pets when the page loads
  loadPets();