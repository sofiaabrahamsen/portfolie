document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);

    // Theme Toggle Functionality
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    const timeline = document.getElementById('timeline');
    const educationButton = document.getElementById('showEducation');
    const workButton = document.getElementById('showWork');
    const gradesButton = document.getElementById('showGrades');

    // Function to load timeline data (education and work)
    function loadTimeline(type) {
        fetch('static/cv.json')
            .then(response => response.json())
            .then(data => {
                timeline.innerHTML = ''; // Clear previous content
                const items = data[type] || [];

                items.forEach(item => {
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

    // Function to load grades from JSON and dynamically generate semester boxes
    function loadGrades() {
        fetch('static/grades.json')
            .then(response => response.json())
            .then(data => {
                timeline.innerHTML = ''; // Clear previous content

                const semesterContainer = document.createElement('div');
                semesterContainer.classList.add('semester-container');

                data.semesters.forEach(semester => {
                    const semesterItem = document.createElement('div');
                    semesterItem.classList.add('semester-item');

                    // Semester title
                    const semesterTitle = document.createElement('span');
                    semesterTitle.textContent = semester.name;

                    // Container for grades (initially hidden)
                    const gradeList = document.createElement('div');
                    gradeList.classList.add('semester-grades');

                    semester.grades.forEach(subject => {
                        const gradeText = document.createElement('p');
                        gradeText.textContent = `${subject.subject}: ${subject.grade}`;
                        gradeList.appendChild(gradeText);
                    });

                    semesterItem.appendChild(semesterTitle);
                    semesterItem.appendChild(gradeList);

                    // Add hover effect
                    semesterItem.addEventListener("mouseenter", () => {
                        gradeList.style.display = "block";
                    });

                    semesterItem.addEventListener("mouseleave", () => {
                        gradeList.style.display = "none";
                    });

                    semesterContainer.appendChild(semesterItem);
                });

                timeline.appendChild(semesterContainer);
            })
            .catch(error => console.error('Error loading grades data:', error));
    }

    // Event listeners for buttons
    educationButton.addEventListener('click', () => loadTimeline("education"));
    workButton.addEventListener('click', () => loadTimeline("work_experience"));
    gradesButton.addEventListener('click', () => loadGrades());
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


