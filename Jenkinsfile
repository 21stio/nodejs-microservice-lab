node ('infrastructure'){
  checkout scm

  try {
    stage 'build'
    sh 'docker-compose build base-application'

    stage 'lint'
    sh 'docker-compose run build-application gulp tslint'

    stage 'database setup'
    sh 'docker-compose up -d --remove-orphans build-database'
    sh 'docker-compose run build-application gulp seed'

    stage 'test http interface'
    sh 'docker-compose run build-application gulp dredd'
  } finally {
    stage 'Teardown'
    sh 'docker-compose stop'
    sh 'docker-compose rm --all --force -v'
  }
}