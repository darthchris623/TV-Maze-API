console.log('TV Maze with Jasmine testing');

describe('getShow application should retrive show information and render it to the DOM', function () {
    it('should call getShow() when information is passed in', function () {
        spyOn(window, 'getShow');

        // Creating the element inputs and assigning their values
        const form = document.createElement('form');
        const input = document.createElement('input');
        const show = document.createElement('section');
        const h3 = document.createElement('h3');
        input.setAttribute('type', 'text');
        input.value = 'Friends';
        show.setAttribute('id', 'show');
        
        // Creating the submit button and adding the event listener
        const submit = document.createElement('button');
        submit.addEventListener('click', function (event) {
            event.preventDefault();
            getShow(input.value);
        });

        // Creating the button, and adding the event listener
        const getEpisodeButton = document.createElement('button');
        getEpisodeButton.addEventListener('click', getEpisodes);

        // Appending the input and button to the DOM
        show.append(h3);
        form.append(input);
        form.append(submit);
        document.body.append(form);

        // Triggering the "click" event on the submit button
        submit.dispatchEvent(new Event('click'));

        // Checking to see if getShow() was called
        expect(getShow).toHaveBeenCalled();

    });
    it('should call getEpisodes() and render the data to the DOM', function () {
        spyOn(window, 'getEpisodes');
        // Creating the element inputs and assigning their values
        const show = document.createElement('section');
        const episodeList = document.createElement('ul');
        const listItem = document.createElement('li');
        // const showID = 431;

        // Creating the "get episodes" button and adding the event listener
        const getEpisodeButton = document.createElement('button');
        getEpisodeButton.addEventListener('click', function (event) {
            event.preventDefault();
            getEpisodes();
        });

        // Appending the HTML elements and button to the DOM
        document.body.append(getEpisodeButton);
        episodeList.append(listItem);
        show.append(episodeList);

        // Triggering the "click" event
        getEpisodeButton.dispatchEvent(new Event('click'));


        // Checking to see if getEpisodes() was called
        expect(getEpisodes).toHaveBeenCalled();

    });
    it('should call clearPage() and clear the DOM when called', function () {
        spyOn(window, 'clearPage');

        // Creating the element inputs and assigning their values
        const show = document.createElement('section');
        const episodeList = document.querySelector('ul');
        const listItem = document.querySelector('li');
        episodeList.append(listItem);
        show.append(episodeList);
        document.body.append(show);

        // Creating the delete button and adding the event listener
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', function (event) {
            event.preventDefault();
            clearPage();
        });

        // Removing the elements from the DOM
        episodeList.remove();
        listItem.remove();

        // Triggering the "click" event
        deleteButton.dispatchEvent(new Event('click'));

        // Checking to see if clearPage() was called
        expect(clearPage).toHaveBeenCalled();
    });
});
