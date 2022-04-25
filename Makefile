install: install-deps

install-deps:
				npm ci

lint:
				npm eslint . --fix
publish:
				npm publish --dry-run