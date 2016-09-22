build:
	docker-compose build base-application

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

generate_sdk:
	docker run -v $(shell pwd):/opt/application 21stio/swagger-codegen:latest generate -i /opt/application/swagger.yml -l typescript-fetch -o /opt/application/sdk

publish_sdk: generate_sdk
	cd sdk && ./git_push.sh ${SDK_GITHUB_USER_ID} ${SDK_GITHUB_REPOSITORY_ID}

abc:
	git init ;\
	git add . ;\
	git commit -m "update" ;\
	git remote add origin ${SDK_REPOSITORY_URL} ;\
	git pull origin master ;\
	git push origin master ;\