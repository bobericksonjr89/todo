class DOM {
    toggleActiveStatus(e) {
        console.log(e.target.innerText);
        if (e.target.innerText.includes('Projects')) {
            e.target.parentElement.classList.toggle("sidebar__projects-container--active");
        }
    }
}

/// TOO TIGHTLY COUPLED...


export default DOM