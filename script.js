function loadLesson() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(data => displayLesson(data.data))
        .catch(error => {
            console.error("Failed to load lessons:", error);
        });
}
function displayLesson(lessons) {
    const allLesson = document.getElementById("allLesson")
    for (const lesson of lessons) {
        const li = document.createElement("li")
        li.innerHTML = `
        <button
               class="btn btn-outline text-sm text-[#422AD5] outline-[#422AD5] hover:bg-[#422AD5] hover:text-white">
                <i class="fa-solid fa-book-open text-lg"></i>Lesson -${lesson.level_no}
         </button>
        `
        allLesson.appendChild(li)
    }
}
loadLesson()