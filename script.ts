interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    profilePicture?: string;
}

interface Education {
    education: string;
    year: string;
}

interface WorkExperience {
    workExperience: string;
    year: string;
}

interface Skills {
    skills: string[];
}

let profilePicture: string = ''; // Holds profile picture URL

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumePreview = document.getElementById('resume-preview') as HTMLElement;
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    // Add event listeners for adding more sections
    document.getElementById('add-education-btn')?.addEventListener('click', addEducation);
    document.getElementById('add-experience-btn')?.addEventListener('click', addExperience);
    document.getElementById('add-skill-btn')?.addEventListener('click', addSkill);

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;

        const educationItems = document.querySelectorAll('.education-item');
        const educationData: Education[] = Array.from(educationItems).map(item => ({
            education: (item.querySelector('.education') as HTMLInputElement).value,
            year: (item.querySelector('.education-year') as HTMLInputElement).value,
        }));

        const experienceItems = document.querySelectorAll('.experience-item');
        const experienceData: WorkExperience[] = Array.from(experienceItems).map(item => ({
            workExperience: (item.querySelector('.experience') as HTMLInputElement).value,
            year: (item.querySelector('.experience-year') as HTMLInputElement).value,
        }));

        const skillsItems = document.querySelectorAll('.skills-item input');
        const skillsData: string[] = Array.from(skillsItems).map(item => item.value);

        if (profilePictureInput.files && profilePictureInput.files[0]) {
            profilePicture = URL.createObjectURL(profilePictureInput.files[0]);
        }

        if (!name || !email || !phone || educationData.length === 0 || experienceData.length === 0 || skillsData.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        const personalInfo: PersonalInfo = {
            name,
            email,
            phone,
            profilePicture
        };

        generateResume(personalInfo, educationData, experienceData, skillsData);
    });

    function generateResume(
        personalInfo: PersonalInfo,
        education: Education[],
        workExperience: WorkExperience[],
        skills: string[]
    ) {
        const educationHtml = education.map(e => `<p>${e.education} (${e.year})</p>`).join('');
        const experienceHtml = workExperience.map(e => `<p>${e.workExperience} (${e.year})</p>`).join('');
        const skillsHtml = skills.map(s => `<p>${s}</p>`).join('');

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
                ${educationHtml}
            </div>
            <div class="resume-section">
                <h4>Work Experience</h4>
                ${experienceHtml}
            </div>
            <div class="resume-section">
                <h4>Skills</h4>
                ${skillsHtml}
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

        profileImg?.addEventListener('click', () => {
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
        form.reset();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        resumePreview.innerHTML = '';
        profilePicture = '';
    }

    function addEducation() {
        const educationSection = document.getElementById('education-section') as HTMLElement;
        const educationItem = document.createElement('div');
        educationItem.classList.add('education-item');
        educationItem.innerHTML = `
            <input type="text" class="education" required placeholder="Your Education Background" />
            <input type="text" class="education-year" required placeholder="Year" />
        `;
        educationSection.insertBefore(educationItem, document.getElementById('add-education-btn'));
    }

    function addExperience() {
        const experienceSection = document.getElementById('experience-section') as HTMLElement;
        const experienceItem = document.createElement('div');
        experienceItem.classList.add('experience-item');
        experienceItem.innerHTML = `
            <input type="text" class="experience" required placeholder="Your Work Experience" />
            <input type="text" class="experience-year" required placeholder="Year" />
        `;
        experienceSection.insertBefore(experienceItem, document.getElementById('add-experience-btn'));
    }

    function addSkill() {
        const skillsSection = document.getElementById('skills-section') as HTMLElement;
        const skillItem = document.createElement('div');
        skillItem.classList.add('skills-item');
        skillItem.innerHTML = `
            <input type="text" class="skill" required placeholder="Your Key Skills" />
        `;
        skillsSection.insertBefore(skillItem, document.getElementById('add-skill-btn'));
    }
});
