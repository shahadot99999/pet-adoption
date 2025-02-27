// Function to fetch pet data from the API

const loadPets = () =>{
  // console.log("loadCategories created");

  fetch("https://openapi.programming-hero.com/api/peddy/pets")
  //.then((res)=>console.log(res))
  .then((res)=>res.json(res))
  //.then((data)=>console.log(data.pets))
 .then((data)=>displayPets(data.pets))
  .catch((error)=>console.log(error));
}



// {
//   "petId": 1,
//   "breed": "Golden Retriever",
//   "category": "Dog",
//   "date_of_birth": "2023-01-15",
//   "price": 1200,
//   "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//   "gender": "Male",
//   "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//   "vaccinated_status": "Fully",
//   "pet_name": "Sunny"
// }




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
          <img src=${pet.image} class = "h-full w-full object-cover" alt=" " />
          <p><strong>Type:</strong> ${pet.category}</p>
          <p><strong>Age:</strong> ${pet.date_of_birth} years</p>
          <p><strong>Gender:</strong> ${pet.gender}</p>
           <p><strong>Price:</strong> ${pet.price}</p>
        </div>
        
      `;

      petContainer.appendChild(petCard);
    });
  }

  // Fetch and display pets when the page loads
 
  loadPets();