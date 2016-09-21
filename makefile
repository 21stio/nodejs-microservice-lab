build:
	docker-compose build base-application

play:
	docker-compose run ${MAKE_ENVIRONMENT:-development}-application node ./dist/playground.js

seed:
	docker-compose run ${MAKE_ENVIRONMENT:-development}-application gulp seed

migrate:
	docker-compose run ${MAKE_ENVIRONMENT:-development}-application gulp migrate

test_integration:
	docker-compose run ${MAKE_ENVIRONMENT:-development}-application gulp test_integration

test_http_interface:
	docker-compose run ${MAKE_ENVIRONMENT:-development}-application gulp test_http_interface