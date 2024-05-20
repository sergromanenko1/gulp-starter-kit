<?php
define( 'VER',        '?v=' . /*0.1*/time() );
define( 'SPRITE_URI', 'public/img/sprite.svg' . VER . '#' );
define( 'MIN',        ( 'localhost' === $_SERVER['HTTP_HOST'] ? null : '.min' ) );
?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<title>Title</title>
	<meta name="description" content="description">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="format-detection" content="telephone=no">
	<link rel="shortcut icon" href="favicon.ico">
	<!-- <link rel="preload" href="public/fonts/font-name.woff2" as="font" type="font/woff" crossorigin="anonymous"> -->
	<link rel="preload" href="public/css/main<?php echo MIN; ?>.css<?php echo VER; ?>" as="style">
	<link rel="stylesheet" href="public/css/main<?php echo MIN; ?>.css<?php echo VER; ?>">
</head>
<body class="page">
	<div class="page__wrapper page__compensate-scrollbar">
		<header class="header page__compensate-scrollbar">
			<div class="page__container">
				<div class="header__content">
					<button class="header__toggle">
						<span class="header__lines"></span>
					</button>
					<nav class="header__menu">
						<ul class="header__menu-list">
							<li class="menu-item">
								<a href="index.php">Главная</a>
							</li>
							<li class="menu-item">
								<a href="#">Услуги</a>
							</li>
							<li class="menu-item current-menu-item">
								<a href="#">Наши работы</a>
							</li>
							<li class="menu-item">
								<a href="#">Контакты</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
