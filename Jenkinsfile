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

    stage 'test integration'
    sh 'docker-compose run build-application gulp test_integration'

    stage 'test http interface'
    sh 'docker-compose run build-application gulp test_http_interface'
  } finally {
    stage 'teardown'
    sh 'docker-compose stop'
    sh 'docker-compose rm --all --force -v'
  }
}