install: install-deps

install-deps:
				npm ci

lint:
				npx eslint . --fix
publish:
				npm publish --dry-run

push:		lint
				git push origin main
	
start:
				npm run serve