node ('infrastructure'){
  checkout scm

  try {
    stage 'Setup'
    sh 'docker-compose up -d build-database --remove-orphans'
    sleep 10

    stage 'Build'
    sh 'docker-compose build base-application'

    stage 'Lint'
    sh 'docker-compose run build-application gulp tslint'

    stage 'Test communication'
    sh 'docker-compose run build-application dredd_up'
  } finally {
    stage 'Teardown'
    sh 'docker-compose rm --force -v'
  }
}