$(function () {
	// MESSAGE INPUT
	const textarea = document.querySelector('.chatbot-message-input')
	const chatbotForm = document.querySelector('.chatbot-message-form')

	textarea.addEventListener('input', function () {
		let line = textarea.value.split('\n').length

		if (textarea.rows < 6 || line < 6) {
			textarea.rows = line
		}

		if (textarea.rows > 1) {
			chatbotForm.style.alignItems = 'flex-end'
		} else {
			chatbotForm.style.alignItems = 'center'
		}
	})

	// TOGGLE chatbot
	const chatbotToggle = document.querySelector('.chatbot-toggle')
	const chatbotMessage = document.querySelector('.chatbot-message-wrapper')

	chatbotToggle.addEventListener('click', function () {
		chatbotMessage.classList.toggle('show')
	})

	// DROPDOWN TOGGLE
	const dropdownToggle = document.querySelector('.chatbot-message-dropdown-toggle')
	const dropdownMenu = document.querySelector('.chatbot-message-dropdown')

	dropdownToggle.addEventListener('click', function () {
		dropdownMenu.classList.toggle('show')
	})

	document.addEventListener('click', function (e) {
		if (!e.target.matches('.chatbot-message-dropdown, .chatbot-message-dropdown *')) {
			dropdownMenu.classList.remove('show')
		}
	})

	// chatbot MESSAGE
	const chatbotMessageWrapper = document.querySelector('.chatbot-message-content')
	const chatbotNoMessage = document.querySelector('.chatbot-message-no-message')

	chatbotForm.addEventListener('submit', function (e) {
		e.preventDefault()

		if (isValid(textarea.value)) {
			writeMessage()
			setTimeout(autoReply, 1000)
		}
	})

	function writeMessage() {
		const today = new Date()
		let message = `
		<div class="chatbot-message-item sent">
			<span class="chatbot-message-item-text">
				${textarea.value.trim().replace(/\n/g, '<br>\n')}
			</span>
			<span class="chatbot-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
		chatbotMessageWrapper.insertAdjacentHTML('beforeend', message)
		chatbotForm.style.alignItems = 'center'
		textarea.rows = 1
		textarea.focus()
		textarea.value = ''
		chatbotNoMessage.style.display = 'none'
		scrollBottom()
	}

	function autoReply() {
		const today = new Date()
		let message = `
		<div class="chatbot-message-item received">
			<span class="chatbot-message-item-text">
			We would be happy to assist you! Our <a href="#">FAQ</a> site is a great place to start for product information and troubleshooting help.
			</span>
			<span class="chatbot-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
		chatbotMessageWrapper.insertAdjacentHTML('beforeend', message)
		scrollBottom()
	}

	function scrollBottom() {
		chatbotMessageWrapper.scrollTo(0, chatbotMessageWrapper.scrollHeight)
	}
});

function addZero(num) {
	return num < 10 ? '0' + num : num
}

function isValid(value) {
	let text = value.replace(/\n/g, '')
	text = text.replace(/\s/g, '')

	return text.length > 0
}