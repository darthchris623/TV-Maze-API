console.log('TV Maze with Jasmine testing');

describe('getShow application should retrive show information and render it to the DOM', function () {
    it('should call getShow() when information is passed in', function () {
        spyOn(window, 'getShow');

        // Creating the element inputs and assigning their values
        const form = document.createElement('form');
        const input = document.createElement('input');
        const show = document.createElement('section');
        
        input.setAttribute('type', 'text');
        input.value = 'Friends';
        show.setAttribute('id', 'show');
        // const response = axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${input.value}`);
        
        // Creating the submit button and adding the event listener
        const submit = document.createElement('button');
        submit.addEventListener('click', function (event) {
            event.preventDefault();
            getShow(input.value);
        });

        // Creating HTML elements
        const getEpisodeButton = document.createElement('button');
        // getEpisodeButton.innerText = 'Get episodes';
        getEpisodeButton.addEventListener('click', getEpisodes);
        const h3 = document.createElement('h3');
        // h3.setAttribute('id', `${response.data.id}`);
        // h3.innerText = `${response.data.name}`;

        // Appending the input and button to the DOM
        show.append(h3);
        // show.append(`${response.data.summary}`);
        form.append(input);
        form.append(submit);
        document.body.append(form);

        // Triggering the "click" event on the submit button
        submit.dispatchEvent(new Event('click'));

        // Checking to see if appendResults() was called
        expect(getShow).toHaveBeenCalled();

    });
    it('should call getEpisodes() and render the data to the DOM', function () {
        spyOn(window, 'getEpisodes');
        // Creating the element inputs and assigning their values
        const show = document.createElement('section');
        const episodeList = document.createElement('ul');
        const listItem = document.createElement('li');
        // const showID = 431;

        // Creating the submit button and adding the event listener
        const getEpisodeButton = document.createElement('button');
        getEpisodeButton.addEventListener('click', function (event) {
            event.preventDefault();
            getEpisodes();
        });

        // Appending the input and button to the DOM
        episodeList.append(listItem);
        show.append(episodeList);

        // Triggering the "click" event on the submit button
        getEpisodeButton.dispatchEvent(new Event('click'));

        // Checking to see if appendResults() was called
        expect(getEpisodes).toHaveBeenCalled();
    });
});
