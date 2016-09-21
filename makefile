export NAME=$(cat package.json | jq --raw-output ".name")

build:
	docker build --tag ${REGISTRY_HOST}:${REGISTRY_PORT}/${NAME} --tag ${REGISTRY_HOST}:${REGISTRY_PORT}/${NAME}:latest --tag ${REGISTRY_HOST}:${REGISTRY_PORT}/${NAME}:$(date "+%d-%m-%Y_%H-%M-%S") .

play:
	docker-compose run ${MAKE_ENVIRONMENT}-application node ./dist/playground.js

seed:
	docker-compose run ${MAKE_ENVIRONMENT}-application gulp seed

migrate:
	docker-compose run ${MAKE_ENVIRONMENT}-application gulp migrate

test_integration:
	docker-compose run ${MAKE_ENVIRONMENT}-application gulp test_integration

test_http_interface:
	docker-compose run ${MAKE_ENVIRONMENT}-application gulp test_http_interface