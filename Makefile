build:
	npm run build --prefix frontend

start:
	npx start-server -s ./frontend/dist

lint-frontend:
	npm run lint --prefix frontend

start-backend:
	npx start-server