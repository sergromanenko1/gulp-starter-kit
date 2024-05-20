<span class="loader<?php echo isset( $args['class_name'] ) ? " {$args['class_name']}" : ''; ?>">
	<span class="loader__content">
		<svg class="loader__spinner" viewBox="0 0 50 50">
			<circle class="loader__path" cx="25" cy="25" r="20"></circle>
		</svg>
	</span>
</span>
<?php
if ( isset( $args ) ) {
	unset( $args['class_name'] );
}
