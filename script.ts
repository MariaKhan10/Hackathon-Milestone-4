// Accessing form elements
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumePreview = document.getElementById("resume-preview") as HTMLDivElement;

form.addEventListener("submit", function (event) {
    event.preventDefault();
    generateResume();
});

function generateResume() {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const profilePicture = (document.getElementById("profilePicture") as HTMLInputElement).files![0];
    const address = (document.getElementById("address") as HTMLInputElement).value || "";
    const profileSummary = (document.getElementById("profileSummary") as HTMLTextAreaElement).value || "";
    const linkedIn = (document.getElementById("linkedIn") as HTMLInputElement).value || "";
    const certifications = (document.getElementById("certifications") as HTMLInputElement).value || "";

    // Collecting dynamically added education, experience, and skills
    const educationItems = Array.from(document.querySelectorAll(".education-item")).map((item) => {
        return {
            education: (item.querySelector(".education") as HTMLInputElement).value,
            year: (item.querySelector(".education-year") as HTMLInputElement).value,
        };
    });

    const experienceItems = Array.from(document.querySelectorAll(".experience-item")).map((item) => {
        return {
            experience: (item.querySelector(".experience") as HTMLInputElement).value,
            year: (item.querySelector(".experience-year") as HTMLInputElement).value,
        };
    });

    const skillItems = Array.from(document.querySelectorAll(".skills-item")).map((item) => {
        return (item.querySelector(".skill") as HTMLInputElement).value;
    });

    // Display resume details
    resumePreview.innerHTML = `
        <div class="resume" style="text-align: left; margin: 0;">
            <h3>${name}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${address ? `<p><strong>Address:</strong> ${address}</p>` : ""}
            ${profileSummary ? `<p><strong>Profile Summary:</strong> ${profileSummary}</p>` : ""}
            ${linkedIn ? `<p><strong>LinkedIn:</strong> <a href="${linkedIn}" target="_blank">${linkedIn}</a></p>` : ""}
            ${certifications ? `<p><strong>Certifications:</strong> ${certifications}</p>` : ""}
            <h3>Education</h3>
            <ul>${educationItems.map((edu) => `<li>${edu.education} - ${edu.year}</li>`).join("")}</ul>
            <h3>Experience</h3>
            <ul>${experienceItems.map((exp) => `<li>${exp.experience} - ${exp.year}</li>`).join("")}</ul>
            <h3>Skills</h3>
            <ul>${skillItems.map((skill) => `<li>${skill}</li>`).join("")}</ul>
        </div>
    `;

    // Display profile picture if uploaded
    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target?.result as string;
            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.alt = "Profile Picture";
            imageElement.style.width = "100px"; // Set profile picture size
            imageElement.style.height = "100px";
            imageElement.style.borderRadius = "50%";
            imageElement.style.objectFit = "cover";
            imageElement.style.marginBottom = "10px"; // Add spacing between image and content
            resumePreview.insertBefore(imageElement, resumePreview.firstChild);
        };
        reader.readAsDataURL(profilePicture);
    }
}

// Add dynamic fields
document.getElementById("add-education-btn")?.addEventListener("click", function () {
    const educationSection = document.getElementById("education-section") as HTMLDivElement;
    const newEducationItem = document.createElement("div");
    newEducationItem.classList.add("education-item");
    newEducationItem.innerHTML = `
        <input type="text" class="education" placeholder="Your Education Background" required />
        <input type="text" class="education-year" placeholder="Year" required />
    `;
    educationSection.appendChild(newEducationItem);
});

document.getElementById("add-experience-btn")?.addEventListener("click", function () {
    const experienceSection = document.getElementById("experience-section") as HTMLDivElement;
    const newExperienceItem = document.createElement("div");
    newExperienceItem.classList.add("experience-item");
    newExperienceItem.innerHTML = `
        <input type="text" class="experience" placeholder="Your Work Experience" required />
        <input type="text" class="experience-year" placeholder="Year" required />
    `;
    experienceSection.appendChild(newExperienceItem);
});

document.getElementById("add-skill-btn")?.addEventListener("click", function () {
    const skillsSection = document.getElementById("skills-section") as HTMLDivElement;
    const newSkillItem = document.createElement("div");
    newSkillItem.classList.add("skills-item");
    newSkillItem.innerHTML = `<input type="text" class="skill" placeholder="Your Key Skills" required />`;
    skillsSection.appendChild(newSkillItem);
});
