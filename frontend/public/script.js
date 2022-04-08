const parseJSON = async (url) => {
    const response = await fetch(url);
    return response.json()
}

// --- page content, components ---

const mainComp = (component) => {
    return`
    <section class="landing">
        <nav>
            <li>photo gallery</li>
            <li>about</li>
            <li>contact</li>
        </nav>
        <div class="ellipse"></div>
        <div class="circle">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <h2>professimus</h2>
        <h2>catismus</h2>
        <p>amazing cat-pictures</p>
    </section>
    <section class="bio">
        <p>I have studied many philosophers and many cats. The wisdom of cats is infinitely superior.</p>
        <div class="ellipse-two"></div>
    </section>
    <section class="about">
        <p>Here goes some nice story of cats</p>
    </section>
    <section id="photos">${component}</section>
    <section class="upload">
        <form>
            <input type="file" name="filename">
            <input type="text" name="title" placeholder="title of the photo">
            <input type="text" name="name" placeholder="photographer's name">
            <button>upload</button>
        </form>
    </section>

    `
}

const swiperComponent = (data, component) => {
    return `
    <div class="swiper">
        <div class="swiper-wrapper">
        ${data.map(img => component(img)).join("")}   
        </div>
    </div>
    `
}

const swiperSlideComponent = ({filename, title, name}) => {
    return `
    <div class="swiper-slide">
        <h2>${title}</h2>
        <h3>${name}</h3>
        <img src="/public/images/${filename}">
    </div>
    `
}

// --- load event ---

const loadEvent = async () => {
    const root = document.getElementById("root")
    const result = await parseJSON("/image-list")  
    
    root.insertAdjacentHTML("beforeend", mainComp(swiperComponent(result, swiperSlideComponent)))

    const swiper = new Swiper(".swiper", {
        loop: true
    })
}

window.addEventListener("load", loadEvent)