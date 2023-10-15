console.log('TV Maze');

const $input = $('#input'); // DOM selector for text input
const $submit = $('#submit'); // DOM selector for "search" button
const $show = $('#show'); // DOM selector for section, which will display search results
const $delete = document.getElementById('delete'); // DOM selector for "delete" button

// Event listener for submiting a query
$submit.on('click', function (event) {
    if ($input.val() === '') { // Prevents an empty string from passing through, triggers the "required" message in HTML
        return;
    }
    event.preventDefault();
    getShow($input.val());
    $input.val(''); // Resets the input box to empty
});
// Retrieves show from API
async function getShow(show) {
    clearPage(); // Removes any previous TV show from the page if applicable
    try {
        const img = document.createElement('img'); // Creates image tag for show image
        const response = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${show}`);
        // If there is no image, a different image will load
        if (!response.data.image.medium) {
            // This code has not been tested yet as I have not found and API without an image.
            img.setAttribute('src', 'https://t4.ftcdn.net/jpg/04/00/24/31/240_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg');
        }
        else {
            img.setAttribute('src', `${response.data.image.medium}`);// Renders the TV show image to the DOM
        }
        $show.append(img);
        const h3 = document.createElement('h3');
        h3.innerText = `${response.data.name}`; // Displays the name of the show
        h3.id = `${response.data.id}`; // Writes the API show ID into the HTML, used for retriving episodes in the getEpisodes function
        $show.append(h3);// Displays the title under the photo and above the show description
        $show.append(`${response.data.summary}`); // Renders the show summary to the DOM
        const getEpisodeButton = document.createElement('button'); // Creates a button to retrive episodes and render them to the DOM
        getEpisodeButton.id = 'get-episodes';
        getEpisodeButton.innerText = 'Get episodes';
        getEpisodeButton.addEventListener('click', getEpisodes);
        $show.append(getEpisodeButton);
    }
    catch (error) {
        alert('Not found. Check your spelling.')
    }
};

// Retrieves episodes from API
async function getEpisodes() {
    const showID = document.querySelector('h3').id;
    const response = await axios.get(`http://api.tvmaze.com/shows/${showID}/episodes`);
    const numberOfSeasons = response.data[response.data.length - 1].season;

    // This code makes a UL for each season, then renders each episode according to season
    for (let a = 0; a < numberOfSeasons; a++) { // Makes a list for each season
        const episodeList = document.createElement('ul'); // Makes a UL
        episodeList.innerHTML = `<p><b>Season ${a + 1}</b></p>`;
        // This code make a LI for each episode in the season
        for (let b = 0; b < response.data.length; b++){
            if (response.data[b].season === a + 1) { // If the "season" value for this index equals the season number
                const listItem = document.createElement('li'); // Makes an LI
                listItem.innerText = `Episode ${response.data[b].number}: "${response.data[b].name}"`; // Renders the data onto the LI
                episodeList.append(listItem);
            }
        }
        $show.append(episodeList);
    }
    $('#get-episodes').remove(); // Removes "get episodes" button
};

// Clears page of all TV program info
function clearPage() {
    const target = Array.from(document.getElementById('show').children);
    for (let child of target){
        child.remove();
    }
};

$delete.addEventListener('click', function () {
    clearPage();
});
