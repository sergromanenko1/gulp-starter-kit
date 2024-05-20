<?php include 'templates/header.php'; ?>

<main class="page__content home">
	<!-- <svg>
		<use xlink:href="<?php echo SPRITE_URI; ?>id-element"></use>
	</svg> -->
	<div class="page__container">
		<!-- Yoast SEO Breadcrumbs -->
		<nav class="breadcrumbs">
			<span>
				<span>
					<a href="index.php">Главная</a>
					<span>
						<a href="#">Ссылка</a>
						<span class="breadcrumb_last" aria-current="page">Ссылка</span>
					</span>
				</span>
			</span>
		</nav>
		<nav class="pagination">
			<a class="pagination__link pagination__link_prev">
				<svg width="12" height="12">
					<use xlink:href="<?php echo SPRITE_URI; ?>arrow-pagination"></use>
				</svg>
			</a>

			<?php
			for ( $i = 1; $i <= 7; $i++ ) {
				printf(
					'<a href="#" class="pagination__link%s">%s</a>',
					1 === $i ? ' pagination__link_active' : '',
					$i,
				);
			}
			?>

			<a href="#" class="pagination__link pagination__link_next">
				<svg width="12" height="12" style="transform: rotate(180deg);">
					<use xlink:href="<?php echo SPRITE_URI; ?>arrow-pagination"></use>
				</svg>
			</a>
		</nav>
		<h1>H1 Заголовок</h1>
		<p>Intel с <em>честью прошла</em> этот путь, большую <i>часть времени</i> оставаясь в числе локомотивов отрасли, и к своему юбилею решила поделиться десяткой ключевых с точки зрения общественности и её сотрудников достижений</p>
		<h2>H2 Заголовок</h2>
		<p>Полвека — <b>огромный срок</b> для компании, а в IT-индустрии речь идёт о <strong>целом ряде</strong> прошедших <a href="#">link editor</a> поколений и эпох.</p>
		<h3>H3 Заголовок</h3>
		<p>Intel с <em>честью прошла</em> этот путь, большую <i>часть времени</i> оставаясь в числе локомотивов отрасли, и к своему юбилею решила поделиться десяткой ключевых с точки зрения общественности и её сотрудников достижений</p>
		<h4>H4 Заголовок</h4>
		<p>Полвека — <b>огромный срок</b> для компании, а в IT-индустрии речь идёт о <strong>целом ряде</strong> прошедших <a href="#">link editor</a> поколений и эпох.</p>
		<h5>H5 Заголовок</h5>
		<p>Полвека — <b>огромный срок</b> для компании, а в IT-индустрии речь идёт о <strong>целом ряде</strong> прошедших <a href="#">link editor</a> поколений и эпох.</p>
		<h6>H6 Заголовок</h6>
		<p>Intel с <em>честью прошла</em> этот путь, большую <i>часть времени</i> оставаясь в числе локомотивов отрасли, и к своему юбилею решила поделиться десяткой ключевых с точки зрения общественности и её сотрудников достижений</p>
		<a href="#">Ссылка</a>
		<br><br>
		<a href="#" class="button">Ссылка</a>
		<br><br>
		<a href="#thanks" class="open-popup">Открыть попап</a>
		<form novalidate class="form form_send" data-success="#thanks">
			<?php include 'templates/loader.php'; ?>
			<label class="field">
				<input type="text" placeholder="Введите текст" data-required="* Поле обязательно для заполнения." class="field__text">
			</label>
			<br>
			<label class="field">
				<input type="text" pattern="\d*" inputmode="numeric" placeholder="Введите число" data-min="1" data-max="100" data-required="* Поле обязательно для заполнения." class="field__text field__number">
			</label>
			<br>
			<label class="field">
				<input type="email" placeholder="Введите e-mail" data-required="* Поле обязательно для заполнения." data-error="Неверный e-mail." class="field__text">
			</label>
			<br>
			<label class="field">
				<input type="tel" placeholder="+7 (___) ___-__-__" data-error="Номер введен не полностью." class="field__text">
			</label>
			<br>
			<label class="field">
				<textarea placeholder="Введите текст" data-required="* Поле обязательно для заполнения." class="field__text field__text_area"></textarea>
			</label>
			<br>
			<div class="select">
				<select data-required="Нужно выбрать." class="select__default">
					<option value="" disabled="" selected="">Выберите пункт</option>
					<option>Пункт 1</option>
					<option>Пункт 2</option>
				</select>
				<div class="select__head" tabindex="0">Выберите пункт</div>
			</div>
			<br>
			<label class="checkbox">
				<input type="checkbox" checked data-required="Нужно принять условия." class="checkbox__input">
				<span class="checkbox__label" tabindex="0">Я принимаю условия <a href="#" target="_blank" class="link">пользовательского соглашения</a></span>
			</label>
			<br><br>
			<button class="button">Отправить</button>
		</form>
	</div>
</main>

<?php include 'templates/footer.php';
