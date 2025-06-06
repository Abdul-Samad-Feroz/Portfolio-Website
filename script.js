//var input = prompt("Enter your name")
//console.log(input)

window.addEventListener("load", function () {
  setTimeout(function () {
    // Hide the welcome screen and show the main portfolio
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("main-portfolio").style.display = "block";
  }, 2000); // 3000 milliseconds = 3 seconds (adjust as per requirement)
});

// Show the "Back to Top" button after scrolling 70px down
window.onscroll = function () {
  let backToTopButton = document.getElementById("back-to-top");

  if (document.documentElement.scrollTop > 200) {
    backToTopButton.style.opacity = "1"; // Show button with opacity
    backToTopButton.style.visibility = "visible"; // Ensure visibility
  } else {
    backToTopButton.style.opacity = "0"; // Hide button with opacity
    backToTopButton.style.visibility = "hidden"; // Ensure hidden state
  }
};

// Scroll back to the top when button is clicked
document.getElementById("back-to-top").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//Animation in Skills Section
function animateSkills() {
  const bars = document.querySelectorAll(".progress-bar");
  bars.forEach((bar) => {
    const value = bar.getAttribute("data-percentage");
    bar.style.width = value;
  });
}

const skillsSection = document.getElementById("skills");
let animated = false;

window.addEventListener("scroll", () => {
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;

  if (sectionPos < screenPos && !animated) {
    animateSkills();
    animated = true;
  }
});

