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
    const detailImage = document.getElementById("detailImage");
    const detailCategory = document.getElementById("detailCategory");
    const detailBirth = document.getElementById("detailBirth");
    const detailDescription = document.getElementById("detailDescription");
    const closeDetails = document.getElementById("closeDetails");
  
    // Set pet details in the modal
    detailName.textContent = pet.pet_name;
    detailImage.src = pet.image; // Set the image source
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


 

//   {
//     "status": true,
//     "message": "successfully fetched all the categories data",
//     "categories": [
//         {
//             "id": 1,
//             "category": "Cat",
//             "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
//         },
//         {
//             "id": 2,
//             "category": "Dog",
//             "category_icon": "https://i.ibb.co.com/c8Yp1y7/dog.png"
//         },
//         {
//             "id": 3,
//             "category": "Rabbit",
//             "category_icon": "https://i.ibb.co.com/3hftmLC/rabbit.png"
//         },
//         {
//             "id": 4,
//             "category": "Bird",
//             "category_icon": "https://i.ibb.co.com/6HHZwfq/bird.png"
//         }
//     ]
// }

document.addEventListener("DOMContentLoaded", function () { 
  const apiUrl = "https://openapi.programming-hero.com/api/peddy/categories";
  const categoriesContainer = document.getElementById("api-categories");

  // Fetch categories from the API
  fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          if (data.status) { // Ensure the response is successful
              console.log(data.categories); // Logs the full array

              // Clear any existing content
              categoriesContainer.innerHTML = "";

              // Loop through each category and create an anchor element
              data.categories.forEach(category => {
                  const categoryItem = document.createElement("a");
                  categoryItem.href = "#"; // You can update the URL accordingly
                  categoryItem.textContent = category.category;
                  categoryItem.classList.add("block", "text-blue-500", "flex","flex-col", "text-lg");

                  // Append to the container
                  categoriesContainer.appendChild(categoryItem);
              });
          } else {
              console.log("Failed to fetch categories");
          }
      })
      .catch((error) => console.log("Error fetching data:", error));
});

          
          // {
          //   if (Array.isArray(data.data) && data.data.length > 0) {
          //       // Clear any loading or placeholder content
          //       categoriesContainer.innerHTML = "";

          //       // Add each category as a link
          //       data.data.forEach((category) => {
          //           const categoryLink = document.createElement("a");
          //           categoryLink.href = "#";
          //           categoryLink.textContent = category;
          //           categoryLink.className = "block text-blue-500 hover:underline";
          //           categoriesContainer.appendChild(categoryLink);
          //       });
          //   } else {
          //       // Display a message if no categories are found
          //       categoriesContainer.innerHTML = "<p class='text-gray-500'>No categories found.</p>";
          //   }
//         })
//         .catch((error) => {
//             console.error("Error fetching categories:", error);
//             categoriesContainer.innerHTML = "<p class='text-red-500'>Failed to load categories. Please try again later.</p>";
//         });
// });



  loadPets();