node ('infrastructure'){
  checkout scm

  try {
    stage 'Build'
    sh 'docker-compose build base-application'

    stage 'Lint'
    sh 'docker-compose run build-application gulp tslint'
  } finally {
    stage 'Teardown'
    docker-compose rm -f -a
  }
}