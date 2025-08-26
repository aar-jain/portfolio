window.onload = function () {
  AOS.init();

  // This code will execute only after the entire page,
  // including all resources like images and scripts, has finished loading.
  console.log("All page elements have loaded!");
  // You can now safely interact with all elements on the page.
  const customCursor = document.querySelector('.custom-cursor');
  const customCursor2 = document.querySelector('.custom-cursor-2');

  document.addEventListener('mousemove', (e) => {
    if (e.target.matches('.projects__grid--itemwrap, .projects__grid--itemwrap *')) {
      customCursor.style.visibility = 'hidden';
      customCursor2.style.visibility = 'visible';
      customCursor2.style.left = `${e.clientX}px`;
      customCursor2.style.top = `${e.clientY}px`;
    } else {
      customCursor2.style.visibility = 'hidden';
      customCursor.style.visibility = 'visible';
      // Make the custom cursor visible on mouse move
      // Update the custom cursor's position based on mouse coordinates
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    }
  });

  window.addEventListener('mouseout', function () {
    customCursor.style.visibility = 'visible';
  })


  $('.nav--links').each(function (event) {
    $(this).on('click', function (e) {
      e.preventDefault();
      const target = $($(this).attr('href'));
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    });
  });


  let allProjects = []; // will hold all projects from JSON

  // Function to render projects
  function renderProjects(projects) {
    const container = document.getElementById("projectsGrid");
    container.innerHTML = ""; // clear old content

    projects.forEach(project => {
      const row = document.createElement("div");
      row.classList.add("projects__grid--row");
      row.setAttribute("data-aos", "fade-down");
      row.setAttribute("data-aos-duration", "700");
      row.setAttribute("data-aos-offset", "250");

      row.innerHTML = `
        <a href="${project.url}" class="projects__grid--itemwrap" target="_blank">
          <div class="projects__grid--item">
            <div class="projects__grid--img">
              <img src="${project.image}" alt="${project.title}">
              // <video autoplay loop muted playsinline>
              //   <source src="${project.video}" type="video/mp4">
              // </video>
            </div>
            <div class="projects__grid--title">
              <h3>${project.title}</h3>
            </div>
            <div class="projects__grid--tags">
              ${project.tags.map(tag => `<span class="font--mono projects__grid--tag">${tag}</span>`).join("")}
            </div>
          </div>
        </a>
        <div class="emptydiv"></div>
      `;

      container.appendChild(row);
    });
  }

  // Load JSON once
  fetch("/portfolio/assets/js/projects.json")
    .then(response => response.json())
    .then(projects => {
      allProjects = projects;
      renderProjects(allProjects.filter(p => p.featured)); // default: featured
    })
    .catch(error => console.error("Error loading projects:", error));

  // Add button events
  document.getElementById("toggle").addEventListener("change", function () {
    if (this.checked) {
      renderProjects(allProjects.filter(p => p.featured)); // show only featured
    } else {
      renderProjects(allProjects); // show all
    }
  });
};

window.onscroll = function () {
  // Detect how far are we from the top of the page
  let windowTop = $(this).scrollTop();
  // Loop through every navigation menu item
  $('.nav--links').each(function (event) {

    // Check for the current navigation item associated section
    // Check how far the associated section is from the top
    // If the associated section is as far as the user have scrolled, add 'active' class to the item.
    const element = $($(this).attr('href'));
    if (element.length) {
      if (windowTop >= element.offset().top - 100) {

        // console.log("windowTop: " + windowTop);
        // console.log("element" + element.offset().top);
        // Remove 'active' from previously highlighted menu items
        $('.nav--links.active').removeClass('active');

        // Highlight the current menu item by adding 'active' class
        $(this).addClass('active');
      }
      else {
        $(this).removeClass('active');
      }
    }
  });
};