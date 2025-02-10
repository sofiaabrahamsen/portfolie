document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);

    document.getElementById('theme-toggle').addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    const timeline = document.getElementById('timeline');
    const educationButton = document.getElementById('showEducation');
    const workButton = document.getElementById('showWork');

    function loadTimeline(type) {
        fetch('static/cv.json')
            .then(response => response.json())
            .then(data => {
                timeline.innerHTML = '';
                data[type].forEach(item => {
                    const timelineItem = document.createElement('div');
                    timelineItem.classList.add('timeline-item');
                    timelineItem.innerHTML = `
                        <div class="timeline-content">
                            <p class="title">${item.title}</p>
                            <p class="year">${item.year}</p>
                            <p class="description">${item.description}</p>
                        </div>
                    `;
                    timeline.appendChild(timelineItem);
                });
            })
            .catch(error => console.error('Error loading CV data:', error));
    }

    educationButton.addEventListener('click', () => loadTimeline("education"));
    workButton.addEventListener('click', () => loadTimeline("work_experience"));
});



// GEEK JOKE API CALL
document.addEventListener('DOMContentLoaded', function () {
    const geekJokeElement = document.querySelector("#geek-joke");
    const newGeekJokeButton = document.querySelector("#new-geek-joke-btn");

    // Fetch Geek Joke
    function fetchGeekJoke() {
        fetch("https://geek-jokes.sameerkumar.website/api?format=json")
            .then(response => response.json())
            .then(data => {
                geekJokeElement.textContent = data.joke; // Display the joke
            })
            .catch(error => {
                geekJokeElement.textContent = "Oops! Something went wrong. Please try again later.";
                console.error("Error fetching joke:", error);
            });
    }

    // Fetch initial joke
    fetchGeekJoke();

    // Add event listener to the "Get Another Geek Joke" button
    newGeekJokeButton.addEventListener('click', function () {
        fetchGeekJoke();
    });
});


