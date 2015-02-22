'use strict';

module.exports = {
	app: {
		title: 'cen3031fa14',
		description: 'An app for cen3031fa14 group',
		keywords: 'yufan, rich, tyler'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/codemirror/lib/codemirror.css',
				'public/lib/codemirror/addon/hint/show-hint.css',
				'public/lib/codemirror/addon/fold/foldgutter.css',
				'public/lib/codemirror/theme/monokai.css'

			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-ui-codemirror/ui-codemirror.js',
				'public/lib/codemirror/lib/codemirror.js',
				'public/lib/codemirror/addon/hint/show-hint.js',
				'public/lib/codemirror/addon/fold/foldcode.js',
				'public/lib/codemirror/addon/fold/foldgutter.js',
				'public/lib/codemirror/addon/fold/brace-fold.js',
				'public/lib/codemirror/addon/fold/xml-fold.js',
				'public/lib/codemirror/addon/fold/comment-fold.js',
				'public/lib/codemirror/addon/selection/active-line.js',
				'public/lib/codemirror/addon/edit/closebrackets.js',
				'public/lib/codemirror/addon/search/search.js',
				'public/lib/codemirror/addon/mode/loadmode.js',
				'public/lib/codemirror/addon/search/match-highlighter.js',
				'public/lib/codemirror/mode/r/r.js',
                'public/lib/codemirror/addon/display/placeholder.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
