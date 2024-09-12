interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    profilePicture?: string;
}

interface Education {
    education: string;
}

interface WorkExperience {
    workExperience: string;
}

interface Skills {
    skills: string;
}

let profilePicture: string = ''; // Holds profile picture URL

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumePreview = document.getElementById('resume-preview') as HTMLElement;
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLInputElement).value;
        const workExperience = (document.getElementById('workExperience') as HTMLInputElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value;

        if (profilePictureInput.files && profilePictureInput.files[0]) {
            profilePicture = URL.createObjectURL(profilePictureInput.files[0]);
        }

        if (!name || !email || !phone || !education || !workExperience || !skills) {
            alert("Please fill in all required fields.");
            return;
        }

        const personalInfo: PersonalInfo = {
            name,
            email,
            phone,
            profilePicture
        };

        const educationInfo: Education = {
            education
        };

        const workExperienceInfo: WorkExperience = {
            workExperience
        };

        const skillsInfo: Skills = {
            skills
        };

        generateResume(personalInfo, educationInfo, workExperienceInfo, skillsInfo);
    });

    function generateResume(
        personalInfo: PersonalInfo,
        education: Education,
        workExperience: WorkExperience,
        skills: Skills
    ) {
        resumePreview.innerHTML = `
            <div class="resume-header">
                ${personalInfo.profilePicture ? `<img id="profile-img" src="${personalInfo.profilePicture}" alt="Profile Picture">` : ''}
                <h3 contenteditable="true">${personalInfo.name}</h3>
                <span id="edit-profile-picture">Change Picture</span>
            </div>
            <div class="resume-section">
                <p><strong>Email:</strong> <span contenteditable="true" id="editable-email">${personalInfo.email}</span></p>
                <p><strong>Phone:</strong> <span contenteditable="true" id="editable-phone">${personalInfo.phone}</span></p>
            </div>
            <div class="resume-section">
                <h4>Education</h4>
                <p contenteditable="true" id="editable-education">${education.education}</p>
            </div>
            <div class="resume-section">
                <h4>Work Experience</h4>
                <p contenteditable="true" id="editable-workExperience">${workExperience.workExperience}</p>
            </div>
            <div class="resume-section">
                <h4>Skills</h4>
                <p contenteditable="true" id="editable-skills">${skills.skills}</p>
            </div>
            <button id="generate-new-cv-btn">Generate New CV</button>
        `;
        
        addEventListeners();
    }

    function addEventListeners() {
        const generateNewCVBtn = document.getElementById('generate-new-cv-btn') as HTMLButtonElement;
        const editProfilePictureBtn = document.getElementById('edit-profile-picture') as HTMLSpanElement;
        const profileImg = document.getElementById('profile-img') as HTMLImageElement;

        generateNewCVBtn.addEventListener('click', () => {
            generateNewCV();
        });

        editProfilePictureBtn.addEventListener('click', () => {
            profilePictureInput.click();
            profilePictureInput.addEventListener('change', handleProfilePictureChange);
        });

        profileImg.addEventListener('click', () => {
            profilePictureInput.click();
            profilePictureInput.addEventListener('change', handleProfilePictureChange);
        });
    }

    function handleProfilePictureChange() {
        if (profilePictureInput.files && profilePictureInput.files[0]) {
            profilePicture = URL.createObjectURL(profilePictureInput.files[0]);
            const profileImg = document.getElementById('profile-img') as HTMLImageElement;
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
