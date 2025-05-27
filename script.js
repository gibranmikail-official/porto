let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((links) => {
                links.classList.remove("active");
            });
            document.querySelector('header nav a[href*="' + id + '"]').classList.add("active");
        }
    });
};

//Menu icon
menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

//clear from contact before unload
window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
        form.reset();
    }
};

$(document).ready(function () {
    loadPorto();

    function loadPorto() {
        fetch("data/porto.json")
            .then((res) => res.json())
            .then((res) => {
                let html = "";
                const data = res.data;

                data?.forEach((el, index) => {
                    let aos = index % 3;
                    // console.log(aos);

                    let dataAos = "";
                    if (aos == 0) {
                        dataAos = "fade-up-right";
                    } else if (aos == 1) {
                        dataAos = "fade-up";
                    } else if (aos == 2) {
                        dataAos = "fade-up-left";
                    }
                    // slug=gibran-mikail-website-portofolio#contact
                    html += `
            <div data-aos="${dataAos}" data-aos-duration="1000">
                <div class="grid-item">
                    <img src="${el.primaryImg}" alt="Project 1">
                    <div class="grid-info">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="width: 70%;">
                                <h3>${el.title}</h3>
                                <h4>${el.category}</h4>
                            </div>
                            <div style="width: 30%;">
                                 <a href="/detail-porto.html?slug=${el.slug}" class="see-detail" style="margin-left: 10px;">see details</a>
                            </div>
                        </div>
                        <p>${el?.description}</p>
                    </div>
                </div>
            </div>`;
                });
                $("#list-porto").html(html);
            });

        // testimoni
        let htmlTestimoni = "";
        fetch("data/testimoni.json")
            .then((res) => res.json())
            .then((res) => {
                res.data.forEach((d) => {
                    let star = "";
                    for (let i = 0; i < d.star; i++) {
                        star += `<i class='bx bxs-star' id="star"></i>`;
                    }

                    htmlTestimoni += ` <div data-aos="zoom-in-up" data-aos-duration="500">
              <div class="testimonial-item">
                  <img src="${d.image}" alt="">
                  <h2>Adzra Fatikha W.</h2>
                  <div class="rating">${star}
                  </div>
                  <p>"Fast learner, tipikal orang yang mau belajar dan cepat nangkep ilmunya. kreatif dan satset
                      juga kalo tiba-tiba di mintain tolong soal kerjaan dari bos atau gue hehe. hobinya becanda,
                      jadi kalau dikantor gaada ini orang jadi sepi abisss "</p>
              </div>
          </div> `;
                });
                $("#testimoni").html(htmlTestimoni);
            });

        // services
        let HTMLservices = "";
        fetch("data/services.json")
            .then((res) => res.json())
            .then((res) => {
                res.data.forEach((d, index) => {
                    let aos = index % 2;

                    // console.log(aos);

                    let dataAos = "";
                    if (aos == 0) {
                        dataAos = "fade-left";
                    } else if (aos == 1) {
                        dataAos = "fade-right";
                    }

                    HTMLservices += ` <div data-aos="${dataAos}" data-aos-duration="1000">
                <div class="service-box">
                    <div class="service-info">
                        <h4>${d.title}</h4>
                        <p>${d.description}</p>
                    </div>
                </div>
            </div>`;
                });
                $("#services-id").html(HTMLservices);
            });

        // services
        let HTMLWorkExperience = "";
        fetch("data/work_experience.json")
            .then((res) => res.json())
            .then((res) => {
                res.data.forEach((d, index) => {
                    // console.log();
                    let year = d.date?.split("-");

                    let listHTML = "";
                    d.list.forEach((x) => {
                        listHTML += `<p>✦ ${x}</p>`;
                    });

                    console.log(year);

                    HTMLWorkExperience += `<div class="timeline-item" data-aos="fade-up" data-aos-duration="1000">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${year[0]} - <span>${year[1]}</span></div>
                <div class="timeline-content">
                    <h3>${d.title} </h3>
                    ${listHTML}
                </div>
            </div>`;
                });
                $("#work_experience").html(HTMLWorkExperience);
            });
    }
});
