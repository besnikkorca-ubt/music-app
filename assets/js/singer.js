var element = document.querySelector('.content');

var songs = [
    {
        name: 'Lofi Study',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt nisi excepturi cupiditate dignissimos eveniet, facilis molestias enim itaque sit laborum illum nemo, repellendus doloremque at, soluta officiis est aut exercitationem.',
        filename: 'lofi-study.mp3',
        filetype: 'audio/mp3'
    },
];

var innerHtml =  songs.map((song) =>
    `
    <article onclick="window.location = 'singer.html'; " class="content__card" >
        <div class="content__card__top">
            <img class="content__card__top_img" src="./assets/images/artist1.jpg" />
        
        </div>
        <div class="content__card__bottom">
            <header>
                <h2>${song.name}</h2>
                <p>${song.description}</p>
            </header>
            <div class="content_bio">
            <audio controls>
                <source
                    src="./assets/audio/${song.filename}"
                    type="${song.filetype}"
                />
            </audio>
            </div>
        </div>
    </article>
    `
).join('');

element.innerHTML = innerHtml;