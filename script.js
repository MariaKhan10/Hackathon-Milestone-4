var profilePicture = ''; // Holds profile picture URL
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c;
    var form = document.getElementById('resume-form');
    var resumePreview = document.getElementById('resume-preview');
    var profilePictureInput = document.getElementById('profilePicture');
    // Add event listeners for adding more sections
    (_a = document.getElementById('add-education-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addEducation);
    (_b = document.getElementById('add-experience-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addExperience);
    (_c = document.getElementById('add-skill-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', addSkill);
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var educationItems = document.querySelectorAll('.education-item');
        var educationData = Array.from(educationItems).map(function (item) { return ({
            education: item.querySelector('.education').value,
            year: item.querySelector('.education-year').value,
        }); });
        var experienceItems = document.querySelectorAll('.experience-item');
        var experienceData = Array.from(experienceItems).map(function (item) { return ({
            workExperience: item.querySelector('.experience').value,
            year: item.querySelector('.experience-year').value,
        }); });
        var skillsItems = document.querySelectorAll('.skills-item input');
        var skillsData = Array.from(skillsItems).map(function (item) { return item.value; });
        if (profilePictureInput.files && profilePictureInput.files[0]) {
            profilePicture = URL.createObjectURL(profilePictureInput.files[0]);
        }
        if (!name || !email || !phone || educationData.length === 0 || experienceData.length === 0 || skillsData.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }
        var personalInfo = {
            name: name,
            email: email,
            phone: phone,
            profilePicture: profilePicture
        };
        generateResume(personalInfo, educationData, experienceData, skillsData);
    });
    function generateResume(personalInfo, education, workExperience, skills) {
        var educationHtml = education.map(function (e) { return "<p>".concat(e.education, " (").concat(e.year, ")</p>"); }).join('');
        var experienceHtml = workExperience.map(function (e) { return "<p>".concat(e.workExperience, " (").concat(e.year, ")</p>"); }).join('');
        var skillsHtml = skills.map(function (s) { return "<p>".concat(s, "</p>"); }).join('');
        resumePreview.innerHTML = "\n            <div class=\"resume-header\">\n                ".concat(personalInfo.profilePicture ? "<img id=\"profile-img\" src=\"".concat(personalInfo.profilePicture, "\" alt=\"Profile Picture\">") : '', "\n                <h3 contenteditable=\"true\">").concat(personalInfo.name, "</h3>\n                <span id=\"edit-profile-picture\">Change Picture</span>\n            </div>\n            <div class=\"resume-section\">\n                <p><strong>Email:</strong> <span contenteditable=\"true\" id=\"editable-email\">").concat(personalInfo.email, "</span></p>\n                <p><strong>Phone:</strong> <span contenteditable=\"true\" id=\"editable-phone\">").concat(personalInfo.phone, "</span></p>\n            </div>\n            <div class=\"resume-section\">\n                <h4>Education</h4>\n                ").concat(educationHtml, "\n            </div>\n            <div class=\"resume-section\">\n                <h4>Work Experience</h4>\n                ").concat(experienceHtml, "\n            </div>\n            <div class=\"resume-section\">\n                <h4>Skills</h4>\n                ").concat(skillsHtml, "\n            </div>\n            <button id=\"generate-new-cv-btn\">Generate New CV</button>\n        ");
        addEventListeners();
    }
    function addEventListeners() {
        var generateNewCVBtn = document.getElementById('generate-new-cv-btn');
        var editProfilePictureBtn = document.getElementById('edit-profile-picture');
        var profileImg = document.getElementById('profile-img');
        generateNewCVBtn.addEventListener('click', function () {
            generateNewCV();
        });
        editProfilePictureBtn.addEventListener('click', function () {
            profilePictureInput.click();
            profilePictureInput.addEventListener('change', handleProfilePictureChange);
        });
        profileImg === null || profileImg === void 0 ? void 0 : profileImg.addEventListener('click', function () {
            profilePictureInput.click();
            profilePictureInput.addEventListener('change', handleProfilePictureChange);
        });
    }
    function handleProfilePictureChange() {
        if (profilePictureInput.files && profilePictureInput.files[0]) {
            profilePicture = URL.createObjectURL(profilePictureInput.files[0]);
            var profileImg = document.getElementById('profile-img');
            profileImg.src = profilePicture;
        }
    }
    function generateNewCV() {
        form.reset();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        resumePreview.innerHTML = '';
        profilePicture = '';
    }
    function addEducation() {
        var educationSection = document.getElementById('education-section');
        var educationItem = document.createElement('div');
        educationItem.classList.add('education-item');
        educationItem.innerHTML = "\n            <input type=\"text\" class=\"education\" required placeholder=\"Your Education Background\" />\n            <input type=\"text\" class=\"education-year\" required placeholder=\"Year\" />\n        ";
        educationSection.insertBefore(educationItem, document.getElementById('add-education-btn'));
    }
    function addExperience() {
        var experienceSection = document.getElementById('experience-section');
        var experienceItem = document.createElement('div');
        experienceItem.classList.add('experience-item');
        experienceItem.innerHTML = "\n            <input type=\"text\" class=\"experience\" required placeholder=\"Your Work Experience\" />\n            <input type=\"text\" class=\"experience-year\" required placeholder=\"Year\" />\n        ";
        experienceSection.insertBefore(experienceItem, document.getElementById('add-experience-btn'));
    }
    function addSkill() {
        var skillsSection = document.getElementById('skills-section');
        var skillItem = document.createElement('div');
        skillItem.classList.add('skills-item');
        skillItem.innerHTML = "\n            <input type=\"text\" class=\"skill\" required placeholder=\"Your Key Skills\" />\n        ";
        skillsSection.insertBefore(skillItem, document.getElementById('add-skill-btn'));
    }
});
