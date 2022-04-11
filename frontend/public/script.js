const parseJSON = async (url) => {
    const response = await fetch(url);
    return response.json()
}

// --- page content, components ---

const mainComp = (component) => {
    return`
    <section class="landing">
        <nav>
            <h3>Humbert von Gikkingen</h3>
            <a>photo gallery</a>
            <a>about</a>
            <a>contact</a>
        </nav>
        <div class="ellipse"></div>
        <div class="circle">
            <div class="bc"></div>
            <div class="bc"></div>
            <div class="bc"></div>
            <div class="bc"></div>
            <div class="bc"></div>
            <div class="bc"></div>
        </div>
        <h2>humbert</h2>
        <h2>gikkingen</h2>
        <p>amazing <br> cat-pictures</p>
    </section>
    <section class="bio">
        <div>
            <p>I have studied many philosophers and many cats.<br> The wisdom of cats is infinitely superior.</p>
            <div class="ellipse-two"></div>
        </div>
    </section>
    <section class="about">
        <h1>about cats</h1>
        <p>Here goes some nice story of cats</p>
    </section>
    <section id="photos">
        <div>
            <h1>photographs</h1>
            ${component}
        </div>
    </section>
    <section class="upload">
        <div>
            <h1>upload picture</h1>
            <form>
                <input type="file" name="filename">
                <input type="text" name="title" placeholder="title of the photo">
                <input type="text" name="date" placeholder="year of the photo">
                <input type="text" name="name" placeholder="photographer's name">
                <button id="up">upload</button>
            </form>
        </div>
    </section>

    `
}

const swiperComponent = (data, component) => {
    return `
    <div class="swiper">
        <div class="swiper-wrapper">
        ${data.map(img => component(img)).join("")}   
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
    `
}

const swiperSlideComponent = ({filename, title, name, date}) => {
    return `
    <div class="swiper-slide">
        <img src="/public/images/${filename}">
        <div class="pic-data">
            <h2>${title}</h2>
            <h3>${name}, ${date}</h3>
        </div>
    </div>
    `
}

// --- load event ---

const loadEvent = async () => {
    const root = document.getElementById("root")
    const result = await parseJSON("/image-list")  
    
    root.insertAdjacentHTML("beforeend", mainComp(swiperComponent(result, swiperSlideComponent)))

    const swiper = new Swiper(".swiper", {
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
}

window.addEventListener("load", loadEvent)