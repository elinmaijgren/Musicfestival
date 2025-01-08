const baseUrl = "https://cdn.contentful.com/spaces/";

const spaceId = localStorage.getItem("space_id");
const accessToken = localStorage.getItem("access_token");


const apiUrl = `${baseUrl}${spaceId}/entries?access_token=${accessToken}&content_type=artist&include=3`;


const fetchData = async () => {
    try {
        const response = await fetch(apiUrl);

        if(!response.ok) {
            throw new Error("Något blev fel i förfrågan!");
        }

        const data = await response.json();

        const artistData = document.getElementById('artist-container');

    
        const artistsWithDetails = data.items.map((artist) => {
            const genreId = artist.fields.genre?.sys.id;
            const genreEntry = data.includes.Entry.find((entry) => entry.sys.id === genreId);
      
            const dayId = artist.fields.day?.sys.id;
            const dayEntry = data.includes.Entry.find((entry) => entry.sys.id === dayId);
      
            const stageId = artist.fields.stage?.sys.id;
            const stageEntry = data.includes.Entry.find((entry) => entry.sys.id === stageId);
      
        
            return {
              name: artist.fields.name || "Okänd artist",
              description: artist.fields.description || "Ingen beskrivning",
              genre: genreEntry?.fields.name || "Ingen genre",
              day: dayEntry?.fields.description || "Ingen dag",
              stage: stageEntry?.fields.name || "Ingen scen",
            };
        });

    const artistHTML = artistsWithDetails.map((artist) => {
      return `
        <div class="artist">
          <h2>${artist.name}</h2>
          <p><strong>Genre:</strong> ${artist.genre}</p>
          <p><strong>Day:</strong> ${artist.day}</p>
          <p><strong>Stage:</strong> ${artist.stage}</p>
          <p class="description"><strong>About the artist:</strong> ${artist.description}</p>
        </div>
      `;
    });

    artistData.innerHTML = artistHTML.join("");
    } catch (error) {
        console.error("Ett fel inträffade vid hämtning av data!");
    }

};

fetchData();

