/**
 * Улучшенный JavaScript для мобильного меню Merch Production
 * с поддержкой бургер-меню в футере
 */

document.addEventListener('DOMContentLoaded', function () {
	// ======= МОБИЛЬНОЕ МЕНЮ ХЕДЕРА =======
	const mobileMenuBtn = document.getElementById('mobileMenuBtn');
	const closeMenuBtn = document.getElementById('closeMenuBtn');
	const mobileMenu = document.getElementById('mobileMenu');

	// ======= МОБИЛЬНОЕ МЕНЮ ФУТЕРА =======
	const footerMobileMenuBtn = document.getElementById('footerMobileMenuBtn');
	const footerNav = document.getElementById('footerNav');

	const body = document.body;

	// Функция для открытия меню в хедере с анимацией
	function openHeaderMenu() {
		mobileMenu.classList.add('open');
		mobileMenuBtn.classList.add('open');
		body.style.overflow = 'hidden'; // Блокируем прокрутку страницы

		// Добавляем анимацию появления для ссылок
		const menuLinks = document.querySelectorAll('.mobile-nav a');
		menuLinks.forEach((link, index) => {
			setTimeout(() => {
				link.classList.add('appear');
			}, 100 + index * 50); // Немного задержки перед началом анимации + постепенное появление
		});
	}

	// Функция для закрытия меню в хедере с анимацией
	function closeHeaderMenu() {
		// Сначала убираем анимацию ссылок
		const menuLinks = document.querySelectorAll('.mobile-nav a');
		menuLinks.forEach(link => {
			link.classList.remove('appear');
		});

		// Небольшая задержка перед закрытием меню для плавности
		setTimeout(() => {
			mobileMenu.classList.remove('open');
			mobileMenuBtn.classList.remove('open');
			body.style.overflow = ''; // Возвращаем прокрутку страницы
		}, 100);
	}

	// Функция для переключения меню в футере
	function toggleFooterMenu() {
		footerMobileMenuBtn.classList.toggle('open');
		footerNav.classList.toggle('open');

		// Добавляем анимацию для ссылок в футере
		if (footerNav.classList.contains('open')) {
			const navLinks = footerNav.querySelectorAll('.nav-column a');
			navLinks.forEach((link, index) => {
				// Устанавливаем индекс для CSS переменной transition-delay
				link.style.setProperty('--index', index);
				link.classList.add('appear');
			});
		} else {
			const navLinks = footerNav.querySelectorAll('.nav-column a');
			navLinks.forEach(link => {
				link.classList.remove('appear');
			});
		}
	}

	// Открыть меню хедера при клике на кнопку гамбургера
	if (mobileMenuBtn) {
		mobileMenuBtn.addEventListener('click', function (e) {
			e.stopPropagation(); // Предотвращаем всплытие события
			openHeaderMenu();
		});
	}

	// Закрыть меню хедера при клике на кнопку закрытия
	if (closeMenuBtn) {
		closeMenuBtn.addEventListener('click', closeHeaderMenu);
	}

	// Переключение меню футера при клике на кнопку
	if (footerMobileMenuBtn) {
		footerMobileMenuBtn.addEventListener('click', function (e) {
			e.stopPropagation();
			toggleFooterMenu();
		});
	}

	// Закрыть меню при клике на ссылку внутри меню
	const menuLinks = document.querySelectorAll(
		'.mobile-nav a, .mobile-consultation-btn'
	);
	menuLinks.forEach(link => {
		link.addEventListener('click', function (event) {
			// Проверяем, является ли ссылка якорем
			const href = this.getAttribute('href');
			if (href && href.startsWith('#')) {
				// Находим элемент, к которому ведет якорь
				const targetElement = document.querySelector(href);
				if (targetElement) {
					event.preventDefault();
					closeHeaderMenu();

					// Плавная прокрутка к элементу после закрытия меню
					setTimeout(() => {
						const headerHeight = document.querySelector('.header').offsetHeight;
						const targetPosition =
							targetElement.getBoundingClientRect().top +
							window.pageYOffset -
							headerHeight -
							20;

						window.scrollTo({
							top: targetPosition,
							behavior: 'smooth',
						});
					}, 400); // Увеличенная задержка для гарантии закрытия меню
				}
			} else {
				closeHeaderMenu();
			}
		});
	});

	// Закрыть меню при клике вне меню
	document.addEventListener('click', function (event) {
		// Проверка для меню хедера
		if (
			mobileMenu &&
			mobileMenu.classList.contains('open') &&
			!mobileMenu.contains(event.target) &&
			event.target !== mobileMenuBtn &&
			!mobileMenuBtn.contains(event.target)
		) {
			closeHeaderMenu();
		}
	});

	// Предотвращаем закрытие при клике внутри меню
	if (mobileMenu) {
		mobileMenu.addEventListener('click', function (e) {
			e.stopPropagation();
		});
	}

	// Закрыть меню при изменении размеров экрана
	window.addEventListener('resize', function () {
		// Проверка для меню хедера
		if (
			window.innerWidth > 991 &&
			mobileMenu &&
			mobileMenu.classList.contains('open')
		) {
			closeHeaderMenu();
		}

		// Проверка для меню футера
		if (
			window.innerWidth > 991 &&
			footerNav &&
			footerNav.classList.contains('open')
		) {
			footerMobileMenuBtn.classList.remove('open');
			footerNav.classList.remove('open');
		}
	});

	// ======= ПЛАВНАЯ ПРОКРУТКА ДЛЯ ВСЕХ ЯКОРНЫХ ССЫЛОК =======
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href !== '#') {
				e.preventDefault();
				const targetElement = document.querySelector(href);
				if (targetElement) {
					const headerHeight = document.querySelector('.header').offsetHeight;
					const targetPosition =
						targetElement.getBoundingClientRect().top +
						window.pageYOffset -
						headerHeight -
						20;

					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth',
					});
				}
			}
		});
	});

	// ======= АНИМАЦИЯ ШАПКИ ПРИ ПРОКРУТКЕ =======
	const header = document.querySelector('.header');
	let lastScrollTop = 0;

	window.addEventListener('scroll', function () {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Добавляем класс "scrolled" когда страница прокручена вниз
		if (scrollTop > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}

		// Скрываем шапку при прокрутке вниз и показываем при прокрутке вверх
		if (scrollTop > lastScrollTop && scrollTop > 150) {
			header.classList.add('header-hidden');
		} else {
			header.classList.remove('header-hidden');
		}

		lastScrollTop = scrollTop;
	});

	// ======= МАСКА ДЛЯ ТЕЛЕФОНА =======
	const phoneInputs = document.querySelectorAll('input[type="tel"]');
	phoneInputs.forEach(input => {
		let prevValue = '';

		input.addEventListener('input', function (e) {
			const value = input.value.replace(/\D/g, '');

			if (!value) {
				input.value = '';
				return;
			}

			// Простая маска для российских номеров
			if (value.length <= 1) {
				input.value = '+7 (';
			} else if (value.length <= 4) {
				input.value = '+7 (' + value.substring(1);
			} else if (value.length <= 7) {
				input.value =
					'+7 (' + value.substring(1, 4) + ') ' + value.substring(4);
			} else if (value.length <= 9) {
				input.value =
					'+7 (' +
					value.substring(1, 4) +
					') ' +
					value.substring(4, 7) +
					'-' +
					value.substring(7);
			} else {
				input.value =
					'+7 (' +
					value.substring(1, 4) +
					') ' +
					value.substring(4, 7) +
					'-' +
					value.substring(7, 9) +
					'-' +
					value.substring(9, 11);
			}

			prevValue = input.value;
		});

		// Устанавливаем начальное значение при фокусе, если поле пустое
		input.addEventListener('focus', function () {
			if (!input.value) {
				input.value = '+7 (';
			}
		});
	});
});
