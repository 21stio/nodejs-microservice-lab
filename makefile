test_integration:
	docker-compose run development-application gulp test_integration

test_http_interface:
	docker-compose run development-application gulp test_http_interface

play:
	docker-compose run development-application node ./dist/playground.js

seed:
	docker-compose run development-application gulp seed

migrate:
	docker-compose run development-application gulp migrate