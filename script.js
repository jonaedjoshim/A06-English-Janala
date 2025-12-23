function loadLesson() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(data => displayLesson(data.data))
        .catch(error => {
            console.error("Failed to load lessons:", error)
        })
}

function loadLevelLesson(level) {
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
        .then(response => response.json())
        .then(data => displayLoadLevelLesson(data.data))
}

function displayLoadLevelLesson(words) {
    const wordContainer = document.getElementById("wordContainer")
    for (const word of words) {
        const div = document.createElement("div")
        div.innerHTML = `
    <div class="flex flex-col justify-center rounded-3xl bg-white p-14">
                    <div class="space-y-6 mb-14 flex flex-col items-center text-center">
                        <h4 class="inter font-bold text-3xl">${word.word}</h4>
                        <p class="inter font-medium text-xl">Meaning /Pronounciation</p>
                        <p class="hind font-semibold text-3xl text-[#18181B]">"${word.meaning} / ${word.pronunciation}"</p>
                    </div>
                    <div class="flex justify-between">
                        <div class="bg-[#1A91FF10] rounded-lg p-3 text-[#374957] text-2xl cursor-pointer hover:shadow-sm">
                            <i class="fa-solid fa-circle-info"></i>
                        </div>
                        <div class="bg-[#1A91FF10] rounded-lg p-3 text-[#374957] text-2xl cursor-pointer hover:shadow-sm">
                            <i class="fa-solid fa-volume-high"></i>
                        </div>
                    </div>
                </div>
    `
        wordContainer.appendChild(div)
    }

}

function displayLesson(lessons) {
    const allLesson = document.getElementById("allLesson")
    for (const lesson of lessons) {
        const li = document.createElement("li")
        li.innerHTML = `
        <button onclick="loadLevelLesson(${lesson.level_no})" 
               class="btn btn-outline text-sm text-[#422AD5] outline-[#422AD5] hover:bg-[#422AD5] hover:text-white">
                <i class="fa-solid fa-book-open text-lg"></i>Lesson -${lesson.level_no}
         </button>
        `
        allLesson.appendChild(li)
    }
}

loadLesson()