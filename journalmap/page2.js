document.addEventListener('DOMContentLoaded', function () {
    // Dynamically create the calendar
    const calendar = document.getElementById('calendar');
    const currentMonth = document.getElementById('currentMonth');
    const displayEntry = document.getElementById('displayEntry');
    const editEntryBtn = document.getElementById('editEntryBtn');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const today = new Date();
    const currentMonthIndex = today.getMonth();
    const currentYear = today.getFullYear();
    const entries = new Array(31); // Array to store entries for each day

    currentMonth.textContent = months[currentMonthIndex] + ' ' + currentYear;

    for (let day = 1; day <= 31; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        dayElement.addEventListener('click', function () {
            openEntryBox(day);
        });
        calendar.appendChild(dayElement);
    }

    // Entry box functionality
    const entryBox = document.getElementById('entryBox');
    const entryText = document.getElementById('entryText');
    const addEntryBtn = document.getElementById('addEntry');
    const saveEntryBtn = document.getElementById('saveEntry');

    let selectedDay = null;

    function openEntryBox(day) {
        // Display entry for the selected day
        selectedDay = day;
        displayEntry.textContent = entries[day - 1] || "No entry for this day";
        displayEntry.style.display = 'block';

        // Display the Edit Entry button only if there's an entry
        if (entries[day - 1]) {
            editEntryBtn.style.display = 'inline-block';
        } else {
            editEntryBtn.style.display = 'none';
        }

        // Logic to open entry box for the selected day
        entryBox.style.display = 'block';
        entryText.value = entries[day - 1] || ''; // Populate the textarea with existing entry
        addEntryBtn.style.display = 'none';
        saveEntryBtn.style.display = 'inline-block';
    }

    addEntryBtn.addEventListener('click', function () {
        // Logic to add entry
        entryBox.style.display = 'block';
        addEntryBtn.style.display = 'none';
        saveEntryBtn.style.display = 'inline-block';
    });

    saveEntryBtn.addEventListener('click', function () {
        // Logic to save entry
        if (selectedDay !== null) {
            entries[selectedDay - 1] = entryText.value; // Save entry to the array
            entryBox.style.display = 'none';
            addEntryBtn.style.display = 'inline-block';
            saveEntryBtn.style.display = 'none';
            editEntryBtn.style.display = 'inline-block';
        }
    });

    editEntryBtn.addEventListener('click', function () {
        // Logic to edit entry
        entryBox.style.display = 'block';
        addEntryBtn.style.display = 'none';
        saveEntryBtn.style.display = 'inline-block';
        editEntryBtn.style.display = 'none';
    });

    // Set the background image dynamically
    const container = document.getElementById('container');
    container.style.backgroundImage = 'url("image/wood-back.png")';
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundRepeat = 'no-repeat';
    container.style.margin = '0';
    container.style.padding = '0';
});