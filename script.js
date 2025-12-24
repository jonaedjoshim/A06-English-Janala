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

function loadWordDetails(id) {
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then(response => response.json())
        .then(data => { displayLoadWordDetails(data.data) })
}

function displayLoadWordDetails(data) {
    document.getElementById("modal").showModal()
    const detailsContainer = document.getElementById("detailsContainer")
    
    let synonyms = "";
    if (data.synonyms && data.synonyms !== "null" && data.synonyms.length > 0) {
        synonyms = data.synonyms.map(syn => `
            <div class="bg-[#EDF7FF] px-5 py-1 rounded-md">
                <p class="text-lg">${syn}</p>
            </div>
        `).join("");
    } else {
        synonyms = "<p class='text-gray-400 text-sm italic'>নেই</p>";
    }

    detailsContainer.innerHTML = `
        <h3 class="text-3xl font-semibold">
            ${(data.word && data.word !== "null") ? data.word : "তথ্য নেই"} 
            (<i class="fa-solid fa-microphone-lines"></i>:${(data.pronunciation && data.pronunciation !== "null") ? data.pronunciation : "N/A"})
        </h3>
        <div class="space-y-1">
            <h5 class="font-semibold text-xl">Meaning</h5>
            <p class="hind font-medium text-lg">${(data.meaning && data.meaning !== "null") ? data.meaning : "তথ্য নেই"}</p>
        </div>
        <div class="space-y-1">
            <h5 class="font-semibold text-xl">Example</h5>
            <p class="font-normal text-lg">${(data.sentence && data.sentence !== "null") ? data.sentence : "উদাহরণ নেই"}</p>
        </div>
        <div class="space-y-1">
            <h5 class="font-semibold text-xl">Parts of Speech</h5>
            <p class="font-normal text-lg">${(data.partsOfSpeech && data.partsOfSpeech !== "null") ? data.partsOfSpeech : "N/A"}</p>
        </div>
        <div class="space-y-1">
            <h5 class="hind font-medium text-xl">সমার্থক শব্দ গুলো</h5>
            <div class="flex flex-wrap gap-2 justify-around">
                ${synonyms}
            </div>
        </div>
    `
}

function displayLoadLevelLesson(words) {
    const wordContainer = document.getElementById("wordContainer")
    wordContainer.innerHTML = ""
    
    for (const word of words) {
        const div = document.createElement("div")
        const finalMeaning = (word.meaning && word.meaning !== "null") ? word.meaning : "অর্থ নেই";
        const finalPronunciation = (word.pronunciation && word.pronunciation !== "null") ? word.pronunciation : "N/A";

        div.innerHTML = `
            <div class="flex flex-col justify-center rounded-3xl bg-white p-14 border border-gray-100 shadow-sm">
                <div class="space-y-6 mb-14 flex flex-col items-center text-center">
                    <h4 class="inter font-bold text-3xl">${word.word}</h4>
                    <p class="inter font-medium text-xl text-gray-500">Meaning / Pronunciation</p>
                    <p class="hind font-semibold text-3xl text-[#18181B]">"${finalMeaning} / ${finalPronunciation}"</p>
                </div>
                <div class="flex justify-between">
                    <div onclick="loadWordDetails(${word.id})" class="bg-[#1A91FF10] rounded-lg p-3 text-[#374957] text-2xl cursor-pointer hover:bg-[#1A91FF20]">
                        <i class="fa-solid fa-circle-info"></i>
                    </div>
                    <div onclick="speakWord('${word.word}')" class="bg-[#1A91FF10] rounded-lg p-3 text-[#374957] text-2xl cursor-pointer hover:bg-[#1A91FF20]">
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
    allLesson.innerHTML = "" 
    
    for (const lesson of lessons) {
        const li = document.createElement("li")
        li.innerHTML = `
        <button onclick="loadLevelLesson(${lesson.level_no})" 
               class="btn btn-outline text-sm text-[#422AD5] outline-[#422AD5] hover:bg-[#422AD5] hover:text-white">
                <i class="fa-solid fa-book-open text-lg"></i> Lesson -${lesson.level_no}
         </button>
        `
        allLesson.appendChild(li)
    }
}

function speakWord(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; 
    window.speechSynthesis.speak(utterance);
}

loadLesson()