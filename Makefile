install: install-deps

install-deps:
				npm ci

lint:
				npx eslint . --fix
	
start:
				npm run serve