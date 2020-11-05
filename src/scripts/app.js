const regEx = /\S+/g // get as many characters as possible - without a space
const origText = '$&' // to place back the original text

function splitLines(container, opentag, closingtag) {
  let spans = container.children
  let top = 0
  let tmp = ''
  
  container.innerHTML = container.textContent.replace(regEx, `<span>${origText}</span>`)
	// do the loop
  for (let i = 0; i < spans.length; i++) {
    let rect = spans[i].getBoundingClientRect().top
    if (top < rect) {
      tmp += closingtag + opentag
    }
    	top = rect
    	tmp += spans[i].textContent + ' '
  	}
  	container.innerHTML = tmp += closingtag
}

// target all the tags you want
const pTags = document.querySelectorAll('p')
// run the function on them
pTags.forEach(tag => {
  splitLines(tag, '<span class="mask"><span class="mask-inner">', '</span></span>')
})

// when we resize the window the lines can get a little messed up
// so we need to re-run the function
// But ideally only when the user has finished resizing, to reduce the amount the
// function is fired

// stores a numeric value
let timeOutCounter

window.addEventListener('resize', function() {
  
  clearTimeout(timeOutCounter)
  timeOutCounter = setTimeout(() => {
    	pTags.forEach(tag => {
    	splitLines(tag, '<span class="mask"><span class="mask-inner">', '</span></span>')
  	})
      // view to see it fire when finished resizing the window
  		console.log('function fired')
  }, 500)
  
	console.log('just resizing')
})
