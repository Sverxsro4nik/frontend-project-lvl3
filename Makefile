install: install-deps

install-deps:
				npm ci

lint:
				npx eslint . --fix
publish:
				npm publish --dry-run

push:
				git push origin main