
const button = document.getElementById('button');
const gumble = document.getElementById('goumble');
gumble.style.background = 'white';

button.addEventListener('click', async function () {
    const Inputq = document.getElementById('Inputq').value.trim();
    const Inputc = document.getElementById('Inputc').value.trim();
    const Inputn = document.getElementById('Inputn').value.trim();  // Get the number of articles the user wants
    const apikey = "please git your api key from the gnews.io";  

    if (!Inputq || !Inputc || !Inputn) {
        alert("Please fill in all fields.");
        return;
    }

    const URl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(Inputq)}&lang=en&country=${Inputc}&max=${Inputn}&apikey=${apikey}`;

    const response = await fetch(URl);
    const data = await response.json();

    if (data && data.articles) {
        gumble.innerHTML = ''; // Clear previous content

        // Loop through the articles based on the user's input
        data.articles.forEach((article, index) => {
            const card = document.createElement('div');
            card.classList.add('w-[700px]', 'flex-col', 'flex', 'items-center', 'm-auto', 'px-[10px]', 'text-[#ffffff]', 'pt-[20px]', 'rounded-[10px]', 'mb-[20px]', 'bg-[#3498db]');

            // Add title, description, image, content, and source
            card.innerHTML = `
                <h2 class="text-3xl mb-[20px] text-center">${article.title}</h2>
                <p class="text-center mb-[20px]">${article.description}</p>
                <img class="w-[500px] rounded-2xl mb-[20px]" src="${article.image}" alt="Article image">
                <p class="mb-[10px]">${article.content}</p>
                <p class="text-center mb-[10px]">${new Date(article.publishedAt).toLocaleDateString()}</p>
                <p class="text-center"><a class="hover:text-amber-200" href="${article.url}" target="_blank">Read more</a></p>
            `;

            gumble.appendChild(card);
        });
    } else {
        gumble.innerHTML = "<p>No articles found. Please try again with different inputs.</p>";
    }
});

