document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const ramSlider = document.getElementById('ram-slider');
    const storageSlider = document.getElementById('storage-slider');
    const ramValue = document.getElementById('ram-value');
    const storageValue = document.getElementById('storage-value');
    const cpuButtons = document.querySelectorAll('.cpu-button');
    const totalPrice = document.getElementById('total-price');
    const dropdownItems = document.querySelectorAll('#currency-dropdown .dropdown-menu li');
    const dropdownToggle = document.querySelector('#currency-dropdown .dropdown-toggle');
    const pricingCards = document.querySelectorAll('.pricing-card .price');
    const popup = document.getElementById('orderPopup');
    const closeBtn = document.querySelector('#orderPopup .close-btn');
    const popupTitle = document.getElementById('popupTitle');
    const popupSubtitle = document.getElementById('popupSubtitle');
    const configureButton = document.getElementById('configureButton');
    const contactButton = document.getElementById('contact-button');
    const contactPopup = document.getElementById('contactPopup');
    const contactCloseBtn = contactPopup.querySelector('.close-btn');
    const customOrderPopup = document.getElementById('customOrderPopup');
    const customOrderCloseBtn = customOrderPopup.querySelector('.close-btn');
    const choosePlanBtn = document.querySelector('#configurator .btn');
    const discordTicketBtn = document.getElementById('discordTicketBtn');
    const userDetailsPopup = document.getElementById('userDetailsPopup');
    const userDetailsCloseBtn = userDetailsPopup.querySelector('.close-btn');

    // Variables
    let selectedCPU = 1;
    let currentCurrency = 'USD';
    let exchangeRates = {};

    // Fetch exchange rates including the new currencies
    const fetchExchangeRates = async () => {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            exchangeRates = {
                USD: 1,
                GBP: data.rates.GBP,
                JPY: data.rates.JPY,
                EUR: data.rates.EUR,
                CAD: data.rates.CAD,
                MXN: data.rates.MXN,
                NZD: data.rates.NZD,
                CHF: data.rates.CHF,
                AUD: data.rates.AUD
            };
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            // Fallback rates
            exchangeRates = {
                USD: 1,
                GBP: 0.80,
                JPY: 110,
                EUR: 0.85,
                CAD: 1.25,
                MXN: 20.00,
                NZD: 1.40,
                CHF: 0.92,
                AUD: 1.30
            };
        }
    };

    // Update currency and prices
    const updateCurrency = (currency) => {
        currentCurrency = currency;
        const selectedText = Array.from(dropdownItems).find(item => item.getAttribute('data-currency') === currency).textContent;
        dropdownToggle.textContent = selectedText;

        pricingCards.forEach(card => {
            const usdPrice = parseFloat(card.getAttribute('data-usd-price'));
            const newPrice = usdPrice * (exchangeRates[currency] || 1);
            card.textContent = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(newPrice) + '/mo';
        });

        calculatePrice();
    };

    // Calculate total price
    const calculatePrice = () => {
        const ram = parseInt(ramSlider.value);
        const storage = parseInt(storageSlider.value);
        const cpu = selectedCPU;

        let cpuCharge = 0;
        if (cpu === 2) cpuCharge = 5;
        if (cpu === 3) cpuCharge = 10;

        let price = ram * 1.25 + (storage - 25) / 25 + cpuCharge;
        price *= exchangeRates[currentCurrency] || 1;

        totalPrice.textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currentCurrency,
            minimumFractionDigits: 2
        }).format(price) + '/month';
    };

    // Event Listeners
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedCurrency = item.getAttribute('data-currency');
            updateCurrency(selectedCurrency);
        });
    });

    ramSlider.addEventListener('input', () => {
        ramValue.textContent = ramSlider.value;
        calculatePrice();
    });

    storageSlider.addEventListener('input', () => {
        storageValue.textContent = storageSlider.value;
        calculatePrice();
    });

    cpuButtons.forEach(button => {
        button.addEventListener('click', () => {
            cpuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedCPU = parseInt(button.getAttribute('data-cpu'));
            calculatePrice();
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    configureButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    contactButton.addEventListener('click', (e) => {
        e.preventDefault();
        contactPopup.style.display = 'flex';
    });

    contactCloseBtn.addEventListener('click', () => {
        contactPopup.style.display = 'none';
    });

    choosePlanBtn.addEventListener('click', (e) => {
        e.preventDefault();
        customOrderPopup.style.display = 'flex';
    });

    customOrderCloseBtn.addEventListener('click', () => {
        customOrderPopup.style.display = 'none';
    });

    discordTicketBtn.addEventListener('click', (e) => {
        e.preventDefault();
        customOrderPopup.style.display = 'none';
        userDetailsPopup.style.display = 'flex';
    });

    userDetailsCloseBtn.addEventListener('click', () => {
        userDetailsPopup.style.display = 'none';
    });

    // Initial setup
    fetchExchangeRates();
    calculatePrice();
});
const imageItems = document.querySelectorAll('.image-item');
const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
const fullscreenImage = document.querySelector('.fullscreen-image');
const closeButton = document.querySelector('.close-button');

imageItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        fullscreenImage.src = imgSrc;
        fullscreenOverlay.style.display = 'flex';
    });
});

closeButton.addEventListener('click', () => {
    fullscreenOverlay.style.display = 'none';
});

fullscreenOverlay.addEventListener('click', (e) => {
    if (e.target === fullscreenOverlay) {
        fullscreenOverlay.style.display = 'none';
    }
});
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !e.target.closest('nav') && !e.target.closest('.nav-links')) {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
});

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', () => {
    const locationPoints = document.querySelectorAll('.location-point');

    locationPoints.forEach(point => {
        point.addEventListener('focus', () => {
            const info = point.querySelector('.location-info');
            if (info) info.style.display = 'block';
        });

        point.addEventListener('blur', () => {
            const info = point.querySelector('.location-info');
            if (info) info.style.display = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const cards = document.querySelectorAll('.review-card');

    let currentIndex = 0;

    const updateCarousel = () => {
        const cardWidth = cards[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    };

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
});

const updateAllPlanPrices = () => {
    const activeTier = document.querySelector(".tier-button.active").dataset.tier;
    loadPlans(activeTier);
};

document.addEventListener('DOMContentLoaded', () => {
    const tierButtons = document.querySelectorAll('.tier-button');
    const pricingContainer = document.getElementById('pricing-container');
    const plansData = {
        basic: [
            { name: "Base", priceUSD: 1.80, ram: "2GB", cpu: "150%", storage: "25GB", link: "//billing.exphost.net/checkout/config/13", available: true },
            { name: "Spark", priceUSD: 3.60, ram: "4GB", cpu: "150%", storage: "25GB", link: "//billing.exphost.net/checkout/config/14", available: true },
            { name: "Launch", priceUSD: 7.20, ram: "8GB", cpu: "150%", storage: "25GB", link: "//billing.exphost.net/checkout/config/15", available: true }
        ],
        standard: [
            { name: "Basic", priceUSD: 2.50, ram: "2GB", cpu: "150%", storage: "25GB", link: "//billing.exphost.net/checkout/config/2", available: true },
            { name: "Standard", priceUSD: 6.00, ram: "4GB", cpu: "150%", storage: "50GB", link: "//billing.exphost.net/checkout/config/6", available: true },
            { name: "Advanced", priceUSD: 17.00, ram: "8GB", cpu: "250%", storage: "75GB", link: "//billing.exphost.net/checkout/config/7", available: true },
            { name: "Premium", priceUSD: 28.00, ram: "12GB", cpu: "500%", storage: "150GB", link: "//billing.exphost.net/checkout/config/8", available: true },
            { name: "Ultimate", priceUSD: 35.00, ram: "16GB", cpu: "500%", storage: "150GB", link: "//billing.exphost.net/checkout/config/10", available: true },
        ],
        pro: [
            { name: "Boost", priceUSD: 4.00, ram: "2GB", cpu: "150%", storage: "25GB", link: "#", available: false },
            { name: "Orbit", priceUSD: 9.00, ram: "4GB", cpu: "150%", storage: "50GB", link: "#", available: false },
            { name: "Nova", priceUSD: 23.00, ram: "8GB", cpu: "250%", storage: "75GB", link: "#", available: false }
        ]
    };

    function loadPlans(tier) {
        
        pricingContainer.innerHTML = ""; // Clear current plans
        plansData[tier].forEach(plan => {
            const cardHTML = `
                <div class="pricing-card">
                    <h3>${plan.name}</h3>
                    <div class="price" data-usd-price="${plan.priceUSD.toFixed(2)}">$${plan.priceUSD.toFixed(2)}/mo</div>
                    <ul>
                        <li>${plan.ram} RAM</li>
                        <li>${plan.cpu} CPU</li>
                        <li>${plan.storage} Storage</li>
                    </ul>
                    ${plan.available ? `<a href="${plan.link}" class="btn">Order Now</a>` : `<button class="btn-out-of-stock" disabled>Out Of Stock</button>`}
                </div>
            `;
            pricingContainer.innerHTML += cardHTML;
        });
    }

    tierButtons.forEach(button => {
        button.addEventListener('click', () => {
            tierButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadPlans(button.dataset.tier);
        });
    });

    // Load standard tier by default
    loadPlans('standard');
});
function toggleAnswer(id) {
    const answer = document.getElementById(id);
    const allAnswers = document.querySelectorAll('.faq-answer');

    allAnswers.forEach(item => {
        if (item !== answer && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });

    answer.classList.toggle('active');
}
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('h3');
    question.addEventListener('click', () => {
        item.querySelector('.faq-answer').classList.toggle('active');
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('.faq-answer').classList.remove('active');
            }
        });
    });
});