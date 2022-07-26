// modal
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400; // ms
let visibleModal = null;

// Review API 
function getReviewApi() {
  // TODO: Insert the API url to get a list of your repos
  var requestUrl = 'https://www.fakerestapi.com/datasets/api/v1/amazon-echo-reviews.json';

  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)

      for (var i = 0; i < 6; i++) {
        // console.log(data.data[i].review_text)

        var reviewList = $("<p class=reviewList>").text('"' + data.data[i].review_text + '"')

        $("#reviews").append(reviewList);
      }
    });
}

getReviewApi();
// End 


// Toggle modal
const toggleModal = event => {
  event.preventDefault();
  const modal = document.getElementById(event.target.getAttribute('data-target'));
  (typeof(modal) != 'undefined' && modal != null)
    && isModalOpen(modal) ? closeModal(modal) : openModal(modal)
}

// Is modal open
const isModalOpen = modal => {
  return modal.hasAttribute('open') && modal.getAttribute('open') != 'false' ? true : false;
}

// Open modal
const openModal = modal => {
  if (isScrollbarVisible()) {
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
  }
  document.documentElement.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    document.documentElement.classList.remove(openingClass);
  }, animationDuration);
  modal.setAttribute('open', true);
}

// Close modal
const closeModal = modal => {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty('--scrollbar-width');
    modal.removeAttribute('open');
  }, animationDuration);
}

// Close with a click outside
document.addEventListener('click', event => {
  if (visibleModal != null) {
    const modalContent = visibleModal.querySelector('article');
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
  }
});

// Close with Esc key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && visibleModal != null) {
    closeModal(visibleModal);
  }
});

// Get scrollbar width
const getScrollbarWidth = () => {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

// Is scrollbar visible
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
}





// slide show script
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("dogSlide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 5000);
}

//dog api start

var dogList = document.querySelector('ul')
var dogButton = document.getElementById("apibutton")

function getDogApi() {

  var requestUrl = 'https://api.thedogapi.com/v1/breeds?api_key=80010725-ca82-4a8b-81af-891babedea06';

  fetch(requestUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      var linkItem = document.createElement('option');
      // var linkItem = document.createElement('a');
      linkItem.setAttribute('id', 'dogId');
      linkItem.textContent = data[i].name;
      dogButton.append(linkItem);
      // dogButton.appendChild(linkItem);
      linkItem.addEventListener('click', function() {
        var dogName = this.textContent
        console.log(dogName)
      });
    }
  });


}



getDogApi();