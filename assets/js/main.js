document.addEventListener('DOMContentLoaded', () => {
    var contentContainer = document.querySelector('.content');

var artists = Array.from(Array(10)).map(() => ({
    name: 'Lorem ipsum',
    description: 'Is an excellent artist renouned in the industry of music.',
    bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, consequatur modi laboriosam totam possimus alias nulla aliquam eius pariatur explicabo magnam impedit cum eos molestiae ratione doloribus fugiat in soluta!'
}));

var content = artists.map((artist) => `
<article onclick="window.location = 'singer.html'; " class="content__card" >
    <div class="content__card__top">
        <img class="content__card__top_img" src="./assets/images/artist1.jpg" />
    
    </div>
    <div class="content__card__bottom">
        <header>
            <h2>${artist.name}</h2>
            <p>${artist.description}</p>
        </header>
        <div class="content_bio">
            <p> ${artist.bio} </p>
        </div>
    </div>
</article>`).join('');

contentContainer.innerHTML  = content;
});
