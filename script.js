var profilePicture = ''; // Holds profile picture URL
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumePreview = document.getElementById('resume-preview');
    var profilePictureInput = document.getElementById('profilePicture');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var workExperience = document.getElementById('workExperience').value;
        var skills = document.getElementById('skills').value;
        if (profilePictureInput.files && profilePictureInput.files[0]) {
            profilePicture = URL.createObjectURL(profilePictureInput.files[0]);
        }
        if (!name || !email || !phone || !education || !workExperience || !skills) {
            alert("Please fill in all required fields.");
            return;
        }
        var personalInfo = {
            name: name,
            email: email,
            phone: phone,
            profilePicture: profilePicture
        };
        var educationInfo = {
            education: education
        };
        var workExperienceInfo = {
            workExperience: workExperience
        };
        var skillsInfo = {
            skills: skills
        };
        generateResume(personalInfo, educationInfo, workExperienceInfo, skillsInfo);
    });
    function generateResume(personalInfo, education, workExperience, skills) {
        resumePreview.innerHTML = "\n            <div class=\"resume-header\">\n                ".concat(personalInfo.profilePicture ? "<img id=\"profile-img\" src=\"".concat(personalInfo.profilePicture, "\" alt=\"Profile Picture\">") : '', "\n                <h3 contenteditable=\"true\">").concat(personalInfo.name, "</h3>\n                <span id=\"edit-profile-picture\">Change Picture</span>\n            </div>\n            <div class=\"resume-section\">\n                <p><strong>Email:</strong> <span contenteditable=\"true\" id=\"editable-email\">").concat(personalInfo.email, "</span></p>\n                <p><strong>Phone:</strong> <span contenteditable=\"true\" id=\"editable-phone\">").concat(personalInfo.phone, "</span></p>\n            </div>\n            <div class=\"resume-section\">\n                <h4>Education</h4>\n                <p contenteditable=\"true\" id=\"editable-education\">").concat(education.education, "</p>\n            </div>\n            <div class=\"resume-section\">\n                <h4>Work Experience</h4>\n                <p contenteditable=\"true\" id=\"editable-workExperience\">").concat(workExperience.workExperience, "</p>\n            </div>\n            <div class=\"resume-section\">\n                <h4>Skills</h4>\n                <p contenteditable=\"true\" id=\"editable-skills\">").concat(skills.skills, "</p>\n            </div>\n            <button id=\"generate-new-cv-btn\">Generate New CV</button>\n        ");
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
        profileImg.addEventListener('click', function () {
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
        // Reset the form
        form.reset();
        // Scroll to the top of the page where the form is
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Clear the current resume preview
        resumePreview.innerHTML = '';
        // Reset profile picture
        profilePicture = '';
    }
});
