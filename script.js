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

// Generate resources
const switches = document.querySelectorAll('.switches button')
const switchContainer = document.querySelector('.switch-container')

function onSwitchClick(event) {
	const btn = event.target.closest('button')
	const switchBlocks = switchContainer.querySelectorAll('div')
	switches.forEach(el => el.classList.remove('active-gen'))
	switchBlocks.forEach(el => el.classList.remove('active-gen'))
	btn.classList.add('active-gen')
	const index = btn.getAttribute('data-id')
	switchBlocks[index].classList.add('active-gen')
}

switches.forEach((el, index) => {
	el.addEventListener('click', onSwitchClick)
})

// Context choose level
const contextBtn = document.querySelector('.choose-level button')
const contextSpan = document.querySelector('.choose-level button span')
const contextList = document.querySelector('.choose-level ul')
const contextElements = document.querySelectorAll('.choose-level ul li')

function toggleContext() {
	contextList.classList.toggle('hidden-context')
}

contextBtn.addEventListener('click', toggleContext)

function onContextElClick(event) {
	const li = event.target.closest('li')
	contextSpan.innerText = li.innerText
	toggleContext()
}

contextElements.forEach(el => el.addEventListener('click', onContextElClick))

function onGenerateClick() {
	document.querySelector('.quiz-wrapper').classList.add('hidden-gen')
	document.querySelector('.generate-btn button').disabled = true
}
