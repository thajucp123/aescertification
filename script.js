document.addEventListener('DOMContentLoaded', () => {
    const mainMenuItems = document.querySelectorAll('.main-menu-item');
    const subLinks = document.querySelectorAll('.sidebar-section ul li a');
    const contentSections = document.querySelectorAll('.content-area .certification-section');

    // Function to hide all sections except the one we want to show
    function hideAllSections() {
        contentSections.forEach(section => {
            section.classList.add('hidden');
        });
    }

    // Function to handle showing a specific section and scrolling to an item if needed
    function showSectionAndScroll(sectionId, itemId = null) {
        hideAllSections();
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            if (itemId) {
                const targetItem = document.getElementById(itemId);
                if (targetItem) {
                    targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Handle clicks on main category headers (e.g., "ISO Certifications")
    mainMenuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = item.getAttribute('data-target');
            showSectionAndScroll(targetId);
        });
    });

    // Handle clicks on sub-menu links (e.g., "ISO 9001:2015")
    subLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const itemId = link.getAttribute('href').substring(1); // Get ID without the #
            // Find the parent section ID based on the sub-item ID
            let parentSectionId;
            switch (true) {
                case ['iso-9001', 'iso-13485', 'sa9000', 'iatf', 'iso-21001', 'iso-50001', 'iso-55001', 'iso-26001', 'iso-37001'].includes(itemId):
                    parentSectionId = 'iso-certifications-main';
                    break;
                case ['iso-45001', 'iso-14001', 'smeta', 'hipaa-comp', 'wash', 'hazop'].includes(itemId):
                    parentSectionId = 'safety-certifications-main';
                    break;
                case ['iso-27001', 'iso-20000', 'iso-22301', 'soc2', 'pci-dss', 'eu-gdpr', 'vapt', 'cmmc'].includes(itemId):
                    parentSectionId = 'cyber-security-main';
                    break;
                case ['iso-22000', 'haccp', 'halal', 'gap', 'brc', 'fsc'].includes(itemId):
                    parentSectionId = 'food-safety-main';
                    break;
                case ['ce-mark', 'organic-cert', 'rohs-prod', 'isi-mark', 'cmmi', 'bsi-mark'].includes(itemId):
                    parentSectionId = 'product-cert-main';
                    break;
                case ['iso-lead-auditor', 'iso-lead-implementor', 'isms-training', 'hipaa-gdpr-training'].includes(itemId):
                    parentSectionId = 'training-cert-main';
                    break;
                default:
                    return; // Do nothing if ID is not recognized
            }
            showSectionAndScroll(parentSectionId, itemId);
        });
    });

    // On page load, show the first section (ISO Certifications)
    const firstSectionId = 'iso-certifications-main';
    const firstSection = document.getElementById(firstSectionId);
    if (firstSection) {
        firstSection.classList.remove('hidden');
    }
});