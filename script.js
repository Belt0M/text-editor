function a_makeQuiz() {
	hideMobileNav()
	$('.effect_menu').removeClass('active')
	let element = document.getElementById('a_makePPT')
	element.classList.add('active')
	current_panel = 'quiz_panel'
	showView(['myTopnav', 'quiz_panel'])
}

const editBtns = document.querySelectorAll('.quiz-container #edit')
const copyBtns = document.querySelectorAll('.quiz-container #copy')
const spans = document.querySelectorAll('.quiz-container .editable')

function onEditClick(event) {
	let btn = event.target.closest('button')
	btn.classList.toggle('active')
	let blocksContainer = event.target.closest('.top-panel').nextElementSibling
	blocksContainer.classList.toggle('active-edit')
	removeSpansActive(blocksContainer)
	if (btn.classList.contains('active')) {
		btn.innerHTML = `
        <i class="fa-solid fa-floppy-disk save"></i>
        <span>Save</span>
        `
	} else {
		btn.innerHTML = `
        <i class="fa-solid fa-pen"></i>
        <span>Edit</span>
        `
	}
}

function onSpanEditClick(event) {
	const span = event.target
	const blocksContainer = event.target.closest('.blocks-container')
	if (blocksContainer.classList.contains('active-edit')) {
		span.classList.toggle('active-edit')
		span.setAttribute(
			'contenteditable',
			span.getAttribute('contenteditable') === 'true' ? 'false' : 'true'
		)
		span.focus()
	}
}

function removeSpansActive(blocksContainer) {
	let spans = blocksContainer.querySelectorAll('.editable')
	spans.forEach(span => {
		span.classList.remove('active-edit')
		span.blur()
		span.setAttribute('contenteditable', 'false')
	})
}

const copyContent = async text => {
	try {
		await navigator.clipboard.writeText(text)
		console.log('Content copied to clipboard')
	} catch (err) {
		console.error('Failed to copy: ', err)
	}
}

function onCopyClick(event) {
	const btn = event.target.closest('button')
	btn.innerHTML = `
    <i class="fa-solid fa-check"></i>
    <span>Copy</span>
    `
	btn.classList.add('active-copy')
	setTimeout(() => {
		btn.innerHTML = `
        <i class="fa-regular fa-clipboard"></i>
        <span>Copy</span>
        `
		btn.classList.remove('active-copy')
	}, 2000)
	const blocksContainer = btn.closest('.top-panel').nextElementSibling
	const text = blocksContainer.innerText
	copyContent(text)
}

editBtns.forEach(function (button) {
	button.addEventListener('click', onEditClick)
})
spans.forEach(function (span) {
	span.addEventListener('dblclick', onSpanEditClick)
})
copyBtns.forEach(function (button) {
	button.addEventListener('click', onCopyClick)
})
