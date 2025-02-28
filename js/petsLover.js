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
          <img src="${pet.image}" class="h-full w-full object-cover" alt="${pet.pet_name}" draggable="true" ondragstart="drag(event)" />
          <p><strong>Type:</strong> ${pet.category}</p>
          <p><strong>Age:</strong> ${pet.date_of_birth} years</p>
          <p><strong>Gender:</strong> ${pet.gender}</p>
          <p><strong>Price:</strong> ${pet.price}</p>
        </div>
      `;
  
      petContainer.appendChild(petCard);
    });
  }
  
  // Drag and Drop Functions
  function allowDrop(event) {
    event.preventDefault(); // Allow dropping
  }
  
  function drag(event) {
    // Set the data being dragged (the image source)
    event.dataTransfer.setData("text", event.target.src);
  }
  
  function drop(event) {
    event.preventDefault(); // Prevent default behavior
    const data = event.dataTransfer.getData("text"); // Get the dragged image source
  
    // Create a new image element and set its source
    const img = document.createElement("img");
    img.src = data;
    img.classList.add("h-24", "w-24", "object-cover", "mb-2"); // Add some styling
  
    // Append the image to the second column
    const droppedImages = document.getElementById("droppedImages");
    droppedImages.appendChild(img);
  }
  
  // Fetch and display pets when the page loads
  loadPets();