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
    const diplomaButton = document.getElementById('showDiploma'); // New button

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

                    // Add subjects and grades to the list
                    semester.grades.forEach(subject => {
                        const gradeText = document.createElement('p');
                        
                        // Create span for the subject and the grade
                        const subjectSpan = document.createElement('span');
                        subjectSpan.classList.add('subject');
                        subjectSpan.textContent = subject.subject;
                        
                        const gradeSpan = document.createElement('span');
                        gradeSpan.classList.add('grade');
                        gradeSpan.textContent = subject.grade;

                        // Append the spans to the p tag
                        gradeText.appendChild(subjectSpan);
                        gradeText.appendChild(gradeSpan);

                        gradeList.appendChild(gradeText);
                    });

                    semesterItem.appendChild(semesterTitle);
                    semesterItem.appendChild(gradeList);

                    // Initially set max-height to 0 (hidden)
                    gradeList.style.maxHeight = '0';
                    gradeList.style.overflow = 'hidden';

                    // Add hover effect to trigger the max-height expansion
                    semesterItem.addEventListener("mouseenter", () => {
                        gradeList.style.maxHeight = '500px'; // Or adjust based on content
                    });

                    semesterItem.addEventListener("mouseleave", () => {
                        gradeList.style.maxHeight = '0';
                    });

                    semesterContainer.appendChild(semesterItem);
                });

                timeline.appendChild(semesterContainer);
            })
            .catch(error => console.error('Error loading grades data:', error));
    }

    
    // Function to display diploma details
    function showDiploma() {
        timeline.innerHTML = `
            <div class="diploma-section">
                <h2>Programme Overview</h2>
                <p><strong>INFORMATION ON THE PROGRAMME COMPLETED AND THE RESULTS OBTAINED</strong></p>
                <p><strong>Mode of study:</strong> Full-time degree programme including a period of internship, equivalent to a total of 150 ECTS credits.</p>
                <p><strong>Programme learning outcomes:</strong> The intended learning outcome for an AP Graduate in Computer Science includes the following:</p>
                
                <h2>Knowledge</h2>
                <p>The graduate has acquired knowledge about:</p>
                <ul>
                    <li>Generally applied practice, theory and method within software development</li>
                    <li>Basic business conditions related to system development</li>
                    <li>The technological foundation of technological concepts and IT systems in relation to programming, troubleshooting and initialization.</li>
                </ul>
                <h2>Skills</h2>
                <p>The graduate has acquired the skills needed to:</p>
                <ul>
                    <li>Methodologically identify IT system requirements, and assess the extent to which the requirements can be met within the given framework</li>
                    <li>Use modern and up-to-date programming techniques and tools for software construction, and ensure the quality of the developed product</li>
                    <li>Document the performed work and ensure that the documentation is useful for the given target group</li>
                    <li>Apply the relevant knowledge in connection with system development, programming and initiation</li>
                    <li>Conduct systematic troubleshooting and correct errors in connection with IT systems</li>
                    <li>Assess practice-oriented IT issues, and propose and select possible solutions</li>
                    <li>Communicate practice-oriented issues and possible solutions to partners and users.</li>
                </ul>
                <h2>Competencies</h2>
                <p>The graduate has acquired the competencies needed to:</p>
                <ul>
                    <li>Participate in the development of software development practice</li>
                    <li>Competently participate in project work</li>
                    <li>Take a professional approach to disciplinary and interdisciplinary collaboration in connection with software development</li>
                    <li>Participate in system development using modern methods, techniques and tools</li>
                    <li>In a structured context acquire new knowledge, skills and competencies in relation to the IT sector, including domain knowledge and technological knowledge as well as application of new methods, techniques and tools</li>
                </ul>
            </div>
        `;
    }

    // Event listeners for buttons
    educationButton.addEventListener('click', () => loadTimeline("education"));
    workButton.addEventListener('click', () => loadTimeline("work_experience"));
    gradesButton.addEventListener('click', () => loadGrades());
    diplomaButton.addEventListener('click', showDiploma); // New event listener
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


