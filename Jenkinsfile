node ('infrastructure'){
  checkout scm

  try {
    stage 'Setup'
    sh 'docker-compose up -d --remove-orphans build-database'
    sleep 10

    stage 'Build'
    sh 'docker-compose build base-application'

    stage 'Lint'
    sh 'docker-compose run build-application gulp tslint'

    stage 'Test communication'
    sh 'docker-compose run build-application gulp dredd_up'
  } finally {
    stage 'Teardown'
    sh 'docker-compose stop'
    sh 'docker-compose rm --all --force -v'
  }
}