document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const logoutForm = document.getElementById('logout-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const username = formData.get('username');
            const password = formData.get('password');
            const email = formData.get('email');
            const full_name = formData.get('full_name');
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, email, full_name })
                });
                if (response.ok) {
                    alert('Registration successful');
                    window.location.href = '/dashboard';
                } else {
                    alert('Registration failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                if (response.ok) {
                    alert('Login successful');
                    window.location.href = '/dashboard';
                } else {
                    alert('Invalid username or password');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    if (logoutForm) {
        logoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('/logout', {
                    method: 'POST'
                });
                if (response.ok) {
                    alert('Logout successful');
                    window.location.href = '/';
                } else {
                    alert('Logout failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    const courseList = document.getElementById('course-list');
    if (courseList) {
        courseList.addEventListener('click', async (e) => {
            if (e.target.classList.contains('select-course-btn')) {
                const courseId = e.target.dataset.courseId;
                try {
                    const response = await fetch('/select-course', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ courseId })
                    });
                    if (response.ok) {
                        alert('Course selected successfully');
                        loadSelectedCourses();
                    } else {
                        alert('Failed to select course');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    }

    async function loadSelectedCourses() {
        try {
            const response = await fetch('/selected-courses');
            if (response.ok) {
                const courses = await response.json();
                const selectedCoursesList = document.getElementById('selected-courses-list');
                selectedCoursesList.innerHTML = '';
                courses.forEach(course => {
                    const listItem = document.createElement('li');
                    listItem.textContent = course.name;  // Assuming 'name' is a property of course
                    selectedCoursesList.appendChild(listItem);
                });
            } else {
                console.error('Failed to load selected courses');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Load selected courses on page load if on dashboard
    if (document.getElementById('dashboard')) {
        loadSelectedCourses();
    }
});
