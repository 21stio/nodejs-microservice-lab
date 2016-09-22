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
	docker run -v $(shell pwd):/opt/application 21stio/swagger-codegen:latest generate --input-spec /opt/application/swagger.yml --lang typescript-fetch --output /opt/application/sdk --additional-properties npmName=$(shell cat package.json | jq --raw-output ".name")-sdk

push_sdk:
	git clone ${SDK_REPOSITORY_URL} sdk;\
	cd sdk ;\
	git pull origin master ;\
	docker run -v $(shell pwd):/opt/application 21stio/swagger-codegen:latest generate --input-spec /opt/application/swagger.yml --lang typescript-fetch --output /opt/application/sdk --additional-properties npmName=$(shell cat package.json | jq --raw-output ".name")-sdk
	PREVIOUS_VERSION=$$(cat version 2>/dev/null || cat package.json | jq --raw-output ".version" | tee version) ;\
	npm version $${PREVIOUS_VERSION} --no-git-tag-version ;\
	NEW_VERSION=$$(npm version patch --no-git-tag-version) ;\
	echo $${NEW_VERSION} > version ;\
	git add . ;\
  git commit -m "update" ;\
	git tag $${NEW_VERSION} ;\
	git push origin master ;\
	git push origin --tags ;\
