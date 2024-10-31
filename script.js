var _a, _b, _c;
// Accessing form elements
var form = document.getElementById("resume-form");
var resumePreview = document.getElementById("resume-preview");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    generateResume();
});
function generateResume() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var profilePicture = document.getElementById("profilePicture").files[0];
    var address = document.getElementById("address").value || "";
    var profileSummary = document.getElementById("profileSummary").value || "";
    var linkedIn = document.getElementById("linkedIn").value || "";
    var certifications = document.getElementById("certifications").value || "";
    // Collecting dynamically added education, experience, and skills
    var educationItems = Array.from(document.querySelectorAll(".education-item")).map(function (item) {
        return {
            education: item.querySelector(".education").value,
            year: item.querySelector(".education-year").value,
        };
    });
    var experienceItems = Array.from(document.querySelectorAll(".experience-item")).map(function (item) {
        return {
            experience: item.querySelector(".experience").value,
            year: item.querySelector(".experience-year").value,
        };
    });
    var skillItems = Array.from(document.querySelectorAll(".skills-item")).map(function (item) {
        return item.querySelector(".skill").value;
    });
    // Display resume details
    resumePreview.innerHTML = "\n        <div class=\"resume\" style=\"text-align: left; margin: 0;\">\n            <h3>".concat(name, "</h3>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            ").concat(address ? "<p><strong>Address:</strong> ".concat(address, "</p>") : "", "\n            ").concat(profileSummary ? "<p><strong>Profile Summary:</strong> ".concat(profileSummary, "</p>") : "", "\n            ").concat(linkedIn ? "<p><strong>LinkedIn:</strong> <a href=\"".concat(linkedIn, "\" target=\"_blank\">").concat(linkedIn, "</a></p>") : "", "\n            ").concat(certifications ? "<p><strong>Certifications:</strong> ".concat(certifications, "</p>") : "", "\n            <h3>Education</h3>\n            <ul>").concat(educationItems.map(function (edu) { return "<li>".concat(edu.education, " - ").concat(edu.year, "</li>"); }).join(""), "</ul>\n            <h3>Experience</h3>\n            <ul>").concat(experienceItems.map(function (exp) { return "<li>".concat(exp.experience, " - ").concat(exp.year, "</li>"); }).join(""), "</ul>\n            <h3>Skills</h3>\n            <ul>").concat(skillItems.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "</ul>\n        </div>\n    ");
    // Display profile picture if uploaded
    if (profilePicture) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            var imageUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            var imageElement = document.createElement("img");
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
(_a = document.getElementById("add-education-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var educationSection = document.getElementById("education-section");
    var newEducationItem = document.createElement("div");
    newEducationItem.classList.add("education-item");
    newEducationItem.innerHTML = "\n        <input type=\"text\" class=\"education\" placeholder=\"Your Education Background\" required />\n        <input type=\"text\" class=\"education-year\" placeholder=\"Year\" required />\n    ";
    educationSection.appendChild(newEducationItem);
});
(_b = document.getElementById("add-experience-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var experienceSection = document.getElementById("experience-section");
    var newExperienceItem = document.createElement("div");
    newExperienceItem.classList.add("experience-item");
    newExperienceItem.innerHTML = "\n        <input type=\"text\" class=\"experience\" placeholder=\"Your Work Experience\" required />\n        <input type=\"text\" class=\"experience-year\" placeholder=\"Year\" required />\n    ";
    experienceSection.appendChild(newExperienceItem);
});
(_c = document.getElementById("add-skill-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    var skillsSection = document.getElementById("skills-section");
    var newSkillItem = document.createElement("div");
    newSkillItem.classList.add("skills-item");
    newSkillItem.innerHTML = "<input type=\"text\" class=\"skill\" placeholder=\"Your Key Skills\" required />";
    skillsSection.appendChild(newSkillItem);
});
